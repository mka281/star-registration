/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/
const level = require("level");
const chainDB = "./chaindata";
const db = level(chainDB);

/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/
const SHA256 = require("crypto-js/sha256");

/* ===== Block Class =============================== */
const Block = require("./block");

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/
class Blockchain {
  constructor() {
    this.getBlockHeight().then(blockHeight => {
      if (blockHeight == -1) {
        this.addBlock(
          new Block('First block in the chain - Genesis block"')
        ).then(() => console.log("Added"));
      }
    });
  }
  // Add new block
  async addBlock(newBlock) {
    // Block height
    const blockHeight = parseInt(await this.getBlockHeight());
    newBlock.height = blockHeight + 1;
    // UTC timestamp
    newBlock.time = new Date()
      .getTime()
      .toString()
      .slice(0, -3);
    // previous block hash
    if (newBlock.height > 0) {
      const previousBlock = await this.getBlock(blockHeight);
      newBlock.previousBlockHash = previousBlock.hash;
    }
    // Block hash with SHA256 using newBlock and converting to a string
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    // Adding block object to levelDB
    await this.addLevelDBData(newBlock.height, JSON.stringify(newBlock));
    console.log(`Block ${newBlock.height} added`);
  }

  // Get block height
  async getBlockHeight() {
    return await this.getBlockHeightFromDB();
  }

  // Get block
  async getBlock(blockHeight) {
    // return object as a single string
    return JSON.parse(await this.getLevelDBData(blockHeight));
  }

  // Validate block
  async validateBlock(blockHeight) {
    // get block object
    let block = await this.getBlock(blockHeight);
    // get block hash
    let blockHash = block.hash;
    // remove block hash to test block integrity
    block.hash = "";
    // generate block hash
    let validBlockHash = SHA256(JSON.stringify(block)).toString();
    // compare
    if (blockHash === validBlockHash) {
      return true;
    } else {
      console.log(
        `Block #${blockHeight} invalid hash:\n${blockHash}<>${validBlockHash}`
      );
      return false;
    }
  }

  // Validate blockchain
  async validateChain() {
    let errorLog = [];

    const blockHeight = parseInt(await this.getBlockHeight());

    for (let i = 0; i < blockHeight; i++) {
      // validate block
      if (!this.validateBlock(i)) errorLog.push(i);

      // compare blocks hash link
      let block = await this.getLevelDBData(i);
      let blockHash = block.hash;
      let nextBlock = await this.getLevelDBData(i + 1);
      let previousHash = nextBlock.previousBlockHash;

      if (blockHash !== previousHash) {
        errorLog.push(i);
      }
    }

    if (errorLog.length > 0) {
      console.log(`Block errors = ${errorLog.length}`);
      console.log(`Blocks: ${errorLog}`);
    } else {
      console.log("No errors detected");
    }
  }

  // Add data to levelDB with key/value pair
  addLevelDBData(key, value) {
    return new Promise((resolve, reject) => {
      db.put(key, value, err => {
        err ? reject(err) : resolve(`Block #${key} has been added`);
      });
    });
  }

  // Get data from levelDB with key
  getLevelDBData(key) {
    return new Promise((resolve, reject) => {
      db.get(key, (err, value) => {
        err ? reject(err) : resolve(value);
      });
    });
  }

  // Get block height from levelDB
  getBlockHeightFromDB() {
    return new Promise((resolve, reject) => {
      let height = -1;
      db.createReadStream()
        .on("data", data => {
          height++;
        })
        .on("error", err => {
          reject(err);
        })
        .on("close", () => {
          resolve(height);
        });
    });
  }
}

module.exports = new Blockchain();

# RESTful Blockchain API

Using Node.js/Express.js, this API interact with private blockchain to submit and retrieve blockchain data

## How to set up project?

- Clone the repository with `git clone git@github.com:mka281/blockchain-api.git`
- `cd` into project directory. Install dependencies with `npm install`.
- Use `cd blockchain` and run `npm install` again to install blockchain dependencies.
- Go to project main directory with `cd ..` and run `node app.js` to run the app.

### API endpoints

There are two different API endpoints.

#### To get a block data:

Send a GET request to
`http://localhost:8000/block/{BLOCK_HEIGHT}` {BLOCK_HEIGHT} being height of the block (an integer).

#### To post a new block:

Send a POST request to http://localhost:8000/block with `body` query containing a string.

#### To get whole blockchain data:

Send a GET request to `http://localhost:8000/chain`

### Example testing with [CURL](https://curl.haxx.se/)

- Get Block

```
curl "http://localhost:8000/block/0"
```

- Post Block

```
curl -X "POST" "http://localhost:8000/block" \
     -H 'Content-Type: application/json' \
     -d $'{
  "body": "Testing block with test string data"
}'
```

- Get Chain

```
curl "http://localhost:8000/chain"
```

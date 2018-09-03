# Private Blockchain Notary Service

Using Node.js/Express.js, this API interact with private blockchain to build Star Registry that allows users to claim ownership of their favorite star in the night sky.

## How to set up project?

- Clone the repository with `git clone git@github.com:mka281/star-registery.git`
- `cd` into project directory. Install dependencies with `npm install`.
- Use `cd blockchain` and run `npm install` again to install blockchain dependencies.
- Go to project main directory with `cd ..` and run `node app.js` to run the app.

## API endpoints

There are two different API endpoints.

### To send a signature message request:

#### Sample POST request to `http://localhost:8000/signature/request` with wallet `address`

```
curl -X "POST" "http://localhost:8000/signature/request" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ"
}'
```

#### JSON Response Example

```
{
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
  "requestTimeStamp": "1532296090",
  "message": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ:1532296090:starRegistry",
  "validationWindow": 300
}
```

### To validate your blockchain ID:

#### Sample POST request to http://localhost:8000/signature/validate with `address` and `signature`

```
curl -X "POST" "http://localhost:8000/signature/validate" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
  "signature": "H6ZrGrF0Y4rMGBMRT2+hHWGbThTIyhBS0dNKQRov9Yg6GgXcHxtO9GJN4nwD2yNXpnXHTWU9i+qdw5vpsooryLU="
}'
```

#### JSON Response Example

```
{
  "registerStar": true,
  "status": {
    "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
    "requestTimeStamp": "1532296090",
    "message": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ:1532296090:starRegistry",
    "validationWindow": 193,
    "messageSignature": "valid"
  }
}
```

### To register a star:

#### Sample POST request to `http://localhost:8000/block` with `address` and `star` information.

```
curl -X "POST" "http://localhost:8000/block" \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{
  "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
  "star": {
    "dec": "-26° 29' 24.9",
    "ra": "16h 29m 1.0s",
    "story": "Found star using https://www.google.com/sky/"
  }
}'
```

#### JSON Response Example

```
{
  "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
  "height": 1,
  "body": {
    "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
    "star": {
      "ra": "16h 29m 1.0s",
      "dec": "-26° 29' 24.9",
      "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f"
    }
  },
  "time": "1532296234",
  "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
}
```

### To get a star by block height:

#### Sample GET request to `http://localhost:8000/block/:blockHeight` with `blockHeight`

```
curl "http://localhost:8000/block/1"
```

#### JSON Response Example

```
{
  "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
  "height": 1,
  "body": {
    "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
    "star": {
      "ra": "16h 29m 1.0s",
      "dec": "-26° 29' 24.9",
      "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
      "storyDecoded": "Found star using https://www.google.com/sky/"
    }
  },
  "time": "1532296234",
  "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
}
```

### To get a star by block hash:

#### Sample GET request to `http://localhost:8000/stars/hash/:hash` with block `hash`

```
curl "http://localhost:8000/stars/hash/a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f"
```

#### JSON Response Example

```
{
  "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
  "height": 1,
  "body": {
    "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
    "star": {
      "ra": "16h 29m 1.0s",
      "dec": "-26° 29' 24.9",
      "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
      "storyDecoded": "Found star using https://www.google.com/sky/"
    }
  },
  "time": "1532296234",
  "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
}
```

### To get a list of all star blocks by the same wallet address:

#### Sample GET request to `http://localhost:8000/stars/address/:address` with wallet `address`

```
curl "http://localhost:8000/stars/address/142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ"
```

#### JSON Response Example

```
[
  {
    "hash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f",
    "height": 1,
    "body": {
      "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
      "star": {
        "ra": "16h 29m 1.0s",
        "dec": "-26° 29' 24.9",
        "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
        "storyDecoded": "Found star using https://www.google.com/sky/"
      }
    },
    "time": "1532296234",
    "previousBlockHash": "49cce61ec3e6ae664514d5fa5722d86069cf981318fc303750ce66032d0acff3"
  },
  {
    "hash": "6ef99fc533b9725bf194c18bdf79065d64a971fa41b25f098ff4dff29ee531d0",
    "height": 2,
    "body": {
      "address": "142BDCeSGbXjWKaAnYXbMpZ6sbrSAo3DpZ",
      "star": {
        "ra": "17h 22m 13.1s",
        "dec": "-27° 14' 8.2",
        "story": "466f756e642073746172207573696e672068747470733a2f2f7777772e676f6f676c652e636f6d2f736b792f",
        "storyDecoded": "Found star using https://www.google.com/sky/"
      }
    },
    "time": "1532330848",
    "previousBlockHash": "a59e9e399bc17c2db32a7a87379a8012f2c8e08dd661d7c0a6a4845d4f3ffb9f"
  }
]
```

### To get whole blockchain data:

#### Sample GET request to `http://localhost:8000/chain`

```
curl "http://localhost:8000/chain"
```

#### JSON Response Example

```
{
  "chain": {
    0: {
      "hash":"1a7a57541f3650f019aad4c33d0e504d1c581ee6f2423c84f37d3e769e2f7d2f",
      "height":0,
      "body": {
        "address":"00",
        "star": {
          "ra":"00",
          "dec":"00",
          "story":"00"}
        },
        "time":"1535970514",
        "previousBlockHash":""
    },
    1: {
      "hash":"1106146991c7c500edf2b6e9380d4b32121d22ead9e871004bccc54a5aede252",
      "height":1,
      "body": {
        "address":"mpGkeC6WEq2L3jznYLHMipkGNUhv9dwmd1",
        "star":{
          "ra":"07h 03m 45s",
          "dec":"-15° 38' 00",
          "story":"4d7920666972737420737461722072656769737472792e20466f72206d6f726520696e666f3a2068747470733a2f2f696e2d7468652d736b792e6f72672f646174612f6f626a6563742e7068703f69643d545943353936332d313933382d31"
        }
      },
      "time":"1535971506",
      "previousBlockHash":"1a7a57541f3650f019aad4c33d0e504d1c581ee6f2423c84f37d3e769e2f7d2f"
    },
    2: {
      "height":2,
      "body": {
        "address":"mpGkeC6WEq2L3jznYLHMipkGNUhv9dwmd1",
        "star": {
          "ra":"12h 16m 20s",
          "dec":"+23° 56' 43",
          "story":"5365636f6e64207374617220746f206275696c64206120636861696e2e205468616e6b7320746f2068747470733a2f2f696e2d7468652d736b792e6f72672f736b796d61702e706870"
        }
      },
      "time":"1535993447",
      "previousBlockHash":"1106146991c7c500edf2b6e9380d4b32121d22ead9e871004bccc54a5aede252"
    }
  }
}
```

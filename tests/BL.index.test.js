const bl = require('../M/B/BL');
const crypto = require("crypto");
let addr1 = 'cJ3kVCEL6ht2FXERgrTd9JVgHrS3LiJTXGvDrpLN3hoanwB3fDjeMpugaA6YG4xPqPWC';
let addr2 = 'dc1ktJZVFXVyoUF1yK9aVapVA1eHzGJkMkKohH6VQ3ffVz2pJyWBK3yYL2rk7HEMSZsS';

let blObject = new bl('test', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 100);

Array(50).fill(null).map((_, i) => i).forEach(i => blObject.addT('test', 1, {
    address: addr1,
    signature: {}
}, {
    address: addr2,
    signature: {}
}, [], {}, {
    segmentation: i
}));

console.log(blObject);

// addr, state, historyVersion, h, nonce

let { version, state } = blObject.history[43];

let temp = version;
let nonce = 0;
while(!temp.startsWith(('' + Array(state.difficult).fill('0')).replaceAll(',', ''))) {
    temp = crypto.createHash('sha256').update(nonce + state.blId).digest('hex');
    if (!temp.startsWith(('' + Array(state.difficult).fill('0')).replaceAll(',', ''))) nonce++;
}

console.log(blObject.checkPoW(addr1, state, version, temp, nonce))
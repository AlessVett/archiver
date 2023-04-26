const t = require('../M/B/MT/T');

let addr1 = 'cJ3kVCEL6ht2FXERgrTd9JVgHrS3LiJTXGvDrpLN3hoanwB3fDjeMpugaA6YG4xPqPWC';
let addr2 = 'dc1ktJZVFXVyoUF1yK9aVapVA1eHzGJkMkKohH6VQ3ffVz2pJyWBK3yYL2rk7HEMSZsS';

const tObject = new t('test', 'test', 'test', 1, {
    address: addr1,
    signature: {}
}, {
    address: addr2,
    signature: {}
}, [], {}, {});

console.log(tObject.getState());
console.log(JSON.stringify(tObject))
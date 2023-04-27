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

let state = {
    blId: 'test',
    mtId: 'test',
    prevTId: 'test',
    tId: tObject.state.tId,
    status: { code: '0x000', value: 'test' },
    type: 1,
    entities: {
        from: 'cJ3kVCEL6ht2FXERgrTd9JVgHrS3LiJTXGvDrpLN3hoanwB3fDjeMpugaA6YG4xPqPWC',
        to: 'dc1ktJZVFXVyoUF1yK9aVapVA1eHzGJkMkKohH6VQ3ffVz2pJyWBK3yYL2rk7HEMSZsS',
        signatures: [ null, null ],
        info: {}
    },
    struct: {}
}

console.log(state)

console.log(JSON.stringify(state) === JSON.stringify(tObject.state))
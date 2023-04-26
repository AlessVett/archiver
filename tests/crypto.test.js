const crypto = require('crypto');
const base58 = require('base-58');
//const result = Array(1000).fill(null).map((_, i) => createHash('sha256').update(String.fromCharCode(i)).digest('hex'));
//result.map(r => result.filter(x => x === r).length > 1 ? console.log(r) : null);

const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: 'secp384r1',
    publicKeyEncoding: {
        type: 'spki',
        format: 'der'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'der'
    }
});

let _1 = crypto.createHash('sha256').update(publicKey).digest('hex');
let _2 = crypto.createHash('sha256').update(_1).digest('hex');
let _3_0 = parseInt(String((Math.random()*158)+1)).toString(16);
let _3 = `${_3_0.length === 1 ? '1' : ''}${_3_0}${crypto.createHash('ripemd160').update(_2).digest('hex')}`;
let _4 = crypto.createHash('sha256').update(_3).digest('hex');
let _5 = crypto.createHash('sha256').update(_4).digest('hex');
let _6 = `${_3}${Buffer.from(_5).subarray(0, 8)}`;
let _8 = base58.encode(Buffer.from(_6));

console.log(`Address (${_8.length}): `, _8);
console.log(`Checksum (${Buffer.from(_5).subarray(0, 8).length}): `, `${Buffer.from(_5).subarray(0, 8)}`);
console.log(`From Base58 (${Buffer.from(base58.decode(_8)).toString('ascii').length}): `, Buffer.from(base58.decode(_8)).toString('ascii'));


const b = require('../M/B');
const crypto = require("crypto");
const base58 = require("base-58");

const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
    namedCurve: 'secp384r1',
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
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

const sign = crypto.createSign('sha256');
sign.update('000000-00000-0000-000-00-0');
sign.end();

console.log(publicKey)

let owner = {
    address: _8,
    signature: {
        sign: (sign.sign(privateKey)).toString('base64'),
        publicKey: Buffer.from(publicKey).toString('base64')
    }
}
console.log(owner)

const verify = crypto.createVerify('sha256');
verify.update('000000-00000-0000-000-00-0');
verify.end();

console.log(verify.verify(Buffer.from(owner.signature.publicKey, 'base64'), Buffer.from(owner.signature.sign, 'base64')));


let bObject = new b(owner);

console.log(bObject)

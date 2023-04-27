const crypto = require('crypto');
const bl = require('./BL');
const base58 = require("base-58");
const fs = require('fs');
module.exports = class {

    constructor(owner) {
        this.state = {
            bId: this.__genBId(),
            bAddr: null,
            bls: [],
            owner,
            timestamp: Date.now()
        }
        this.state.bAddr = this.__genBAddr();
        this.__genFirstBl();
    }

    __genBId() {
        const schema = "0000000-0000-00000000000000-0-00-0000000";
        const arch = schema.split('-').map(value => value.length);
        let bId = '';
        arch.forEach(rule => {
            Array(rule).fill(null).map((_, i) => {
                let hex = crypto.createHash('sha256').update(String.fromCharCode(parseInt(String(Math.random() * 1000), 10))).digest('hex');
                bId += hex[parseInt(String(Math.random() * hex.length), 10)];
            })
            if (rule !== arch[arch.length - 1]) bId += '-';
        });
        return bId;
    }

    __genFirstBl() {
        let temp = new bl(this.state.bId, null, 0);

        temp.addT('000000-00000-0000-000-00-0', 0, {
            address: this.state.bAddr,
            signature: this.__genBSignature('000000-00000-0000-000-00-0')
        }, this.state.owner, [], JSON.parse(`{"c": "new owner","${this.state.bId}": 10000}`), {
            bId: this.state.bId,
            owner: this.state.owner,
            timestamp: this.state.timestamp
        });

        this.state.bls.push(temp)
    }

    newBl() {
        const lastSignature = this.getLastSignature();
        this.state.bls.push(new bl(this.state.bId, lastSignature, this.getHOfBlByLastSignature(lastSignature)));
        return '';
    }

    getLastSignature() {
        const signedBls = this.state.bls.filter(bl => bl.signature.h !== null && bl.signature.h.startsWith(('' + Array(bl.state.difficult).fill('0')).replaceAll(',', '')));
        return signedBls[signedBls.length - 1].signature.h;
    }

    getHOfBlByLastSignature(signature) {
        return this.state.bls.filter(bl => bl.signature.h === signature)[0].state.H;
    }

    __genBAddr() {
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

        fs.writeFileSync(`${__dirname}\/ADDRS\/${this.state.bId}.key`, privateKey, (err) => {
            if (err) {
                return null
            }
        });

        return _8;
    }

    __genBSignature(content) {

        const privateKey = fs.readFileSync(`${__dirname}\/ADDRS\/${this.state.bId}.key`);

        const publicKey = crypto.createPublicKey({
                key: privateKey,
                format: 'pem'
            }
        ).export({
            type: 'spki',
            format: 'pem'
        });

        const sign = crypto.createSign('sha256');
        sign.update(content).end();

        return {
            sign: (sign.sign(privateKey)).toString('base64'),
            publicKey: Buffer.from(publicKey).toString('base64')
        };
    }
};
const crypto = require('crypto');
const base58 = require('base-58');
const status = require('../../../../CONF/loaders/status.loader');
module.exports = class {
    constructor(blId, mtId, prevTId, type, from, to, signatures, info, struct) {
        this.prevTId = prevTId;
        this.state = {
            blId,
            mtId,
            prevTId,
            tId: this.__genTId(),
            status: status.getStatusByCode(0x000),
            type,
            entities: {
                from: this.__checkAddress(from.address),
                to: this.__checkAddress(to.address),
                signatures: [this.__checkSignature(from.signature), this.__checkSignature(to.signature), ...signatures.map(signature => this.__checkSignature(signature))],
                info
            },
            struct
        }
        delete this.prevTId;
    }

    __checkAddress(address) {
        if (address.length !== 68) {
            return null;
        }

        try {
            if (base58.decode(address).length !== 50) {
                return null;
            }
        } catch (e) {
            return null;
        }

        if (!(1 < parseInt(base58.decode(address).subarray(0, 2), 16) < 160)) {
            return null;
        }

        return address;
    }

    __checkSignature(signature) {
        let result = false;

        try {
            const {sign, publicKey} = signature;

            const verify = crypto.createVerify('sha256');
            verify.update(this.prevTId);
            verify.end();

            result = verify.verify(Buffer.from(publicKey, 'base64'), Buffer.from(sign, 'base64'));
        } catch (e) {
            return null;
        }

        return result ?  signature : null;
    }

    __genTId() {
        const arch = this.prevTId.split('-').map(value => value.length);
        let tId = '';
        arch.forEach(rule => {
            Array(rule).fill(null).map((_, i) => {
                let hex = crypto.createHash('sha256').update(String.fromCharCode(parseInt(String(Math.random() * 1000), 10))).digest('hex');
                tId += hex[parseInt(String(Math.random() * hex.length), 10)];
            })
            if (rule !== arch[arch.length - 1]) tId += '-';
        });
        return tId;
    }

    getState() {
        return this.state;
    }
}
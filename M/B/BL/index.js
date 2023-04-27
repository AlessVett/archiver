const crypto = require('crypto');
const mt = require('../MT');
const t = require('../MT/T');
const base58 = require("base-58");
module.exports = class {

    constructor(bId, pH, H) {
        this.state = {
            bId,
            pH,
            H,
            timestamp: Date.now(),
            difficult: 4
        }

        this.signature = {
            h: null,
            nonce: -1
        }

        this.history = [];

        this.state.blId = this.__genBlId()
        this.state.mt = new mt(this.state.blId);
    }

    __genBlId() {
        return crypto.createHash('sha256').update(JSON.stringify(this)).digest('hex');
    }

    checkPoW(addr, state, historyVersion, h, nonce) {
        if (this.__checkAddress(addr)) {
            let s = this.history.filter(h => {
                if (h.version === historyVersion) return h.state
            })[0];
            if (JSON.stringify(s.state) === JSON.stringify(state) && s.state.mt.getTxs().length > 49) {
                if (crypto.createHash('sha256').update(`${nonce}${s.state.blId}`).digest('hex') === h && h.startsWith(('' + Array(this.state.difficult).fill('0')).replaceAll(',', ''))) {
                    this.signature.h = h;
                    this.signature.nonce = nonce;

                    return {
                        h,
                        nonce
                    };
                }
            }
        }

        return null;
    }

    addT(prevTId, type, from, to, signatures, info, struct) {
        let tObject = null;

        try {
            tObject = new t(this.state.blId, this.state.mt.getState().mtId, prevTId, type, from, to, signatures, info, struct);
            if (tObject.getState().status.value.startsWith('error')) return null;
            if (tObject.getState().entities.from === null || tObject.getState().entities.to === null || tObject.getState().entities.signatures.includes(null)) return null;
            this.state.mt.addTx(tObject);
            this.state.blId = this.__genBlId();
            this.history.push({
                version: this.state.blId,
                state: this.state
            });
        } catch (e) {
            return null;
        }

        return tObject;
    }

    getT(script) {
        this.state.mt.getTx(script)
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

    getState() {
        return this.state;
    }

    getHistory() {
        return this.history;
    }

    getSignature() {
        return this.signature;
    }
};
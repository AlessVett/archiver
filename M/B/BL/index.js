const crypto = require('crypto');
const mt = require('../MT');
const { __checkAddress } = require('../MT/T');
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
            nonce: 0
        }

        this.history = [];

        this.state.blId = this.__genBlId()
        this.state.mt = new mt(this.state.blId);
    }

    __genBlId() {
        return '';
    }

    checkPoW(addr, state, historyVersion, h, nonce) {
        if (__checkAddress(addr)) {
            let s = this.history.filter(h => {
                if (h.version === historyVersion) return h.state
            })[0];
            if (s === state && s.mt.getTxs().length > 50) {
                if (crypto.createHash('sha256').update(`${nonce}${s.signature.h}`) === h && h.startsWith(('' + Array(this.state.difficult).fill('0')).replaceAll(',', ''))) {
                    return true;
                }
            }
        }

        return null;
    }

    getState() {
        return this.state;
    }
};
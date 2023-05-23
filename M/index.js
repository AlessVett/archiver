const crypto = require("crypto");
const b = require('./B');
module.exports = class {
    constructor(author, description, prize, tokenName, tokenSymbol, liquidity, quantity, taxes, initialLength) {
        this.state = {
            mId: null,
            author,
            description,
            bs: [],
            timestamp: Date.now(),
            token: {
                name: tokenName,
                symbol: tokenSymbol,
                values: {
                    liquidity,
                    quantity,
                    taxes
                }
            }
        };
        this.state.mId = this.__genMIdByAuthor();
        this.__initBs(initialLength);
    }

    __genMIdByAuthor() {
        let arch = 1;
        this.state.author.split('').forEach(char => arch *= parseInt(`0x${Buffer.from(char).toString('hex')}`));
        arch = String(arch).split(/[.\e+]*/).map(char => parseInt(char));
        let mId = '';
        arch.forEach(rule => {
            Array(rule).fill(null).map((_, i) => {
                let hex = crypto.createHash('sha256').update(String.fromCharCode(parseInt(String(Math.random() * 1000), 10))).digest('hex');
                mId += hex[parseInt(String(Math.random() * hex.length), 10)];
            })
            if (rule !== arch[arch.length - 1]) mId += '-';
        });
        return mId;
    }

    __initBs(length) {
        Array(length).fill(null).forEach(_ => {
           this.state.bs.push();
        });
    }
}
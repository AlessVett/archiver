const crypto = require('crypto');

module.exports = class {
    constructor(blId) {
        this.state = {
            txs: [],
            blId,
            mtId: this.__genMtId(),
            mtRoot: ''
        }
    }

    __getHexOfObject(object) {
        return crypto.createHash('sha256').update(JSON.stringify(object)).digest('hex');
    }

    __getHexOfString(string) {
        return crypto.createHash('sha256').update(string).digest('hex');
    }

    __genMtId() {
        const schema = "00000000-0000-00000000-0000-000000000000";
        const arch = schema.split('-').map(value => value.length);
        let mtId = '';
        arch.forEach(rule => {
            Array(rule).fill(null).map((_, i) => {
                let hex = crypto.createHash('sha256').update(String.fromCharCode(parseInt(String(Math.random() * 1000), 10))).digest('hex');
                mtId += hex[parseInt(String(Math.random() * hex.length), 10)];
            })
            if (rule !== arch[arch.length - 1]) mtId += '-';
        });
        return mtId;
    }

    __genMtRoot() {
        const splitIntoChunk = (array, chunk) => {
            let temp = [];
            for(let i = 0; i < array.length; i += chunk) {
                temp.push(array.slice(i, i + chunk));
            }
            return temp;
        }

        let dLeaves = splitIntoChunk(this.state.txs, 2);

        let leaves = dLeaves.map(leaves => {
            if (leaves.length === 2) {
                return this.__getHexOfString(`${this.__getHexOfString(leaves[0].script)}|${this.__getHexOfString(leaves[1].script)}`);
            } else if (leaves.length === 1) {
                return this.__getHexOfString(leaves[0].script);
            } else {
                throw new Error(`(MT.index.js[52]): Condition: leaves.length: ${leaves.length}`);
            }
        });

        while(leaves.length > 1) {
            leaves = splitIntoChunk(leaves, 2).map(leaves => {
                if (leaves.length === 2) {
                    return this.__getHexOfString(`${leaves[0]}|${leaves[1]}`)
                } else if (leaves.length === 1) {
                    return leaves[0];
                } else {
                    throw new Error(`(MT.index.js[63]): Condition: leaves.length: ${leaves.length}`);
                }
            });
        }

        return leaves[0];
    }

    addTx(object, blId) {
        this.state.blId = blId;

        this.state.txs.push({
            tx: object,
            script: `${this.state.blId}:${this.state.mtId}:${this.__getHexOfObject(object)}`
        });

        this.state.mtRoot = this.__genMtRoot();
    }

    getTxs() {
        return this.state.txs;
    }

    getTx(script) {
        return this.state.txs.filter(tx => tx.script === script)[0];
    }

    getState() {
        return this.state;
    }
};
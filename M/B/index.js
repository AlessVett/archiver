const crypto = require('crypto');
const bl = require('./BL');
module.exports = class {

    constructor() {
        this.state = {
            bId: this.__genBId()
        }
    }

    __genBId() {
        return null;
    }
};
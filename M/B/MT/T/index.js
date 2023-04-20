const crypto = require('crypto');
const status = require('../../../../CONF/loaders/status.loader');
module.exports = class {
    constructor(type, from, to) {
        this.state = {
            status: status.getStatusByCode(0x000),
            type,
            entities: {
                from,
                to
            }
        }
    }

    __checkAddress
}
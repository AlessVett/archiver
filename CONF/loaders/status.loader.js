const status = require('../status.json');

module.exports = {
    getStatusByCode: (code) => Object.entries(status.status).filter(([key, _]) => parseInt(key) === code).map(([key, value]) => {
        return {
            code: key,
            value
        }
    })[0],
    getStatusByValue: (value) => Object.entries(status.status).filter(([_, v]) => v.toLowerCase() === value.toLowerCase()).map(([key, value]) => {
        return {
            code: key,
            value
        }
    })[0]
}
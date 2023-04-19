const { createHash } = require('crypto');

const result = Array(1000).fill(null).map((_, i) => createHash('sha256').update(String.fromCharCode(i)).digest('hex'));

result.map(r => result.filter(x => x === r).length > 1 ? console.log(r) : null);
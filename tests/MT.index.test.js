const mt = require('../M/B/MT');


/** ``
 * const mts = Array(1000).fill(null).map((_, i) => (new mt(`test ${i}`)).getState());
 *
 * mts.map(r => mts.filter(x => x.mtId === r.mtId).length > 1 ? console.log('Dup:', r) : null);
 *
 * console.log((new mt('Final Test')).getState());
 */


/** ``
 * const mtObject = new mt('Test');
 *
 * mtObject.addTx({
 *     title: 'test',
 *     value: 'test'
 * });
 *
 * console.log('getState: ', mtObject.getState())
 * console.log('getTxs: ', mtObject.getTxs())
 * console.log('getTx: ', mtObject.getTx((mtObject.getTxs())[0].script))
 */

const t = require('../M/B/MT/T');

const tObject = new t('test', 'test', 'test', 1, {
    address: 'cJ3kVCEL6ht2FXERgrTd9JVgHrS3LiJTXGvDrpLN3hoanwB3fDjeMpugaA6YG4xPqPWC',
    signature: {}
}, {
    address: 'dc1ktJZVFXVyoUF1yK9aVapVA1eHzGJkMkKohH6VQ3ffVz2pJyWBK3yYL2rk7HEMSZsS',
    signature: {}
}, [], {}, {});

const mtObject = new mt('Test');

mtObject.addTx(tObject);

mtObject.addTx({
    title: 'test2',
    value: 'test',
    timestamp: String(Date.now())
});

mtObject.addTx({
    title: 'test1',
    value: 'test',
    timestamp: String(Date.now())
});

console.log(mtObject);

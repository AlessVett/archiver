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


const mtObject = new mt('Test');

mtObject.addTx({
    title: 'test3',
    value: 'test',
    timestamp: String(Date.now())
});

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

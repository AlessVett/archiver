const file = require('../CONF/schema.json');

// ((10 (30 (2230 (11000) (11000) (1110000)))))0?
//  0,2
//      2,4
//           4,8
//                 8,13
//                          13,18
//                                  18,25
// let schema = file["example-schema"]["schema-of-example"].split('');

let testSchema = {
    '1': {
        '3': {
            '2': {
                '1': {
                    'value': '',
                    '0': {}
                },
                '1_': {
                    'value': '',
                    '0': {}
                },
                '0': {}
            },
            '2_': {
                '1': {
                    'value': '',
                    '0': {}
                },
                '1_': {
                    'value': '',
                    '0': {}
                },
                '0': {}
            },
            '3': {

                '1': {
                    'value': '',
                    '0': {}
                },
                '1_': {
                    'value': '',
                    '0': {}
                },
                '1__': {
                    'value': '',
                    '0': {}
                },
                '0': {}
            },
            '0': {}
        },
        '0': {}
    },
    '0': {}
};
let testSchema2 = {
    '1': {
        '3': {
            '2': {
                '1 ok': {
                    'value': '',
                    '0': {}
                },
                '1_ ok': {
                    'value': '',
                    '0': {}
                },
                '0': {}
            },
            '2_ ok': {
                '1 ok': {
                    'value': '',
                    '0': {}
                },
                '1_ ok': {
                    'value': '',
                    '0': {}
                },
                '0': {}
            },
            '3': {

                '1 ok': {
                    'value': '',
                    '0': {}
                },
                '1_ ok': {
                    'value': '',
                    '0': {}
                },
                '1__ ok': {
                    'value': '',
                    '0': {}
                },
                '0': {}
            },
            '0': {}
        },
        '0': {}
    },
    '0': {}
};


let a = [];

const getKeysSchema = (object) => {
    Object.keys(object).map(key => {

        if (!isNaN(parseInt(key))) a.push(parseInt(key));
        else a.push(parseInt(String(Math.random() + 0.5)) ? ']' : '[')

        getKeysSchema(object[key])
    });
}

getKeysSchema(testSchema);

a = a.toString().replaceAll(',', '');
console.log(a)

a = []

getKeysSchema(testSchema2)

a = a.toString().replaceAll(',', '');
console.log(a)


// console.log(Object.entries(Object.entries(Object.entries(testSchema)[1][1])[1][1]))

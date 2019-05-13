const utils = require('../../client/src/utils.mjs');

test.skip('parseCSV', () => {
    const actual = utils.parseCSV('foo, bar')
    const expected = ['foo', 'bar']

    expect(actual).toStrictEqual(expected)
})

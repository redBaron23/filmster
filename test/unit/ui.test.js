const utils = require('../../client/src/utils.mjs');

test('parseCSV', () => {
    const actual = utils.parseCSV('  foo  , bar  ')
    const expected = ['foo', 'bar']

    expect(actual).toStrictEqual(expected)
})

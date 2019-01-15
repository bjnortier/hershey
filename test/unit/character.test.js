import expect from 'expect'

import { parseCharacterDescriptor } from '../../src'

describe('Parse a character descriptor', () => {
  it('can parse the example descriptor', () => {
    expect(parseCharacterDescriptor('    8  9MWOMOV RUMUV ROQUQ')).toEqual({
      number: 8,
      left: -5,
      right: 5,
      penCommands: [
        [[-3, -5], [-3, 4]],
        [[3, -5], [3, 4]],
        [[-3, -1], [3, -1]]
      ]
    })
  })
})

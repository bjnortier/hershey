import expect from 'expect'

import { stringToPaths } from '../../src'

describe('String to Paths', () => {
  it('can convert an empty string', () => {
    expect(stringToPaths('')).toEqual({
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      paths: []
    })
  })

  it('can convert an H', () => {
    expect(stringToPaths('H')).toEqual({
      minX: -11,
      maxX: 11,
      minY: -9,
      maxY: 12,
      paths: [
        [[-7, 12], [-7, -9]],
        [[7, 12], [7, -9]],
        [[-7, 2], [7, 2]]
      ]
    })
  })

  it('can convert a T', () => {
    expect(stringToPaths('T')).toEqual({
      minX: -8,
      maxX: 8,
      minY: -9,
      maxY: 12,
      paths: [
        [[0, 12], [0, -9]],
        [[-7, 12], [7, 12]]
      ]
    })
  })

  it('can convert an 12', () => {
    expect(stringToPaths('THE QUICK BROWN FOX jumped over the lazy dog')).toMatchObject({
      minX: -398,
      maxX: 398,
      minY: -16,
      maxY: 13
    })
  })
})

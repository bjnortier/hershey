import characterNumbers from './characterNumbers'
import rowmansB64 from '../font/js/rowmans.js'

/**
 * Convert a character descriptor from the font file
 * to a set of vector paths. A description of the algorithm is found on
 * https://emergent.unpythonic.net/software/hershey and is reproduced here:
 *
 * The structure is bascially as follows: each character consists of a number 1->4000 (not all used) in column 0:4, the number of vertices in columns 5:7, the left hand position in column 8, the right hand position in column 9, and finally the vertices in single character pairs. All coordinates are given relative to the ascii value of 'R'. If the coordinate value is " R" that indicates a pen up operation.
 * As an example consider the 8th symbol
 *
 * 8 9MWOMOV RUMUV ROQUQ
 * It has 9 coordinate pairs (this includes the left and right position).
 * The left position is 'M' - 'R' = -5
 * The right position is 'W' - 'R' = 5
 * The first coordinate is "OM" = (-3,-5)
 * The second coordinate is "OV" = (-3,4)
 * Raise the pen " R"
 * Move to "UM" = (3,-5)
 * Draw to "UV" = (3,4)
 * Raise the pen " R"
 * Move to "OQ" = (-3,-1)
 * Draw to "UQ" = (3,-1)
 * Drawing this out on a piece of paper will reveal it represents an 'H'.
 */
export const parseCharacterDescriptor = (descriptor) => {
  const R = 'R'.charCodeAt(0)
  const number = parseInt(descriptor.substr(0, 5))
  const left = descriptor[8].charCodeAt(0) - R
  const right = descriptor[9].charCodeAt(0) - R

  // Includes the L/R pair
  const numVertices = parseInt(descriptor.substr(5, 3), 10) - 1
  let currentPath = []
  const penCommands = [currentPath]
  for (let i = 0; i < numVertices; ++i) {
    const x = descriptor[10 + i * 2].charCodeAt(0) - R
    const y = descriptor[11 + i * 2].charCodeAt(0) - R
    if ((x === -50) && (y === 0)) {
      currentPath = []
      penCommands.push(currentPath)
    } else {
      currentPath.push([x, y])
    }
  }

  return {
    number,
    left,
    right,
    penCommands
  }
}

/**
 * Parse all the character descriptors from the file - one per line.
 */
const rowmans = Buffer.from(rowmansB64, 'base64')
  .toString('ascii')
  .split('\n').reduce((acc, line) => {
    if (line.trim().length) {
      var descriptor = parseCharacterDescriptor(line)
      acc[descriptor.number] = descriptor
    }
    return acc
  }, {})

export const stringToPaths = (string) => {
  if (!string.length) {
    return {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      paths: []
    }
  }
  const characterDescriptors = string.split('').map(character => {
    const characterNumber = characterNumbers[character]
    let descriptor = rowmans[characterNumber]
    // Blank out unsupported characters
    if (!descriptor) {
      descriptor = rowmans[characterNumbers[' ']]
    }
    return descriptor
  })

  let bounds = characterDescriptors.reduce((acc, descriptor) => {
    acc.width += (descriptor.right - descriptor.left)
    descriptor.penCommands.forEach(command => {
      command.forEach(point => {
        acc.minY = Math.min(acc.minY, -point[1])
        acc.maxY = Math.max(acc.maxY, -point[1])
      })
    })
    return acc
  }, {
    width: 0,
    minY: Infinity,
    maxY: -Infinity
  })
  bounds.minX = -bounds.width / 2
  bounds.maxX = bounds.width / 2
  delete bounds.width

  let paths = []
  let currentX = bounds.minX
  characterDescriptors.forEach(descriptor => {
    paths = paths.concat(descriptor.penCommands.map(command => {
      return command.map(point => {
        // Y coodinate is Y positive downwards
        return [currentX - descriptor.left + point[0], -point[1]]
      })
    }))
    currentX += (descriptor.right - descriptor.left)
  })

  return {
    ...bounds,
    paths
  }
}

import React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

import { stringToPaths } from '../../src'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
`

const HersheySVG = ({ bounds, paths }) => {
  const { minX, maxX, minY, maxY } = bounds
  const height = maxY - minY
  const width = maxX - minX
  return <svg height={height + 1} width={width + 1}>
    <g transform='translate(0.5, 0.5)'>
      {paths.map((path, j) => {
        const d = path.reduce((acc, point, i) => {
          if (i === 0) {
            return `M${point[0] - minX} ${maxY - point[1]}`
          } else {
            return acc + ` L${point[0] - minX} ${maxY - point[1]}`
          }
        }, '')
        return <path key={j} d={d} stroke='#000' fill='none' />
      })}
    </g>
  </svg>
}

render(<div>
  <div><HersheySVG {...stringToPaths('Hello World!')} /></div>
  <div><HersheySVG {...stringToPaths('The quick brown fox jumped over the lazy dog')} /></div>
  <div><HersheySVG {...stringToPaths('The quick brown fox jumped over the lazy dog'.toUpperCase())} /></div>
  <div><HersheySVG {...stringToPaths('.,:;!?"°$/()|-+=\'#&\\_*[]{}<>~%@')} /></div>
  <div><HersheySVG {...stringToPaths('Unprintable: ^±§')} /></div>
  <GlobalStyle />
</div>, document.getElementById('contents'))

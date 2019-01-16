[![Build Status](https://travis-ci.org/bjnortier/hershey.png?branch=master)](https://travis-ci.org/bjnortier/hershey)

# Hershey

Hershey is a library for generating vector paths for the single line Hershey Font, which can be used for vector applications like rendering technical annotations on a WebGL canvas using Three.js.

You can download the font and find the format description here: [https://emergent.unpythonic.net/software/hershey](https://emergent.unpythonic.net/software/hershey)

# Limitations

Only the Roman Simplex font is supported, which includes the following characters:

```
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
.,:;!?"°$/()|-+='#&\_*[]{}<>~%@
```

## Usage

This library will generate a set of vector paths for a string of characters. The bounds will also be included for us in justification, but the default output is that the text will be centered both horizontally and vertically.

For example:

```
$ npm install hershey
$ node
> const hershey = require('hershey')
> hershey.stringToPaths('AH')
{
  "bounds": {
    "minY":-9,
    "maxY":12,
    "minX":-20,
    "maxX":20
  },
  "paths":[
    [[-11,12],[-19,-9]],
    [[-11,12],[-3,-9]],
    [[-16,-2],[-6,-2]],
    [[2,12],[2,-9]],
    [[16,12],[16,-9]],
    [[2,2],[16,2]]
  ]
}
```

will generate the following vector paths:

![hershey](https://user-images.githubusercontent.com/57994/51240225-f4cd0d80-1983-11e9-872b-e146b40b2768.png)

Also see test/functional/index.js for an SVG implementation in React.

# License

See HERSHEY-LICENSE and CODE-LICENSE

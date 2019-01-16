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

```
$ npm install hershey
```

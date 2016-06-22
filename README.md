# jenfr
Canvas based image loader

### Requirements
- `Promise`

### Example

```javascript
const jenfr = require("jenfr"),
  pics = ["file1.jpg", "file2.jpg", "file3.jpg", "file4.jpg", "file5.jpg"],
  target = document.querySelector("#photos");

Promise.all(pics.map(file => {
    return jenfr(target, file, {className: "photo"});
})).then(() => {
  console.log("Pictures loaded");
}, e => {
  console.error(e);
});
```

### API
**jenfr(Element[, imageUrl, options])**
_Promise ([canvas, context, image])_

Creates a canvas with the supplied options. A fallback `img` Element will be created with `imageUrl` if the Client cannot create a `canvas`.

To get the natural `width` & `height` of the image, do not specify in `options`, e.g. `{}`.

```javascript
jenfr(document.querySelector("body"), "http://...", {
  height: 400,
  width: 400,
  scale: true,
  filter: "blur(5px)",
  font: "48px serif",
  strokeText: ["Hello world", 50, 100]
}).then(function (arg) {
  console.log("rendered canvas");
}, function (e) {
  console.error(e)
});
```

#### Options

`Canvas` attributes can be specified, as well as `context` methods with an `Array` of arguments.

**scale _(Boolean)_**
Scales the image to fit inside the canvas if a `width` & `height` are specified.

```javascript
jenfr(document.querySelector("#photo"), "http://...", {height: 500, width: 500, scale: true});
```

### How can I load jenfr?
jenfr supports AMD loaders (require.js, curl.js, etc.), node.js & npm (npm install jenfr), or using a script tag.

### License
Copyright (c) 2016 Jason Mulligan
Licensed under the BSD-3 license

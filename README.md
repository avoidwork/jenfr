# jenfr
Photo library

### Requirements
- `Promise`

### Example

```javascript
const jenfr = require("jenfr"),
  pics = ["file1.jpg", "file2.jpg", "file3.jpg", "file4.jpg", "file5.jpg"],
  target = document.querySelector("#photos");

Promise.all(pics.map(file => {
    return jenfr.create(target, {className: "photo"});
})).then(() => {
  console.log("Photos loaded");
}, e => {
  console.error(e);
});
```

### API
**create(Element[, descriptor])**
_Promise_

Creates a photo component

### How can I load jenfr?
jenfr supports AMD loaders (require.js, curl.js, etc.), node.js & npm (npm install jenfr), or using a script tag.

### License
Copyright (c) 2016 Jason Mulligan
Licensed under the BSD-3 license

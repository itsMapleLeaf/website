---
path: /blog/es6-default-imports
title: 'ES6 Modules and Default Imports'
description: An attempt at diffusing the confusion associated with it
date: 2017-11-5
tags: javascript es6 modules
---

Here we have two import statements:

```js
import React from "react"
import * as React from "react"
```

I see both of them in a lot of written code, the former more often than the latter. They _seem_ to accomplish the same result, but depending on a lot of factors, they can end up doing entirely different things. I wrote this to hopefully clear up the difference between the two, especially for those who might not be aware that there even is a difference.

## Namespace imports

Namespace imports import all of the exported variables from a file under one name. For example:

```js
// my-module.js
export const foo = 123
export const bar = 456

// main.js
import * as stuff from "./my-module"

// stuff is: { foo: 123, bar: 456 }
```

Pretty simple, right? Not much more to explain here.

## Default imports

On the other hand, default imports import a specific default export from another module. That is, the variable exported as `export default` in the imported module.

```js
// my-module.js
export default {
  foo: 123,
  bar: 456,
}

// main.js
import stuff from "./my-module"

// stuff is: { foo: 123, bar: 456 }
```

The purpose of default exports is to give an attractive interface for importing a single unit of functionality from another module: a single class, a single utility function, and so on. The default export is meant to promote the practice of single-responsibility modules.

A variable exported normally is tagged under its variable name. `export const foo = 123` is exported under the name `foo`, and can be imported as `foo`.

The default export of a module is tagged literally under the name `default`. With that in mind, we could rewrite the previous example like this to achieve the same result:

```js
// my-module.js
export const default = {
  foo: 123,
  bar: 456,
}

// main.js
import { default as stuff } from './my-module'

// stuff is: { foo: 123, bar: 456 }
```

Conclusion: defaults aren't a value magically hidden alongside the normal exports of a module. Defaults are just syntactic sugar built over what's already possible with normal exports.

However...

## Default imports are _not_ namespace imports

...and should not be treated as such. Example:

```js
// my-module.js
export const foo = 123
export const bar = 456

// main.js
import stuff from "./my-module"
```

The import statement is looking for a default export to use as `stuff`, but the module does not have anything exported as default. The script will fail, complaining that `default` could not be found in `my-module.js`.

...Except, if you've ever worked with babel, webpack, or other bundlers/transpilers, you'll know that it actually does work sometimes. Why?

Most modules are written in CommonJS, and because of this, transpilers and bundlers use various strategies to resolve the differences so you can seamlessly use different module systems together. The most common strategy is to take the `module.exports` object from the CommonJS module and treat that as the default export.

In short, in most build pipelines today, the previous example would work as you expect if `my-module.js` were written as a CommonJS module.

Addtitionally, transpilers add a special `__esModule` property to the `module.exports` object when transpiling from ES modules to CommonJS. This tells module loaders that the original module is written as an ES module, and is meant to be used as an ES module. So the `module.exports` to `default` strategy described only applies when the library is originally authored in CommonJS.

## So then, how do I import React?

[From the React repo:](https://github.com/facebook/react/blob/743201387246d0cde523700c151550786f0afc2e/packages/react/src/React.js#L75)

```js
export default React
```

A lot of code in the wild uses a default export, so that appears to be what they went with here. I personally would've gone with a namespaced export myself given the structure of things, but it is what it is. ¯\\\_(ツ)\_/¯

## Conclusion

Know your modules' exports, know which module system it uses, and know whether there is or isn't a default export. [Here's a good article on ES modules if you want to learn more.](http://2ality.com/2014/09/es6-modules-final.html)

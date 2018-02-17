---
path: /blog/typescript-object-indexes
title: Indexing objects in TypeScript
published: false
description: Why they behave the way they do, and what you can do about it
tags: typescript
date: 2018-1-30
---

Imagine you have code like this:

```ts
// an object defining how to display specific user statuses in the UI
const statusDisplays = {
  online: "Online",
  offline: "Offline",
  busy: "Busy",
  dnd: "Do Not Disturb",
}

// fetch the status of a user by their ID
const userStatus = getUserStatus(myUserID)

// get the displayed status text
const displayedStatus = statusDisplays[userStatus]
```

However, with strict mode enabled, the last line gives an interesting-looking error:

> Element implicitly has an 'any' type because type '{ online: string; offline: string; busy: string; dnd: string; }' has no index signature.

...which might look like Chinese to you if you don't really know what's going on. So let's try to break it down.

## Index Signatures

In TypeScript, in order to get an index off of an object, that object's type has to include an index signature on it. Index signatures are often used to define objects used as dictionaries, like the one we have here. An index signature type looks like this:

```ts
type Dictionary = { [index: string]: string }
```

Our object is inferred as the type `{ online: string; offline: string; busy: string; dnd: string; }` and does not have an index signature included.

The reason for this is behavior to prevent runtime errors that come from indexing an object by unknown keys. Imagine the API we're using added a new status 'idle'. `statusDisplays['idle']` would return `undefined` and error when we try to use it. Or worse, fail silently.

## A straight-forward-ish solution

To solve that problem in JS, it's enough to check first if the key is valid, and TypeScript usually accomodates for these kinds of checks.

```js
if (userStatus in statusDisplays) {
  statusDisplays[userStatus]
}
```

Unfortunately, this still produces the same error message, [for reasons discussed here and in other similar issues][in-operator-type-guard-issue].

Here's a way of getting around that using a helper function:

```ts
function hasKey<O>(obj: O, key: string): key is keyof O {
  return key in obj
}
```

```ts
if (hasKey(statusDisplays, userStatus)) {
  statusDisplays[userStatus] // works fine!
}
```

This uses a few of interesting features you might not be aware of. Namely [generics][generics], [`keyof`][keyof], and [user-defined type guards][type-guards].

We use a generic to infer the shape of the object being passed in, to use it in the return type. Here, the `O` parameter of `hasKey` is inferred as `{ online: string; offline: string; busy: string; dnd: string; }`.

`keyof` is a keyword in TypeScript which accepts a given object type and returns a [union type][union-type] of its keys. These are equivalent:

```ts
type StatusKey = keyof {
  online: string
  offline: string
  busy: string
  dnd: string
}
type StatusKey = "online" | "offline" | "busy" | "dnd"
```

Lastly, we use a type guard here to say that, if this function returns true, any further usage of `key` will be of the specified type. Otherwise, it's still just a string.

All of this works because TypeScript allows us to index any object as long as the index's type is a union of all the possible keys, so it knows that the key is valid. Maybe in the future, using `key in obj` will work on its own, but until then, the helper function works well enough.

[generics]: https://www.typescriptlang.org/docs/handbook/generics.html
[keyof]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types
[union-type]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#union-types
[type-guards]: https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards
[in-operator-type-guard-issue]: https://github.com/Microsoft/TypeScript/pull/12253#issuecomment-263132208

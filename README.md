# vue-match-pairs

A memory match-pairs game implementation with Vue. Inspired by
[this](http://www.kielack.com/games/memory.php) vanilla JS implementation.

Awesome roll over effects thanks to [codepo8](https://github.com/codepo8),
mostly based on [this](http://thewebrocks.com/demos/cuberollovers/).

## TODO

Publish the component on NPM
(see [this](https://vuejsdevelopers.com/2017/07/31/vue-component-publish-npm/)).

It would be cool the make `random-js` and optional dependency, i.e., if you
don't use it in your project, export a default function (see
[dynamic imports](http://2ality.com/2017/01/import-operator.html)). E.g.:

```js
// myrandom.js
import('random-js')
.then( Random => export default Random)
.catch( err => {
    export default {
        shuffle() {}
    }
})
```

And in the `MatchPairs.vue` component:

```js
import Random from './myrandom';
```

# vue-match-pairs

A memory match-pairs game implementation with Vue. Inspired by
[this](http://www.kielack.com/games/memory.php) vanilla JS implementation.

Awesome roll over effects thanks to [codepo8](https://github.com/codepo8),
mostly based on [this](http://thewebrocks.com/demos/cuberollovers/).

Boilerplate made by [Akryum](https://github.com/Akryum), get it
[here](https://github.com/Akryum/vue-share-components).

[![npm](https://img.shields.io/npm/v/vue-match-pairs.svg) ![npm](https://img.shields.io/npm/dm/vue-match-pairs.svg)](https://www.npmjs.com/package/vue-match-pairs)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A Vue.js Plugin

## Table of contents

- [Usage](#usage)
- [TODO](#todo)
- [Installation](#installation)
- [Example](#example)

# Usage

```html
<match-pairs :set="[ 'a', 'b', 'c', 'd' ]" timeout="1000"></match-pairs>
```

# Example

In your JS code:

```js
...
let app = new Vue({
    el: '#app',
    data () {
        return {
            myImages: [
                'http://www.bfi.org.uk/sites/bfi.org.uk/files/styles/gallery_3x4/public/image/blade-runner-1982-010-rutger-hauer-against-graffiti-wall.jpg?itok=bD_E2dvF',
                'http://silverscreenmodes.com/wp-content/uploads/2014/03/Blade_Runner-7-Darryl-Hannah-as-Pris.jpg',
                'https://4.bp.blogspot.com/-OH2Osb1RWss/UCooWbbVH5I/AAAAAAAAAis/R9hrpIY7avY/s1600/sean_young_blade_runner.jpg',
                'http://silverscreenmodes.com/wp-content/uploads/2014/03/Blade-Runner-9-Harrison-Ford_.jpg',
            ],
        };
    },
    methods: {
        confetti () {
            console.info('YAY!');
        },
        congrats (stats) {
            let msg = 'Congratularions! It took you ' +
                    stats.duration + ' seconds and ' + stats.moves + ' moves';
            alert(msg);
        }
    }
});
```

And in your view:

```html
<main id=app>
    <match-pairs
        :set="myImages"
        :are-images="true"
        @match="confetti"
        @complete="congrats"
    ></match-pairs>
</main>
```

# TODO

* Make the `start` button action optional

# Installation

```
npm install --save vue-match-pairs
```

## Default import

Install all the components:

```javascript
import Vue from 'vue'
import VueMatchPairs from 'vue-match-pairs'

Vue.use(VueMatchPairs)
```

Use specific components:

```javascript
import Vue from 'vue'
import { MatchPairs } from 'vue-match-pairs'

Vue.component('match-pairs', MatchPairs)
```

**⚠️ A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.**

## Distribution import

Install all the components:

```javascript
import 'vue-match-pairs/dist/vue-match-pairs.css'
import VueMatchPairs from 'vue-match-pairs/dist/vue-match-pairs.common'

Vue.use(VueMatchPairs)
```

Use specific components:

```javascript
import 'vue-match-pairs/dist/vue-match-pairs.css'
import { MatchPairs } from 'vue-match-pairs/dist/vue-match-pairs.common'

Vue.component('match-pairs', MatchPairs)
```

**⚠️ You may have to setup your bundler to embed the css file in your page.**

## Browser

```html
<link rel="stylesheet" href="vue-match-pairs/dist/vue-match-pairs.css"/>

<script src="vue.js"></script>
<script src="vue-match-pairs/dist/vue-match-pairs.browser.js"></script>
```

The plugin should be auto-installed. If not, you can install it manually with the instructions below.

Install all the components:

```javascript
Vue.use(VueMatchPairs)
```

## Source import

Install all the components:

```javascript
import Vue from 'vue'
import VueMatchPairs from 'vue-match-pairs/src'

Vue.use(VueMatchPairs)
```

Use specific components:

```javascript
import Vue from 'vue'
import { MatchPairs } from 'vue-match-pairs/src/MatchPairs.vue'

Vue.component('match-pairs', MatchPairs)
```

**⚠️ You need to configure your bundler to compile `.vue` files.** More info [in the official documentation](https://vuejs.org/v2/guide/single-file-components.html).

---

# Plugin Development

## Installation

The first time you create or clone your plugin, you need to install the default dependencies:

```
npm install
```

## Watch and compile

This will run webpack in watching mode and output the compiled files in the `dist` folder.

```
npm run dev
```

## Use it in another project

While developping, you can follow the install instructions of your plugin and link it into the project that uses it.

In the plugin folder:

```
npm link
```

In the other project folder:

```
npm link vue-match-pairs
```

This will install it in the dependencies as a symlink, so that it gets any modifications made to the plugin.

## Publish to npm

You may have to login to npm before, with `npm adduser`. The plugin will be built in production mode before getting published on npm.

```
npm publish
```

## Manual build

This will build the plugin into the `dist` folder in production mode.

```
npm run build
```

---

## License

[MIT](http://opensource.org/licenses/MIT)

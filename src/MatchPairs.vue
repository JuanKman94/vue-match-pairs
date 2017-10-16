<style src="./css/match-pairs.scss" lang="scss">
</style>

<template>
<div class="match-pairs">
    <div
        v-for="(v, k) in pairs"
        class="match-pairs-card"
        @click="flip(v, k)"
    >
        <div :class="{ 'cube': true, 'active': state[k] }">
            <div class="front">X</div>
            <div class="back">
                <img :src="v">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Random from 'random-js';

export default {
    name: 'match-pairs',

    props: {
        set: { type: Array, required: true },
        showTime: { type: Boolean, default: false },
        areImages: { type: Boolean, default: false }
    },

    data() {
        // create default engine for Random
        let engine = Random.engines.mt19937().autoSeed();
        let pairs = Random.shuffle(engine, Array.concat(this.set, this.set));

        // reactiveness isn't good with arrays
        let state = {};
        pairs.forEach(function(elem, i, arr) {
            state[i] = false;
        });

        return {
            pairs,
            state
        };
    },

    methods: {
        flip(item, key) {
            this.state[key] = !this.state[key];
            console.debug('flip: item =>', item, '; key =>', key);
        },
    },
}
</script>

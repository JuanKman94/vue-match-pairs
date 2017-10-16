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

    <button @click="reset">Reset</button>
</div>
</template>

<script>
import Random from 'random-js';

export default {
    name: 'match-pairs',

    props: {
        set: { type: Array, required: true },
        timeout: { type: Number, default: 1500 },
        showTime: { type: Boolean, default: false },
        areImages: { type: Boolean, default: false }
    },

    data() {
        // create default engine for Random
        let engine = Random.engines.mt19937().autoSeed();
        let pairs = Random.shuffle(engine, Array.concat(this.set, this.set)),
            selected = new Array(0);

        // reactiveness isn't good with arrays
        let state = {};
        pairs.forEach(function(elem, i, arr) {
            state[i] = false;
        });

        return {
            selected,
            pairs,
            state
        };
    },

    methods: {
        flip(card, key) {
            this.state[key] = true;
            this.selected.push({ key, value: card });

            if (this.selected.length < 2) return true;

            if (!this.isMatch()) {
                window.setTimeout(() => {
                    // hide the selected cards
                    this.state[ this.selected[0].key ] = false;
                    this.state[ this.selected[1].key ] = false;

                    // reset the selected cards
                    this.selected.pop();
                    this.selected.pop();
                }, this.timeout);

                this.$emit('match', false);
                return false;
            }

            // reset the selected cards
            this.selected.pop();
            this.selected.pop();
            this.$emit('match', true);
            return true;
        },

        isMatch() {
            if (this.selected.length != 2) return false;

            return this.selected[0].value == this.selected[1].value;
        },

        reset() {
            for (let key in this.state) this.state[key] = false;
            this.selected.pop();
            this.selected.pop();
        },
    },
}
</script>

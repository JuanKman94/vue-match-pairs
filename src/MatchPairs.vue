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
                <img v-if="areImages" :src="v">
                <p v-else>{{ v }}</p>
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
            flippin: false,
            selected,
            pairs,
            state
        };
    },

    methods: {

        /**
         * Flip the specified card and check if there's a match.
         *
         * If there's only one selected card return true.
         * If there's no match, reset the selected cards state and emit the
         * `match` event with a false value and return false.
         * If there's a match, emit the `match` event with a true value and the
         * `complete` with a Boolean value return true.
         *
         * @param card String
         * @param key var
         * @return Boolean
         */
        flip(card, key) {
            if (this.flippin) return false;

            this.flippin = true;
            this.state[key] = true;
            this.selected.push({ key, value: card });

            if (this.selected.length < 2) {
                this.flippin = false;
                return true;
            }

            if (!this.isMatch()) {
                window.setTimeout(() => {
                    // hide the selected cards
                    this.state[ this.selected[0].key ] = false;
                    this.state[ this.selected[1].key ] = false;

                    // reset the selected cards
                    this.selected.pop();
                    this.selected.pop();

                    this.flippin = false;
                }, this.timeout);

                this.$emit('match', false);
                return false;
            }

            // reset the selected cards
            this.selected.pop();
            this.selected.pop();

            this.$emit('match', true);
            if (this.isComplete()) this.$emit('complete', true);

            this.flippin = false;
            return true;
        },

        /**
         * Check if the selected cards match
         *
         * @return Boolean
         */
        isMatch() {
            if (this.selected.length != 2) return false;

            return this.selected[0].value == this.selected[1].value;
        },

        /**
         * Return whether the game set is complete
         *
         * @return Boolean
         */
        isComplete() {
            for (let k in this.state)
                if (!this.state[k])
                    return false;

            return true;
        },

        /**
         * Reset the game's board and state
         *
         * @return void
         */
        reset() {
            for (let key in this.state) this.state[key] = false;
            this.selected.pop();
            this.selected.pop();
        },
    },
}
</script>

<style lang="scss">
.match-pairs {
    .match-pairs-board {
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        flex-flow: row wrap;

        position: relative;
        perspective: 800px;
    }

    .match-pairs-blocker {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background-color: rgba(191, 191, 191, 0.7);
    }

    .match-pairs-card {
		text-align: center;
        cursor: pointer;
		margin: 1rem;

		img {
			max-width: 100%;
			max-height: 100%;
		}

		&.active {
			.front {z-index: 1; }
			.back { z-index: 2; }
		}
    }

    .cube {
        display: block;
        position: relative;
        height: 200px;
        width: 200px;

        transform-style: preserve-3d;
        transition: 500ms linear;
        transform: rotateY(0deg); 

        &.active {
            transform: rotateY(180deg);
        }
    }

    .front, .back {
        position: absolute;
        width: 100%;
        top: 50%;

        backface-visibility: hidden;
    }

    .front {
        z-index: 2;
        transform: translate(0, -50%);
    }
    .back {
        z-index: 1;
        transform: translate(0, -50%) rotateY(180deg);
    }
}
</style>

<template>
<div class="match-pairs">
    <div v-if="!startTime">
        <button
            class="match-pairs-start"
            type="button"
            @click="startTime = new Date()"
        >
            Start
        </button>
    </div>

    <div class="match-pairs-board">
        <div
            v-if="!startTime"
            class="match-pairs-blocker"
        ></div>

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
    </div>

    <button
        class="match-pairs-reset"
        type="button"
        @click="reset"
    >Reset</button>
</div>
</template>

<script>
/**
 * Fisher-Yates shuffle algorithm. See https://bost.ocks.org/mike/shuffle/
 *
 * Shuffle the Array `array` argument *in-place*
 *
 * @param Array array
 * @return Array array
 */
function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle
    while (m) {

        // Pick a remaining element
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

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
        let pairs = shuffle(Array.concat( this.set, this.set )),
            selected = new Array(0);

        // reactiveness isn't good with arrays
        let state = {};
        pairs.forEach(function(elem, i, arr) {
            state[i] = false;
        });

        return {
            flippin: false,
            moves: 0,
            startTime: null,
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
            if (this.isComplete())
                this.$emit('complete', {
                    moves: this.moves,
                    duration: Math.abs(new Date() - this.startTime)
                });

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

            this.moves++;
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
            this.startTime = null;
            this.moves = 0;
        },
    },
}
</script>

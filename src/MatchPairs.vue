<style lang="scss">
.front { z-index: 2; }
.back { z-index: 1; }
.match-pairs-card.active .front, .match-pairs-card.active .front { z-index: 1; }
.match-pairs-card.active .back, .match-pairs-card.active .back { z-index: 2; }

.cube {
    display: block;
    position: relative;
    margin: 50px auto;
    height: 100%;
    width: 100%;
    transform-style: preserve-3d;
    transition: 1.5s linear;
    transform: rotateY(0deg); 

    &.active {
        transform: rotateY(180deg);
    }
}

.flat .front {
	background: #fff;
	position: absolute;
	height: 100%;
	width: 100%;
	transform: translateZ(0) scale(1.2, 1.2);
	backface-visibility: hidden;
}
.flat .back {
	background: #666;
	position: absolute;
	height: 100%;
	width: 100%;
	transform: translateZ(0) rotateY(180deg) scale(1.2, 1.2);
	backface-visibility: hidden;
}

.match-pairs {
	position: relative;

    .match-pairs-card {
        cursor: pointer;
        display: block;
        background-color: red;
        height: 200px;
        width: 200px;

        .back {
            color: white;
            background-color: red;
        }
    }
}
</style>

<template>
<div class="match-pairs">
    <div
        v-for="(v, k) in pairs"
        :class="cssClasses(k)"
        @click="flip(v, k)"
    >
        <div class="flat">
            <div :class="{ 'cube': true, 'active': state[k] }">
                <div class="front"></div>
                <div class="back">
                    <slot name="item">
                        <strong>{{ k }}</strong>: {{ v }}
                    </slot>
                </div>
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
        showTime: { type: Boolean, default: false }
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

        cssClasses(key) {
            return {
                'match-pairs-card': true,
                'active': this.state[key]
            };
        }
    },
}
</script>

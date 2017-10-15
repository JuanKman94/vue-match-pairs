import Vue from 'vue'
import MatchPairs from './MatchPairs.vue'

new Vue({
  el: '#app',
  render: h => h(MatchPairs, {
      props: {
          set: [ 'a', 'b', 'c' ]
      }
  })
})

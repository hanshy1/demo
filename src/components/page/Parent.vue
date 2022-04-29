<template>
  <div>
    <Child v-if="false" />
    <Zoomable v-if="true" is-draggable="true" />
    <Progress />
  </div>
</template>

<script lang="ts">
import Child from './Child.vue'
import Zoomable from '../demo/Zoomable.vue'
import Progress from '../demo/Progress.vue'

export default {
  components: {
    Child,
    Zoomable,
    Progress
  },
  // props: {
  //   watchValue: Boolean
  // },
  created(): void {
    this.changeIsTrue(3000)
    this.watchValue = true
    // this.watchValue = false
    const that = this
    setTimeout(function() {
      that.watchValue = false
    }, 4000)
  },
  data: function() {
    return {
      isTrue: false,
      watchValue: false,
    }
  },
  watch: {
    watchValue: {
      handler(newValue) {
        if (this.isTrue) {
          console.log('true')
          return
        }
        console.log('false')
      },
      immediate: true
    }
  },
  methods: {
    async changeIsTrue(ms: number) {
      console.log('start')
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.isTrue) 
        }, ms)
      })
      this.isTrue = true
      console.log('end')
    }
  }
}
</script>

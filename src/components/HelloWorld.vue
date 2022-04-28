<template>
  <div class="hello">
    <button type="button" @click="isShowParentComp = !isShowParentComp">parent</button>
    <Parent v-if="isShowParentComp" :watch-value="watchValue"/>
  </div>
</template>

<script lang="ts">
import Parent from './page/Parent.vue'
export default {
  components: {
    Parent
  },
  props: {
    msg: String
  },
  data() {
    return {
      isShowParentComp: false,
      watchValue: false
    }
  },
  watch: {
    isShowParentComp: {
      handler(newValue) {
        setTimeout(function() {
          this.watchValue = !this.watchValue
        }, 1000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

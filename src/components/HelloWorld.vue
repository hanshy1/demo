<template>
  <div class="hello">
    <button type="button" @click="isShowParentComp = !isShowParentComp">parent</button>
    <Parent v-if="false" :watch-value="watchValue"/>
    <Project v-if="isShowParentComp" />
  </div>
</template>

<script lang="ts">
import Parent from './page/Parent.vue'
import Project from './page/Project.vue'

export default {
  components: {
    Parent,
    Project
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

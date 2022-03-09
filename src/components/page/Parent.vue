<template>
  <div>
    <Child v-if="false" />
    <Zoomable
      is-draggable="true" />
  </div>
</template>

<script lang="ts">
import Child from './Child.vue'
import Zoomable from '../demo/Zoomable.vue'

export default {
  components: {
    Child,
    Zoomable
  }
}
</script>

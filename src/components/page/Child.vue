<template>
  <div>
    <p>Hello World</p>
  </div>
</template>

<script lang="ts">
export default {
    created(): void {
      document.body.append(this.$el)
    },
    destroyed(): void {
      this.$el.remove()
    }
}
</script>

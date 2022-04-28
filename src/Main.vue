<template>
  <!-- v-app应该只渲染一次，必须是是所有vuetify组件的祖先节点，所有vuetify组件都依赖v-app -->
  <v-app>
    <div id="main">
      <Navigator />
      <v-main>
        <!-- v-main可作为每个组件的根节点 -->
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import Navigator from './components/layouts/Navigator.vue'

export default {
  name: 'Main',
  components: {
    HelloWorld,
    Navigator
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

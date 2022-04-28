<template>
  <v-navigation-drawer
    v-model="isShowNavigation"
    :mini-variant.sync="mini"
    permanent
    absolute
    width="180">
    <v-list-item>
      <v-list-content>
        <v-list-item-title>
          Application
        </v-list-item-title>
        <v-list-item-subtitle>
          subtext
        </v-list-item-subtitle>
      </v-list-content>
      <v-btn
        icon
        @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider />
    <v-list
      dense
      nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Navigator extends Vue {
  private isShowNavigation = true
  private mini = true
  private items = [
    { title: 'Home', icon: 'mdi-home-city' },
    { title: 'My Account', icon: 'mdi-account' },
    { title: 'Users', icon: 'mdi-account-group-outline' },
  ]
}
</script>
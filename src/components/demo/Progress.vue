<template>
  <div>
    <div 
      v-for="item in items" 
      :key="item.id">
      <v-card
        class="progress-container"
        elevation="3"
        outlined
        :disabled="item.disabled"
        :loading="item.loading">
        <label>{{ item.name }}</label>
        <v-progress-linear
          class="progress-item"
          :color="item.color"
          :value="getProgressValue(item.tasks)"
          height="30"
          striped
          light>
          <template>
            <strong class="percentage">{{ getProgressValue(item.tasks) }}%</strong>
          </template>
        </v-progress-linear>
        <v-divider class="divider" />
        <div class="task-group">
          <div
            v-for="task, index in item.tasks"
            :key="index">
            <v-btn
              class="mx-2"
              depressed
              dark
              rounded
              :color="task.isFinished ? item.color : 'grey lighten-2'"
              @click="toogleFinishedStatus(item, task.name)">
              {{ task.name }}
              <v-icon
                right
                dark>
                mdi-checkbox-marked-circle
              </v-icon>
            </v-btn>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Progress extends Vue {

  // @Prop()
  // items: any

  private items = [
    { id: 1, name: '1', disabled: false, loading: false, tasks: [{name: '1', isFinished: false}, {name: '2', isFinished: false}, {name: '3', isFinished: false}, {name: '4', isFinished: false}]},
    { id: 2, name: '2', disabled: false, loading: false, tasks: [{name: '1', isFinished: false}, {name: '2', isFinished: false}, {name: '3', isFinished: false}, {name: '4', isFinished: false}]},
    { id: 3, name: '3', disabled: false, loading: false, tasks: [{name: '1', isFinished: false}, {name: '2', isFinished: false}, {name: '3', isFinished: false}, {name: '4', isFinished: false}]},
    { id: 4, name: '4', disabled: false, loading: false, tasks: [{name: '1', isFinished: false}, {name: '2', isFinished: false}, {name: '3', isFinished: false}, {name: '4', isFinished: false}]},
    { id: 5, name: '5', disabled: false, loading: false, tasks: [{name: '1', isFinished: false}, {name: '2', isFinished: false}, {name: '3', isFinished: false}, {name: '4', isFinished: false}]},
  ]

  setColor(items: any[]): void {
    const colors = ['pink', 'yellow', 'blue', 'green', 'cyan']
    items.forEach((item, index) => {
      item.color = colors[index % colors.length]
    })
  }

  created(): void {
    this.setColor(this.items)
  }

  getProgressValue(tasks: any[]): number {
    return Math.ceil(tasks.filter(task => task.isFinished).length / tasks.length * 100)
  }

  toogleFinishedStatus(item: any, taskName: string): void {
    const targetItem = this.items.find(i => i.id === item.id) 
    if (targetItem) {
      const targetTask = targetItem.tasks.find(task => task.name === taskName)
      targetTask.isFinished = !targetTask.isFinished
      targetItem.disabled = false
      targetItem.loading = true
      setTimeout(function() {
        targetItem.loading = false
      }, 2000)
    }
  }
}
</script>
<style scoped>
.progress-container {
  width: 400px;
  min-height: 200px;
  margin-top: 10px;
}

.progress-item {
  margin-left: 10px;
  width: 380px;
  border-radius: 20px !important;
}

.divider {
  margin: 10px 5px;
}

.task-group {
  display: flex;
}
</style>
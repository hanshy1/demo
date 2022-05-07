<template>
  <div>
    <v-card
      class="progress-container"
      :style="{width: `${width}px`}"
      elevation="3"
      outlined
      :disabled="item.disabled"
      :loading="item.loading">
      <label>{{ item.projectName }}</label>
      <v-progress-linear
        class="progress-item"
        :color="item.color"
        :value="getProgressValue(item.assignments)"
        :style="{width: `${width - 20}px`}"
        height="30"
        striped
        light>
        <template>
          <strong class="percentage">{{ getProgressValue(item.assignments) }}%</strong>
        </template>
      </v-progress-linear>
      <v-divider class="divider" />
      <div class="assignment-group">
        <div
          v-for="assignment, index in item.assignments"
          :key="index">
          <v-btn
            class="mx-2"
            depressed
            dark
            rounded
            :title="assignment.assignmentName"
            :color="assignment.isFinished ? item.color : 'grey lighten-2'"
            @click="editMode.isEditing
              ? deleteAssignment(assignment.assignmentId)
              : toogleFinishedStatus(assignment.assignmentId, assignment.isFinished)">
            <span 
              class="task-content"
              :title="assignment.assignmentName">
              {{ assignment.assignmentName }}
            </span>
            <v-icon
              right
              dark>
              {{ editMode.isEditing ? 'mdi-close-circle-outline' : 'mdi-checkbox-marked-circle' }}
            </v-icon>
          </v-btn>
        </div>
        <v-btn
          v-if="editMode.isEditing"
          icon
          color="black"
          @click="addAssigment">
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </div>
      <v-switch
        v-model="editMode.isEditing"
        color="success"
        :disabled="editMode.isDisabled"
        :loading="editMode.isLoading"
        @change="changeEditStatus" />
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface dataType {
  projectId: number,
  projectName: string,
  disabled: boolean,
  loading: boolean,
  assignments: {
    assignmentId: number,
    assignmentName: string,
    isFinished: boolean
  }[],
  color?: string
}

@Component({})
export default class Progress extends Vue {

  @Prop()
  item: dataType

  @Prop()
  width: number

  // private item = { projectId: 1, projectName: '1', disabled: false, loading: false, assignments: [{assignmentId: 1, assignmentName: '1', isFinished: false}, {assignmentId: 2, assignmentName: '2', isFinished: false}, {assignmentId: 3, assignmentName: '3', isFinished: false}, {assignmentId: 4, assignmentName: '4', isFinished: false}]}

  private editMode = {
    isEditing: false,
    isDisabled: false,
    isLoading: false
  }
 
  setColor(item: dataType): void {
    // const colors = ['pink', 'yellow', 'blue', 'green', 'cyan']
    // item.color = colors[0 % colors.length]
    item.color = 'pink'
  }

  created(): void {
    this.setColor(this.item)
  }

  getProgressValue(assignments: any[]): number {
    return Math.ceil(assignments.filter(assignment => assignment.isFinished).length / assignments.length * 100)
  }

  toogleFinishedStatus(assignmentId: number, isFinished: boolean): void {

    // const targetassignment = this.items.assignments.find(assignment => assignment.assignmentName === assignmentName)
    // targetassignment.isFinished = !targetassignment.isFinished
    this.$emit('toogle-finished-status', { projectId: this.item.projectId, assignmentId, isFinished: !isFinished })
    // targetItem.disabled = false
    // targetItem.loading = true
    // setTimeout(function() {
    //   targetItem.loading = false
    // }, 2000)
    
  }

  deleteAssignment(assignmentId: number): void {
    this.$emit('delete-assignment', { projectId: this.item.projectId, assignmentId })
  }

  changeEditStatus(isEditing: boolean): void {
    console.log(isEditing)
  }

  addAssigment(): void {
    this.$emit('add-assignment', this.item.projectId)
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
  margin: 5px 10px;
  border-radius: 20px !important;
}

.divider {
  margin: 10px 5px;
}

.assignment-group {
  display: flex;
  flex-wrap: wrap;
}

.task-content {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
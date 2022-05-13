<template>
  <div>
    <v-expansion-panels multiple>
      <v-expansion-panel
        v-for="project in projects"
        :key="project.projectId">
        <v-expansion-panel-header>Project: {{ project.projectName }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card
            class="progress-container"
            :style="{width: `${width}px`}"
            elevation="0"
            :disabled="project.disabled"
            :loading="project.loading">
            <v-progress-linear
              class="progress-item"
              :color="project.color"
              :value="getProgressValue(project.assignments)"
              :style="{width: `${width - 20}px`}"
              height="30"
              striped
              light>
              <template>
                <strong class="percentage">{{ getProgressValue(project.assignments) }}%</strong>
              </template>
            </v-progress-linear>
            <v-divider class="divider" />
            <div class="assignment-group">
              <div
                v-for="assignment, index in project.assignments"
                :key="index">
                <v-btn
                  class="mx-2"
                  depressed
                  dark
                  rounded
                  :title="assignment.assignmentName"
                  :color="assignment.isFinished ? project.color : 'grey lighten-2'"
                  @click="editMode.isEditing
                    ? deleteAssignment(assignment.assignmentId)
                    : toogleFinishedStatus(project.projectId, assignment.assignmentId, assignment.isFinished)">
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
                color="black lighten-2"
                @click="isShowAddTaskDialog = true">
                <v-icon>mdi-plus-circle-outline</v-icon>
              </v-btn>
            </div>
            <v-switch
              v-model="editMode.isEditing"
              class="edit-mode-switch"
              color="success"
              :disabled="editMode.isDisabled"
              :loading="editMode.isLoading"
              prepend-icon="mdi-square-edit-outline"
              hide-details
              @change="changeEditStatus" />
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="projects.length == 0">
        <div v-if="projects.length == 0">
          <span>no projects</span>
        </div>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog
      v-model="isShowAddTaskDialog"
      persistent
      max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4">
                <v-text-field
                  label="Legal first name*"
                  required />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="isShowAddTaskDialog = false">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="addAssigment">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface projectType {
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
  projects: projectType[]

  @Prop()
  width: number

  // private item = { projectId: 1, projectName: '1', disabled: false, loading: false, assignments: [{assignmentId: 1, assignmentName: '1', isFinished: false}, {assignmentId: 2, assignmentName: '2', isFinished: false}, {assignmentId: 3, assignmentName: '3', isFinished: false}, {assignmentId: 4, assignmentName: '4', isFinished: false}]}

  private editMode = {
    isEditing: false,
    isDisabled: false,
    isLoading: false
  }

  private isShowAddTaskDialog = false
 
  setColor(): void {
    const colors = ['pink', 'yellow', 'blue', 'green', 'cyan']
    this.projects.forEach((project, index) => {
      project.color = colors[index % colors.length]
    })
  }

  created(): void {
    this.setColor()
  }

  getProgressValue(assignments: any[]): number {
    return Math.ceil((assignments || []).filter(assignment => assignment.isFinished).length / assignments.length * 100)
  }

  toogleFinishedStatus(projectId: number, assignmentId: number, isFinished: boolean): void {
    this.$emit('toogle-finished-status', { projectId, assignmentId, isFinished: !isFinished })
  }

  deleteAssignment(assignmentId: number): void {
    this.$emit('delete-assignment', assignmentId)
  }

  changeEditStatus(isEditing: boolean): void {
    console.log(isEditing)
  }

  addAssigment(projectId: number): void {
    this.$emit('add-assignment', projectId)
  }
}
</script>
<style scoped>
.progress-container {
  min-width: 400px;
  min-height: 200px;
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
  text-transform: none;
}

.edit-mode-switch {
  position: absolute;
  right: 0;
  bottom: 10px;
}
</style>
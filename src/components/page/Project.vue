<template>
  <div>
    <div class="top-menu">
    </div>
    <div class="project-container">
      <Progress
        v-for="project in projects"
        :key="project.projectId"
        :item="project"
        width="500"
        @toogle-finished-status="toogleTaskIsFinished"
        @delete-assignment="deleteTask"
        @add-assignment="addTask" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Progress from '../demo/Progress.vue'

@Component({
  components: {
    Progress,
  },
})
export default class Project extends Vue {
  
  private groups = []
  private projects = []

  created(): void {
    // get groups
    // get projects
    // get assignments
    this.projects = [
      { projectId: 1, projectName: '1', disabled: false, loading: false, assignments: [{assignmentId: 1, assignmentName: '11111111111111111111', isFinished: false}, {assignmentId: 2, assignmentName: '222222222', isFinished: false}, {assignmentId: 3, assignmentName: '333', isFinished: false}, {assignmentId: 4, assignmentName: '4', isFinished: false}]},
      { projectId: 2, projectName: '1', disabled: false, loading: false, assignments: [{assignmentId: 1, assignmentName: '1', isFinished: false}, {assignmentId: 2, assignmentName: '2', isFinished: false}, {assignmentId: 3, assignmentName: '3', isFinished: false}, {assignmentId: 4, assignmentName: '4', isFinished: false}]}
    ]
  }

  toogleTaskIsFinished(e) {
    const project = this.projects.find(p => p.projectId == e.projectId)
    if (project) {
      const task = project.assignments.find(task => task.assignmentId == e.assignmentId)
      if (task) {
        task.isFinished = e.isFinished
      }
    }
    // ajax
  }

  deleteTask() {
    // ajax
  }

  addTask() {
    // ajax
  }
}
</script>
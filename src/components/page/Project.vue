<template>
  <div>
    <div class="top-menu">
      <v-select
        :items="groups"
        menu-props="auto"
        label="Groups"
        max-width="600"
        hide-details
        outlined
        @change="e => getProjects(e)" />
    </div>
    <div class="project-container">
      <v-expansion-panels multiple>
        <v-expansion-panel
          v-for="project in projects"
          :key="project.projectId">
          <v-expansion-panel-header>Project: {{ project.projectName }}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <Progress
              :item="project"
              width="600"
              @toogle-finished-status="toogleTaskIsFinished"
              @delete-assignment="deleteTask"
              @add-assignment="addTask" />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel v-if="projects.length == 0">
          <div v-if="projects.length == 0">
            <span>no projects</span>
          </div>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- <Progress
        v-for="project in projects"
        :key="project.projectId"
        :item="project"
        width="600"
        @toogle-finished-status="toogleTaskIsFinished"
        @delete-assignment="deleteTask"
        @add-assignment="addTask" /> -->

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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$api.getGroups({ userId: 'test' }).then(groups => {
      this.groups = groups.map(item => {
        return {
          text: item.groupName,
          value: item.groupId
        }
      })
    })
  }

  toogleTaskIsFinished(e): void {
    const project = this.projects.find(p => p.projectId == e.projectId)
    if (project) {
      const task = project.assignments.find(task => task.assignmentId == e.assignmentId)
      if (task) {
        task.isFinished = e.isFinished
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$api.udpateTaskIsFinished({}, { assignmentId: e.assignmentId, projectId: e.projectId, isFinished: e.isFinished })
  }

  deleteTask(assignmentId): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$api.deleteTask({}, { assignmentId })
  }

  addTask(payload): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$api.createTask({}, { projectId: payload.projectId, assignmentName: payload.assignmentName })
  }

  getProjects(groupId): void {
    this.projects = []
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$api.getProjects({ groupId }).then(projects => {
      this.projects = projects
    })
  }
}
</script>
<style scoped>
.top-menu {
  width: 648px;
}

.project-container {
  width: 648px;
  margin-top: 20px;
}
</style>
import { Method } from 'axios'

const axiosGet: Method = 'get'
const axiosPut: Method = 'put'
const axiosPost: Method = 'post'
const axiosDelete: Method = 'delete'

export default [
  {
    name: 'login',
    path: '/login',
    params: [],
    method: axiosPost
  },
  {
    name: 'getGroups',
    path: '/groups?userId={userId}',
    params: ['userId'],
    method: axiosGet
  },
  {
    name: 'createGroup',
    path: '/group',
    params: [],
    method: axiosPost
  },
  {
    name: 'udpateGroupName',
    path: '/group',
    params: [],
    method: axiosPut
  },
  {
    name: 'getProjects',
    path: '/projects?groupId={groupId}',
    params: ['groupId'],
    method: axiosGet
  },
  {
    name: 'createProject',
    path: '/project',
    params: [],
    method: axiosPost
  },
  {
    name: 'udpateProjectName',
    path: '/project',
    params: [],
    method: axiosPut
  },
  {
    name: 'deleteProject',
    path: '/project',
    params: [],
    method: axiosDelete
  },
  {
    name: 'getTasks',
    path: '/assignments?projectId={projectId}',
    params: ['projectId'],
    method: axiosGet
  },
  {
    name: 'createTask',
    path: '/assignment',
    params: [],
    method: axiosPost
  },
  {
    name: 'udpateTaskName',
    path: '/assignment/name',
    params: [],
    method: axiosPut
  },
  {
    name: 'udpateTaskIsFinished',
    path: '/assignment/isfinished',
    params: [],
    method: axiosPut
  },
  {
    name: 'deleteTask',
    path: '/assignment',
    params: [],
    method: axiosDelete
  },
]
import { createStore } from 'vuex'
import persistedState from 'vuex-persistedstate'

interface timeFlat {
  toiletTime: number | null;
  workTime: number | null;
  asleepTime: number | null;
  happyTime: number | null;
}
export default createStore({
  state: {
    taskList: {},
    timeData: {
      toiletTime: 0,
      workTime: 0,
      asleepTime: 0,
      happyTime: 0
    }
  },
  mutations: {
    SET_TASKLIST (state: any, value: any) {
      state.taskList = value
    },
    SET_TIMEDATA (state: any, value: any) {
      state.timeData = value
    }
  },
  actions: {
    useTaskList ({ commit, state }, { key, val }) {
      const data = state.taskList
      data[key] = val
      commit('SET_TASKLIST', data)
    },
    setTimeData ({ commit, state }, { key, val }) {
      const data = state.timeData
      data[key] = val
      commit('SET_TASKLIST', data)
    }
  },
  modules: {},
  plugins: [
    persistedState({
      storage: window.localStorage,
      reducer (val) {
        return {
          taskList: val.taskList,
          timeData: val.timeData
        }
      }
    })
  ]
})

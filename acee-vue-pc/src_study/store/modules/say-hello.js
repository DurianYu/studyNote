export default {
  namespaced: true,
  state: {
    msg: 'I saied nihao'
  },
  getters: {
    r_msg(state, getters) {
      return [...state.msg].reverse();
    }
  },
  mutations: {
    chgMsg(state, newMsg) {
      state.msg = newMsg;
    }
  },
  actions: {

  }
}

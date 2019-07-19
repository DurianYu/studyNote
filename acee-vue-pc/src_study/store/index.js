import Vue from 'vue'
import Vuex from 'vuex';
import sayHello from '@/store/modules/say-hello.js';


Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    sayHello
  },
  state: {
    name: 'mingXiao',
    play_info: {
      playing: false, // 暂停还是播放的状态, 默认暂停
      sinner: '', // 歌手
      lyric: '', // 歌词
      list: '', // 歌曲列表
      url: '', // 歌曲地址
      id: '' // 歌舞的id
    }
  },
  // 类似计算属性
  getters: {
    r_name(state, getters) {
      return [...state.name].reverse().join('');
    },
    r_name_length(state, getters) {
      return getters.r_name.length;
    }
  },
  // 类似事件 , 必须是 同步函数
  mutations: {
    // 这里是括号不是对象 所以首参数 只有satate
    changeName: (state, newName) => state.name = state.name.concat(newName.first_name),
    outputName(state, newName) {
      console.log(newName);
    },
    setPlaying(state, val) {
      state.play_info.playing = val;
    }
  },
  // 可以包含异步操作， 用于提交mutation， 不进行直接变更状态
  actions: {
    dispatchName({
      commit,
      state,
      getters,
      dispatch
    }, newName) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('changeName', {
            first_name: newName + state.name
          });
          resolve('DOWN');
        }, 2000);
      })
    },
    async nameToAry({
      dispatch,
      commit,
      actons
    }, sym) {
      // 等待异步完成才开始调用outputName
      commit('outputName', await dispatch('dispatchName'));
    }
  }
});

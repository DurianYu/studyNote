<template>
<!-- 入口模板 -->
<div id="app">
  <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
    <router-view />
  </transition>
  <player />
</div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
export default {
  name: 'App',
  components: {
    Rmain: () =>
      import('@/components/main'),
    Rsidebar: () =>
      import('@/components/sidebar'),
    PrfsSearch: () =>
      import('@/components/profession-search'),
    YcCalculator: () =>
      import('@/components/calculator/index'),
    player: () =>
      import(/* webpackChunkName: 'player' */ '@/components/player')

  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      play_info: 'play_info',
      playing: state => state.play_info.playing
    }),
  },
  watch: {
    playing: function() {
      console.log('this.play_info', this.play_info);
      console.log('this.playing', this.playing);
    }
  },
  methods: {
    ...mapMutations([
      'setPlaying'
    ]),
    // 播放
    play() {
    },
    // 暂停
    pause() {
    }

  },
  created() {
  },
  mounted() {

  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
}

#app {
  height: 100%;
}
</style>

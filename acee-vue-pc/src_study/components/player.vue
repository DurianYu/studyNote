<template>
<div class="player-box">
  <audio :src="audio_src" ref="player">
  </audio>
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
  name: 'player',
  components: {
    YcCalculator: () =>
      import('@/components/calculator/index')

  },
  data() {
    return {
      audio_src: '', // 歌曲地址
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
      // 播放
      if (this.playing) this.pause();
      // 暂停
      if (!this.playing) this.play();

    }
  },
  methods: {
    ...mapMutations([
      'setPlaying'
    ]),
    // 播放
    play() {
      let player = this.$refs.player;
      this.audio_src = this.play_info.url;
      player.play();
    },
    // 暂停
    pause() {
      let player = this.$refs.player;
      player.pause();
    },
    // 上一曲
    prev() {

    },
    // 下一曲
    next() {

    }
  },
  created() {
    console.log('App created');
    console.log('this', this);
    console.log('this.$store', this.$store);
    console.log('play_info', this.play_info);
    // 第一次渲染进来 是不会触发的
    // 没有触发
    this.setPlaying(true);
    this.setPlaying(false);
    this.setPlaying(true);



  },
  mounted() {
    // 没有触发
    this.setPlaying(false);
    // 再次设置就会触发


  }
}
</script>

<style>
</style>

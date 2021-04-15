import { SOCKETHOST } from '@/config/index'
import { Notice } from 'view-design'
const heartCheck = {
  timeout: 25 * 1000,
  timer: null,
  serverTimer: null,
  reset() {
    this.timer && clearTimeout(this.timer)
    this.serverTimer && clearTimeout(this.serverTimer)
  },
  start(ws) {
    this.reset()
    this.timer = setTimeout(() => {
      // onmessage拿到返回的心跳就说明连接正常
      ws.send(JSON.stringify({ heart: 1 }))
      this.serverTimer = setTimeout(() => {
        // 如果超过一定时间还没响应(响应后触发重置)，说明后端断开了
        ws.close()
      }, this.timeout)
    }, this.timeout)
  }
}

export default {
  data() {
    return {
      lockReconnect: false, // 连接失败不进行重连
      maxReconnect: 5, // 最大重连次数，若连接失败
      socket: null,
      reconnectCount: 0 // 当前重连次数
    }
  },
  mounted() {
    this.initWebSocket()
  },
  methods: {
    reconnect() {
      if (this.lockReconnect || this.maxReconnect <= 0 || this.reconnectCount > this.maxReconnect) {
        return
      }
      this.initWebSocket()
    },
    initWebSocket() {
      try {
        if ('WebSocket' in window) {
          this.socket = new WebSocket(SOCKETHOST + '/ws?u_id=' + this.userInfo.user.id)
        } else {
          console.log('您的浏览器不支持websocket')
        }
        this.reconnectCount += 1
        this.socket.onopen = this.websocketonopen
        this.socket.onerror = this.websocketonerror
        this.socket.onmessage = this.websocketonmessage
        this.socket.onclose = this.websocketclose
      } catch (e) {
        this.reconnect()
      }
    },
    websocketonopen() {
      console.log('WebSocket连接成功', this.socket.readyState)
      heartCheck.start(this.socket)
    },
    websocketonerror(e) {
      console.log('WebSocket连接发生错误', e)
      this.reconnect()
    },
    async websocketonmessage(e) {
      const data = JSON.parse(e.data)
      console.log('接收到消息', data)
      if (data.reload) {
        Notice.info({
          title: '消息提示',
          desc: `您有新的邮件或短信，请注意查看！`
        })
        await this.$store.dispatch('getTeamStatus')
        await this.$store.dispatch('getMsg')
        await this.updateTask()
      }
      // 消息获取成功，重置心跳
      heartCheck.start(this.socket)
    },
    websocketclose(e) {
      console.log('连接断开 (' + e.code + ')')
      this.reconnect()
    },
    websocketsend(data) {
      this.socket.send(data)
    }
  },
  destroyed() {
    this.socket.close()
  }
}

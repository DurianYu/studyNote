export var navMixin = {
  methods: {
  	signOut: function() {
      const vm = this;
      this.$confirm('确定退出登陆吗', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
      .then(function () {
        axios({
          method: 'post',
          url: '/com/logout',
        })
        .then(function (response) {
          let res = response.data;
          if (res.status == 1) {
            OverTime(vm);
          } else {
            console.error(res.msg);
          }
        })
      })
    },
  }
}
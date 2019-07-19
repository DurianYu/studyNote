<template>
  <div class="pc-help-nav">
   <zs-menu
    :menu-data="sideNav"
    :default-active="oldActiveIndex"
    @item-click="handleNavClick">
   </zs-menu>
  </div>
</template>

<script type="text/javascript">
  import store from '@/store/index';
  
export default {
  name: 'pcHelp',

  data() {
    return {
      oldActiveIndex: { 
        index: '#platformDiff'
      },
      sideNav: [
        {
          type: 'item',
          title: '微信端与电脑端的区别',
          props: {
          	index: '#platformDiff'
            // index: '1'
          }
        },
        {
          type: 'item',
          title: '高级VIP与普通VIP的区别',
          props: {
          	index: '#vipDifference'
            // index: '2'
          }
        },
        {
          type: 'sub',
          title: '注册基本信息',
          props: {
          	index: 'register'
            // index: '3'
          },
          subMenu:[
          {
            type: 'item',
            title: '微信端注册',
            props: {
            	index: '#wxRegister'
              // index: '3-1'
            }
          },
          {
            type: 'item',
            title: '电脑端注册',
            props: {
            	index: '#pcRegister'
              // index: '3-2'
            }
          }]
        },
        {
          type: 'item',
          title: '绑定志愿卡账号到微信',
          props: {
          	index: '#cardBind'
            // index: '4'
          }
        },
        {
          type: 'item',
          title: '绑定亲情号',
          props: {
          	index: '#parentBind'
            // index: '5'
          }
        },
        {
          type: 'item',
          title: '成绩修改',
          props: {
          	index: '#gradeModify'
            // index: '6'
          }
        },
        {
          type: 'sub',
          title: '院校招生数据',
          props: {
          	index: 'data'
            // index: '7'
          },
          subMenu:[
          {
            type: 'item',
            title: '招生数据',
            props: {
            	index: '#enrollmentData'
              // index: '7-1'
            }
          },
          {
            type: 'item',
            title: '招生简章（招生章程）',
            props: {
            	index: '#enrollmentCharter'
              // index: '7-2'
            }
          }]
        },
        {
          type: 'sub',
          title: '智能推荐',
          props: {
          	index: 'recommend'
            // index: '8'
          },
          subMenu:[
          {
            type: 'item',
            title: '学校优先',
            props: {
            	index: '#schoolPriority'
              // index: '8-1'
            }
          },
          {
            type: 'item',
            title: '专业优先',
            props: {
              // index: '8-3'
            	index: '#subjectPriority'
            }
          },
          {
            type: 'item',
            title: '已收藏学校风险分析',
            props: {
            	index: '#schoolAnalysis'
              // index: '8-3'
            }
          }]
        },
        {
          type: 'item',
          title: '模拟填报',
          props: {
            // index: '9'
          	index: '#volunteerJoinModify'
          }
        },
        
      ]
    }
  },

  methods: {
    handleNavClick: function(el) {
      const {oldActiveIndex} = this;
      document.querySelectorAll('.page-content .help-page-content')[0].scrollTo(0, 0)
      let oldActiveContent = document.getElementById(oldActiveIndex.index);
      let activeContent = document.getElementById(el.index);

      oldActiveContent.style.display = 'none';
      oldActiveContent.className = oldActiveContent.className.replace(/ is-visible/g, '');

      activeContent.style.display = 'block';
      activeContent.className += ' is-visible';

      this.oldActiveIndex.index = el.index;
      this.lazyLoad(activeContent.querySelectorAll('img'));
    },

    lazyLoad: function(activeImg) {
      activeImg.forEach(function(img) {
        if (img.dataset.hasOwnProperty('src')) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
      })
    }
  },
 
}
</script>

<style type="text/css">
.pc-help-nav {
  height: auto;
  padding-top: 20px;
  padding-bottom: 0px;
  overflow-y: scroll; 

}
.pc-help-nav .zs-nav {
  border: 0;
}
.pc-help-nav .zs-nav .el-menu-item  {
  width: 12rem;
}
.pc-help-nav::-webkit-scrollbar {
  width: 4px;
  background-color: #fff;
}

.pc-help-nav::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #dbdee0;
}
</style>


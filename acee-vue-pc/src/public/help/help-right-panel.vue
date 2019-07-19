<template>
  <div class="help-page-content" ref='helpContent'>
    <el-steps 
      v-for="(value, key) in helpData"
      v-show="key == 'platformDiff'"
      :key="key"
      :id="'#' + key"
      class="help-content-item"
      :class="[key == 'platformDiff' ? 'is-visible' : '']"
      :active="7"
      direction="vertical">
      <div class="block-title">
        <h2 class="steps-title">{{value.title}}</h2>
        <p class="steps-description">{{value.description}}</p>
      </div>
      <el-step
      v-for="(item, index) in value.funIntr"
      :key="index">
        <div v-if="item.title" slot="title">
          {{item.title}}
          <span v-if="item.hasOwnProperty('note')" class="note-text">
            {{item.note}}
          </span>
        </div>
        <img v-if="item.description" ref="img" :src="store.state.DOMAIN + '/img/layer.jpg'" slot="description" :data-src="item.description">
      </el-step>
    </el-steps>
  </div>
</template>

<script type="text/javascript">
  import store from '@/store/index';
export default {
  name: 'helpRightPanel',

  data() {
    return {
      store,
      helpData: {
        // 微信端与客户端
        platformDiff: {
          title: '微信端与电脑端的区别',
          description: '产品分为微信端和电脑端，具有可视化数据分析、院校硕士专业深度解析2大特色。微信端功能丰富，查看方便；电脑端操作简洁，适合对院校进行快速筛选。高考成绩公布后推荐使用电脑端。',
          funIntr: [
            {
              title: '微信端功能丰富，6大核心功能：院校查询、智能推荐、风险评估、报考形式、兴趣测评、微信课堂',
              description: `${store.state.DOMAIN}` + '/img/help/home_page.jpg',
              status: 'success'
            },
            {
              title: '电脑端操作简洁，适合对院校进行快速筛选，高考成绩公布后推荐使用电脑端。',
              description: `${store.state.DOMAIN}` + '/img/help/pc-search.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },
        
        // VIP的区别
        vipDifference: {
          title: '一、高级VIP与普通VIP的区别',
          description: '高级VIP用户可查看院校某个专业是否有的硕士、博士授予权以及该专业详细的研究方向，为院校学科优势深度对比提供信息，普通VIP可升级为高级VIP。',
          funIntr: [
            {
              title: '当您不是VIP时，无法查看到硕士博士专业信息',
              description: `${store.state.DOMAIN}` + '/img/help/no_vip.jpg',
              status: 'success'
            },
            {
              title: '高级VIP用户可在此处查看院校是否有硕士、博士授予权。',
              description: `${store.state.DOMAIN}` + '/img/help/look_master.jpg',
              status: 'success'
            },
            {
              title: '点击查看按钮进入该院校硕士、博士专业详细研究方向页面。',
              description: `${store.state.DOMAIN}` + '/img/help/master_page.jpg',
              status: 'success'
            },
            {
              title: '高级VIP用户可在此处查看院校是否有硕士、博士授予权。',
              description: `${store.state.DOMAIN}` + '/img/help/look_master.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },
       
       // 微信端注册
        wxRegister: {
          title: '一、微信端注册',
          description: '与电脑端相比哲升志愿通微信版有更加丰富的功能，如智能推荐、风险评估、成绩统计等功能。',
          funIntr: [
            {
              title: '请先在微信中搜索并关注哲升志愿通公众号，或扫描下方二维码进行关注。',
              description: `${store.state.DOMAIN}` + '/img/help/logo-qrcode.jpg',
              status: 'success'
            },
            {
              title: '首次进入公众号点击任意按钮，需要先填写基本信息',
              description: `${store.state.DOMAIN}` + '/img/help/regist_note.jpg',
              status: 'success'
            },
            {
              title: '基本信息包括身份（学生、老师、家长）、省份、城市、毕业年份等。注意：个人信息只能填写一次，无法修改。',
              description: `${store.state.DOMAIN}` + '/img/help/wx_registe_info.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },
        
        // 电脑端注册
        pcRegister: {
          title: '二、电脑端注册',
          description: '电脑端功能简洁，操作简便。',
          funIntr: [
            {
              title: '可通过志愿卡账号密码登录，或者微信扫码登录（需关注哲升志愿通微信公众号，并已绑定志愿卡到微信）。',
              description: `${store.state.DOMAIN}` + '/img/help/pc_sign.jpg',
              status: 'success'
            },
            {
              title: '如果未绑定志愿卡账号到微信，首次在电脑端使用账号密码登录时需要您填写省份、文理科、毕业年份信息。',
              description: `${store.state.DOMAIN}` + '/img/help/pc_register_prov.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },

        // 绑定志愿卡账号到微信
        cardBind: {
          title: '绑定志愿卡账号到微信',
          description: '志愿卡可通过在线购买或者渠道方式购买，已有志愿卡并绑定志愿卡到微信端后，可以使用微信VIP功能。',
          funIntr: [
            {
              title: '在线购买或者绑定志愿卡入口。',
              description: `${store.state.DOMAIN}` + '/img/help/home_page.jpg',
              status: 'success'
            },
            {
              title: '在弹出框中点击已有卡。',
              description: `${store.state.DOMAIN}` + '/img/help/card_bing_two.jpg',
              status: 'success'
            },
            {
              title: '输入卡号和密码，点击提交。',
              description: `${store.state.DOMAIN}` + '/img/help/card_bing_three.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },

        // 亲情号绑定
        parentBind: {
          title: '亲情号绑定',
          description: '绑定亲情号可以多人同时使用，但是仅能填写一次高考分数。最多可绑定3位家长身份用户。',
          funIntr: [
            {
              title: '每位学生用户都拥有一个专属二维码，家长通过扫码可与学生账号绑定。',
              description: `${store.state.DOMAIN}` + '/img/help/parent_qr.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },

          // 修改成绩
        gradeModify: {
          title: '一、修改成绩',
          description: '注意：高考成绩公布后，只能输入一次，不可修改。',
          funIntr: [
            {
              title: '在学校搜索页面点击修改成绩按钮，可进入成绩修改页面。',
              description: `${store.state.DOMAIN}` + '/img/help/modify_school.jpg',
              status: 'success'
            },
            {
              title: '在智能推荐页面进入其学校优先、专业优先、收藏学校分析页面都可修改成绩。',
              description: `${store.state.DOMAIN}` + '/img/help/recommend_kinds.jpg',
              status: 'success'
            },
            {
              title: '个人中心页面，成绩信息可进入成绩修改页面。',
              description: `${store.state.DOMAIN}` + '/img/help/modify_my.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },

        // 招生数据
        enrollmentData: {
          title: '招生数据',
          description: '可以看到学校的招生计划、章程、学校的录取批次、学校办学情况等信息。',
          funIntr: [
            {
              title: '点击首页的学校搜索按钮，进入学校搜索页面。可直接输入学校名，或按条件搜索院校。',
              description: `${store.state.DOMAIN}` + '/img/help/school_search.jpg',
              status: 'success'
            },
            {
              title: '搜索结果中就可看到学校情况及招生数据，点击卡片可查看更多信息。',
              description: `${store.state.DOMAIN}` + '/img/help/school_info.jpg',
              status: 'success'
            },
            {
              title: '院校具体专业的招生数据，可点击专业详情查看。',
              description: `${store.state.DOMAIN}` + '/img/help/enrollment_spec_info.jpg',
              status: 'success'
            },
            {
              title: '专业详细数据。',
              description: `${store.state.DOMAIN}` + '/img/help/enrollment_spec_data.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },

        // 招生章程
        enrollmentCharter: {
          title: '招生章程',
          description: '招生章程有院校招生的要求等重要信息，请考试务必认真查看。',
          funIntr: [
            {
              title: '通过查找学校按钮进入，招生章程按钮在搜索结果卡片中。',
              description: `${store.state.DOMAIN}` + '/img/help/school_search.jpg',
              status: 'success'
            },
            {
              title: '点击招生简章按钮即可查看详细信息。',
              description: `${store.state.DOMAIN}` + '/img/help/enrollment_charter.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },

        // 学校优先
        schoolPriority: {
          title: '一、学校优先',
          description: '院校优先将根据您的分数，按照院校的排名先后向您推荐冲刺型、稳定性、保底型3类院校。',
          funIntr: [
            {
              title: '点击首页的智能推荐，选择学校优先。',
              description: `${store.state.DOMAIN}` + '/img/help/recommend_kinds.jpg',
              status: 'success'
            },
            {
              title: '按步骤输入分数和想报考院校所在省份。（注意：高考分数公布后，分数只能输入一次）。',
              description: `${store.state.DOMAIN}` + '/img/help/recommend_pro.jpg',
              status: 'success'
            },
            {
              title: '系统为您推荐出冲刺型、稳定性、保底型3类院校。',
              description: `${store.state.DOMAIN}` + '/img/help/recommend_result.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },

        // 专业优先
        subjectPriority: {
          title: '二、专业优先',
          description: '专业优先将根据您的分数，按照专业排名顺序，向您推荐冲刺型、稳定性、保底型3类院校。',
          funIntr: [
            {
              title: '点击首页的智能推荐按钮，选择专业优先。',
              description: `${store.state.DOMAIN}` + '/img/help/recommend_kinds.jpg',
              status: 'success'
            },
            {
              title: '按步骤输入分数、查看的专业、报考院校所在省份。（注意：高考分数公布后，分数只能输入一次）。',
              description: `${store.state.DOMAIN}` + '/img/help/recommend_sub.jpg',
              status: 'success'
            },
            {
              title: '系统为您推荐出冲刺型、稳定性、保底型3类院校。',
              description: `${store.state.DOMAIN}` + '/img/help/recommend_result.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },

        // 收藏学校风险分析
        schoolAnalysis: {
          title: '三、收藏学校风险分析',
          description: '对您收藏的感兴趣院校，系统将根据您的分数情况，分析院校的报考风险，给出冲刺型、稳定性、保底型3类风险等级。',
          funIntr: [
            {
              title: '点击首页的智能推荐，选择已收藏学校分析。',
              description: `${store.state.DOMAIN}` + '/img/help/recommend_kinds.jpg',
              status: 'success'
            },
            {
              title: '系统将根据您的分数情况，分析院校的报考风险，给出冲刺型、稳定性、保底型3类风险等级。',
              description: `${store.state.DOMAIN}` + '/img/help/recommend_school.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },

        // 模拟填报
        volunteerJoinModify: {
          title: '模拟填报',
          description: '模拟填报功能根据真实的志愿表情况来模拟高考志愿。',
          funIntr: [
            {
              title: '在学校信息卡片上点击可加入志愿表。',
              description: `${store.state.DOMAIN}` + '/img/help/volunteer_school_join.jpg',
              status: 'success'
            },
            {
              title: '在志愿表中点击修改志愿，就可以删除和移动志愿学校。',
              description: `${store.state.DOMAIN}` + '/img/help/volunteer_modify.jpg',
              status: 'success'
            },
            {
              title: '点击清空按钮就可以清空该批次的志愿表。',
              description: `${store.state.DOMAIN}` + '/img/help/volunteer_empty.jpg',
              status: 'success'
            },
            {
              title: '',
              description: '',
              status: ''
            },
          ]
        },
      }
    }
  },

  mounted: function() {
    const vm = this;
    let activeImg = document.getElementById('#platformDiff').querySelectorAll('img');
    this.lazyLoad(activeImg);
  },

  methods: {
    lazyLoad: function(activeImg) {
      activeImg.forEach(function(img) {
        if (img.dataset.hasOwnProperty('src')) {
          img.src = img.dataset.src;
          delete img.dataset.src;
        }
      })
    }
  }
}
</script>

<style type="text/css">
.help-page-content {
  margin-top: 20px;
  padding: 20px;
  height: calc(100% - 20px);
  overflow-y: scroll; 
  background-color: #fff;
  border-radius: 2px;
}
.help-page-content .help-content-item {
  display: block;
}
.help-page-content .block-title {
  line-height: 1.5rem;
  margin-bottom: 20px;
  text-align: left;
}
.help-page-content .block-title {
  line-height: 1.5rem;
  margin-bottom: 20px;
}
.help-page-content .block-title .steps-title{
  margin: 20px 0px;
  color: rgba(0,0,0,.54);
}
.help-page-content .block-title .steps-description{
  text-indent: 1rem;
  padding: 0px 9% 0px 20px;
  font-size: 0.9rem;
  color: rgba(0,0,0,.54);
}
@media screen and (max-width: 768px) {
  .help-page-content .block-title .steps-description{
    font-size: 1rem;
  }
}

@media screen and (max-width: 500px) {
  .help-page-content .block-title .steps-description{
    font-size: 1.1rem;
  }
}


.help-page-content .el-step.is-vertical .el-step__title {
  padding-right: 10%;
  padding-bottom: 25px;
  color: #3e4042;
}
.help-page-content .el-step__description {
  padding-bottom: 20px;
  max-width: 50%;
}
.help-page-content .el-step__description img {
  width: 100%;
  height: auto;
}

@media screen and (max-width: 1024px) {
  .help-page-content .block-title .steps-description {
    padding: 0px 20px;
  }
  .help-page-content .el-step.is-vertical .el-step__title {
    padding-right: 20px;
  }
  .help-page-content .el-step__description {
    max-width: 60%;
  }
  .help-page-content .el-step__description img {
    width: 100%;
    height: auto;
  }
}

@media screen and (max-width: 998px) {
  .help-page-content .el-step__description {
    max-width: 65%;
  }
  .help-page-content .el-step__description img {
    width: 100%;
    height: auto;
  }
}

@media screen and (max-width: 768px) {
  .help-page-content .el-step__description {
    max-width: 75%;
  }
  .help-page-content .el-step__description img {
    width: 100%;
    height: auto;
  }
}


@media screen and (max-width: 768px) {
  .help-page-content .el-step__description {
    max-width: 85%;
  }
  .help-page-content .el-step__description img {
    width: 100%;
    height: auto;
  }
}
</style>
<!-- 
/**
 * @author 柳婷婷
 * @createDate 2018-09-26
 *@param {object} schoolItem - prop参数，父组件传参
 *@param {string} schoolItem属性 risk 冲稳保 图片路径
 *@param {string} schoolItem属性 schoolBadge 图片路径
 *@param {string} schoolItem属性 province 省份
 *@param {number} schoolItem属性 is985 1为真(显示)
 *@param {number} schoolItem属性 is211 1为真(显示)
 *@param {number} schoolItem属性 firstclass 1为真(显示)
 *@param {number} schoolItem属性 firstsub 2为真(显示)
 *@param {string} schoolItem属性 college_name 学校名字
 */
 -->
<template>
  <div class="school-info">
    <div class="school-img">
      <div class="adm-prob">
        <img v-bind:src="schoolItem.risk" alt=''>
      </div>
      <img  v-bind:src="schoolItem.schoolBadge" alt='校徽'>
      <span>{{schoolItem.province}}</span>
    </div>
    <div class="sch-label-content">
      <div  class="sch-985 sch-label" v-if="schoolItem.is985 == 1">985</div>
      <div class="sch-211 sch-label" v-if="schoolItem.is211 == 1">211</div>
      <div  class="sch-num-one sch-label" v-if="schoolItem.firstclass == 1">一流学校</div>
      <div  class="sub-num-two sch-label" v-if="schoolItem.firstsub == 2">一流学科</div>
    </div>
    <div class="school-name"><p>{{schoolItem.college_name}}</p></div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'schoolInfo',
  props: {
  	schoolItem: Object
  }
}
</script>

<style type="text/css">
  .school-info {
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 140px;
    max-width: 181px;
    padding: 12px;
    color: rgb(160, 160, 160);
  }
  .school-info .school-img {
    display: flex;
    align-items: center;
  }
  .school-info .school-img>img {
    vertical-align: middle;
    width: auto !important;
    height: auto;
  }
  .school-info .adm-prob {
    position: absolute;
    top: 0;
    left: 0;
    height: 28px;
    width: 28px;
  }
  .school-info .adm-prob>img {
    width: 28px;
    height: auto;
  }
  .school-info .school-img span{
    flex-grow: 1;
    text-align: center;
  }
  .school-info .sch-label-content {
    box-sizing: border-box;
    /*height: 60px;*/
    display: flex;
    display: -webkit-flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 17px 10px 15px;
  }
  .sch-label-content .sch-label {
    font-size: 12px;
    font-weight: bold;
    height: 18px;
    line-height: 18px;
    padding: 0px 5px;
    margin: 0px 4px 3px 0px;
    color: #000;
    background-color: #ffc107;
    border-radius: 4px;
  }
  .school-info .school-name {
    box-sizing: border-box;
    text-align: center;
    padding: 0px 10px;
  }
</style>
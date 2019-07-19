<template>
  <div class="subject-item"
   v-for="(item) in subDetail.subItemData"
   :key="item.subId.id + item.subId.plan_id">
    <div class="sub-item-title">
       <div class="adm-prob">
        <img v-bind:src="item.risk" alt=''>
      </div>
      {{item.subject_name}}
    </div>
    <div class="subject-item-content">
      <zs-table
      :tableData="item.subDetail"
      @click="lookErollRemarks(item.subId, subDetail.collegeDat, $event)">
      </zs-table>
      <el-row
       class="line-button"
       type="flex"
       justify="space-around">
        <el-col 
        class="line-content"
        :span="18">
          <ve-line
            v-for="(value, key, index) in item.subLineData"
            :key="key"
            :settings="settings"
            :extend="extend"
            :colors="getcolor(parseInt(index) + 3, 1)"
            :data="lineData(value.columns, value.line_1)"
            width="100%"
            height="100%">
          </ve-line>
        </el-col>
        <el-col
         class="func-button"
         :span="5">
          <template>
            <el-cascader
              placeholder="加入志愿"
              :options="subVolunOptions"
              ref="volunteer">
            </el-cascader>
          </template>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/javascript">
export default{
  name: 'scbConfig',

  data() {
    return {
      subVolunOptions: [
        {
          value: null,
          label: '当前所属:本科第一批',
          disabled: true,
        },
        {
          value: ',subj_1',
          label: '专业一',
        },
        {
          value: ',subj_2',
          label: '专业二',
        },
        {
          value:',subj_3',
          label: '专业三',
        },
        {
          value:',subj_4',
          label: '专业四',
        },
        {
          value:',subj_5',
          label: '专业五',
        },
        {
          value:',subj_6',
          label: '专业六',
        }
      ];
    }
  }
}
</script>
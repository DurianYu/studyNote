<template>
  <div class="delay all-padding">
    <img src="@/assets/images/insurance/u246.png" alt="" />
    <p>由于天气原因，你所在的航班飞机已延误1个小时，跟客服进行咨询如何办理理赔业务。</p>
    <Button class="btn-center" type="primary" :to="{ name: 'insurance-home' }">下一步</Button>
  </div>
</template>

<script>
import { Button } from 'view-design'
import { roleStatus, actionCode } from '@/config/index'
export default {
  components: {
    Button
  },
  created() {
    const currentStatus = this.$getEntityNewStatus('entity_insurance')
    let actionid = ''
    if (currentStatus.status_id === roleStatus.insurance.s_insurance_old_has_insure.status) {
      actionid = actionCode.insurance.a_insurance_old_click_airport
      this.$store.dispatch('changeStatus', { actionid })
    } else if (currentStatus.status_id === roleStatus.insurance.s_insurance_new_has_effect.status) {
      actionid = actionCode.insurance.a_insurance_new_click_airport
      this.$store.dispatch('changeStatus', { actionid })
    }
  }
}
</script>

<style lang="scss" scoped>
.delay {
  padding-top: 150px;
  text-align: center;
  p {
    margin: 50px 0;
  }
}
</style>

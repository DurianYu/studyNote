<template>
  <div class="proof-application">
    <img src="@/assets/images/insurance/u335.png" alt="" />
    <Button type="primary" class="btn-center" @click="handleSave">保存</Button>
  </div>
</template>

<script>
import { Button } from 'view-design'
import { actionCode } from '@/config/index'
export default {
  components: {
    Button
  },
  methods: {
    async handleSave() {
      await this.$store.dispatch('changeStatus', { actionid: actionCode.insurance.a_insurance_old_apply_delay_prove })
      this.$router.push({ name: 'insurance-home' })
    }
  }
}
</script>

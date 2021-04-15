<template>
  <div class="proof-application">
    <img class="page-space-l-t" src="@/assets/images/insurance/u322.png" alt="" />
    <Button type="primary" class="btn-center" :to="{ name: 'insurance-traditional-proof-application2' }">查 询</Button>
  </div>
</template>

<script>
import { Button } from 'view-design'
export default {
  components: {
    Button
  }
}
</script>

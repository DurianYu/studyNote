<template>
  <div class="type all-padding">
    <h2 class="font2-b page-space-l-t">选择账号类型</h2>
    <div class="type-content">
      <div class="type-content-item">
        <img src="@/assets/images/sc/core.png" alt="" @click="selectType(1)" />
        <!-- <dl>
          <dt>核心企业</dt>
          <dd>注册成为核心企业</dd>
        </dl>
        <Button type="primary" class="btn-center" @click="selectType(1)">注 册</Button> -->
      </div>
      <div class="type-content-item">
        <img src="@/assets/images/sc/supply.png" alt="" @click="selectType(2)" />
        <!-- <dl>
          <dt>供应商</dt>
          <dd>注册成为供应商</dd>
        </dl>
        <Button type="primary" class="btn-center" @click="selectType(2)">注 册</Button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'view-design'
import { mapGetters } from 'vuex'
import { roleName } from '@/config/index'
export default {
  components: {
    // Button
  },
  computed: {
    ...mapGetters(['currentRole'])
  },
  methods: {
    selectType(type) {
      const flag1 = type === 1 && this.currentRole === roleName.finance.role_core.roleId
      const flag2 = type === 2 && this.currentRole !== roleName.finance.role_core.roleId
      if (flag1 || flag2) {
        this.$router.push({ name: 'supply-chain-join-certification' })
      } else {
        Message.warning('请注册正确的类型！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.type {
  &-content {
    display: flex;
    justify-content: center;
    &-item {
      margin: 0 50px;
      width: 400px;
      height: 500px;
      text-align: center;
      // background-color: #eee;
      // padding: 100px 0;
      dt {
        font-size: 16px;
        margin: 40px 0 10px;
      }
      button {
        margin-top: 50px;
      }
      img {
        width: 100%;
        cursor: pointer;
      }
    }
  }
}
</style>

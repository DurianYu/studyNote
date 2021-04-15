<template>
  <div class="page-cre-bill">
    <header>
      <div class="title">
        海运提单
      </div>
    </header>

    <section class="main">
      <Form ref="formData" :model="formData" :rules="rules" label-position="top" inline>
        <FormItem label="托运人" prop="key1">
          <Input type="text" v-model="formData.key1" />
        </FormItem>
        <FormItem label="地址" prop="key2">
          <Input type="text" v-model="formData.key2" />
        </FormItem>

        <FormItem label="提单号">
          {{ check_lc_cre_bill.bill_num }}
        </FormItem>
        <br />

        <FormItem label="收货人" prop="key3">
          <Input type="text" v-model="formData.key3" />
        </FormItem>
        <FormItem label="地址" prop="key4">
          <Input type="text" v-model="formData.key4" />
        </FormItem>

        <FormItem label="被通知人" prop="key5">
          <Input type="text" v-model="formData.key5" />
        </FormItem>
        <br />

        <FormItem label="船名" prop="key6">
          <Input type="text" v-model="formData.key6" />
        </FormItem>
        <FormItem label="航号" prop="key7">
          <Input type="text" v-model="formData.key7" />
        </FormItem>
        <FormItem label="始发港" prop="key8">
          <Input type="text" v-model="formData.key8" />
        </FormItem>
        <FormItem label="目的港" prop="key9">
          <Input type="text" v-model="formData.key9" />
        </FormItem>
        <br />

        <FormItem label="货物名称及规格" prop="key10">
          <Input type="text" v-model="formData.key10" />
        </FormItem>
        <FormItem label="件数" prop="key11">
          <Input type="text" v-model="formData.key11" />
        </FormItem>
        <FormItem label="包装" prop="key12">
          <Input type="text" v-model="formData.key12" />
        </FormItem>
        <FormItem label="毛重" prop="key13">
          <Input type="text" v-model="formData.key13" />
        </FormItem>
        <FormItem label="尺寸" prop="key14">
          <Input type="text" v-model="formData.key14" />
        </FormItem>
        <br />

        <FormItem label="签发日期" prop="key">
          <Input type="text" :disabled="true" v-model="formData.date" />
        </FormItem>
        <FormItem label="装船时间" prop="key">
          <Input type="text" :disabled="true" v-model="formData.date" />
        </FormItem>
        <br />

        <img style="float: right; max-width: 240px; object: fill;" :src="require('@/assets/images/chapter-bill.png')" alt="" />

        <br />
        <FormItem class="next">
          <Button type="primary" size="large" @click="next">获取</Button>
        </FormItem>
      </Form>
    </section>
  </div>
</template>

<script>
import { Form, FormItem, Button, Input } from 'view-design'
import { parseTime, validateCheckForm } from '@/utils/index'
import { check_lc_cre_bill } from '@/config/form-check'
import { actionCode } from '@/config/index'
export default {
  components: {
    Form,
    FormItem,
    Button,
    Input
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_lc_cre_bill)
    }
    return {
      check_lc_cre_bill,
      current: 0,
      formData: {
        date: parseTime(new Date(), '{y}-{m}-{d}')
      },
      rules: {
        key1: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key2: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key3: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key4: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key5: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key6: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key7: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key8: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key9: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key10: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key11: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key12: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key13: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key14: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      }
    }
  },
  methods: {
    next() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.handleAction()
        }
      })
    },
    async handleAction() {
      await this.$store.dispatch('changeStatus', { actionid: actionCode.lc.a_lc_tongyu_write_bill })
      this.$router.push({ name: 'lc-overview' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-cre-bill {
  ::v-deep {
    header {
      margin: 2rem 0 0 0;
      .title {
        text-align: center;
      }
    }
    .main {
      padding: 2.5rem 0 0 0;
      width: 95%;
      margin: 0 auto;

      .next {
        clear: both;
        margin: 2rem 0 4rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>

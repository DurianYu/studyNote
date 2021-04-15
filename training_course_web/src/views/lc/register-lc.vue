<template>
  <div class="page-register-lc">
    <header>
      <div class="title">
        开证登记
      </div>
    </header>

    <section class="main">
      <Form ref="formData" :model="formData" :rules="rules" label-position="top" inline>
        <FormItem label="信用证号" prop="key1">
          <Input type="text" v-model="formData.key1" />
        </FormItem>
        <FormItem label="开证日" prop="date">
          <Input type="text" disabled v-model="formData.date" />
        </FormItem>
        <br />

        <FormItem label="申请人名称" prop="key3">
          <Input type="text" v-model="formData.key3" />
        </FormItem>
        <FormItem label="地址" prop="key4">
          <Input type="text" v-model="formData.key4" />
        </FormItem>

        <FormItem label="即期/远期" prop="key5">
          <Select v-model="formData.key5" style="width:200px">
            <Option value="即期">即期</Option>
            <Option value="远期">远期</Option>
          </Select>
        </FormItem>
        <br />

        <FormItem label="受益人名称" prop="key6">
          <Input type="text" v-model="formData.key6" />
        </FormItem>
        <FormItem label="地址" prop="key7">
          <Input type="text" v-model="formData.key7" />
        </FormItem>

        <FormItem label="信用证类型" prop="key8">
          <Select v-model="formData.key8" style="width:200px">
            <Option value="不可撤销">不可撤销</Option>
          </Select>
        </FormItem>
        <br />

        <FormItem label="开证行代码" prop="key9">
          <Input type="text" v-model="formData.key9" />
        </FormItem>

        <FormItem label="通知行代码" prop="key10">
          <Input type="text" v-model="formData.key10" />
        </FormItem>

        <FormItem label="信用证支付方式" prop="key11">
          <Select v-model="formData.key11" style="width:200px">
            <Option value="即期付款信用证">即期付款信用证</Option>
            <Option value="承兑信用证">承兑信用证</Option>
            <Option value="议付信用证">议付信用证</Option>
            <Option value="延期付款信用证">延期付款信用证</Option>
          </Select>
        </FormItem>
        <br />

        <FormItem label="是否为额度开证" prop="key12">
          <Input type="text" v-model="formData.key12" />
        </FormItem>

        <FormItem label="到期日" prop="key13">
          <Input type="text" v-model="formData.key13" />
        </FormItem>
        <br />

        <FormItem label="客户账号" prop="key14">
          <Input type="text" v-model="formData.key14" />
        </FormItem>
        <FormItem label="保证金账号" prop="key15">
          <Input type="text" v-model="formData.key15" />
        </FormItem>
        <FormItem label="到期地点" prop="key16">
          <Input type="text" v-model="formData.key16" />
        </FormItem>
        <br />

        <FormItem label="币种" prop="key17">
          <Input type="text" v-model="formData.key17" />
        </FormItem>
        <FormItem label="币种" prop="key18">
          <Input type="text" v-model="formData.key18" />
        </FormItem>
        <FormItem label="转运" prop="key19">
          <Input type="text" v-model="formData.key19" />
        </FormItem>
        <br />

        <FormItem label="金额" prop="key20">
          <Input type="text" v-model="formData.key20" />
        </FormItem>
        <FormItem label="金额" prop="key21">
          <Input type="text" v-model="formData.key21" />
        </FormItem>
        <FormItem label="分批转运" prop="key22">
          <Input type="text" v-model="formData.key22" />
        </FormItem>
        <br />

        <FormItem label="信用证币别" prop="key23">
          <Input type="text" v-model="formData.key23" />
        </FormItem>
        <FormItem label="收费方式" prop="key24">
          <Input type="text" v-model="formData.key24" />
        </FormItem>
        <br />

        <FormItem label="信用证金额" prop="key25">
          <Input type="text" v-model="formData.key25" />
        </FormItem>
        <FormItem label="收费币种" prop="key26">
          <Input type="text" v-model="formData.key26" />
        </FormItem>
        <br />

        <FormItem label="扣费账户" prop="key27">
          <Input type="text" v-model="formData.key27" />
        </FormItem>

        <br />
        <FormItem class="next">
          <Button type="primary" size="large" @click="next">提交</Button>
        </FormItem>
      </Form>
    </section>
  </div>
</template>

<script>
import { Form, FormItem, Button, Input, Select, Option } from 'view-design'
import { actionCode } from '@/config/index'
import { parseTime, validateCheckForm } from '@/utils/index'
import { check_lc_register_lc } from '@/config/form-check'
export default {
  components: {
    Form,
    FormItem,
    Button,
    Input,
    Select,
    Option
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_lc_register_lc)
    }
    return {
      current: 0,
      formData: {
        date: parseTime(new Date(), '{y}-{m}-{d}')
      },
      rules: {
        key1: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key4: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key5: [{ required: true, validator: validateCheck, trigger: 'change' }],
        key6: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key7: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key8: [{ required: true, validator: validateCheck, trigger: 'change' }],
        key11: [{ required: true, validator: validateCheck, trigger: 'change' }]
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
      await this.$store.dispatch('changeStatus', { actionid: actionCode.lc.a_lc_bakelai_open_credit })
      this.$router.push({ name: 'lc-overview' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-register-lc {
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
        margin: 2rem 0 4rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>

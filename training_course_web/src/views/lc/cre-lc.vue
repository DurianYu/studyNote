<template>
  <div class="page-cre-lc">
    <header>
      <div class="title">
        信用证开立申请书
      </div>
    </header>

    <section class="main">
      <Form ref="formData" :model="formData" :rules="rules" label-position="top" inline>
        <FormItem label="致：（开证行）" prop="key1">
          <Input type="text" v-model="formData.key1" />
        </FormItem>
        <FormItem label="申请日期" prop="date">
          <Input type="text" disabled v-model="formData.date" />
        </FormItem>
        <FormItem label="信用证号码" prop="key3">
          <Input type="text" disabled v-model="formData.key3" />
        </FormItem>
        <br />

        <FormItem label="申请人名称" prop="key4">
          <Input type="text" v-model="formData.key4" />
        </FormItem>
        <FormItem label="地址" prop="key5">
          <Input type="text" v-model="formData.key5" />
        </FormItem>

        <FormItem label="受益人名称" prop="key6">
          <Input type="text" v-model="formData.key6" />
        </FormItem>
        <FormItem label="地址" prop="key7">
          <Input type="text" v-model="formData.key7" />
        </FormItem>
        <br />

        <FormItem label="币别" prop="key8">
          <Select v-model="formData.key8" style="width:200px">
            <Option value="USD">USD</Option>
            <Option value="CNY">CNY</Option>
            <Option value="HKD">HKD</Option>
            <Option value="EUR">EUR</Option>
          </Select>
        </FormItem>
        <FormItem label="金额" prop="key9">
          <Input type="text" v-model="formData.key9" />
        </FormItem>
        <FormItem label="信用证种类" prop="key10">
          <Select v-model="formData.key10" style="width:200px">
            <Option value="即期付款信用证">即期付款信用证</Option>
            <Option value="承兑信用证">承兑信用证</Option>
            <Option value="议付信用证">议付信用证</Option>
            <Option value="延期付款信用证">延期付款信用证</Option>
          </Select>
        </FormItem>
        <FormItem label="付款方式" prop="key11">
          <Select v-model="formData.key11" style="width:200px">
            <Option value="CIF">CIF</Option>
            <Option value="FOB">FOB</Option>
            <Option value="CFR">CFR</Option>
          </Select>
        </FormItem>
        <br />

        <FormItem label="信用证有效期：年/月/日" prop="lawful_date">
          <Input type="text" v-model="formData.lawful_date" />
        </FormItem>
        <FormItem label="信用证有效地" prop="key13">
          <Input type="text" v-model="formData.key13" />
        </FormItem>

        <FormItem label="交单截止日：年/月/日" prop="deadline">
          <Input type="text" v-model="formData.deadline" />
        </FormItem>
        <br />

        <FormItem label="分批装运" prop="key15">
          <RadioGroup v-model="formData.key15">
            <Radio label="允许">允许</Radio>
            <Radio label="禁止">禁止</Radio>
          </RadioGroup>
        </FormItem>

        <FormItem label="转运" prop="key16">
          <RadioGroup v-model="formData.key16">
            <Radio label="允许">允许</Radio>
            <Radio label="禁止">禁止</Radio>
          </RadioGroup>
        </FormItem>
        <br />

        <FormItem label="装货地点" prop="key17">
          <Input type="text" v-model="formData.key17" />
        </FormItem>
        <FormItem label="卸货地点" prop="key18">
          <Input type="text" v-model="formData.key18" />
        </FormItem>
        <FormItem label="最迟装运日期：年/月/日" prop="key19">
          <Input type="text" v-model="formData.key19" />
        </FormItem>
        <br />

        <div>货物描述</div>
        <FormItem label="货物名称及规格" prop="key20">
          <Input type="text" v-model="formData.key20" />
        </FormItem>
        <FormItem label="数量" prop="key21">
          <Input type="text" v-model="formData.key21" />
        </FormItem>
        <FormItem label="单价" prop="key22">
          <Input type="text" v-model="formData.key22" />
        </FormItem>
        <br />

        <FormItem label="信用证需要提交的单据" prop="key23">
          <CheckboxGroup v-model="formData.key23">
            <Checkbox label="海运提单">海运提单</Checkbox>
            <br />
            <Checkbox label="商业发票">商业发票</Checkbox>
            <br />
            <Checkbox label="装箱单">装箱单</Checkbox>
            <br />
            <Checkbox label="数量/重量证书">数量/重量证书</Checkbox>
            <br />
            <Checkbox label="保险单">保险单</Checkbox>
            <br />
            <Checkbox label="品质证书">品质证书</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <br />

        <FormItem label="申请人" prop="key24">
          <Input type="text" v-model="formData.key24" />
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
import { Form, FormItem, Button, Input, RadioGroup, Radio, CheckboxGroup, Checkbox, Select, Option } from 'view-design'
import { actionCode } from '@/config/index'
import { parseTime, validateCheckForm } from '@/utils/index'
import { check_lc_cre_lc } from '@/config/form-check'

export default {
  components: {
    Form,
    FormItem,
    Button,
    Input,
    RadioGroup,
    Radio,
    CheckboxGroup,
    Checkbox,
    Select,
    Option
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_lc_cre_lc)
    }
    return {
      formData: {
        date: parseTime(new Date(), '{y}-{m}-{d}'),
        lawful_date: parseTime(this.caculationDate(60), '{y}-{m}-{d}'),
        deadline: parseTime(this.caculationDate(21), '{y}-{m}-{d}')
      },
      rules: {
        key1: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key4: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key5: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key6: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key7: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key8: [{ required: true, validator: validateCheck, trigger: 'change' }],
        key9: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key10: [{ required: true, validator: validateCheck, trigger: 'change' }],
        key11: [{ required: true, validator: validateCheck, trigger: 'change' }],
        // lawful_date:[{ required: true, validator: validateCheck, trigger: 'blur' }],
        key13: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        // deadline:[{ required: true, validator: validateCheck, trigger: 'blur' }],
        key15: [{ required: true, validator: validateCheck, trigger: 'change' }],
        key16: [{ required: true, validator: validateCheck, trigger: 'change' }],
        key17: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key18: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        // key19:[{ required: true, validator: validateCheck, trigger: 'blur' }],
        key20: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key21: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key22: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key23: [{ required: true, validator: validateCheck, trigger: 'change' }]
      }
    }
  },
  methods: {
    caculationDate(delay_day) {
      let d = new Date(),
        time_stamp = d
          .getTime()
          .toString()
          .slice(0, 10)
      return (Number(time_stamp) + delay_day * 24 * 60 * 60) * 1e3
    },
    next() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.handleAction()
        }
      })
    },
    async handleAction() {
      await this.$store.dispatch('changeStatus', { actionid: actionCode.lc.a_lc_weizhen_apply_credit, data: JSON.stringify(this.formData) })
      this.$router.push({ name: 'lc-overview' })
    }
  }
}
</script>

<style lang="scss" scoped>
.page-cre-lc {
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

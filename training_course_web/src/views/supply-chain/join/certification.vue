<template>
  <div class="certification all-padding all-height">
    <Steps :current="currentStep" class="page-space-l-t">
      <Step title="企业认证"></Step>
      <Step title="管理员认证"></Step>
      <Step title="信息审核"></Step>
      <Step title="开通签章"></Step>
    </Steps>
    <div class="certification-content page-space-l-t" v-show="currentStep === 0">
      <h2 class="font3">填写企业信息</h2>
      <Form ref="formData" :model="formData" :rules="rules" :label-width="150">
        <FormItem label="企业名称：" prop="key1">
          <Input type="text" v-model="formData.key1" />
        </FormItem>
        <FormItem label="社会统一信用代码：" prop="key2">
          <Input v-model="formData.key2" />
        </FormItem>
        <FormItem label="开户行：" prop="key3">
          <Input type="text" v-model="formData.key3" />
        </FormItem>
        <FormItem label="银行账户：" prop="key4">
          <Input type="text" v-model="formData.key4" />
        </FormItem>
        <FormItem label="联系人：" prop="key5">
          <Input type="text" v-model="formData.key5" />
        </FormItem>
        <FormItem label="联系方式：" prop="key6">
          <Input type="text" v-model="formData.key6" />
        </FormItem>
        <FormItem label="企业邮箱：" prop="key7">
          <Input type="text" v-model="formData.key7" />
        </FormItem>
        <FormItem label="法人姓名：" prop="key8">
          <Input type="text" v-model="formData.key8" />
        </FormItem>
        <FormItem label="法人手机号：" prop="key9">
          <Input type="text" v-model="formData.key9" />
        </FormItem>
        <FormItem label="">
          <Button type="primary" size="large" @click="curStep1">下一步</Button>
        </FormItem>
      </Form>
    </div>
    <div class="certification-content" v-show="currentStep === 1">
      <h2 class="font2 page-space-l-t">管理员信息</h2>
      <Form ref="formData2" :model="formData2" :rules="rules2" :label-width="180">
        <FormItem label="管理员姓名：" prop="key1">
          <Input v-model="formData2.key1" />
        </FormItem>
        <FormItem label="电子签章管理员手机号：" prop="key2">
          <Input type="text" v-model="formData2.key2" />
        </FormItem>
        <FormItem label="电签管理员身份证号：" prop="key3">
          <Input type="text" v-model="formData2.key3" />
        </FormItem>
        <FormItem label="">
          <Button type="primary" size="large" @click="handleSubmit">提 交</Button>
        </FormItem>
      </Form>
    </div>
    <div class="certification-content" v-show="currentStep === 2">
      <h2 class="font2 page-space-l-t">信息审核</h2>
      <div class="sh">
        <img :src="require('@/assets/images/sc/review.png')" alt="" />
        <dl>
          <!-- <Spin size="large"></Spin> -->
          <!-- <dt>审核中</dt> -->
          <dd>您提交的信息已提交审核，审核通过后可开通CFCA企业电子签服务</dd>
        </dl>
      </div>
    </div>
    <div class="certification-content" v-show="currentStep === 3">
      <h2 class="font2 page-space-l-t">开通签章</h2>
      <div class="sh" v-if="signupStep === 0">
        <img :src="require('@/assets/images/success-toast.png')" style="width: 240px;" alt="" />
        <dl>
          <dt>审核成功</dt>
          <dd>企业认证和管理员认证审核成功</dd>
        </dl>
        <p>链上地址：3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd</p>
        <p>企业公钥：3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd</p>
        <p>
          企业私钥：{{ hashShow ? '3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd' : '************************************************' }}
          <a class="absolute" href="javascript:;" @click="hashShow = !hashShow">{{ hashShow ? '隐藏' : '显示' }}</a>
        </p>
        <br />
        <Button type="primary" class="btn-next-a " @click="signupStep = 1">下一步</Button>
      </div>
      <div class="form" v-else-if="signupStep === 1">
        <p>
          <label>企业名称：</label><span>{{ dataObj.formData.key1 }}</span>
        </p>
        <p>
          <label>社会统一信用代码：</label><span>{{ dataObj.formData.key2 }}</span>
        </p>
        <p>
          <label>开户行：</label><span>{{ dataObj.formData.key3 }}</span>
        </p>
        <p>
          <label>银行账户：</label><span>{{ dataObj.formData.key4 }}</span>
        </p>
        <p>
          <label>法人姓名：</label><span>{{ dataObj.formData.key8 }}</span>
        </p>
        <p>
          <label>法人手机号：</label><span>{{ dataObj.formData.key9 }}</span>
        </p>
        <p>
          <label>电签管理员姓名：</label><span>{{ dataObj.formData2.key1 }}</span>
        </p>
        <p>
          <label>电签管理员手机号：</label><span>{{ dataObj.formData2.key2 }}</span>
        </p>
        <Button type="primary" class="btn-next-a" @click="signupStep = 2">开通签章</Button>
      </div>
      <div class="sign-cr" v-else-if="signupStep === 2">
        <div class="sign-cr-content">
          <PdfView :path="pdf_path" :options="pdf_options" />
        </div>
        <br />
        <Form ref="formData3" :model="formData3" :rules="rules3" :label-width="180">
          <FormItem label="合同签署码：" prop="signature_code">
            <div class="sms-code">
              <Input type="text" v-model="formData3.signature_code" />
              <Button type="primary">获取</Button>
            </div>
          </FormItem>
          <FormItem label="">
            <Button type="primary" size="large" @click="handleSignUp">执行签署</Button>
          </FormItem>
        </Form>
        <!-- <Modal :visible="signUpSuccess" :footerHide="true">
          <br />
          <p class="center">签署完成，请等待供应商认证完成。</p>
          <br />
          <Button type="primary" class="btn-next-a" :to="{ name: 'supply-chain-home' }">完 成</Button>
        </Modal> -->
      </div>
      <div v-else>
        <br />
        <br />
        <br />
        <p class="center">
          <img :src="require('@/assets/images/success-toast.png')" style="width: 240px;" alt="" />
        </p>
        <br />
        <br />
        <p class="center">签署完成，请等待供应商认证完成。</p>
        <br />
        <Button type="primary" class="btn-next-a" :to="{ name: 'supply-chain-home' }">完 成</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Steps, Step, Form, FormItem, Input, Button } from 'view-design'
import { mapGetters, mapState } from 'vuex'
import { actionCode, roleStatus, roleName } from '@/config/index'
import { validateCheckForm } from '@/utils/index'
import { coreBusinessInfo, supplier1, supplier2, supplier3, check_finance } from '@/config/form-check'
import PdfView from '@/components/PdfView'

export default {
  components: {
    PdfView,

    Steps,
    Step,
    Form,
    FormItem,
    Input,
    Button
    // Spin,
    // Icon
  },
  data() {
    const validateCheck = (rule, value, callback) => {
      const actions = new Map([
        [roleName.finance.role_core.roleId, coreBusinessInfo],
        [roleName.finance.role_first_supplier.roleId, supplier1],
        [roleName.finance.role_second_supplier.roleId, supplier2],
        [roleName.finance.role_third_supplier.roleId, supplier3]
      ])
      return validateCheckForm(rule, value, callback, actions.get(this.currentRole))
    }
    const validateCheck2 = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, {})
    }
    const validateCheck3 = (rule, value, callback) => {
      return validateCheckForm(rule, value, callback, check_finance)
    }
    return {
      pdf_options: {
        pdfOpenParams: {
          toolbar: 0
        }
      },
      pdf_path: '/pdf/sc/contract2.pdf',
      hashShow: false,
      formData: {
        key1: '',
        key2: '',
        key3: '',
        key4: '',
        key5: '',
        key6: '',
        key7: '',
        key8: '',
        key9: ''
      },
      formData2: {
        key1: '',
        key2: '',
        key3: ''
      },
      formData3: {},
      rules: {
        key1: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key2: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key3: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key4: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key5: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key6: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key7: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key8: [{ required: true, validator: validateCheck, trigger: 'blur' }],
        key9: [{ required: true, validator: validateCheck, trigger: 'blur' }]
      },
      rules2: {
        key1: [{ required: true, validator: validateCheck2, trigger: 'blur' }],
        key2: [{ required: true, len: 11, message: '手机号格式错误', trigger: 'blur' }],
        key3: [{ required: true, validator: validateCheck2, trigger: 'blur' }]
      },
      rules3: {
        signature_code: [{ required: true, validator: validateCheck3, trigger: 'blur' }]
      },
      currentStep: 0,
      signupStep: 0, // 企业签章的步骤
      signUpSuccess: false // 签署合同成功弹窗
    }
  },
  computed: {
    ...mapState(['teamStatus']),
    ...mapGetters(['currentRole', 'platformApply', 'roleTypeKey']),
    dataObj() {
      let obj = {}
      switch (this.currentRole) {
        case roleName.finance.role_core.roleId:
          obj = this.filterData('0')
          break
        case roleName.finance.role_first_supplier.roleId:
          obj = this.filterData('1')
          break
        case roleName.finance.role_second_supplier.roleId:
          obj = this.filterData('2')
          break
        case roleName.finance.role_third_supplier.roleId:
          obj = this.filterData('3')
          break
      }
      return obj
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    curStep1() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          this.currentStep = 1
        }
      })
    },

    filterData(typeNumber) {
      const dataStatus = this.teamStatus[`entity_finance_p_form_${typeNumber}`].find(
        item => item.status_id === roleStatus.finance[`entity_finance_p_form_${typeNumber}`][`s_finance_p_form_${typeNumber}_has_apply`].status
      )
      const dataItem = dataStatus ? JSON.parse(dataStatus.data) : {}
      return dataItem
    },
    init() {
      // 已开签章
      if (
        this.platformApply.entityStatusList.includes(
          roleStatus.finance[this.platformApply.entityKey][`s_finance_p_form_${this.roleTypeKey}_open_elevisa`].status
        )
      ) {
        this.currentStep = 3
        this.signupStep = 3
      } else if (
        this.platformApply.entityStatusList.includes(
          roleStatus.finance[this.platformApply.entityKey][`s_finance_p_form_${this.roleTypeKey}_review_pass`].status
        )
      ) {
        // 审核通过
        this.currentStep = 3
        this.signupStep = 0
      } else if (
        this.platformApply.entityStatusList.includes(roleStatus.finance[this.platformApply.entityKey][`s_finance_p_form_${this.roleTypeKey}_has_apply`].status)
      ) {
        // 已申请
        this.currentStep = 2
      } else if (
        this.platformApply.entityStatusList.includes(roleStatus.finance[this.platformApply.entityKey][`s_finance_p_form_${this.roleTypeKey}_can_apply`].status)
      ) {
        // 可申请
        this.currentStep = 0
      }
    },
    // 申请
    async handleSubmit() {
      let actionid = ''
      switch (this.currentRole) {
        case roleName.finance.role_core.roleId:
          actionid = actionCode.finance.a_finance_p_form_0_apply
          break
        case roleName.finance.role_first_supplier.roleId:
          actionid = actionCode.finance.a_finance_p_form_1_apply
          break
        case roleName.finance.role_second_supplier.roleId:
          actionid = actionCode.finance.a_finance_p_form_2_apply
          break
        case roleName.finance.role_third_supplier.roleId:
          actionid = actionCode.finance.a_finance_p_form_3_apply
          break
      }
      this.$refs['formData2'].validate(valid => {
        if (valid) {
          const dataStr = JSON.stringify({ formData: this.formData, formData2: this.formData2 })
          this.$store.dispatch('changeStatus', { actionid, data: dataStr })
          this.currentStep = 2
        }
      })
    },
    // 开章签署
    async handleSignUp() {
      let actionid = ''
      switch (this.currentRole) {
        case roleName.finance.role_core.roleId:
          actionid = actionCode.finance.a_finance_p_form_0_open_elevisa
          break
        case roleName.finance.role_first_supplier.roleId:
          actionid = actionCode.finance.a_finance_p_form_1_open_elevisa
          break
        case roleName.finance.role_second_supplier.roleId:
          actionid = actionCode.finance.a_finance_p_form_2_open_elevisa
          break
        case roleName.finance.role_third_supplier.roleId:
          actionid = actionCode.finance.a_finance_p_form_3_open_elevisa
          break
      }
      this.$refs['formData3'].validate(async valid => {
        if (valid) {
          await this.$store.dispatch('changeStatus', { actionid })
          // this.signUpSuccess = true
          this.signupStep = 3
        }
      })
    }
  },
  watch: {
    platformApply() {
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.certification {
  &-content {
    margin: 30px auto;
    h2 {
      margin-bottom: 20px;
      font-size: 16px;
    }
    form,
    .form {
      width: 600px;
      margin: 0 auto;
    }
    .form {
      p {
        display: flex;
        flex-wrap: wrap;
        line-height: 25px;
        margin-bottom: 20px;
        label {
          display: block;
          width: 140px;
          text-align: right;
          margin-right: 5px;
        }
        span {
          display: block;
          flex: 1;
        }
      }
    }
  }
  .sh {
    width: 600px;
    margin: 50px auto;
    text-align: center;
    dl {
      margin: 50px 0 20px;
      dt {
        margin-bottom: 10px;
        font-size: 18px;
      }
    }
    .ivu-spin {
      width: 32px;
      margin: 0 auto;
    }
    p {
      text-align: left;
      line-height: 25px;
      padding: 0 100px;
      a {
        margin-left: 20px;
      }
    }
  }
  .sign-cr {
    &-content {
      width: 600px;
      height: 600px;
      border: 1px solid #eee;
      margin: 0 auto;
      text-align: center;
    }
  }
}
</style>

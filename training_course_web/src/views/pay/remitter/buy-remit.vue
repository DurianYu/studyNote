<template lang="html">
  <div class="page-pay-buy-remit">
    <header>
      <div class="title font2-b">
        购汇
      </div>
    </header>

    <section class="main page-space-l-t">
      <div class="box">
        <Table :data="data" :columns="columns" @on-row-click="onRowClick">
          <template slot-scope="{ row }" slot="coin">
            <Radio label="none" v-if="row.coin == '美元'">
              <strong>{{ row.coin }}</strong>
            </Radio>
            <Radio v-else label="none" disabled>
              <strong>{{ row.coin }}</strong>
            </Radio>
          </template>
        </Table>
      </div>
    </section>
  </div>
</template>

<script>
import { Table, Radio } from 'view-design'
// import Modal from '@/components/Modal'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  components: { Table, Radio },
  data() {
    return {
      columns: [
        {
          title: '币种',
          slot: 'coin'
        },
        {
          title: '现汇卖出价',
          key: 'price_remit'
        },
        {
          title: '现钞卖出价',
          key: 'price_foreign'
        }
      ],
      data: [
        {
          coin: '美元',
          price_remit: 697.35,
          price_foreign: 697.35
        },
        {
          coin: '港币',
          price_remit: 89.93,
          price_foreign: 89.93
        },
        {
          coin: '美镑',
          price_remit: 914.19,
          price_foreign: 914.19
        },
        {
          coin: '澳元',
          price_remit: 503.19,
          price_foreign: 503.19
        },
        {
          coin: '日元',
          price_remit: 6.6098,
          price_foreign: 6.6098
        },
        {
          coin: '欧元',
          price_remit: 825.15,
          price_foreign: 825.15
        },
        {
          coin: '加元',
          price_remit: 522.63,
          price_foreign: 522.63
        },
        {
          coin: '新元',
          price_remit: 509.29,
          price_foreign: 509.29
        }
      ]
    }
  },
  computed: {
    ...mapState(['smsList']),
    ...mapGetters(['smsUnReadNumber'])
  },
  methods: {
    ...mapMutations(['SETCOMPANY']),
    onRowClick(row) {
      if (row.coin == '美元') {
        this.$router.push({ name: 'pay-buy-remit-clause' })
      }
    },
    next() {
      this.$router.push({ name: 'lc-overview' })
    },
    setRead() {
      this.$fetch({
        uriCode: 'API1002',
        msg_type: 'sms',
        status: true
      })
        .then(() => {
          this.$store.dispatch('getUserInfo')
          this.$store.dispatch('getMsg')
        })
        .catch(() => {})
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.page-pay-buy-remit {
  ::v-deep {
    header {
      margin: 2rem 0 0 0;
      .title {
        text-align: center;
      }
    }
    .main {
      width: 100%;
      margin: 0 auto;

      .box {
        .ivu-table-row:nth-of-type(1) {
          cursor: pointer;
        }
      }

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

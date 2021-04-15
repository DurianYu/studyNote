<template>
  <Row :gutter="20">
    <Col span="12">
      <Card>
        <p slot="title">区块信息</p>
        <Table :columns="columns1" size="small" :data="blockList" :width="539" :height="450"></Table>
      </Card>
    </Col>
    <Col span="12">
      <Card>
        <p slot="title">交易信息</p>
        <Table :columns="columns2" size="small" :data="blockList" :width="539" :height="450">
          <template slot="deal_hash" slot-scope="{ row }">
            <a href="javascript:;" @click="$emit('toDetail', row)">{{ row.deal_hash }}</a>
          </template>
        </Table>
      </Card>
    </Col>
  </Row>
</template>

<script>
import { Row, Col, Card, Table } from 'view-design'
import { parseTime, RandomUtil, randomNum } from '@/utils/index'
export default {
  components: {
    Row,
    Col,
    Card,
    Table
  },
  data() {
    return {
      columns1: [
        {
          title: '区块高度',
          key: 'bc_height',
          width: 100,
          align: 'center'
        },
        {
          title: '出块时间',
          key: 'blockTimeStr',
          width: 160,
          align: 'center'
        },
        {
          title: '区块哈希',
          key: 'blockHash'
        }
      ],
      columns2: [
        {
          title: '交易哈希',
          slot: 'deal_hash'
        },
        {
          title: '所在区块',
          key: 'bc_height',
          width: 100,
          align: 'center'
        },
        {
          title: '交易时间',
          key: 'timeStr',
          width: 160,
          align: 'center'
        }
      ]
    }
  },
  computed: {
    blockList() {
      const arr = this.$store.state.chainList.map(item => {
        const content = JSON.parse(item.content)
        const blockTimeMath = randomNum(5, 10)
        return {
          ...item,
          ...content,
          timeStr: parseTime(content.time),
          bc_height: content.bc_height < 10 ? `00${content.bc_height}` : content.bc_height < 100 ? `0${content.bc_height}` : content.bc_height,
          creditTimeStr: content.credit_time && parseTime(content.credit_time),
          blockTimeStr: parseTime(+content.time + blockTimeMath),
          blockHash: RandomUtil.getLastHash()
        }
      })
      return arr
    }
  }
}
</script>

<style></style>

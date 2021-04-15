<template lang="html">
  <div ref="pdfview" id="pdfview"></div>
</template>

<script>
import PDFObject from 'pdfobject'

export default {
  name: 'PdfView',
  props: {
    path: {
      tyle: String,
      required: true
    },
    options: Object // {width: '100%', height: '100%'} detail please goto: https://pdfobject.com/#api
  },
  components: {},
  data() {
    return {
      domain: location.origin
    }
  },
  computed: {},
  watch: {
    path: function(new_val) {
      PDFObject.embed(`${this.domain}${new_val}`, this.$refs['pdfview'], this.options)
    }
  },
  methods: {},
  created() {},
  mounted() {
    PDFObject.embed(`${this.domain}${this.path}`, this.$refs['pdfview'], this.options)
  }
}
</script>

<style lang="scss">
#pdf-view {
  display: none;
}
#pdfview {
  height: 100%;
  width: auto;
  margin: 0px auto;
}
</style>

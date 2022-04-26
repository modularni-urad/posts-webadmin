export default {
  props: ['field', 'row'],
  computed: {
    list: function () {
      return this.row[this.field.key].split(',')
    }
  },
  template: `
  <span><b-badge v-for="i,idx in list" :key="idx">{{ i }}</b-badge></span>
  `
}

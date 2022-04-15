import ExtractGhostExport from '../importers/ghost.js'

export default {
  data: () => {
    return {
      items: false,
      statuses: {}
    }
  },
  props: [ 'cfg' ],
  methods: {
    onSelect: function (evt) {
      var reader = new FileReader()
      const self = this
            
      reader.onload = function (evt) {        
        const result = ExtractGhostExport(JSON.parse(evt.target.result))
        self.items = result.posts
        self.statuses = result.posts.reduce((acc, i) => {
          return Object.assign(acc, { [i.uuid]: null })
        }, {})
      }
      reader.onerror = function (evt) {
        console.error("An error ocurred reading the file", evt)
      }
      reader.readAsText(evt.target.files[0], "UTF-8")
    },
    doSave: function () {
      this.items.map(i => {
        this.$store.dispatch('send', { 
          method: 'post',
          url: this.cfg.url + '/import', 
          data: i
        }).then(res => this.statuses[i.uuid] = 'ok').catch(err => {
          this.statuses[i.uuid] = err.toString()
        })
      })
    }
  },
  template: `
  <div>
    <div v-if="items">
      <table>
        <tr v-for="i,idx in items" :key="idx">
          <td>{{ i.title }}</td>
          <td>{{ statuses[i.uuid] }}</td>
        </tr>
      </table>
      <b-button variant="primary" @click="doSave">uložit</b-button>
    </div>
    <div v-else>
      <label for="myfile">Vyber soubor s exportem:</label>
      <input type="file" name="myfile" @change="onSelect">
    </div>
  </div>
  `
}

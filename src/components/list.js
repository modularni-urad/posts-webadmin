import Actions from './actions.js'
import Importer from './importer.js'

export default {
  data: () => {
    return {
      importOpened: false
    }
  },
  props: ['query', 'cfg'],
  methods: {
    hidden: function () {
      this.importOpened = false
    }
  },
  components: { Actions, Importer },
  template: `
  <div>
    <ACListView :query="query" :cfg="cfg">
      
      <template v-slot:rightcontrols="{ cfg, add, query }">
        <b-button variant="primary" @click="add">
          <i class="fas fa-plus"></i> přidat
        </b-button>
        <b-button variant="secondary" @click="importOpened=true">
          <i class="fas fa-import"></i> importovat
        </b-button>
      </template>

      <template v-slot:actions="{ item, cfg, doEdit }">
        <Actions key="actions" :doEdit="doEdit" :item="item" :cfg="cfg" />
      </template>

    </ACListView>

    <b-modal @hidden="hidden" v-model="importOpened" size="xl" title="importer" hide-footer>
      <Importer :cfg="cfg" />    
    </b-modal>
  </div>
  `
}

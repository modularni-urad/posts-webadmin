import { ROUTE_NAMES, ADMIN_GROUP } from '../consts.js'
const nextState = {
  'draft': 'review',
  'review': 'published',
  'published': 'draft'
}

export default {
  props: ['doEdit', 'cfg', 'item'],
  computed: {
    muzuUpravit: function () {
      return (this.item.author === this.$store.getters.UID)
        || this.$store.getters.isMember(ADMIN_GROUP)
    },
    muzuPosunout: function () {
      const g = this.$store.getters
      const item = this.item
      return (item.author === g.UID.toString() && item.status === 'draft')
        || (g.isMember(ADMIN_GROUP) && item.status !== 'draft')
    },
    text: function () {
      return this.item.status === 'published' ? 'ODpublikovat' : 'publikovat'
    }
  },
  methods: {
    setState: function () {
      const status = nextState[this.item.status]
      if (this.item.status === 'published') {
        const ok = confirm('opravdu vrátit do stavu koncept?')
        if (!ok) return
      }
      this.$store.dispatch('send', { 
        method: 'put',
        url: `${this.cfg.url}${this.item.id}/status/${status}`
      }).then(res => this.item.status = status).catch(err => {
        this.$store.dispatch('onerror', err)
      })
    }
  },
  template: `
  <td>
    <b-button-group>
      <b-button v-if="muzuUpravit" size="sm" variant="primary" @click="doEdit(item)">
        <i class="fas fa-edit"></i> upravit
      </b-button>
      <b-button v-if="muzuPosunout" size="sm" variant="secondary" @click="setState()">
        <i class="fas" :class="item.status === 'published' ? 'fa-ban' : 'fa-upload'"></i> {{ text }}
      </b-button>
    </b-button-group>
  </td>
  `
}

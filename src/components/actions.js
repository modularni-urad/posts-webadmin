import { ROUTE_NAMES, ADMIN_GROUP } from '../consts.js'
const nextState = {
  'draft': 'review',
  'review': 'publihed',
  'publihed': 'draft'
}

export default {
  props: ['doEdit', 'cfg', 'row'],
  computed: {
    muzuUpravit: function () {
      return (this.row.author === this.$store.getters.UID)
        || this.$store.getters.isMember(ADMIN_GROUP)
    },
    muzuPosunout: function () {
      return (this.row.author === this.$store.getters.UID && this.row.status === 'draft')
        || (this.$store.getters.isMember(ADMIN_GROUP) && this.row.status !== 'draft')
    }
  },
  methods: {
    setState: function () {
      const status = nextState[this.row.status]
      this.$store.dispatch('send', { 
        method: 'put',
        url: `${this.cfg.url}${this.row.id}/status/${status}`
      }).then(res => this.row.status = status).catch(err => {
        this.$store.dispatch('onerror', err)
      })
    }
  },
  template: `
  <td>
    <b-button-group>
      <b-button v-if="muzuUpravit" size="sm" variant="primary" @click="doEdit(row)">
        <i class="fas fa-edit"></i> upravit
      </b-button>
      <b-button v-if="muzuPosunout" size="sm" variant="secondary" @click="setState()">
        <i class="fas fa-edit"></i> publikovat
      </b-button>
    </b-button-group>
  </td>
  `
}

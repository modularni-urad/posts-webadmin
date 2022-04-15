import ListComponent from './src/components/list.js'
import { ROUTE_NAMES, ADMIN_GROUP } from './src/consts.js'
import FORM_CONFIG from './src/formconfig.js'

export function createMenu (user) {
  return user.groups.indexOf(ADMIN_GROUP) >= 0
    ? { label: 'články', to: { name: ROUTE_NAMES.list } }
    : null
}

export async function setupRoutes (routes, path, cfg, initConfig) {
  const listCfg = Object.assign(cfg, { 
    conf: FORM_CONFIG,
    default_sort: 'created:asc'
  })
  await initConfig(listCfg)

  routes.push({
    path, 
    name: ROUTE_NAMES.list, 
    component: ListComponent, 
    props: route => {
      return { query: route.query, cfg: listCfg }
    }
  })
}
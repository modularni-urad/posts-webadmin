import ListComponent from './src/components/list.js'
import { ROUTE_NAMES } from './src/consts.js'
import FORM_CONFIG from './src/formconfig.js'

export function createMenu (user) {
  return { label: 'články', to: { name: ROUTE_NAMES.list } }
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
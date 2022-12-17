import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import useMenuStore from './modules/menus'
import useUserStore  from './modules/users'
import useServerStore from './modules/backServer'

const store = createPinia()
store.use(piniaPluginPersist)

export function registerStore( app ) {
  app.use( store )
}

export {useMenuStore,useUserStore,useServerStore}
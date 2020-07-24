// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import 'vue-material-design-icons/styles.css'
import Store from './store'
import gridsomeConfig from '../gridsome.config'

export default function (Vue, { router, head, appOptions }) {
  // Set default layout as a global component
  appOptions.store = Store

  Vue.component('Layout', DefaultLayout)

  head.meta.push({
    property: 'og:site_name',
    content: gridsomeConfig.siteName,
  })

  head.meta.push({
    property: 'description',
    content: 'Legumele şi fructele din Grădina Ninei sunt produse cu grijă, la cele mai înalte standarde de calitate şi prospeţime. Aveţi poftă de dulceaţă, compot sau zacuscă de casă? Avem de toate! Livrare direct la adresă',
  })

  head.meta.push({
    property: 'keywords',
    content: 'Legume, fructe, dulceaţă, compot, zacuscă, murături, roşii, suc de roşii, bulion, pastă de roşii, căpşuni, zmeură, fructe proaspete, legume proaspete, mănâncă sănătos, de casă, preparate de casă',
  })

  head.meta.push({
    property: 'author',
    content: 'juliageek',
  })

  head.meta.push({
    name: 'robots',
    content: 'index, follow',
  })
}

import Vue from 'vue'

import { mapGetters } from 'vuex'

const Settings = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          baseColor: 'settings/baseColor',
          baseHeight: 'settings/baseHeight',
          darkStatus: 'settings/darkStatus',
          organization: 'settings/organization',
          mediaUrl: 'settings/mediaUrl',
          baseUrl: 'settings/baseUrl',
        })
      }
    })
  }
}

Vue.use(Settings)
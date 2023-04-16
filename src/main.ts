import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/util'
import './style/common.scss'
import {GlobalCmComponent} from "codemirror-editor-vue3";


import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
import AIcon from 'ant-design-vue/lib/icon'

import {
  // create naive ui
  create,
  // component
  NButton, NSpace, NLayout, NLayoutHeader, NLayoutFooter, NLayoutContent,NScrollbar,
    NMenu,NCard,NRow,NCol,NCheckbox,NThing,NList,NListItem,NIcon
} from 'naive-ui';

const naive = create({
  components: [NButton, NSpace, NLayout, NLayoutHeader, NLayoutFooter, NLayoutContent,NScrollbar,
    NMenu,NCard,NRow,NCol,NCheckbox,NThing,NList,NListItem,NIcon]
})

const app = createApp(App);
// app.config.productionTip = false;

app.use(store)
    .use(router)
    .use(Antd)
    .use(naive)
    .use(GlobalCmComponent)
    .mount('#app')

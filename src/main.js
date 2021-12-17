import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
import { Table, TableColumn, Row, Col, Card, Button, ButtonGroup, Tooltip} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI);
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Tooltip)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

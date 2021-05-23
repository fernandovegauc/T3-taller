import Vue from "vue";
import App from "./App.vue";
import VueSocketIOExt from 'vue-socket.io-extended';
import { io } from 'socket.io-client';
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const socket = io("wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl",{ path: '/flights'}); //Options object to pass into SocketIO

Vue.use(VueSocketIOExt,socket);

Vue.config.productionTip = false;


new Vue({
  render: (h) => h(App),
}).$mount("#app");

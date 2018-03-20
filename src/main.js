import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router/router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import config from './config/config';
import axios from 'axios';
import VueI18n from 'vue-i18n';
import Locales from './i18n/locale';
import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';
import lodash from 'lodash';
import VueLocalStorage from 'vue-ls';
import store from '@/store';
import libs from '@/libs';
import vendors from '@/vendors/index.js';
import AnimatedVue from 'animated-vue'
import 'animate.css/animate.css'

Vue.use(AnimatedVue)
Vue.use(VueLocalStorage, {
    namespace: 'vuejs__'
});
Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(iView);
Vue.prototype.$lodash = lodash;
Vue.prototype.$config = config;
Vue.prototype.$ajax = vendors.ajax;
Vue.prototype.$axios = axios.create(
    config.axios
);
//自定义工具集
Vue.prototype.$libs=libs;
// 自动设置语言
const navLang = navigator.language;
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
const lang = window.localStorage.getItem('language') || localLang || 'zh-CN';

Vue.config.lang = lang;

// 多语言配置
const locales = Locales;
const mergeZH = Object.assign(zhLocale, locales['zh-CN']);
const mergeEN = Object.assign(enLocale, locales['en-US']);
Vue.locale('zh-CN', mergeZH);
Vue.locale('en-US', mergeEN);


// 路由配置
const RouterConfig = {
    mode: 'hash',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
let vueDemo=new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
});
//调试专用
window.vueDemo=vueDemo;
//导出vueDemo对象
export default vueDemo;
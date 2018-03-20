import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        is_login: true,
        content_src: '#/readme',
    },
    mutations: {
        //设置
        set_login(state, now_value) {
            state.is_login = now_value;
        },
        content_src(state, now_value) {
            state.content_src = '#' + now_value;
        },
    },
    actions: {
        //动作
        need_login(context) {
            context.commit('set_login', false);
        }
    }
});
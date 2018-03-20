import Vue from 'vue';
import {ajax} from './ajax';

let token = {
    get() {
        //获取
        let jwt_token = Vue.ls.get('jwt-token', false);
        return jwt_token;
    },
    set(new_token) {
        //设置
        let re = Vue.ls.set('jwt-token', new_token, 60 * 60 * 1000);
        return re;
    },
    can(callback, test = false) {
        //当token存在的时候执行
        let jwt_token = Vue.ls.get('jwt-token', false);

        if (jwt_token == false) {
            //token不存在就先获取token在执行回调函数
            ajax('getsid', {}, (ddd) => {
                console.log('token-get:',ddd);
                this.set(ddd.data);
                callback.call();
            }, () => {
            }, test);
        } else {
            callback.call();
        }
    }
}
export default token;

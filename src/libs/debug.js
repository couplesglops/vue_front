import vueDemo from '@/main.js'
const debug = {
    //超级登录
    s_login: () => {
          vueDemo.$ajax('s_login', { "s_key": "59f7f55439459", "user_id": "12" }, (res) => {
             console.log(res);
         });
    }
};
export default debug;
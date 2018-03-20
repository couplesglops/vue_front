import Env from './env';
import Qs from 'qs';
let config = {
    axios:{
        baseURL: 'http://wgj_demo.2xso.com/',
        paramsSerializer: (params)=>{
            return Qs.stringify(params);
        },
        transformRequest:(params)=>{
            return Qs.stringify(params);
        }
    },
    img_path_url:'/',
    env: Env,
    corder:{
        app_id:'123456'
    }
};
export default config;
export default {
    is_login:{
        0:'/home/index/is_login',
        method:'get',
        enctype:'multipart/form-data',
        token:true,
        interceptors(){

        }
    },
    getsid:{
        0:'/home/index/is_login',
        method:'get',
        enctype:'multipart/form-data',
        token:false,
        retype:'string',
        interceptors(){

        }
    }
};
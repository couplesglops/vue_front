const routers = [
    {
        path: '/',
        meta: {

            title: '主页'
        },
        component: (resolve) => require(['@/views/index.vue'], resolve)
    }

];
export default routers;
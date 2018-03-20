# 这是配置文件夹

这是api_config的配置格式

```
export default {
    is_login:{
        0:'/home/index/is_login',
        method:'get',
        enctype:'multipart/form-data',
        token:false,
        interceptors(){

        }
    },
};
```

|索引  | 含义 | 类型 | 默认值 |备注 |
|-|-|-|-|-|
|0|url|string|null|必填|




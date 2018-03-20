/**
 * 封装 axios app内http请求
 */

import axios from 'axios';
import api_config from '../config/api_config';
import config_c from '../config/config';
import token from './token';
import lodash from 'lodash';
import Vue from 'vue';
import test_data from '@/test_data';
const ajax_axios = axios.create(
    config_c.axios
);
const url = function (api_name, ddd) {
    let config = apiconfig(api_name);
    let params = {};
    let AUTH_TOKEN = token.get();

    if (config.method == 'get') {
        params = ddd;
    }

    params.sid = AUTH_TOKEN;
    let urlobj = parseURL(config_c.axios.baseURL + config[0]);

    urlobj.params = lodash.merge(urlobj.params, params);
    console.log('27:', urlobj);
    return assembleUrl(urlobj);
}

/**
 * 组装
 * @param urlObj
 */
function assembleUrl(urlObj) {
    urlObj.query = (function () {
        var ret = '?';
        for (let li in urlObj.params) {
            ret = ret + li + '=' + urlObj.params[li] + '&';
        }
        return ret;
    })();

    let a = document.createElement('a');
    a.href = urlObj.source;
    a.port = urlObj.port;
    a.hostname = urlObj.host;
    a.search = urlObj.query;
    a.hash = '#' + urlObj.hash;
    a.protocol = urlObj.protocol;
    return a.href;
}

/**
 * 解析
 * @param url
 * @returns {{source: *, protocol, host, port, query, params, file: string, hash, path, relative: string, segments}}
 */
function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;

    let re = {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
    if (re.port == '') {
        re.port = 80;
    }
    return re;
}



const ajax_http = function (api_name, ddd = {}, callback_success = false, error_callback = false) {
    let config = apiconfig(api_name);

    if (error_callback == false) {
        error_callback = error;
    }

    if (callback_success == false) {
        callback_success = success;
    }
    if (config == false) {
        error_callback('config-error');
    }
    let headers = {};
    let params = {};
    let AUTH_TOKEN = token.get();

    if (config.method == 'get') {
        params = ddd;
    }


    if (1 != 1) {
        if (AUTH_TOKEN && config['token']) {
            headers.Authorized = AUTH_TOKEN;
        }
    } else {
        if (AUTH_TOKEN && config['token']) {
            params.sid = AUTH_TOKEN;
        }


    }


    let callback_success2;
    if (typeof config.interceptors == 'function') {
        //存在拦截器
        callback_success2 = function (res) {
            return callback_success(config.interceptors(res));
        };
    } else {
        callback_success2 = callback_success;
    }
    console.log('ajax->:',
        {
            'config': config,
            'data': ddd,
            'header': headers,
            'callback_success2': callback_success2,
            'error_callback': error_callback
        });
    ajax_axios(config[0], {
        method: config.method,
        data: ddd,
        params: params,
        headers: headers
    }).then((res) => {
        if (config.retype === 'json') {
            try {
                JSON.parse(res.request.response);
                callback_success2(res);
            }
            catch (e) {
                Vue.ls.set(res.data.run_uniqid, res.data.data, 86400000 * 3);
                console.log('格式错误');
            }
        }
        else {
            callback_success2(res);
        }
    })
        .catch(error_callback);
};
const ajax = function (api_name, ddd = {}, callback_success = false, error_callback = false, test = false) {
    if (test) {
        let ress = {
            statusText: "OK",
            status: 200,
            data: {},
            request: {
                responseText: ""
            }
        };
        ress.data = test_data[api_name];
        ress.request.responseText = JSON.stringify(ress.data);
        callback_success(ress);
    }
    else {
        ajax_http(api_name, ddd, callback_success, error_callback);
    }
}
/**
 * 出现错误的处理
 * @param stringgg
 */
function error(stringgg) {
    console.error('d-error:', stringgg);
}

function success() {
    console.info(arguments);
}


/**
 * 获取配置信息
 * @param api_name
 * @returns {*}
 */
function apiconfig(api_name) {


    if (typeof api_config[api_name] == 'object') {
        let config = api_config[api_name];

        if (typeof config.method == 'undefined') {
            config.method = 'get';
        }
        //设置执行完成后
        if (typeof config.interceptors == 'undefined') {
            config.interceptors = false;
        }
        //判断返回类型
        if (typeof config.retype == 'undefined') {
            config.retype = 'json';
        }


        if (typeof config.token == 'undefined') {
            config.token = true;
        }

        if (typeof config.enctype == 'undefined') {
            config.enctype = 'application/x-www-form-urlencoded';
        }

        return config;
    }
    return false;
}

export { ajax, url };

import config from '@/config/config.js';
function img_id(id){
    return config.axios.baseURL+'home/file/pic/'+id;
}
export default img_id;
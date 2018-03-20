import config from '../config/config';
export default {
  methods: {
    img_http(path){
          return  config.img_path_url + path;
    },
    img_src(path){
         return path;
},
  }
}
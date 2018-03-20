<template>
    <!-- 小块显示器 -->
    <div class="lump animated" @click="dianji" v-bind:class="{fadeIn: active1}">
        <img :src="imgSrc" alt="">
        <!-- {{ info }} -->
    </div>
</template>
<script>
import banana from "../assets/imgs/banana.png";
import chicken from "../assets/imgs/chicken.png";
import cow from "../assets/imgs/cow.png";
import flower from "../assets/imgs/flower.png";
import fox from "../assets/imgs/fox.png";
import Image7 from "../assets/imgs/Image 7.png";
import Image8 from "../assets/imgs/Image 8.png";
import Image9 from "../assets/imgs/Image 9.png";
import Image13 from "../assets/imgs/Image 13.png";
export default {
  props: {
    info_x: {},
    info_y: {},
    info_t: {}
  },
  data() {
    return {
      active1: false
      //    info:{},
    };
  },
  computed: {
    imgSrc() {
      let src = "";
      switch (this.info_t) {
        case 1:
          src = banana;
          break;
        case 2:
          src = chicken;
          break;
        case 3:
          src = cow;
          break;
        case 4:
          src = flower;
          break;
        case 5:
          src = fox;
          break;
        case 6:
          src = Image8;
          break;
        case 7:
          src = Image9;
          break;
        case 8:
          src = Image7;
          break;
        default:
          src = Image13;
      }
      return src;
    }
  },
  components: {},
  methods: {
    dianji() {
      this.$emit("lump_click", {
        x: this.info_x,
        y: this.info_y,
        t: this.info_t
      });
      this.active1 = true;
      setTimeout(() => {
        this.active1 = false;
      }, 200);
    }
  },
  watch: {
    info_t: {
      handler(val, oldVal) {
        this.active1 = true;
        setTimeout(() => {
          this.active1 = false;
        }, 800);
      }
      //  deep:true
    }
  },
  created() {}
};
</script>
<style scoped>
.lump {
  width: 11.1%;
  height: auto;
  float: left;
  cursor: pointer;
}
img {
  width: 100%;
  height: 100%;
}
</style>
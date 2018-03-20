
<template>
    <div>
      <div class="content">
          <div class="box">
            <div v-for="heng in list">
                <div v-for="dian in heng">
                    <lump :info_x="dian.x" :info_y="dian.y" :info_t="dian.t" @lump_click="change" v-bind:class="{fadeInDown: hasError}"></lump>
                </div>
            </div>
        </div>
        <div class="plane">
            <h3>计分板:</h3>
            当前分数:{{grade}}
            <div v-if="laoda"> 我是主要</div>
            <input type="text" v-model="room" @change="room_change">
        </div>
      </div>
        
    </div>
</template>
<script>
import lodash from "lodash";
import lump from "./lump.vue";
export default {
  data() {
    return {
      room: 0,
      unqid: 0,
      laoda: true,
      grade: 0,
      socket: {},
      first: true,
      one: {
        x: -1,
        y: -1
      },
      two: {
        x: -1,
        y: -1
      },
      list: [
        [
          {
            x: 1,
            y: 1,
            t: 1
          }
        ]
      ],
      hasError: false
    };
  },
  components: {
    lump
  },
  methods: {
    room_change(){
        //房间变更
        this.primary_secondary();
    },
    primary_secondary(){
      //主次判断
      this.send("what1");

    setTimeout(() => {
      //初始化
      if (this.laoda) {
        //执行老大的初始化
        this.init();
      } else {
        //执行副本的初始化
        // 问老大 当前是什么情况
      }
    }, 1000);
    },
    send(msg) {
      let aa = {
        unqid: this.unqid,
        room: this.room,
        msg: msg
      };
      this.socket.emit("message", aa); //问谁是老大
    },
    receive(msg) {
      if (msg.room == this.room) {
        //自己房间
        if (msg.unqid == this.unqid) {
          //自己说的
        } else {
          //别人说的
          this.receive_call(msg.msg);
        }
      } else {
      }
    },
    receive_call2(msgob) {
      if (msgob.type == "qingkuang2") {
        //屏幕同步
        this.list = msgob.data;
      }
    },
    receive_call(msg) {
      //服务器发来的消息
      if (typeof msg == "object") {
        //复杂的消息
        return this.receive_call2(msg);
      }
      if (msg == "what1") {
        this.send("me_laoda");
      }
      if (msg == "me_laoda") {
        //有人说他是老大
        //我就是副本
        this.laoda = false;
        //同步屏幕
        //问老大什么情况
        this.send("qingkuang");
      }
      if (msg == "qingkuang") {
        //回复它
        //同步屏幕
        this.synchronization();
       
      }
    },
    init() {
      //创建完成
      let heng = [];
      let arr = [];

      for (let i = 0; i < 9; i++) {
        heng = [];
        for (let o = 0; o < 9; o++) {
          let dian = {};
          dian.x = i;
          dian.y = o;
          dian.t = this.$lodash.random(1, 8, false);
          heng.push(dian);
        }
        arr.push(heng);
      }
      this.list = arr;
      this.hasError = true;
      setTimeout(() => {
        this.xiaochu();
        this.hasError = false;
      }, 700);
    },
    change(lump_info) {
      if (this.first) {
        // 第一次点击
        this.one.x = lump_info.x;
        this.one.y = lump_info.y;
        this.first = false;
      } else {
        this.two.x = lump_info.x;
        this.two.y = lump_info.y;
        this.panduanxianglin();
      }
    },
    panduanxianglin() {
      //同列
      if (this.one.y == this.two.y) {
        if (Math.abs(this.one.x - this.two.x) <= 1) {
          this.xianglin();
        }
      } else if (this.one.x == this.two.x) {
        // 同行
        if (Math.abs(this.one.y - this.two.y) <= 1) {
          this.xianglin();
        }
      }
      // 不相邻的处理
      this.first = true;
    },
    xianglin() {
      // 相邻的替换
      setTimeout(() => {
        let first_t = this.list[this.one.x][this.one.y].t;
        this.list[this.one.x][this.one.y].t = this.list[this.two.x][
          this.two.y
        ].t;
        this.list[this.two.x][this.two.y].t = first_t;
        // 相邻图片相同
        let cc = this.xiaochu();
        if (cc) {
        } else {
          this.noxiangton();
        }
      }, 700);
    },
    noxiangton() {
      //相邻图片不相连 替换回去
      setTimeout(() => {
        let two_t = this.list[this.two.x][this.two.y].t;
        this.list[this.two.x][this.two.y].t = this.list[this.one.x][
          this.one.y
        ].t;
        this.list[this.one.x][this.one.y].t = two_t;
      }, 700);
    },
    xiaochu() {
      //便利区块
      let aa = false;
      for (let i = 0; i < 9; i++) {
        for (let o = 0; o < 9; o++) {
          let bb = this.xiaochu2(i, o);
          if (bb) {
            aa = true;
          }
        }
      }
      if (aa) {
        return true;
      } else {
        return false;
      }
    },
    xiaochu2(x, y) {
      // 延伸遍历
      if (this.yanshen5(x, y) || this.yanshen4(x, y) || this.yanshen3(x, y)) {
        this.yanshen5(x, y);
        this.yanshen4(x, y);
        this.yanshen3(x, y);
        return true;
      } else {
        return false;
      }
    },
    yanshen3(x, y) {
      // 三个的延伸
      // 横向
      if (this.yanshen(x, y, 3, 1) || this.yanshen(x, y, 3, 2)) {
        this.yanshen(x, y, 3, 1);
        this.yanshen(x, y, 3, 2);
        return true;
      } else {
        return false;
      }
    },
    yanshen4(x, y) {
      // 4个的延伸
      // 横向
      if (this.yanshen(x, y, 4, 1) || this.yanshen(x, y, 4, 2)) {
        this.yanshen(x, y, 4, 1);
        this.yanshen(x, y, 4, 2);
        return true;
      } else {
        return false;
      }
    },
    yanshen5(x, y) {
      // 5个的延伸
      // 横向
      if (this.yanshen(x, y, 5, 1) || this.yanshen(x, y, 5, 2)) {
        this.yanshen(x, y, 5, 1);
        this.yanshen(x, y, 5, 2);
        return true;
      } else {
        return false;
      }
    },
    yanshen(x, y, l = 3, f = 1) {
      let t1, t2;
      t1 = this.list[x][y].t;
      if (t1 === -1) {
        return false;
      }
      if (f === 1) {
        // 横向
        if (x < 10 - l) {
          for (let i = 1; i < l; i++) {
            t2 = this.list[x + i][y].t;
            if (t1 == t2) {
              // 继续判断
            } else {
              return false;
            }
          }
          // 延伸完成
          this.yanshen3call([x, y], l, f);
          return true;
        }
      } else {
        //竖向
        if (y < 10 - l) {
          for (let i = 1; i < l; i++) {
            t2 = this.list[x][y + i].t;
            if (t1 == t2) {
              // 继续判断
            } else {
              return false;
            }
          }
          // 延伸完成
          this.yanshen3call([x, y], l, f);
          return true;
        }
      }
      return false;
    },
    yanshen3call(lump1, l, f) {
      //延伸 相同 的 处理
      let x1, y1;
      for (let i = 0; i < l; i++) {
        if (f == 1) {
          // 横向
          x1 = lump1[0] + i;
          y1 = lump1[1];
        } else {
          x1 = lump1[0];
          y1 = lump1[1] + i;
        }
        this.list[x1][y1].t = -1;
        if (this.list[x1][y1].t == -1) {
          this.grade++;
          this.list[x1][y1].t = this.$lodash.random(1, 8, false);
          //同步
          this.synchronization();
          this.xiaochu();
        }
      }
    },
    synchronization() {
      //同步方法
       this.send({
          type: "qingkuang2",
          data: this.list
        });
    },
    rand_lump() {}
  },

  beforeCreate() {},
  created() {
    this.unqid = lodash.random(100000, 999990);
    this.room = lodash.random(100, 999);
    this.socket = io("http://localhost:3000");

    this.socket.on("message", msg => {
      this.receive(msg);
    });

    this.primary_secondary();
    
  }
};
</script>

<style scoped>
.content{
  width: 100%;
}
.box {
  overflow: hidden;
  width: 100%;
  background-color: #000;
  margin: auto;
  padding: 10px;
}
.plane {
  width: 100%;
  background-color: #1ee9ff;
  height: 100px;
  margin: auto;
}
</style>

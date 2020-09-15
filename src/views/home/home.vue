<template>
  <div class="home" v-cloak>
    <div class="my-top">
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item>
          <van-image
            v-cloak
            class="img-responsive"
            src="../images/home/banner-home.png"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="my-box">
      <!-- banner -->
      <van-swipe
        class="banner-home"
        v-if="code === '3'"
        style="margin-top: 10px;"
        indicator-color="white"
        height="152"
      >
        <van-swipe-item v-if="Object.keys(userInfo).length !== 0">
          <div style="padding: 30px;">
            <div class="head-o bg2" v-if="code === '3'" v-cloak>
              <van-row class="pb18">
                <van-col span="12"
                  ><span class="home-user" v-cloak>{{
                    userInfo.type_name
                  }}</span></van-col
                >
                <van-col
                  span="12"
                  class="text-align-right"
                  v-show="!!userInfo.addr"
                  ><span v-cloak class="home-address"
                    >参保地：{{ userInfo.addr }}</span
                  >
                </van-col>
              </van-row>
              <van-row class="">
                <van-col span="16">
                  <p class="home-name" v-cloak>{{ userInfo.name }}</p>
                  <p class="home-price" v-show="priceShow === true">
                    <span v-cloak
                      >账户余额：{{ userInfo.balance | money }}元</span
                    >
                    <van-icon
                      @click="eyeBtn"
                      class="ml5 f21"
                      name="/template/images/home/eye.png"
                    />
                  </p>
                  <p class="home-price" v-show="priceShow === false">
                    <span v-cloak>账户余额：{{ userInfo.price }}元</span>
                    <van-icon
                      @click="eyeBtn"
                      class="ml5 f21"
                      name="/template/images/home/baomi.png"
                    />
                  </p>
                </van-col>
                <van-col span="8" class="text-align-right">
                  <p class="home-date">首次参保:</p>
                  <p class="home-time" v-cloak>
                    {{ userInfo.time | dateFormat }}
                  </p>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item v-if="userItem.length !== 0">
          <div style="padding: 30px;">
            <div class="head-o bg2" v-if="code === '3'" v-cloak>
              <van-row class="pb18">
                <van-col span="12"
                  ><span class="home-user" v-cloak>{{
                    cz_ly.type_name
                  }}</span></van-col
                >
                <van-col span="12" class="text-align-right">
                  <div v-cloak class="home-address" @click="onAddr">
                    参保地：{{ cz_ly.addr }}
                    <van-icon v-show="addrArr.length > 1" name="arrow-down" />
                    <!-- <i class="down"></i> -->
                  </div>
                </van-col>
              </van-row>
              <van-row>
                <van-col span="16">
                  <p class="home-name" v-cloak>{{ cz_ly.name }}</p>
                  <p class="home-price" v-show="priceShow === true">
                    <span v-cloak>账户余额：{{ cz_ly.balance | money }}元</span>
                    <van-icon
                      @click="eyeBtn"
                      class="ml5 f21"
                      name="/template/images/home/eye.png"
                    />
                  </p>
                  <p class="home-price" v-show="priceShow === false">
                    <span v-cloak>账户余额：{{ cz_ly.price }}元</span>
                    <van-icon
                      @click="eyeBtn"
                      class="ml5 f21"
                      name="/template/images/home/baomi.png"
                    />
                  </p>
                </van-col>
                <van-col
                  span="8"
                  class="text-align-right"
                  v-show="!!cz_ly.time"
                >
                  <p class="home-date">首次参保:</p>
                  <p class="home-time" v-cloak>{{ cz_ly.time | dateFormat }}</p>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="home-list" v-if="code === '1' || code === '2'">
        <div class="head-o bg" v-if="code === '1'" v-cloak>
          <van-row>
            <van-col span="24">
              <h3 class="home-title">尚未绑定社保卡</h3>
            </van-col>
            <van-col span="24">
              <p class="home-details">绑定人社部电子社保卡，查询社保信息</p>
            </van-col>
            <van-col span="24">
              <van-button
                class="home-btn"
                round
                size="small"
                @click="go(binding)"
                type="info"
                >前往绑定</van-button
              >
            </van-col>
          </van-row>
        </div>

        <div class="head-o bg3 just-list" v-if="code === '2'" v-cloak>
          <van-row>
            <van-col span="24">
              <h3 class="home-nodata">未查询到您的养老参保信息</h3>
            </van-col>
          </van-row>
        </div>
      </div>

      <div class="">
        <div class="header pt10">
          <span class="item-title_text role-title_text" v-cloak>{{
            navTitle
          }}</span>
        </div>
        <div>
          <van-swipe class="hot-list" :autoplay="3000">
            <van-swipe-item>
              <van-grid :column-num="4" icon-size=".30rem" :border="false">
                <van-grid-item
                  v-cloak
                  :key="inx"
                  v-for="(item, inx) in navArr.slice(0, 4)"
                  @click="go(item.url)"
                  :icon="item.ionic"
                  :text="item.title"
                />
              </van-grid>
            </van-swipe-item>
            <van-swipe-item v-if="navArr.length > 4">
              <van-grid :column-num="4" icon-size=".30rem" :border="false">
                <van-grid-item
                  v-cloak
                  :key="inx"
                  v-for="(item, inx) in navArr.slice(4, 8)"
                  @click="go(item.url)"
                  :icon="item.ionic"
                  :text="item.title"
                />
              </van-grid>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <div class="">
        <div class="header pt10">
          <span class="item-title_text role-title_text">
            <span v-cloak>{{ listTitle }}</span>
          </span>
        </div>
        <div class="p15 public-nav" style="padding-bottom: 0;">
          <van-row gutter="15">
            <van-col
              span="12"
              class="mb15"
              :key="inx"
              v-for="(item, inx) in listArr"
              @click="go(item.url)"
            >
              <van-row class="just-list h60 box-shadow">
                <van-col span="10" class="just-list">
                  <i
                    class="van-icon van-grid-item__icon just-list"
                    style="font-size: 0.25rem;"
                    ><img :src="item.ionic" class="van-icon__image" />
                  </i>
                </van-col>
                <van-col span="14">
                  <span class="van-grid-item__text" v-cloak>{{
                    item.title
                  }}</span>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="">
        <div class="header pt10">
          <span class="item-title_text role-title_text">
            <span v-cloak>{{ conTitle }}</span>
          </span>
        </div>
        <div class="p15 public-nav" style="padding-bottom: 0;">
          <van-row gutter="15">
            <van-col
              span="12"
              class="mb15"
              :key="inx"
              v-for="(item, inx) in conArr"
              @click="go(item.url)"
            >
              <van-row class="just-list h60 box-shadow">
                <van-col span="10" class="just-list">
                  <i
                    class="van-icon van-grid-item__icon just-list"
                    style="font-size: 0.25rem;"
                    ><img :src="item.ionic" class="van-icon__image" />
                  </i>
                </van-col>
                <van-col span="14">
                  <span class="van-grid-item__text" v-cloak>{{
                    item.title
                  }}</span>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </div>
      <div class="">
        <div class="header pt10">
          <span class="item-title_text role-title_text" v-cloak>疫情专区</span>
        </div>
        <div class="p15">
          <van-row gutter="15">
            <van-col
              span="24"
              class="mb15"
              :key="inx"
              v-for="(item, inx) in sepArr"
              @click="go(item.url)"
            >
              <van-row class="just-list box-shadow">
                <van-col span="4" class="just-list">
                  <img class="sep-icon" :src="item.icon" alt="" />
                </van-col>
                <van-col span="12">
                  <h3 class="h3" v-cloak>{{ item.title }}</h3>
                  <p class="p" v-cloak>{{ item.details }}</p>
                </van-col>
                <van-col span="8" class="just-list sepMan">
                  <img class="sep-img" :src="item.img" alt="" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <!-- 参保地区选择 -->
    <van-popup v-model="showAddr" position="bottom" class="addr">
      <van-picker
        show-toolbar
        :columns="addrArr"
        @cancel="showAddr = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <div style="padding: 0.36rem;"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/" class="text-nav">
        <span v-cloak>首页</span>
        <template slot="icon" slot-scope="props">
          <img
            v-cloak
            :src="props.active ? iconHome.active : iconHome.inactive"
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item
        url="https://card.wecity.qq.com/v2/scan-code-depart?channel=AAE-4VDBV6XgltQo6MpiVyX4"
        class="erweima-nav"
      >
        <span></span>
        <template>
          <img
            v-cloak
            class="img-responsive erweima"
            src="/template/images/home/erweima.png"
            alt=""
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item url="https://gxrswx.healthan.net/my" class="text-nav">
        <span v-cloak>个人中心</span>
        <template slot="icon" slot-scope="props">
          <img v-cloak :src="props.active ? iconMy.active : iconMy.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from 'vant'
import axios from 'axios'
export default {
  filters: {
    money(val) {
      val = val.toString().replace(/\$|,/g, '')
      if (isNaN(val)) {
        val = '0'
      }
      let sign = val == (val = Math.abs(val))
      val = Math.floor(val * 100 + 0.50000000001)
      let cents = val % 100
      val = Math.floor(val / 100).toString()
      if (cents < 10) {
        cents = '0' + cents
      }
      for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
        val =
          val.substring(0, val.length - (4 * i + 3)) +
          ',' +
          val.substring(val.length - (4 * i + 3))
      }

      return (sign ? '' : '-') + val + '.' + cents
    },
    dateFormat(t) {
      if (t === null || t === '') {
        return ''
      }
      let arr = t.split('-')
      return arr[0] + '年' + arr[1] + '月'
    },
  },
  data() {
    return {
      active: 0,
      code: '1',
      price: '',
      priceShow: true,
      binding: '',
      showAddr: false, // 切换参保地
      userItem: [], // 城镇养老多条
      cz_ly: {
        // 默认显示第一条城镇养老信息
        addr: '',
        balance: '',
        type: '',
        time: '',
        type_name: '',
        url: '',
        name: '',
      },
      userInfo: {},
      iconHome: {
        active: '/template/images/home/home_avt.png',
        inactive: '/template/images/home/home.png',
      },
      iconMy: {
        active: '/template/images/home/my_avt.png',
        inactive: '/template/images/home/my.png',
      },
      // 公众服务
      listArr: [],
      listTitle: '',
      // 便民服务
      conArr: [],
      conTitle: '',
      // 热点业务
      navArr: [],
      navTitle: '',
      sepArr: [
        {
          // 疫情
          icon: '/template/images/home/sep1.png',
          title: '疫情就是命令 防控就是责任',
          details: '抗击疫情 我们众志成城',
          img: '/template/images/home/sep3.png',
          url: 'https://agxapp.141.demo.healthan.com.cn/h5/page/xxfyfk3',
        },
      ],
      // 参保地
      addrArr: [],
      yl_info: {
        error: '0',
        code: '3',
        msg: '',
        data: {
          socialInfo: {
            jg: {
              addr_code: '',
              addr: '',
              list: {
                addr: null,
                balance: '41585.08',
                type: '2',
                time: '2014-10-01',
                type_name: '机关养老账户',
                url:
                  'http://localhost.gxrswx.com/sb/SocialYh/findInsuranceV_AC50',
                name: '黄日烨',
              },
            },
            zg: [
              {
                addr_code: '459900',
                addr: '广西区本级',
                list: {
                  addr: '广西区本级',
                  balance: '2600.2',
                  type: '1',
                  time: '',
                  type_name: '城镇职工养老账户',
                  url: 'http://localhost.gxrswx.com/sb/social/ylBalanceQuery',
                  name: '黄日烨',
                },
              },
              {
                addr_code: '450999',
                addr: '玉林市本级',
                list: {
                  addr: '玉林市本级',
                  balance: '2600.2',
                  type: '1',
                  time: '',
                  type_name: '城镇职工养老账户',
                  url: 'http://localhost.gxrswx.com/sb/social/ylBalanceQuery',
                  name: '黄日烨',
                },
              },
            ],
          },
        },
      },
    }
  },
  created() {
    this.getUserinfo()
    // this.getList()
    this.priceShow = JSON.parse(localStorage.getItem('priceShow'))
    if (this.priceShow === null) {
      this.priceShow = true
    }
  },
  methods: {
    // 请求方法封装
    ajaxPost(url, params, method, callfunc, async) {
      axios({
        method: method,
        url: url,
        data: params,
        withCredentials: async,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then(function(result) {
          if (callfunc) {
            callfunc(result)
          }
        })
        .catch(function() {
          Toast('系统异常,请重试!')
        })
    },
    // 参保地区选择
    onAddr() {
      this.addrArr.length > 1 ? (this.showAddr = true) : ''
      event.stopPropagation()
    },
    onConfirm(value) {
      this.showAddr = false
      this.userItem.forEach(val => {
        if (value.code === val.addr_code) {
          this.cz_ly = val.list
          // 城镇
          this.cz_ly.price = this.cz_ly.balance.replace('.', '')
          this.cz_ly.price = this.plusXing(this.cz_ly.price)
        }
      })
    },
    // 获取社保卡信息
    getUserinfo() {
      // let item = JSON.parse(this.yl_info)
      // let item = JSON.parse(this.yl_info)
      let item = this.yl_info
      // console.log(item)
      if (item.error === '0' && item.code === '3') {
        this.code = item.code
        // 机关养老
        if (Object.keys(item.data.socialInfo.jg).length === 0) {
          this.userInfo = {}
        } else {
          this.userInfo = item.data.socialInfo.jg.list
          console.log(this.userInfo)
          // 机关
          this.userInfo.price = this.userInfo.balance.replace('.', '')
          this.userInfo.price = this.plusXing(this.userInfo.price)
        }

        // 城镇养老
        this.userItem = item.data.socialInfo.zg
        if (this.userItem.length !== 0) {
          this.cz_ly = item.data.socialInfo.zg[0].list
          // 城镇
          this.cz_ly.price = this.cz_ly.balance.replace('.', '')
          this.cz_ly.price = this.plusXing(this.cz_ly.price)
          // 地区
          this.addrArr = item.data.socialInfo.zg.map(v => {
            return {
              text: v.addr,
              code: v.addr_code,
            }
          })
          // console.log(this.addrArr)
        }
      }
      if (item.error === '0' && item.code === '1') {
        this.code = item.code
        this.binding = item.data.socialInfo.url
      }
      if (item.error === '0' && item.code === '2') {
        this.code = item.code
      }
    },
    // 格式化金额星号
    plusXing() {
      var xing = '******'
      // for (var i = 0; i < str.length; i++) {
      //   xing += '*'
      // }
      return xing
    },
    // 显示隐藏金额
    eyeBtn() {
      event.stopPropagation()
      this.priceShow = !this.priceShow
      this.setItem('priceShow', this.priceShow)
    },
    setItem(key, value) {
      localStorage.setItem(key, value)
    },
    // 获取列表宫格
    // getList() {
    //   let items = JSON.parse(menu_info)
    //   // console.log(items)
    //   if (items.error === 0) {
    //     let listData = items.data
    //     console.log(listData)
    //     listData.forEach(v => {
    //       if (v.nav_code === 'HotNav') {
    //         // 热点业务
    //         this.navTitle = v.nav_name
    //         this.navArr = this.resetData(v.list)
    //       } else if (v.nav_code === 'PublicService') {
    //         // 公众服务
    //         this.listTitle = v.nav_name
    //         this.listArr = this.resetData(v.list)
    //       } else if (v.nav_code === 'PeopleService') {
    //         // 便民服务
    //         this.conTitle = v.nav_name
    //         this.conArr = this.resetData(v.list)
    //       } else if (v.nav_code === 'Epidemic') {
    //         // this.sepArr =
    //       }
    //     })
    //   }
    // },
    // 重组宫格数据结构
    resetData(v) {
      return v.map(value => {
        return {
          title: value.button_name,
          ionic: value.button_img,
          url: value.button_url,
        }
      })
    },
    // 跳转链接
    go(url) {
      window.location.href = url
    },
  },
}
</script>

<style>
html {
  background-color: #f4f7fd;
  color: #000;
}
.my-top {
  position: relative;
}

.my-box {
  position: relative;
  margin-top: -270rem;
  padding-top: 30px;
  width: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.my-box .home-list {
  padding: 30px;
  background-color: unset;
  margin-top: 12px;
}
.my-box .head-o .van-swipe__indicator:not(:last-child) {
  margin-right: 10px;
}
.my-box .head-o {
  min-height: 120px;
  box-shadow: 0 0 0.13rem rgba(40, 125, 226, 0.35);
  border-radius: 0.08rem;
  padding-top: 20px;
  padding-right: 30px;
  padding-bottom: 10px;
  padding-left: 30px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.my-box .head-o.bg {
  background-image: url('/template/images/home/home-bg1.png');
  background-size: cover;
}

.my-box .head-o.bg2 {
  background-image: url('/template/images/home/home-bg2.png');
  background-size: cover;
}

.my-box .head-o.bg3 {
  background-image: url('/template/images/home/home-bg3.png');
  background-size: cover;
}

.my-box .head-o .home-title {
  font-size: 28px;
  color: #feffff;
  padding-bottom: 24px;
}

.my-box .head-o .home-details {
  font-size: 12px;
  color: #feffff;
  padding-bottom: 24px;
}

.my-box .head-o .home-btn {
  background-color: #fff;
  color: #287de2;
  font-size: 26px;
  border-radius: 0.23rem;
  font-weight: 800;
  padding: 0 20px;
}

.my-box .head-o .home-user {
  font-size: 30px;
  color: #fff;
}

.my-box .head-o .home-address {
  font-size: 30px;
  color: #fff;
}

.my-box .head-o .home-name {
  line-height: 21px;
  font-size: 30px;
  color: #fff;
  padding-bottom: 20px;
}

.my-box .head-o .home-price {
  line-height: 21px;
  font-size: 30px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: start;
}

.my-box .head-o .home-date {
  line-height: 21px;
  font-size: 30px;
  color: #fff;
  padding-bottom: 20px;
  text-align: right;
}

.my-box .head-o .home-time {
  line-height: 30px;
  font-size: 30px;
  color: #fff;
  text-align: right;
}

.my-box .head-o .home-nodata {
  font-size: 30px;
  color: #fff;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 20px;
}

.hot-list .van-swipe__indicator {
  background-color: #7db1ee;
}

.hot-list .van-swipe__indicator--active {
  background-color: #3b86e0;
  padding: 0px 5px;
  opacity: 1;
  border-radius: 8px;
}

.home .van-swipe__indicators {
  bottom: 0;
}
.home .banner-home .van-swipe__indicators {
  bottom: 25px;
}
.my-box .head-o .van-grid-item__content {
  padding: 0.085rem 0.08rem;
}

.text-align-right {
  text-align: right;
}

.mt10 {
  margin-top: 20px;
}

.ml5 {
  margin-left: 10px;
}

.pt10 {
  padding-top: 20px;
}

.pb10 {
  padding-bottom: 20px;
}

.pb18 {
  padding-bottom: 20px;
}

.mb10 {
  margin-bottom: 20px;
}

.mb15 {
  margin-bottom: 30px;
}

.mb20 {
  margin-bottom: 40px;
}

.fw {
  font-weight: bold;
}

.f18 {
  font-size: 36px;
}

.f14 {
  font-size: 28px;
}

.c-blue {
  color: #2d63a9;
}

.f15 {
  font-size: 30px;
}

.box-shadow {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 25px 0px rgba(0, 0, 0, 0.05);
  border-radius: 16px;
}

.h60 {
  height: 100px;
}

.h75 {
  height: 150px;
}

.p10 {
  padding: 20px;
}

.p15 {
  padding: 30px;
}

.pl10 {
  padding-left: 20px;
}

.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}

.sep-icon {
  max-width: 100%;
  width: 60px;
  height: 60px;
  display: -webkit-box;
  -webkit-box-pack: center;
}

.home .item-title_text {
  display: block;
  position: relative;
  padding: 0 30px;
  text-indent: 24px;
  color: #111111;
  font-size: 30px;
  font-weight: bold;
}

.home .item-title_text:before {
  content: '';
  position: absolute;
  top: 0;
  background-color: #3b86e0;
  width: 0.055rem;
  height: 30px;
  border-radius: 11px;
  left: 30px;
}

.home .van-grid-item__text {
  color: #333333;
  font-size: 30px;
  word-wrap: break-word;
  text-align: left;
  line-height: 40px;
  display: -webkit-box;
  -webkit-box-pack: start;
}

.home .public-nav .van-grid-item__text {
  font-size: 30px;
}

.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-box {
  padding-top: 40px;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 20px;
}

.list-details {
  font-size: 24px;
  color: #2d63a9;
}

.list-img {
  max-width: 100%;
  height: auto;
  display: block;
}

.home .h3 {
  font-size: 28px;
  font-weight: bold;
  color: #333333;
  padding-bottom: 20px;
}

.home .p {
  font-size: 24px;
  font-weight: 500;
  color: #666666;
}

.text-middle {
  display: -webkit-box;
  -webkit-box-pack: center;
}

.erweima {
  width: 100px;
  margin-top: -50px;
  position: relative;
  z-index: 9;
}

.home .van-tabbar {
  height: 100px;
}

.home .van-tabbar-item {
  color: #666666;
  font-size: 24px;
}

.home .van-tabbar-item--active {
  color: #2d63a9;
}

.home .van-tabbar {
  background-color: #f8f8f8;
}

.home .van-hairline--top-bottom::after,
.home .van-hairline-unset--top-bottom::after {
  border-width: 0;
}

.sepMan {
  position: relative;
  height: 153px;
  z-index: 0;
}

.sep-img {
  height: 165px;
  display: -webkit-box;
  -webkit-box-pack: center;
  position: absolute;
  bottom: 0px;
  z-index: 0;
  right: 20px;
}

.text-nav .van-tabbar-item__icon img {
  display: block;
  height: 44px;
}

.erweima-nav .van-tabbar-item__icon img {
  display: block;
  height: auto;
}
.home .van-grid-item__content {
  background-color: #f4f7ff;
}
.pr60 {
  padding-right: 120px;
}
.down {
  width: 0;
  height: 0;
  border-right: 7px solid transparent;
  border-left: 7px solid transparent;
  border-top: 8px solid #fdfeff;
  position: relative;
  display: inline-block;
  font: normal normal normal 14px/1 vant-icon;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}
.f21 {
  font-size: 42px;
}
</style>

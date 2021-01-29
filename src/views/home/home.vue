<template>
  <div id="home" class="home">
    <div class="my-top">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <van-image class="img-responsive" :src="banner" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="my-box">
      <!-- banner -->
      <van-swipe class="banner-home" v-if="code === 3" indicator-color="white">
        <!-- 机关养老 -->
        <van-swipe-item v-if="Object.keys(userInfo).length !== 0">
          <div style="padding: 15px;">
            <div class="head-o bg2" v-if="code === 3" v-cloak>
              <van-row>
                <van-col class="h80" span="12" @click="toGo('/info')">
                  <van-row>
                    <!-- 类型 -->
                    <van-col span="24" class="pb10"
                      ><span class="home-user" v-cloak>{{
                        userInfo.type_name
                      }}</span></van-col
                    >
                    <van-col span="24">
                      <!-- 姓名 -->
                      <p class="home-name" v-cloak>{{ userInfo.name }}</p>
                      <!-- 余额 -->
                      <p class="home-price" v-show="priceShow === true">
                        <span v-cloak>余额：{{ userInfo.balance }}元</span>
                        <van-icon @click="eyeBtn" class="ml5 f21" :name="eye" />
                      </p>
                      <p class="home-price" v-show="priceShow === false">
                        <span v-cloak>余额：{{ userInfo.price }}元</span>
                        <van-icon
                          @click="eyeBtn"
                          class="ml5 f21"
                          :name="baomi"
                        />
                      </p>
                    </van-col>
                  </van-row>
                </van-col>
                <van-col class="h80" span="12" @click="toGo('/Insured')">
                  <van-row>
                    <!-- 参保地 -->
                    <van-col span="24" class="text-align-right pb10"
                      ><span v-cloak class="home-address"
                        >参保地：{{ userInfo.addr }}</span
                      >
                    </van-col>

                    <van-col span="24" class="text-align-right">
                      <p class="home-date">首次参保:</p>
                      <p class="home-time" v-cloak>
                        {{ userInfo.time }}
                      </p>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
        <!-- 城镇职工养老 -->
        <van-swipe-item v-if="userItem.length !== 0">
          <div class="banner-sel">
            <div class="head-o bg2" v-if="code === 3" v-cloak>
              <van-row>
                <van-col class="h80" span="12" @click="toGo('/info')">
                  <van-row>
                    <van-col span="24" class="pb10"
                      ><span class="home-user" v-cloak>{{
                        cz_ly.type_name
                      }}</span></van-col
                    >

                    <van-col span="24">
                      <p class="home-name" v-cloak>{{ cz_ly.name }}</p>
                      <p class="home-price" v-show="priceShow === true">
                        <span v-cloak>余额：{{ cz_ly.balance }}元</span>
                        <van-icon @click="eyeBtn" class="ml5 f21" :name="eye" />
                      </p>
                      <p class="home-price" v-show="priceShow === false">
                        <span v-cloak>余额：{{ cz_ly.price }}元</span>
                        <van-icon
                          @click="eyeBtn"
                          class="ml5 f21"
                          :name="baomi"
                        />
                      </p>
                    </van-col>
                  </van-row>
                </van-col>
                <van-col class="h80" span="12" @click="toGo('/Insured')">
                  <van-row>
                    <!-- 参保地 -->
                    <van-col span="24" class="text-align-right pb10">
                      <div
                        v-cloak
                        class="home-address"
                        @click="onAddr('/Insured')"
                      >
                        参保地：{{ cz_ly.addr }}
                        <van-icon
                          v-show="addrArr.length > 1"
                          name="arrow-down"
                        />
                        <!-- <i class="down"></i> -->
                      </div>
                    </van-col>

                    <van-col
                      span="24"
                      class="text-align-right"
                      v-show="!!cz_ly.time"
                    >
                      <p class="home-date">首次参保:</p>
                      <p class="home-time" v-cloak>
                        {{ cz_ly.time }}
                      </p>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
      <div class="home-list" v-if="code === 1 || code === 2">
        <div class="head-o bg" v-if="code === 1" v-cloak>
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

        <div class="head-o bg3 just-list" v-if="code === 2" v-cloak>
          <van-row>
            <van-col span="24">
              <h3 class="home-nodata">未查询到您的养老参保信息</h3>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- 热点业务 -->
      <div class="">
        <div class=" pt10">
          <span class="item-title_text role-title_text">{{ navTitle }}</span>
        </div>
        <div>
          <van-swipe class="hot-list" :autoplay="3000">
            <van-swipe-item>
              <van-grid :column-num="4" icon-size="30px" :border="false">
                <van-grid-item
                  :key="inx"
                  v-for="(item, inx) in navArr.slice(0, 4)"
                  @click="go(item.url)"
                  :icon="item.ionic"
                  :text="item.title"
                />
              </van-grid>
            </van-swipe-item>
            <van-swipe-item v-if="navArr.length > 4">
              <van-grid :column-num="4" icon-size="30px" :border="false">
                <van-grid-item
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
      <!-- 便民服务 -->
      <div class="">
        <div class=" pt10">
          <span class="item-title_text role-title_text">
            <span>{{ conTitle }}</span>
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
                    style="font-size: 25px;"
                    ><img :src="item.ionic" class="van-icon__image" />
                  </i>
                </van-col>
                <van-col span="14">
                  <span class="van-grid-item__text">{{ item.title }}</span>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- 公众服务 -->
      <div class="">
        <div class=" pt10">
          <span class="item-title_text role-title_text">
            <span>{{ listTitle }}</span>
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
                    style="font-size: 25px;"
                    ><img :src="item.ionic" class="van-icon__image" />
                  </i>
                </van-col>
                <van-col span="14">
                  <span class="van-grid-item__text">{{ item.title }}</span>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </div>

      <!-- 疫情专区 -->
      <div class="">
        <div class=" pt10">
          <span class="item-title_text role-title_text">疫情专区</span>
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
                  <h3 class="h3">{{ item.title }}</h3>
                  <p class="p">{{ item.details }}</p>
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
    <div style="padding: 36px;"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/" class="text-nav">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? iconHome.active : iconHome.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item class="erweima-nav">
        <span></span>
        <template>
          <img
            class="img-responsive erweima"
            src="@/assets/images/my/erweima.png"
            alt=""
          />
        </template>
      </van-tabbar-item>
      <van-tabbar-item class="text-nav" to="/my">
        <span>个人中心</span>
        <template #icon="props">
          <img :src="props.active ? iconMy.active : iconMy.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  filters: {
    money(val) {
      val = val.toString().replace(/\$|\.,/g, '')
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
      code: 2,
      price: '',
      priceShow: true,
      binding: '',
      banner: require('@/assets/images/home/banner-home.png'),
      iconHome: {
        active: require('@/assets/images/my/home_avt.png'),
        inactive: require('@/assets/images/my/home.png'),
      },
      iconMy: {
        active: require('@/assets/images/my/my_avt.png'),
        inactive: require('@/assets/images/my/my.png'),
      },
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
      userInfo: {}, // 机关养老
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
          icon: require('@/assets/images/sep1.png'),
          title: '疫情就是命令 防控就是责任',
          details: '抗击疫情 我们众志成城',
          img: require('@/assets/images/sep3.png'),
          url: 'https://agxapp.141.demo.healthan.com.cn/h5/page/xxfyfk3',
        },
      ],
      // 参保地
      addrArr: [],
    }
  },
  created() {
    // this.getUserinfo()
    this.$token.getToken(1).then(res => {
      if (res) {
        this.getList()
        this.getUserinfo()
      }
    })
    this.priceShow = JSON.parse(localStorage.getItem('priceShow'))
    if (this.priceShow === null) {
      this.priceShow = true
    }
  },
  methods: {
    // 参保地区选择
    onAddr(url) {
      this.addrArr.length > 1 ? (this.showAddr = true) : this.go(url)
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
    async getUserinfo() {
      let that = this
      let item = []
      let { data } = await that.$http.postRequest('/api/gxrswx/Index/indexView')
      if (data.code === 0) {
        item = data.data
        if (item?.code === 3) {
          this.code = item.code
          // 机关养老
          if (Object.keys(item.socialInfo.jg).length === 0) {
            this.userInfo = {}
          } else {
            this.userInfo = item.socialInfo.jg.list
            console.log(this.userInfo)
            // 机关
            this.userInfo.price = this.userInfo.balance.replace('.', '')
            this.userInfo.price = this.plusXing(this.userInfo.price)
          }

          // 城镇养老
          this.userItem = item.socialInfo.zg
          if (this.userItem.length !== 0) {
            this.cz_ly = item.socialInfo.zg[0].list
            // 城镇
            this.cz_ly.price = this.cz_ly.balance.replace('.', '')
            this.cz_ly.price = this.plusXing(this.cz_ly.price)
            // 地区
            this.addrArr = item.socialInfo.zg.map(v => {
              return {
                text: v.addr,
                code: v.addr_code,
              }
            })
            // console.log(this.addrArr)
          }
        }
        if (item?.code === 1) {
          this.code = item.code
          this.binding = item.socialInfo.url
        }
        if (item?.code === 2) {
          this.code = item.code
        }
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
    async getList() {
      let that = this

      let { data } = await that.$http.postRequest('/api/gxrswx/Index/indexMenu')
      if (data.code === 0) {
        let listData = data.data.list
        console.log(listData)
        listData.forEach(v => {
          if (v.nav_code === 'HotNav') {
            // 热点业务
            this.navTitle = v.nav_name
            this.navArr = this.resetData(v.list)
          } else if (v.nav_code === 'PublicService') {
            // 公众服务
            this.listTitle = v.nav_name
            this.listArr = this.resetData(v.list)
          } else if (v.nav_code === 'PeopleService') {
            // 便民服务
            this.conTitle = v.nav_name
            this.conArr = this.resetData(v.list)
          } else if (v.nav_code === 'Epidemic') {
            // this.sepArr =
          }
        })
      }

      // console.log(items)
      // if (items.error === 0) {
      //   let listData = items.data
      //   console.log(listData)
      //   listData.forEach(v => {
      //     if (v.nav_code === 'HotNav') {
      //       // 热点业务
      //       this.navTitle = v.nav_name
      //       this.navArr = this.resetData(v.list)
      //     } else if (v.nav_code === 'PublicService') {
      //       // 公众服务
      //       this.listTitle = v.nav_name
      //       this.listArr = this.resetData(v.list)
      //     } else if (v.nav_code === 'PeopleService') {
      //       // 便民服务
      //       this.conTitle = v.nav_name
      //       this.conArr = this.resetData(v.list)
      //     } else if (v.nav_code === 'Epidemic') {
      //       // this.sepArr =
      //     }
      //   })
      // }
    },
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

<style lang="scss" scoped>
.home {
  background-color: #f4f7fd;
}
.my-box {
  position: relative;
  margin-top: -235px;
  padding-top: 30px;
  width: 100%;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.my-box .home-list {
  padding: 30px;
  background-color: unset;
}

.my-box .head-o {
  height: 240px;
  box-shadow: 0 0 13px rgba(40, 125, 226, 0.35);
  border-radius: 16px;
  padding: 40px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.my-box .head-o.bg {
  background-image: url('../../assets/images/home-bg1.png');
  background-size: cover;
}

.my-box .head-o.bg2 {
  background-image: url('../../assets/images/home-bg2.png');
  background-size: cover;
}

.my-box .head-o.bg3 {
  background-image: url('../../assets/images/home-bg3.png');
  background-size: cover;
}

.my-box .head-o .home-title {
  font-size: 48px;
  color: #feffff;
  padding-bottom: 24px;
}

.my-box .head-o .home-details {
  font-size: 24px;
  color: #feffff;
  padding-bottom: 24px;
}

.my-box .head-o .home-btn {
  background-color: #fff;
  color: #287de2;
  font-size: 26px;
  border-radius: 16px;
  font-weight: 800;
}

.my-box .head-o .home-user {
  line-height: 42px;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
}

.my-box .head-o .home-address {
  line-height: 42px;
  font-size: 28px;
  color: #fff;
}

.my-box .head-o .home-name {
  line-height: 42px;
  font-size: 28px;
  color: #fff;
  padding-bottom: 20px;
}

.my-box .head-o .home-price {
  line-height: 42px;
  font-size: 28px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.my-box .head-o .home-price i {
  display: flex;
  align-items: center;
  justify-content: center;
}

.my-box .head-o .home-date {
  line-height: 42px;
  font-size: 30px;
  color: #fff;
  padding-bottom: 20px;
  text-align: right;
}

.my-box .head-o .home-time {
  line-height: 42px;
  font-size: 28px;
  color: #fff;
}

.my-box .head-o .home-nodata {
  line-height: 42px;
  font-size: 30px;
  color: #fff;
  padding-bottom: 20px;
}

/deep/ .van-swipe__indicator {
  background-color: #7db1ee;
}

/deep/ .van-swipe__indicator--active {
  background-color: #1989fa;
  padding: 0px 5px;
  opacity: 1;
  border-radius: 8px;
}

/deep/ .van-swipe__indicators {
  bottom: 0;
}
.my-box .head-o .van-grid-item__content {
  padding: 17px 16px;
}

.text-align-right {
  text-align: right;
}

.mt10 {
  margin-top: 0.1rem;
}

.ml5 {
  margin-left: 0.05rem;
}

.pt10 {
  padding-top: 0.1rem;
}

.pb10 {
  padding-bottom: 0.1rem;
}

.pb18 {
  padding-bottom: 0.1rem;
}

.mb10 {
  margin-bottom: 0.1rem;
}

.mb15 {
  margin-bottom: 30px;
}

.mb20 {
  margin-bottom: 0.2rem;
}

.fw {
  font-weight: bold;
}

.f18 {
  font-size: 0.18rem;
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
  border-radius: 8px;
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
  padding-left: 0.1rem;
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

.item-title_text {
  display: block;
  position: relative;
  padding: 0 30px;
  text-indent: 24px;
  color: #111111;
  font-size: 30px;
  font-weight: bold;
}

.item-title_text:before {
  content: '';
  position: absolute;
  top: 0;
  background-color: #3b86e0;
  width: 11px;
  height: 30px;
  border-radius: 11px;
  left: 30px;
}

/deep/ .van-grid-item__text {
  color: #333333;
  font-size: 30px;
  word-wrap: break-word;
  text-align: left;
  line-height: 40px;
  display: -webkit-box;
  -webkit-box-pack: start;
}

/deep/ .public-nav .van-grid-item__text {
  font-size: 30px;
}

.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-box {
  padding-top: 0.2rem;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0.1rem;
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

/deep/ .h3 {
  font-size: 28px;
  font-weight: bold;
  color: #333333;
  padding-bottom: 20px;
}

/deep/ .p {
  font-size: 24px;
  font-weight: 500;
  color: #666666;
}

.text-middle {
  display: -webkit-box;
  -webkit-box-pack: center;
}

.erweima-nav .van-tabbar-item__icon img {
  display: block;
  height: auto;
}
/deep/ .van-tabbar {
  height: 140px;
}
/deep/ .erweima {
  width: 100px;
  margin-top: -80px;
  position: relative;
  z-index: 9;
}
/deep/ .img-responsive > img {
  border-radius: 20px;
}
/deep/ [class*='van-hairline']::after {
  border-color: #f1f1f1;
}

/deep/ .van-tabbar-item {
  color: #666666;
  font-size: 24px;
}

/deep/ .van-tabbar-item--active {
  color: #1989fa;
}

/deep/ .van-tabbar {
  background-color: #f8f8f8;
}

.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
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

.erweima-nav .van-tabbar-item__icon img {
  display: block;
  height: auto;
}
/deep/ .van-grid-item__content {
  background-color: #f4f7ff;
}
.pr60 {
  padding-right: 0.6rem;
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
  font-size: 21px;
}
.h80 {
  min-height: 80px;
}
</style>

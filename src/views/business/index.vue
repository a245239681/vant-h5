<template>
  <div id="seach" class="seach">
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item>
        <van-image class="img-responsive" :src="banner" />
      </van-swipe-item>
    </van-swipe>
    <div>
      <van-tabs
        class="tabs"
        v-model="active"
        swipeable
        animated
        @change="ontab"
        title-active-color="#3B86E0"
        title-inactive-color="#666666"
        color="#3B86E0"
      >
        <van-tab title="社保查询">
          <div>
            <van-row>
              <van-col span="24" :key="inx" v-for="(item, inx) in list">
                <van-row
                  class="just-list p15 h100 f30"
                  @click="showNext(inx, 1)"
                >
                  <van-col span="2" class="just-list">
                    <van-icon class="left-icon" :name="item.icon" />
                  </van-col>
                  <van-col span="20">
                    <span class="title-one">
                      {{ item.name }}
                    </span>
                  </van-col>
                  <van-col span="2" class="just-list">
                    <van-icon
                      :name="showChild === inx ? 'arrow-up' : 'arrow-down'"
                    />
                  </van-col>
                </van-row>

                <div>
                  <van-row :class="showChild === inx ? '' : 'showchild'">
                    <!-- 二级菜单 -->
                    <van-col
                      span="24"
                      :key="i"
                      @click="go(items)"
                      v-for="(items, i) in item.children"
                    >
                      <van-row class="just-list h88 f28">
                        <van-col span="2" class="just-list"></van-col>
                        <van-col span="20">{{ items.name }}</van-col>
                        <van-col span="2" class="just-list">
                          <van-icon name="arrow"
                        /></van-col>
                      </van-row>
                    </van-col>
                  </van-row>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab title="社保办理">
          <div>
            <van-row>
              <van-col span="24" :key="inx" v-for="(item, inx) in list2">
                <van-row
                  class="just-list p15 h100 f30"
                  @click="showNext(inx, 2)"
                >
                  <van-col span="2" class="just-list">
                    <van-icon class="left-icon" :name="item.icon" />
                  </van-col>
                  <van-col span="20">
                    <span class="title-one">
                      {{ item.name }}
                    </span>
                  </van-col>
                  <van-col span="2" class="just-list">
                    <van-icon
                      :name="showChild2 === inx ? 'arrow-up' : 'arrow-down'"
                    />
                  </van-col>
                </van-row>

                <div>
                  <van-row :class="showChild2 === inx ? '' : 'showchild'">
                    <!-- 二级菜单 -->
                    <van-col
                      span="24"
                      :key="i"
                      @click="goUrl(items)"
                      v-for="(items, i) in item.children"
                    >
                      <van-row class="just-list h88 f28">
                        <van-col span="2" class="just-list"></van-col>
                        <van-col span="20">{{ items.name }}</van-col>
                        <van-col span="2" class="just-list">
                          <van-icon name="arrow"
                        /></van-col>
                      </van-row>
                    </van-col>
                  </van-row>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arrow: 'arrow-up',
      show: true,
      showChild: -1,
      showChild2: -1,
      active: 0,
      banner: require('@/assets/images/icon/banner-business.png'),
      list: [
        {
          name: '社保综合信息',
          icon: require('@/assets/images/icon/6.png'),
          children: [
            {
              name: '基本信息查询',
              url: '/info',
            },
            {
              name: '缴费信息查询',
              // url: '/prove',
              url: '/up',
            },
            {
              name: '参保信息查询',
              url: '/Insured',
            },
            {
              name: '社保证明查询',
              url: '/insurance',
            },
            {
              name: '转移综合查询',
              url: '/transfer',
            },
            {
              name: '个人权益单查询',
              url: '/rights',
            },
            {
              name: '电子票据查询',
              url: '/bill',
            },
            {
              name: '待遇测算',
              url:
                'http://www.msyos.com/fzjf/app/gxxm-wechat/phone/weui/jsq.html',
            },
          ],
        },
        {
          name: '城镇职工基本养老保险',
          icon: require('@/assets/images/icon/8.png'),
          children: [
            {
              name: '城镇职工养老账户信息查询',
              url: '/pension',
            },
            {
              name: '城镇职工养老保险待遇支付查询',
              url: '/paymentDetails',
            },
            {
              name: '城镇职工基本养老金核定及发放查询',
              url: '/draft',
            },
          ],
        },
        {
          name: '失业保险',
          icon: require('@/assets/images/icon/9.png'),
          children: [
            {
              name: '失业保险待遇支付查询',
              url: '/treatmentPay',
            },
          ],
        },
        {
          name: '工伤保险',
          icon: require('@/assets/images/icon/10.png'),
          children: [
            {
              name: '工伤认定查询',
              url: '/cognizance',
            },
            {
              name: '工伤保险待遇支付查询',
              url: '/unemploymentPay',
            },
          ],
        },
        {
          name: '机关养老保险',
          icon: require('@/assets/images/icon/11.png'),
          children: [
            {
              name: '机关养老保险账户信息查询',
              url: '/pensionInfo',
            },
            {
              name: '机关养老保险缴费信息查询',
              url: '/pensionPay',
            },
          ],
        },
      ],
      list2: [
        {
          name: '城镇职工基本养老保险',
          icon: require('@/assets/images/icon/x8.png'),
          children: [
            {
              name: '省内城镇职工基本养老保险转移接续申请',
              url:
                'https://gxrswx.healthan.net/sb/social/sySelectPerson?location=/sb/social/ylTranApply',
            },
            {
              name: '城镇职工基本养老保险跨省转入申请',
              url:
                'https://gxrswx.healthan.net/sb/social/sySelectPerson?location=/sb/social/ylTransProvincial',
            },
          ],
        },
        {
          name: '失业保险',
          icon: require('@/assets/images/icon/x9.png'),
          children: [
            {
              name: '失业金申领',
              url:
                'https://gxrswx.healthan.net/sb/social/sySelectPerson?location=/sb/social/syApply',
            },
            {
              name: '失业待遇终止',
              url:
                'https://gxrswx.healthan.net/sb/social/sySelectPerson?location=/sb/social/syBenefitsShop',
            },
            {
              name: '申请职业技能提升补贴',
              url:
                'https://gxrswx.healthan.net/sb/social/sySelectPerson?location=/sb/social/rcPromoteSubsidy',
            },
            {
              name: '失业保险关系转出',
              url:
                'https://gxrswx.healthan.net/sb/social/sySelectPerson?location=/sb/social/syRelevanceOut',
            },
            {
              name: '失业补助金申领',
              url:
                'https://gxrswx.healthan.net/sb/social/sySelectPerson?location=/sb/social/sySubsidy',
            },
            {
              name: '失业补助金终止',
              url: '/auxiliary',
            },
          ],
        },
        {
          name: '养老金生存认证',
          icon: require('@/assets/images/icon/x11.png'),
          children: [
            {
              name: '城乡居民养老人员认证',
              url:
                'https://gxrswx.healthan.net/sb/txauth/choise_person?type=jumin',
            },
            {
              name: '职工养老人员认证',
              url:
                'https://gxrswx.healthan.net/sb/txauth/choise_person?type=zhigong',
            },
          ],
        },
      ],
    }
  },
  created() {
    let showChild = localStorage.getItem('showChild')
    let showChild2 = localStorage.getItem('showChild2')
    let active = localStorage.getItem('active')
    if (showChild) {
      this.showChild = JSON.parse(showChild)
    }
    if (showChild2) {
      this.showChild2 = JSON.parse(showChild2)
    }
    if (active) {
      this.active = JSON.parse(active)
    }
  },
  methods: {
    ontab(name) {
      this.setItem('active', JSON.stringify(name))
    },
    showNext(index, type) {
      if (type === 1) {
        if (index != this.showChild) {
          this.showChild = index
          this.setItem('showChild', JSON.stringify(this.showChild))
        } else {
          this.showChild = -1
          this.setItem('showChild', JSON.stringify(this.showChild))
        }
      }
      if (type === 2) {
        if (index != this.showChild2) {
          this.showChild2 = index
          this.setItem('showChild2', JSON.stringify(this.showChild2))
        } else {
          this.showChild2 = -1
          this.setItem('showChild2', JSON.stringify(this.showChild2))
        }
      }
    },
    go(item) {
      item.name === '待遇测算'
        ? (window.location.href = item.url)
        : this.$router.push(item.url)
    },
    goUrl(item) {
      if (item.name === '失业补助金终止') {
        this.$router.push(item.url)
      } else {
        window.location.href = item.url
      }
    },
    setItem(key, value) {
      localStorage.setItem(key, value)
    },
  },
}
</script>

<style>
.seach .item-title_text {
  display: block;
  position: relative;
  padding: 36px 60px;
}

.mt10 {
  margin-top: 20px;
}
.bc-w {
  background-color: #fff;
}

.van-grid-item__text {
  color: #646566;
  font-size: 24px;
  word-wrap: break-word;
  text-align: left;
  line-height: 40px;
  display: -webkit-box;
  -webkit-box-pack: center;
}

.img-responsive {
  max-width: 100%;
  height: auto;
  display: block;
}

.bc {
  background-color: #fdfafe;
}
.p15 {
  padding: 0 30px;
}
.f28 {
  font-size: 28px;
}
.f30 {
  font-size: 30px;
}
.h100 {
  min-height: 100px;
  border-bottom: solid 2px #e8e6e8;
  background-color: #fff;
  font-weight: bold;
  color: rgba(17, 17, 17, 1);
}
.h88 {
  min-height: 88px;
  background-color: #fdfafe;
  padding: 0 30px;
  border-bottom: solid 2px #e8e6e8;
}

.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.seach .van-grid-item__content {
  padding: 0px 16px;
}
.list-nav .van-cell__left-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 26px;
}

.van-cell {
  padding: 26px 32px;
}
.showchild {
  display: none;
}
.left-icon .van-icon__image {
  width: 40px;
  height: 40px;
}
/* .van-grid-item__content {
    background-color: #f3f9ff;
  } */

.home-tab .van-tab__pane {
  padding: 50px 40px;
  background-color: #fff;
}
.tabs .van-tabs__line {
  height: 10px;
  width: 60px !important;
}
.tabs .van-tab {
  font-size: 28px;
  font-weight: 500;
}
.tabs .van-tab--active {
  font-size: 30px;
  color: #111111;
  font-weight: bold;
}
.tabs .van-tab__text--ellipsis {
  overflow: inherit;
}

.tabs [class*='van-hairline']::after {
  border-width: 0;
}
</style>

<template>
  <div class="Progress">
    <div class="info-titles">
      <van-row class="just-start">
        <van-col span="24" class="just-start"
          ><span
            class="just-list"
            @click="
              if (addressArr.length > 1) {
                show = true
              }
            "
            >参保地: <span class="fc">{{ yab139.text }}</span>
            <van-icon name="arrow-down" v-show="addressArr.length > 1" />
          </span>
        </van-col>
      </van-row>
    </div>
    <div>
      <van-tabs
        v-model="active"
        class="home-tab"
        swipeable
        animated
        color="#287DE2"
        title-active-color="#3B86E0"
        @change="ontab"
      >
        <van-tab title="正在办理">
          <van-row gutter="15" v-if="active == 0">
            <van-col
              span="24"
              v-cloak
              class="mb15"
              :key="inx"
              v-for="(item, inx) in listArr"
              @click="toGo(item.acpt_no)"
            >
              <van-row class="just-list h180 box-shadow">
                <van-col span="18">
                  <span class="van-grid-item__text">{{
                    item.service_name
                  }}</span>
                  <span class="van-grid-item__text">{{
                    item.create_time
                  }}</span>
                </van-col>
                <van-col span="6" class="just-list">
                  <span class="strart-color">{{ item.acpt_status }}</span>
                  <van-icon class="f22" name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-tab>
        <van-tab title="完成办理">
          <van-row gutter="15" v-if="active == 1">
            <van-col
              span="24"
              v-cloak
              class="mb15"
              :key="inx"
              v-for="(item, inx) in listArr2"
              @click="toGo(item.acpt_no)"
            >
              <van-row class="just-list h180 box-shadow">
                <van-col span="18">
                  <span class="van-grid-item__text">{{
                    item.service_name
                  }}</span>
                  <span class="van-grid-item__text">{{
                    item.create_time
                  }}</span>
                </van-col>
                <van-col span="6" class="just-list">
                  <span class="Finish" v-if="item.acpt_status_code === '2'">{{
                    item.acpt_status
                  }}</span>
                  <span class="end" v-if="item.acpt_status_code === '3'">{{
                    item.acpt_status
                  }}</span>
                  <van-icon class="f22" name="arrow" />
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
    </div>
    <div v-show="showTips === true">
      <Nodata :psMsg="tip"></Nodata>
    </div>
    <!-- 参保地 -->
    <van-popup v-model="show" position="bottom">
      <van-picker
        show-toolbar
        :columns="addressArr"
        @cancel="show = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import Nodata from '@/components/nodata'
export default {
  data() {
    return {
      show: false,
      yab139: {
        text: '',
        value: '',
      },
      addressArr: [], // 参保地址
      showTips: false,
      tip: '暂无数据',
      active: '0',
      listArr: [],
      listArr2: [],
    }
  },
  components: {
    Nodata,
  },
  created() {
    let active = localStorage.getItem('active-list')
    if (active) {
      this.active = JSON.parse(active)
    }
    this.$token.getToken().then(res => {
      if (res) {
        this.getAddress()
      }
    })
  },
  methods: {
    /**
     * 切换地区
     */
    onConfirm(value) {
      this.yab139 = value
      this.show = false
      this.getList()
    },
    toGo(id) {
      console.log(id)
      this.$router.push({
        name: 'ProgressDetails',
        query: {
          id: id,
          code: this.yab139.value,
        },
      })
    },
    /**
     * 获取地区
     */
    async getAddress() {
      let _this = this
      let address = localStorage.getItem('address')
      if (address === 'undefined' || address === null || address === '') {
        _this.$http.postJson('/api/gxrswx/Personal/addrList', {}, async res => {
          if (res.data.code === 0) {
            _this.addressArr = res.data.data.list.map(v => {
              return {
                text: v.name,
                value: v.code,
              }
            })
            _this.$token.setToken('address', JSON.stringify(_this.addressArr))
            _this.addressArr.length !== 0
              ? (_this.yab139 = _this.addressArr[0])
              : ''
            _this.loading = false
            _this.getList()
          } else if (res.data.code === 1001) {
            localStorage.removeItem('XX-Token')
            localStorage.removeItem('address')
            _this.$token.getToken().then(res => {
              if (res) {
                _this.getAddress()
              }
            })
          } else if (res.data.code === 3000) {
            setTimeout(() => {
              _this.$toast(res.data.msg)
            }, 2000)
          } else if (res.data.code === 1003) {
            _this.$toast(res.data.msg)
          } else if (res.data.code === 1004) {
            _this.showTips = true
          } else if (res.data.code === 2000) {
            _this.$toast(res.data.msg)
          } else if (res.data.code === 1002) {
            localStorage.removeItem('XX-Token')
            localStorage.removeItem('address')
            _this.$token.getToken().then(res => {
              if (res) {
                // alert(res)
                _this.getAddress()
              }
            })
          } else {
            this.$toast('数据异常')
          }
        })
      } else {
        _this.addressArr = JSON.parse(address)
        _this.addressArr.length !== 0
          ? (_this.yab139 = _this.addressArr[0])
          : ''
        this.loading = false
        this.getList()
      }
    },

    ontab(name) {
      this.$token.setToken('active-list', JSON.stringify(name))
      this.showTips = false
      this.getList()
      console.log(this.showTips)
    },
    getList() {
      let that = this
      let data = {
        yab139: that.yab139.value,
        is_end: that.active,
      }
      that.$http.postJson('/api/gxrswx/Progress/progressList', data, res => {
        if (res.data.code === 0) {
          //  console.log(res.data.data)
          data.is_end === 0
            ? (that.listArr = res.data.data.list)
            : (that.listArr2 = res.data.data.list)
          that.contentLoad = false
          that.showTips = false
        } else if (res.data.code === 1001 || res.data.code === 1002) {
          localStorage.removeItem('XX-Token')
          localStorage.removeItem('address')
          that.$token.getToken().then(res => {
            if (res) {
              that.getAddress()
            }
          })
        } else if (res.data.code === 1004) {
          that.showTips = true
        } else if (res.data.code === 3000) {
          that.showTips = true
          // that.$dialog.alert({
          //   message: res.data.msg,
          // })
        } else {
          localStorage.removeItem('XX-Token')
          localStorage.removeItem('address')
          that.$toast('数据异常')
        }
      })
    },
  },
}
</script>

<style>
.Progress .info-titles {
  padding: 30px;
  background-color: #eeeeed;
  color: #666;
  font-size: 30px;
}
.just-start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.just-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.just-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
.fw {
  font-weight: bold;
}
.mb15 {
  margin-bottom: 40px;
}
.Progress .van-grid-item__text:not(:last-child) {
  color: #646566;
  line-height: 1.5;
  word-wrap: break-word;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #333333;
}
.Progress .van-grid-item__text:last-child {
  font-size: 24px;
  color: #666666;
}
/*home-tab*/
.home-tab .van-tab__pane {
  padding: 40px 30px;
}
.f50 {
  font-size: 50px;
}
.home-tab .van-tabs__line {
  height: 12px;
  width: 60px !important;
}
.home-tab .van-tab {
  color: #666666;
  font-size: 28px;
  font-weight: 500;
}
.home-tab .van-tab--active {
  font-size: 30px;
  color: #111111;
  font-weight: bold;
}
.home-tab .van-tab__text--ellipsis {
  overflow: inherit;
}
.home-tab .type {
  font-size: 24px;
  padding: 10px;
  border: 2px solid #24ab57;
  color: #24ab57;
  border-radius: 10px;
  margin-right: 10px;
}
.home-tab .end {
  border: 2px solid #e3552f;
  color: #e3552f;
  font-size: 24px;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
}
.Finish {
  border: 2px solid#24AB57;
  color: #24ab57;
  font-size: 24px;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
}
.box-shadow {
  padding: 0 30px;
  background: #fbfcfc;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}
.strart-color {
  border: 2px solid #3b86e0;
  color: #3b86e0;
  font-size: 24px;
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
}
.h180 {
  height: 180px;
}
.Progress .p280 {
  padding-top: 30px;
}
</style>

<template>
  <div class="bank">
    <van-row>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="value1"
            @change="getdata(value1, 1)"
            :options="bankArr"
          />
        </van-dropdown-menu>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="value2"
            @change="getdata(value2, 2)"
            :options="district"
          />
        </van-dropdown-menu>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="value3"
            @change="getdata(value3, 3)"
            :options="option3"
          />
        </van-dropdown-menu>
      </van-col>
    </van-row>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        :offset="100"
        @load="onLoad"
      >
        <van-cell :key="inx" v-for="(item, inx) in bankList">
          <van-row class="just-list">
            <van-col span="4">
              <van-image width="40" height="40" :src="item.logo_url" />
            </van-col>
            <van-col span="20">
              <div class="title-name">{{ item.bank_node }}</div>
              <div class="main-text">
                <span class="mr5">{{ item.bank_addr }}</span>
              </div>
              <div class="main-text">
                <span>{{ item.bank_tel }}</span>
              </div>
            </van-col>
          </van-row>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      finishedText: '我是有底线的', // 底部提示
      city: '450000000000', // 广西地市列表
      county: '0', // 默认所有区县
      bank: '0', // 银行 为0时显示全部网点
      index: '', // 记录是为区或市级
      value1: '0', // 银行选中
      value2: '0', // 市级选中
      value3: '0', // 区县选中
      loading: false, // 上拉加载
      finished: false, // 上拉加载完毕
      isLoading: false, // 是否处于下拉刷新状态
      pageNo: 0, // 页码
      num: 10, // 每页显示条数
      /**
       * 银行
       */
      bankArr: [
        {
          text: '请选择银行',
          value: '0',
          icon: '',
        },
      ],
      /**
       * 市级
       */
      district: [
        {
          text: '请选择市级',
          value: '0',
        },
      ],
      /**
       * 区县
       */
      option3: [
        {
          text: '请选择区县',
          value: '0',
        },
      ],
      /**
       * 银行
       */
      bankList: [],
    }
  },
  created() {
    this.getMap()
    this.getBank()
  },
  methods: {
    async getdata(value, index) {
      if (index === 1) {
        this.bank = value
        this.pageNo = 0
        this.onLoad()
      }
      if (index === 2) {
        // 市级处理
        this.city = value
        this.index = index
        this.pageNo = 0
        await this.getMap()
        this.onLoad()
      }
      if (index === 3) {
        // 区县处理
        this.county = value
        this.index = index
        this.pageNo = 0
        this.onLoad()
      }
    },
    /**
     * 获取地区
     */
    getMap() {
      this.$http.postJson(
        '/api/gxrswx/Address/regionChild',
        {
          parent_region_code: this.city,
        },
        res => {
          if (res.data.code === 0) {
            console.log(res)
            if (this.index === '') {
              this.district = res.data.data.list.map(v => {
                return {
                  text: v.region_name,
                  value: v.region_code,
                }
              })
              this.district.unshift({
                text: '请选择市级',
                value: '0',
              })
              this.district.length !== 0
                ? (this.value2 = this.district[0].value)
                : (this.value2 = '0')
              this.city = this.value2
            }
            if (this.index === 2) {
              this.option3 = res.data.data.list.map(v => {
                return {
                  text: v.region_name,
                  value: v.region_code,
                }
              })
              this.option3.unshift({
                text: '请选择区县',
                value: '0',
              })
              this.option3.length !== 0
                ? (this.value3 = this.option3[0].value)
                : (this.value3 = '0')
              this.county = this.value3
            }
          }
          if (res.data.code === 3000 && this.index === 2) {
            this.option3 = []
            this.option3.push({
              text: '请选择区县',
              value: '0',
            })
          }
        }
      )
    },
    getBank() {
      this.$http.postJson('/api/gxrswx/Cardbase/markCardBankList', {}, res => {
        if (res.data.code === 0) {
          this.bankArr = res.data.data.list
          console.log(this.bankArr)
          this.bankArr = this.bankArr.map(v => {
            return {
              text: v.name,
              value: v.code,
              icon: v.logo_url,
            }
          })
          this.bankArr.unshift({
            text: '请选择银行',
            value: '0',
          })
        }
      })
    },

    // 数据加载、上拉刷新
    onLoad() {
      this.pageNo++
      this.getBankList()
    },
    /**
     * 下拉刷新
     */
    onRefresh() {
      this.finished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.loading = true
      this.pageNo = 0
      this.onLoad()
    },
    /**
     * 获取银行列表
     */
    getBankList() {
      let _self = this
      _self.city === '450000000000' ? (_self.city = '0') : _self.city
      _self.$http.postJson(
        '/api/gxrswx/Cardbase/markCardBankBranch',
        {
          bank_code: _self.bank,
          city_code: _self.city,
          county_code: _self.county,
          page: _self.pageNo,
          num: _self.num,
        },
        res => {
          if (res.data.code === 0) {
            const rows = res.data.data.list
            if (rows == null || rows.length === 0) {
              // 加载结束
              _self.finished = true
              // return
            } else {
              _self.finished = false
            }
            if (rows.length < _self.num) {
              // 最后一页不足10条的情况
              _self.finished = true
            }
            // 处理数据
            if (_self.pageNo === 1) {
              _self.bankList = rows
            } else {
              _self.bankList = _self.bankList.concat(rows)
              // console.log(_self.list)
            }
            _self.isLoading = false
            _self.loading = false
            //  console.log(this.bankList)
          }
        }
      )
    },
  },
}
</script>

<style>
.bank .van-cell__left-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

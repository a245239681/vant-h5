<template>
  <div class="resident-list">
    <div class="info-titles">
      <van-row class="just-start">
        <van-col span="24" class="just-start">
          居民参保登记受理进度查询
        </van-col>
      </van-row>
    </div>
    <div>
      <van-row gutter="15">
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
              <span class="van-grid-item__text">{{ item.service_name }}</span>
              <span class="van-grid-item__text">{{ item.create_time }}</span>
            </van-col>
            <van-col span="6" class="just-list">
              <span class="strart-color" v-if="item.acpt_status_code === '0'">{{
                item.acpt_status
              }}</span>
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
    </div>
    <div v-show="showTips === true">
      <Nodata :psMsg="tip"></Nodata>
    </div>
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
    }
  },
  components: {
    Nodata,
  },
  created() {
    this.listArr = JSON.parse(this.$route.query.item)
  },
  methods: {
    toGo(id) {
      this.$router.push({
        name: 'ResidentDetailst',
        query: {
          id: id,
        },
      })
    },
  },
}
</script>

<style>
.resident-list {
  padding: 0 30px;
}

.resident-list .info-titles {
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
.resident-list .van-grid-item__text:not(:last-child) {
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
.resident-list .van-grid-item__text:last-child {
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
.resident-list .p280 {
  padding-top: 30px;
}
</style>

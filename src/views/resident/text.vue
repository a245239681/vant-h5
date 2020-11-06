<template>
  <div class="action">
    <van-form>
      <div v-show="active === 0"></div>
      <div v-show="active === 1">
        <!-- 开启摄像头-->
        <!-- <van-button type="info" size="large" class="mb20" @click="callCamera"
          >激活验证</van-button
        > -->

        <!--canvas截取流-->
        <canvas ref="canvas" v-show="!showyz"></canvas>
        <!-- 图片展示 -->
        <video
          ref="video"
          v-show="showyz"
          width="100%"
          height="auto"
          autoplay
        ></video>
        <!-- 确认 -->
        <div class="t-c sub-btn">
          <van-button
            v-show="showyz"
            class="button-large"
            color="#4186fb"
            size="large"
            @click="photograph"
            >拍照</van-button
          >
          <van-button
            v-show="headImgSrc"
            class="button-large"
            color="#4186fb"
            size="large"
            @click="callCamera"
            >重新拍照</van-button
          >
        </div>

        <!-- <van-button size="mini" type="primary" @click="closeCamera"
        >关闭</van-button
      > -->
      </div>
      <div class="sub-btn" v-if="active === 1 && headImgSrc">
        <van-button
          native-type="submit"
          class="button-large-sub"
          color="#287DE2"
          size="large"
          >提交验证</van-button
        >
      </div>
      <div class="deployBtn">
        <div class="next-btn" v-if="active === 0">
          <van-button
            @click="next"
            class="button-large"
            color="#4186fb"
            size="large"
            :disabled="isDisable"
            >人脸验证</van-button
          >
        </div>
        <!-- <div class="prev-btn" v-if="active === 1">
          <van-button
            plain
            @click="prev"
            class="button-large b-color"
            color="#333"
            size="large"
            >上一步</van-button
          >
        </div> -->
      </div>
    </van-form>
  </div>
</template>

<script>
// import exif from 'exif-js'
export default {
  data() {
    return {
      headImgSrc: '',
      showyz: false,
      active: 0,
      isDisable: false,
      isText: '激活验证',
    }
  },
  mounted() {},
  methods: {
    prev() {
      --this.active
      this.active < 0 ? (this.active = 0) : this.active
    },
    next() {
      ++this.active
      this.active > 1 ? (this.active = 1) : this.active
      this.moveToCameraAVG()
    },

    moveToCameraAVG() {
      var self = this
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          var getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia ||
            navigator.oGetUserMedia
          if (!getUserMedia) {
            return Promise.reject(
              new Error('getUserMedia is not implemented in this browser')
            )
          }
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      if (window.stream) {
        window.stream.getTracks().forEach(track => {
          track.stop()
        })
      }
      var constraints = (window.constraints = {
        audio: false,
        video: {
          sourceId: 'default',
          facingMode: { exact: 'user' },
        },
      })
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
          var video = self.$refs.video
          self.showyz = true
          self.headImgSrc = ''
          console.log(111)
          try {
            window.stream = stream
            video.srcObject = stream
          } catch (error) {
            video.src = window.URL.createObjectURL(stream)
          }
          self.localMediaStream = stream
          video.play()
        })
        .catch(function(err) {
          alert(err.name + ': ' + err.message)
        })
    },
    // 调用摄像头
    callCamera() {
      // H5调用电脑摄像头API
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then(success => {
          // 摄像头开启成功
          this.$refs['video'].srcObject = success
          // 实时拍照效果
          this.$refs['video'].play()
          this.showyz = true
          this.headImgSrc = ''
        })
        .catch(() => {
          console.error('摄像头开启失败，请检查摄像头是否可用！')
        })
    },
    //
    // 拍照
    photograph() {
      // console.log(this.$refs.video.offsetHeight, this.$refs.video.offsetWidth)
      let ctx = this.$refs['canvas'].getContext('2d')
      this.$refs.canvas.setAttribute('width', this.$refs.video.offsetWidth)
      this.$refs.canvas.setAttribute('height', this.$refs.video.offsetHeight)
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(
        this.$refs['video'],
        0,
        0,
        this.$refs.video.offsetWidth,
        this.$refs.video.offsetHeight
      )
      // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs['canvas'].toDataURL('image/jpeg', 0.7) // 由字节转换为KB 判断大小

      this.headImgSrc = imgBase64
      this.showyz = false

      let str = imgBase64.replace('data:image/jpeg;base64,', '')

      let strLength = str.length
      let fileLength = parseInt(strLength - (strLength / 8) * 2) // 图片尺寸  用于判断
      let size = (fileLength / 1024).toFixed(2)
      console.log(size) // 上传拍照信息  调用接口上传图片 .........
      // 保存到本地
      // let ADOM = document.createElement('a')
      // ADOM.href = this.headImgSrc
      // ADOM.download = new Date().getTime() + '.jpeg'
      // ADOM.click()
      this.closeCamera()
    },
    // 关闭摄像头
    closeCamera() {
      if (!this.$refs['video'].srcObject) return
      let stream = this.$refs['video'].srcObject
      let tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      this.$refs['video'].srcObject = null
    },
  },
}
</script>

<style>
.action {
  padding: 30px;
}
.border {
  border: 2px solid #999;
}
.mr20 {
  margin-right: 20px;
}
.mb20 {
  margin-bottom: 20px;
}
.t-c {
  padding: 30px 0;
  text-align: center;
}

.buttom-b {
  margin-top: 20px;
}
.canvas_pic {
  max-width: 100%;
  height: auto;
  display: block;
}
.action .next-btn {
  padding: 30px 30px 30px 30px;
}
.action .prev-btn {
  padding: 0 30px 30px 30px;
}
.action .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.action .button-large.b-color {
  border-color: #f1f1f1 !important;
}
.action .sub-btn {
  padding: 30px 30px 30px 30px;
}
.action .button-large-sub {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
</style>

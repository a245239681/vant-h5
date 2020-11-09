<template>
  <div class="act">
    <van-form @submit="onSubmit">
      <van-field
        required
        input-align="right"
        label="姓名"
        placeholder="请填写姓名"
        name="aac003"
        v-model="info.aac003"
      />
      <van-field
        required
        input-align="right"
        label="身份证"
        placeholder="请填写身份证"
        name="aac002"
        v-model="info.aac002"
      />
      <van-field
        required
        input-align="right"
        label="社保卡号"
        placeholder="请填写社保卡号"
        name="cardno"
        v-model="info.cardno"
      />
      <div class="p44 tips-box">
        <span class="tips-color">温馨提示:</span>
        <span class="ml5">
          <p>1.打开前置摄像头进行面部自拍；</p>
          <p>2.请在光线明亮均匀的环境下识别；</p>
          <p>3.请不要戴眼镜、帽子；</p>
          <p>4.前额不要用刘海挡住，并漏出耳朵；</p>
          <p>5.将人脸对准识别区，正视摄像头；</p>
        </span>
      </div>
      <div class="act-btn">
        <label id="realBtn" class="btn btn-info">
          <input
            type="file"
            id="fileInput1"
            name="file"
            ref="file"
            class="mFileInput"
            accept="image/*"
            capture="user"
            @change="compressImage"
            style="left:-9999px;position:absolute;"
          />
          <span>激活验证</span>
        </label>
      </div>
    </van-form>
  </div>
</template>

<script>
import EXIF from 'exif-js'
export default {
  data() {
    return {
      info: {
        aac003: '',
        aac002: '',
        cardno: '',
        image: '',
      },
      matchIDCard: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 压缩图片 and 旋转角度纠正
    async compressImage(event) {
      let _this = this
      let file = event.target.files[0]
      let fileReader = new FileReader()
      let img = new Image()
      let imgWidth = ''
      let imgHeight = ''
      // 旋转角度
      let Orientation = null
      // 缩放图片需要的canvas
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d') // 图片大小  大于2MB 则压缩
      const isLt2MB = file.size < 2097152
      // 通过 EXIF 获取旋转角度 1 为正常  3 为 180°  6 顺时针90°  9 为 逆时针90°
      EXIF.getData(file, function() {
        EXIF.getAllTags(this)
        Orientation = EXIF.getTag(this, 'Orientation')
      })
      // 文件读取 成功执行
      fileReader.onload = function(ev) {
        // 文件base64化，以便获知图片原始尺寸
        img.src = ev.target.result
      }
      // 读取文件
      fileReader.readAsDataURL(file)
      // base64地址图片加载完毕后
      img.onload = async function() {
        imgWidth = img.width
        imgHeight = img.height
        canvas.width = img.width
        canvas.height = img.height
        // 目标尺寸
        let targetWidth = imgWidth
        let targetHeight = imgHeight
        // 不需要压缩 不需要做旋转处理
        // if (isLt2MB && imgWidth < 960 && imgHeight < 960 && !Orientation)

        // if (isLt2MB && imgWidth < 960 && imgHeight < 960 && +Orientation === 1)
        // {

        // }
        // 大于2MB 、img宽高 > 960 则进行压缩
        if (!isLt2MB || imgWidth >= 960 || imgHeight >= 960) {
          // 最大尺寸
          let maxWidth = 850
          let maxHeight = 850
          // 图片尺寸超过 960 X 960 的限制
          if (imgWidth > maxWidth || imgHeight > maxHeight) {
            if (imgWidth / imgHeight > maxWidth / maxHeight) {
              // 更宽，按照宽度限定尺寸
              targetWidth = maxWidth
              targetHeight = Math.round(maxWidth * (imgHeight / imgWidth))
            } else {
              targetHeight = maxHeight
              targetWidth = Math.round(maxHeight * (imgWidth / imgHeight))
            }
          }
          // canvas对图片进行缩放
          canvas.width = targetWidth
          canvas.height = targetHeight
          // 图片大小超过 2Mb 但未旋转  则只需要进行图片压缩
          if (!Orientation || +Orientation === 1) {
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
          }
        }
        // 拍照旋转 需矫正图片
        if (Orientation && +Orientation !== 1) {
          switch (+Orientation) {
            case 6: // 旋转90度
              canvas.width = targetHeight
              canvas.height = targetWidth
              ctx.rotate(Math.PI / 2)
              // 图片渲染
              ctx.drawImage(img, 0, -targetHeight, targetWidth, targetHeight)
              break
            case 3: // 旋转180度
              ctx.rotate(Math.PI)
              // 图片渲染
              ctx.drawImage(
                img,
                -targetWidth,
                -targetHeight,
                targetWidth,
                targetHeight
              )
              break
            case 8: // 旋转-90度
              canvas.width = targetHeight
              canvas.height = targetWidth
              ctx.rotate((3 * Math.PI) / 2)
              // 图片渲染
              ctx.drawImage(img, -targetWidth, 0, targetWidth, targetHeight)
              break
          }
        }
        await _this.onGit(img.src)
      }
    },

    // 提交

    async onGit(img) {
      let model = {
        aac003: this.info.aac003,
        aac002: this.info.aac002,
        cardno: this.info.cardno,
        image: img,
      }
      if (model.aac003 === '') {
        this.$toast.fail('姓名不能为空')
        return
      }
      if (model.aac002 === '') {
        this.$toast.fail('身份证不能为空')
        return
      }
      if (!this.matchIDCard.test(model.aac002)) {
        this.$toast.fail('身份证号码格式不正确')
        return
      }
      if (model.cardno === '') {
        this.$toast.fail('社保卡号不能为空')
        return
      }
      let { data } = await this.$http.postRequest(
        '/api/gxrswx/Cardbase/cardAction',
        model
      )
      if (
        data.code === 0 ||
        data.code === 3000 ||
        data.code === 3001 ||
        data.code.msg === 2000
      ) {
        // this.$toast(data.msg)
        this.$dialog({ message: data.msg })
      } else {
        this.$toast(data.msg)
      }
    },

    onSubmit(values) {
      console.log(values)
    },
  },
}
</script>

<style>
.act {
  width: 100%;
}
.act .act-btn {
  padding: 30px 30px 30px 30px;
}
.act .button-large {
  font-weight: bold;
  border-radius: 20px;
  font-size: 32px;
  height: 100px;
  line-height: 100px;
}
.act .btn {
  width: 100%;
  display: inline-block;
  height: 100px;
  line-height: 100px;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  color: #ffffff;
  background: #287de2;
  box-shadow: 0px 5px 20px 0px rgba(40, 125, 226, 0.35);
  border-radius: 20px;
}
.tips-box {
  background-color: #fff;
}
.p44 {
  padding: 44px 31px;
  font-size: 24px;
  color: #666666;
}
.tips-color {
  color: #f45936;
}
.ml5 {
  margin-left: 10px;
}
.tips-box > span > p {
  line-height: 45px;
}
</style>

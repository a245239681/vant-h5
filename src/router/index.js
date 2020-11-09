import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/home.vue'
import Prove from '../views/prove/prove.vue'
import Provelist from '../views/prove/prove-list.vue'
import Rights from '../views/rights/rights.vue'
import Pension from '../views/pension/pension.vue'
import Card from '../views/info/card.vue'
import Insurance from '../views/insurance/insurance.vue'
import Insurancepdf from '../views/insurance/insurance-pdf.vue'
import Bill from '../views/bill/bill.vue'
import Billlist from '../views/bill/bill-list.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '广西人社服务',
    },
  },
  {
    path: '/info',
    name: 'Info',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/info/info.vue'),
    meta: {
      title: '基本信息',
    },
  },
  {
    path: '/prove',
    name: 'Prove',
    component: Prove,
    meta: {
      title: '缴费信息',
    },
  },
  {
    path: '/prove-list',
    name: 'Provelist',
    component: Provelist,
    meta: {
      title: '缴费信息列表',
    },
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('../views/prove/details.vue'),
    meta: {
      title: '缴费信息详情',
    },
  },
  {
    path: '/insurance',
    name: 'Insurance',
    component: Insurance,
    meta: {
      title: '社保证明查询',
    },
  },
  {
    path: '/bill',
    name: 'Bill',
    component: Bill,
    meta: {
      title: '电子票据查询',
    },
  },
  {
    path: '/bill-list',
    name: 'Billlist',
    component: Billlist,
    meta: {
      title: '电子票据列表',
    },
  },
  {
    path: '/bill-pdf',
    name: 'Billpdf',
    component: () => import('../views/bill/bill-pdf.vue'),
    meta: {
      title: '电子票据详情',
    },
  },
  {
    path: '/insurancepdf',
    name: 'Insurancepdf',
    component: Insurancepdf,
    meta: {
      title: '社保证明详情',
    },
  },
  {
    path: '/rights',
    name: 'Rights',
    component: Rights,
    meta: {
      title: '个人权益单',
    },
  },
  {
    path: '/rightsDetails',
    name: 'RightsDetails',
    component: () => import('../views/rights/pdf.vue'),
    meta: {
      title: '个人权益单详情',
    },
  },
  {
    path: '/pension',
    name: 'Pension',
    component: Pension,
    meta: {
      title: '城镇职工养老信息',
    },
  },
  {
    path: '/card',
    name: 'Card',
    component: Card,
    meta: {
      title: '社会保障卡应用状态查询',
    },
  },
  {
    path: '/pace',
    name: 'Pace',
    component: () => import('../views/pace/pace.vue'),
    meta: {
      title: '社会保障卡进度查询',
    },
  },
  {
    path: '/pace-show',
    name: 'Paceshow',
    component: () => import('../views/pace/pace-show.vue'),
    meta: {
      title: '社会保障卡进度查询详情',
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/info/logout.vue'),
    meta: {
      title: '社会保障卡注销(社保功能注销)',
    },
  },
  {
    path: '/loss',
    name: 'Loss',
    component: () => import('../views/info/loss.vue'),
    meta: {
      title: '社会保障卡挂失与解挂',
    },
  },
  {
    path: '/lossFormal',
    name: 'LossFormal',
    component: () => import('../views/info/loss-formal.vue'),
    meta: {
      title: '社会保障卡补领、换领、换发',
    },
  },
  {
    path: '/LicensePdf',
    name: 'LicensePdf',
    component: () => import('../views/pdf/license-pdf.vue'),
    meta: {
      title: '职业技能等级电子证书',
    },
  },
  {
    path: '/TitlePdf',
    name: 'TitlePdf',
    component: () => import('../views/pdf/title-pdf.vue'),
    meta: {
      title: '职称电子证书',
    },
  },
  {
    path: '/Insured',
    name: 'Insured',
    component: () => import('../views/Insured/Insured.vue'),
    meta: {
      title: '参保信息列表',
    },
  },
  {
    path: '/Ins-show',
    name: 'InsShow',
    component: () => import('../views/Insured/ins-show.vue'),
    meta: {
      title: '参保信息详情',
    },
  },
  {
    path: '/personnel',
    name: 'Personnel',
    component: () => import('../views/personnel/personnel.vue'),
    meta: {
      title: '人才查询',
    },
  },
  {
    path: '/bank',
    name: 'Bank',
    component: () => import('../views/bank/bank.vue'),
    meta: {
      title: '即时制卡银行网点列表',
    },
  },
  {
    path: '/baoban',
    name: 'Baoban',
    component: () => import('../views/baoban/index.vue'),
    meta: {
      title: '“打包办”专窗',
    },
  },
  {
    path: '/dianzi',
    name: 'Dianzi',
    component: () => import('../views/dianzi/list.vue'),
    meta: {
      title: '电子证书查询',
    },
  },
  {
    path: '/modify',
    name: 'Modify',
    component: () => import('../views/shebao/modify.vue'),
    meta: {
      title: '社会保障卡信息变更',
    },
  },
  {
    path: '/cardReplacement',
    name: 'CardReplacement',
    component: () => import('../views/shebao/card-replacement.vue'),
    meta: {
      title: '社会保障卡补领、换领、换发填写',
    },
  },
  {
    path: '/orderDetails',
    name: 'OrderDetails',
    component: () => import('../views/shebao/order-details.vue'),
    meta: {
      title: '社会保障卡EMS邮费订单详情',
    },
  },
  {
    path: '/transfer',
    name: 'Transfer',
    component: () => import('../views/transfer/index.vue'),
    meta: {
      title: '转移综合查询',
    },
  },
  {
    path: '/transfeDetailsr',
    name: 'TransfeDetailsr',
    component: () => import('../views/transfer/details.vue'),
    meta: {
      title: '转移综合查询详情',
    },
  },
  {
    path: '/paymentDetails',
    name: 'PaymentDetails',
    component: () => import('../views/shebao/payment-details.vue'),
    meta: {
      title: '城镇职工养老保险待遇支付查询',
    },
  },
  {
    path: '/draft',
    name: 'Draft',
    component: () => import('../views/shebao/draft.vue'),
    meta: {
      title: '城镇职工基本养老金核定及发放查询',
    },
  },
  {
    path: '/cognizance',
    name: 'Cognizance',
    component: () => import('../views/cognizance/cognizance.vue'),
    meta: {
      title: '工伤认定查询',
    },
  },
  {
    path: '/unemploymentPay',
    name: 'UnemploymentPay',
    component: () => import('../views/shebao/unemployment-pay.vue'),
    meta: {
      title: '工伤保险待遇支付查询',
    },
  },
  {
    path: '/pensionInfo',
    name: 'PensionInfo',
    component: () => import('../views/shebao/pension-info.vue'),
    meta: {
      title: '机关养老保险账户信息查询',
    },
  },
  {
    path: '/pensionPay',
    name: 'PensionPay',
    component: () => import('../views/shebao/pension-pay.vue'),
    meta: {
      title: '机关养老保险缴费信息查询',
    },
  },
  {
    path: '/business',
    name: 'Business',
    component: () => import('../views/business/index.vue'),
    meta: {
      title: '业务查询办理',
    },
  },
  {
    path: '/treatmentPay',
    name: 'TreatmentPay',
    component: () => import('../views/shebao/treatment-pay.vue'),
    meta: {
      title: '失业保险待遇支付查询',
    },
  },
  {
    path: '/notice',
    name: 'Notice',
    component: () => import('../views/info/notice.vue'),
    meta: {
      title: '公告',
    },
  },
  {
    path: '/progress',
    name: 'Progress',
    component: () => import('../views/progress/list.vue'),
    meta: {
      title: '办事进度',
    },
  },
  {
    path: '/progress-details',
    name: 'ProgressDetails',
    component: () => import('../views/progress/details.vue'),
    meta: {
      title: '办事进度详情',
    },
  },
  {
    path: '/details-test',
    name: 'DetailsTest',
    component: () => import('../views/progress/details-test.vue'),
    meta: {
      title: '办事进度详情测试',
    },
  },
  {
    path: '/progress-pdf',
    name: 'ProgressPdf',
    component: () => import('../views/progress/pdf.vue'),
    meta: {
      title: '办事进度结果',
    },
  },
  {
    path: '/auxiliary',
    name: 'Auxiliary',
    component: () => import('../views/auxiliary/index.vue'),
    meta: {
      title: '失业补助金终止',
    },
  },
  {
    path: '/toExamine',
    name: 'ToExamine',
    component: () => import('../views/progress/toExamine.vue'),
    meta: {
      title: '提交成功',
    },
  },
  {
    path: '/resident',
    name: 'Resident',
    component: () => import('../views/resident/from.vue'),
    meta: {
      title: '居民参保登记',
    },
  },
  {
    path: '/query',
    name: 'Query',
    component: () => import('../views/resident/query.vue'),
    meta: {
      title: '居民参保登记受理进度查询',
    },
  },
  {
    path: '/residentList',
    name: 'ResidentList',
    component: () => import('../views/resident/list.vue'),
    meta: {
      title: '居民参保登记受理进度查询列表',
    },
  },
  {
    path: '/residentDetails',
    name: 'ResidentDetailst',
    component: () => import('../views/resident/details.vue'),
    meta: {
      title: '居民参保登记受理进度查询详情',
    },
  },
  {
    path: '/text',
    name: 'text',
    component: () => import('../views/resident/text.vue'),
    meta: {
      title: '测试',
    },
  },
  {
    path: '/activation',
    name: 'Activation',
    component: () => import('../views/resident/activation.vue'),
    meta: {
      title: '社会保障卡启用(社保功能激活)',
    },
  },
  {
    path: '/up',
    name: 'Up',
    component: () => import('@/components/upgrade.vue'),
    meta: {
      title: '升级维护',
    },
  },
  {
    path: '/priceNotice',
    name: 'PriceNotice',
    component: () => import('../views/shebao/notice.vue'),
    meta: {
      title: '缴费业务',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

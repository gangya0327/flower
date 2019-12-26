import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/sort',
    component: Layout,
    redirect: '/sort/productCate',
    name: 'sort',
    meta: { title: '产品归类', icon: 'product' },
    children: [
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: { title: '目的地', icon: 'product-cate' }
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: { title: '添加目的地分类' },
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: { title: '修改目的地分类' },
        hidden: true
      },
      {
        path: 'subjects',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: { title: '专题推荐', icon: 'sms-subject' },
        hidden: true
      },
      {
        path: 'subject',
        name: 'subject',
        component: () => import('@/views/set/subject/index'),
        meta: { title: '专题推荐', icon: 'sms-subject' }
      },
      {
        path: 'productCateCommon',
        name: 'productCateCommon',
        component: () => import('@/views/set/productCate/index'),
        meta: { title: '类目', icon: 'product-cate' }
      },
      {
        path: 'addProductCateCommon',
        name: 'addProductCateCommon',
        component: () => import('@/views/set/productCate/add'),
        meta: { title: '添加类目' },
        hidden: true
      },
      {
        path: 'updateProductCateCommon',
        name: 'updateProductCateCommon',
        component: () => import('@/views/set/productCate/update'),
        meta: { title: '修改类目' },
        hidden: true
      },
    ]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: { title: '旅游', icon: 'product' },
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: { title: '路线列表', icon: 'product-list' }
    },
    {
      path: 'addProduct',
      name: 'addProduct',
      component: () => import('@/views/pms/product/add'),
      meta: { title: '添加路线', icon: 'product-add' }
    },
    {
      path: 'group',
      name: 'group',
      component: () => import('@/views/pms/group/index'),
      meta: { title: '班期列表', icon: 'product-list' }
    },
    {
      path: 'addGroup',
      name: 'addGroup',
      component: () => import('@/views/pms/group/add'),
      meta: { title: '新增班期', icon: 'product-add' },
      hidden: true
    },
    {
      path: 'updateGroup',
      name: 'updateGroup',
      component: () => import('@/views/pms/group/update'),
      meta: { title: '修改班期', icon: 'product-add' },
      hidden: true
    },
    {
      path: 'updateProduct',
      name: 'updateProduct',
      component: () => import('@/views/pms/product/update'),
      meta: { title: '修改路线', icon: 'product-add' },
      hidden: true
    },
    {
      path: 'productRecycle',
      name: 'productRecycle',
      component: () => import('@/views/pms/product/index'),
      meta: { title: '商品回收站', icon: 'product-recycle' },
      hidden: true
    },
    {
      path: 'productComment',
      name: 'productComment',
      component: () => import('@/views/pms/product/index'),
      meta: { title: '商品评价', icon: 'product-comment' },
      hidden: true
    },
    {
      path: 'productAttr',
      name: 'productAttr',
      component: () => import('@/views/pms/productAttr/index'),
      meta: { title: '路线特色', icon: 'product-attr' }
    },
    {
      path: 'productAttrList',
      name: 'productAttrList',
      component: () => import('@/views/pms/productAttr/productAttrList'),
      meta: { title: '商品属性列表' },
      hidden: true
    },
    {
      path: 'addProductAttr',
      name: 'addProductAttr',
      component: () => import('@/views/pms/productAttr/addProductAttr'),
      meta: { title: '添加商品属性' },
      hidden: true
    },
    {
      path: 'updateProductAttr',
      name: 'updateProductAttr',
      component: () => import('@/views/pms/productAttr/updateProductAttr'),
      meta: { title: '修改商品属性' },
      hidden: true
    },
    {
      path: 'brand',
      name: 'brand',
      component: () => import('@/views/pms/brand/index'),
      meta: { title: '品牌管理', icon: 'product-brand' }
    },
    {
      path: 'addBrand',
      name: 'addBrand',
      component: () => import('@/views/pms/brand/add'),
      meta: { title: '添加品牌' },
      hidden: true
    },
    {
      path: 'updateBrand',
      name: 'updateBrand',
      component: () => import('@/views/pms/brand/update'),
      meta: { title: '编辑品牌' },
      hidden: true
    }
    ]
  },
  {
    path: '/fms',
    component: Layout,
    redirect: '/fms/flight',
    name: 'fms',
    meta: { title: '机票', icon: 'product' },
    children: [{
      path: 'flight',
      name: 'flight',
      component: () => import('@/views/fms/flight/index'),
      meta: { title: '机票列表', icon: 'product-list' }
    },
    {
      path: 'addFlight',
      name: 'addFlight',
      component: () => import('@/views/fms/flight/add'),
      meta: { title: '添加机票', icon: 'product-add' }
    },
    {
      path: 'updateFlight',
      name: 'updateFlight',
      component: () => import('@/views/fms/flight/update'),
      meta: { title: '修改机票', icon: 'product-add' },
      hidden: true
    },
    {
      path: 'addFlightgroup',
      name: 'addFlightgroup',
      component: () => import('@/views/fms/flightgroup/add'),
      meta: { title: '添加机票', icon: 'product-add' },
      hidden: true
    },
    {
      path: 'flightgroup',
      name: 'flightgroup',
      component: () => import('@/views/fms/flightgroup/index'),
      meta: { title: '机票列表', icon: 'product-list' },
      hidden: true
    },
    {
      path: 'updateFlightgroup',
      name: 'updateFlightgroup',
      component: () => import('@/views/fms/flightgroup/update'),
      meta: { title: '修改机票', icon: 'product-list' },
      hidden: true
    },
    {
      path: 'flightprice',
      name: 'flightprice',
      component: () => import('@/views/fms/flightprice/index'),
      meta: { title: '机票价格', icon: 'product-list' },
      hidden: true
    },
    ]
  },
  {
    path: '/hms',
    component: Layout,
    redirect: '/hms/hotel',
    name: 'hms',
    meta: { title: '酒店', icon: 'product' },
    children: [
      {
        path: 'hotel',
        name: 'hotel',
        component: () => import('@/views/hms/hotel/index'),
        meta: { title: '酒店列表', icon: 'product-brand' }
      },
      {
        path: 'addhotel',
        name: 'addhotel',
        component: () => import('@/views/hms/hotel/add'),
        meta: { title: '添加酒店', icon: 'product-add' }
      },
      {
        path: 'updatehotel',
        name: 'updatehotel',
        component: () => import('@/views/hms/hotel/update'),
        meta: { title: '编辑酒店', icon: 'product-list' },
        hidden: true
      },
      {
        path: 'edithotelprice',
        name: 'edithotelprice',
        component: () => import('@/views/hms/hotelConfig/index'),
        meta: { title: '编辑酒店房型价格', icon: 'product-list' },
        hidden: true
      }
    ]
  },
  {
    path: '/tms',
    component: Layout,
    redirect: '/tms/travels',
    name: 'tms',
    meta: { title: '游记', icon: 'product' },
    children: [
      {
        path: 'travels',
        name: 'travels',
        component: () => import('@/views/tms/travels/index'),
        meta: { title: '游记列表', icon: 'product-brand' }
      },
      {
        path: 'addTravels',
        name: 'addTravels',
        component: () => import('@/views/tms/travels/add'),
        meta: { title: '添加游记', icon: 'product-add' }
      },
      {
        path: 'updateTravels',
        name: 'updateTravels',
        component: () => import('@/views/tms/travels/update'),
        meta: { title: '编辑游记', icon: 'product-list' },
        hidden: true
      }
    ]
  },
  {
    path: '/mms',
    component: Layout,
    redirect: '/mms/ticket',
    name: 'mms',
    meta: { title: '门票', icon: 'product' },
    children: [{
      path: 'ticket',
      name: 'ticket',
      component: () => import('@/views/mms/ticket/index'),
      meta: { title: '门票列表', icon: 'product-list' }
    },
    {
      path: 'addTicket',
      name: 'addTicket',
      component: () => import('@/views/mms/ticket/add'),
      meta: { title: '添加门票', icon: 'product-add' }
    },
    {
      path: 'updateTicket',
      name: 'updateTicket',
      component: () => import('@/views/mms/ticket/update'),
      meta: { title: '修改门票', icon: 'product-add' },
      hidden: true
    }
    ]
  },
  {
    path: '/cms',
    component: Layout,
    redirect: '/cms/common',
    name: 'cms',
    meta: { title: '普通商品', icon: 'product' },
    children: [{
      path: 'common',
      name: 'common',
      component: () => import('@/views/cms/common/index'),
      meta: { title: '商品列表', icon: 'product-list' }
    },
    {
      path: 'addCommon',
      name: 'addCommon',
      component: () => import('@/views/cms/common/add'),
      meta: { title: '添加商品', icon: 'product-add' }
    },
    {
      path: 'updateCommon',
      name: 'updateCommon',
      component: () => import('@/views/cms/common/update'),
      meta: { title: '修改商品', icon: 'product-add' },
      hidden: true
    }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: { title: '订单', icon: 'order' },
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: { title: '订单列表', icon: 'product-list' }
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: { title: '订单详情' },
        hidden: true
      },
      {
        path: 'orderActivityDetail',
        name: 'orderActivityDetail',
        component: () => import('@/views/oms/order/orderActivityDetail'),
        meta: { title: '订单详情' },
        hidden: true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: { title: '发货列表' },
        hidden: true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: { title: '订单设置', icon: 'order-setting' }
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: { title: '退货申请处理', icon: 'order-return' }
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/oms/apply/reason'),
        meta: { title: '退货原因设置', icon: 'order-return-reason' }
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: { title: '退货原因详情' },
        hidden: true
      }
    ]
  },
  {
    path: '/sms',
    component: Layout,
    redirect: '/sms/activity',
    name: 'sms',
    meta: { title: '营销', icon: 'sms' },
    children: [
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/sms/activity/index'),
        meta: { title: '助力活动', icon: 'sms-flash' }
      },
      {
        path: 'addActivity',
        name: 'addActivity',
        component: () => import('@/views/sms/activity/add'),
        meta: { title: '添加活动', icon: 'sms-flash' },
        hidden: true
      },
      {
        path: 'updateActivity',
        name: 'updateActivity',
        component: () => import('@/views/sms/activity/update'),
        meta: { title: '编辑活动', icon: 'sms-flash' },
        hidden: true
      },
      {
        path: 'examine',
        name: 'examine',
        component: () => import('@/views/sms/activity/examine'),
        meta: { title: '审批列表', icon: 'sms-flash' },
        hidden: true
      },
      {
        path: 'groupbook',
        name: 'groupbook',
        component: () => import('@/views/sms/groupbook/index'),
        meta: { title: '拼团活动', icon: 'sms-flash' }
      },
      {
        path: 'addGroupbook',
        name: 'addGroupbook',
        component: () => import('@/views/sms/groupbook/add'),
        meta: { title: '拼团活动添加', icon: 'sms-flash' },
        hidden: true
      },
      {
        path: 'updateGroupbook',
        name: 'updateGroupbook',
        component: () => import('@/views/sms/groupbook/update'),
        meta: { title: '拼团活动编辑', icon: 'sms-flash' },
        hidden: true
      },
      {
        path: 'groupbook/detailList',
        name: 'groupbook/detailList',
        component: () => import('@/views/sms/groupbook/detailList'),
        meta: { title: '拼团详情列表', icon: 'sms-flash' },
        hidden: true
      },
      {
        path: 'groupbook/info',
        name: 'groupbook/info',
        component: () => import('@/views/sms/groupbook/detailInfo'),
        meta: { title: '拼团详情', icon: 'sms-flash' },
        hidden: true
      },
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: { title: '秒杀活动列表', icon: 'sms-flash' },
        hidden: true
      },
      {
        path: 'flashSession',
        name: 'flashSession',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: { title: '秒杀时间段列表' },
        hidden: true
      },
      {
        path: 'selectSession',
        name: 'selectSession',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: { title: '秒杀时间段选择' },
        hidden: true
      },
      {
        path: 'flashProductRelation',
        name: 'flashProductRelation',
        component: () => import('@/views/sms/flash/productRelationList'),
        meta: { title: '秒杀商品列表' },
        hidden: true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: { title: '优惠券列表', icon: 'sms-coupon' },
        hidden: true
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: { title: '添加优惠券' },
        hidden: true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: { title: '修改优惠券' },
        hidden: true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: { title: '优惠券领取详情' },
        hidden: true
      },
      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: { title: '品牌推荐', icon: 'product-brand' },
        hidden: true
      },
      {
        path: 'referrer',
        name: 'proReferrer',
        component: () => import('@/views/sms/referrer/index'),
        meta: { title: '产品推荐', icon: 'sms-new' }
      },
      {
        path: 'discount',
        name: 'proDiscount',
        component: () => import('@/views/sms/discount/index'),
        meta: { title: '产品特惠', icon: 'sms-new' }
      },
      {
        path: 'new',
        name: 'proNew',
        component: () => import('@/views/sms/new/index'),
        meta: { title: '产品上新', icon: 'sms-new' }
      },
      // {
      //   path: 'hot',
      //   name: 'homeHot',
      //   component: () => import('@/views/sms/hot/index'),
      //   meta: { title: '人气推荐', icon: 'sms-hot' }
      // },
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: { title: '广告列表', icon: 'sms-ad' }
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: { title: '添加广告' },
        hidden: true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: { title: '编辑广告' },
        hidden: true
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})


import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/index";
import My from '../views/home/my/my';
import { getStore } from '@/config/utils';
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "../views/login"),
    meta: {
      tit: '登陆'
    }
  },
  {
    path: "/",
    redirect: { name: 'GrabOrderList' },
    name: "Home",
    component: Home,
    meta: {
      tit: '易回'
    },
    children: [
      {
        tit: "抢单列表",
        path: "/graborderlist",
        name: 'GrabOrderList',
        component: () => import(/* webpackChunkName: "grabOrderList" */ "../views/home/grabOrderList/grabOrderList"),
        meta: {
          tit: '抢单列表'
        } 
      },
      {
        path: "/tasklist",
        name: 'TaskList',
        component: () => import(/* webpackChunkName: "taskList" */ "../views/home/taskList/taskList"),
        meta: {
          tit: '任务单'
        }  
      },
      {
        path: "/my",
        name: 'My',
        component: My,
        meta: {
          tit: '催客'
        } 
      }
    ]
  },
  {
    path: "/orderlist/search",
    name: "searchOrderList",
    component: () => import(/* webpackChunkName: "searchOrderList" */ "../views/home/grabOrderList/searchOrderList"),
    meta: {
      tit: '抢单列表搜索'
    }
  },
  {
    path: "/tasklist/search",
    name: "searchTaskList",
    component: () => import(/* webpackChunkName: "searchTaskList" */ "../views/home/taskList/searchTaskList"),
    meta: {
      tit: '任务单搜索'
    }
  },
  {
    path: "/tasklist/taskdetail/input_reminder",
    name: "InputReminder",
    component: () => import(/* webpackChunkName: "inputReminder" */ "../views/taskDetail/inputReminder"),
    meta: {
      tit: '填写催记'
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path:'/tasklist/taskdetail',
    name:"TaskDetail",
    component: resolve => require(['../views/taskDetail'],resolve),
    meta: {
      tit: '任务详情'
    } 
  },
  {
    path:'/tasklist/taskdetail/selfContact',
    name:"SelfContact",
    component: resolve => require(['../views/taskDetail/customerInfo/selfContact'],resolve),
    meta: {
      tit: '客户本人联系人信息'
    } 
  },
  {
    path:'/tasklist/taskdetail/relatedContact',
    name:"RelatedContact",
    component: resolve => require(['../views/taskDetail/customerInfo/relatedContact'],resolve),
    meta: {
      tit: '相关联系人信息'
    } 
  },
  {
    path:'/tasklist/taskdetail/clientAgreet',
    name:"ClientAgreet",
    component: resolve => require(['../views/taskDetail/customerInfo/clientAgreet'],resolve),
    meta: {
      tit: '委托协议信息'
    }
  },
  {
    path:'/tasklist/taskdetail/checkLetter',
    name:"CheckLetter",
    component: resolve => require(['../views/taskDetail/customerInfo/checkLetter'],resolve),
    meta: {
      tit: '查看委托函'
    } 
  },
  {
    path:'/tasklist/taskdetail/replayChannel',
    name:"ReplayChannel",
    component: resolve => require(['../views/taskDetail/customerInfo/replayChannel'],resolve),
    meta: {
      tit: '还款渠道'
    } 
  },
  {
    path:'/tasklist/taskdetail/debtList',
    name:"DebtList",
    component: resolve => require(['../views/taskDetail/customerInfo/debtList'],resolve),
    meta: {
      tit: '债务列表'
    } 
  },
  {
    path:'/tasklist/taskdetail/transferApply',
    name:"TransferApply",
    component: resolve => require(['../views/taskDetail/transferApply'],resolve),
    meta: {
      tit: '流转申请'
    } 
  },
  {
    path:'/tasklist/taskdetail/applyRefund',
    name:"applyRefund",
    component: resolve => require(['../views/taskDetail/applyRefund'],resolve),
    meta: {
      tit: '申请退单'
    } 
  },
  {
    path:'/tasklist/taskdetail/social',
    name:"social",
    component: resolve => require(['../views/taskDetail/customerInfo/social'],resolve),
    meta: {
      tit: '其它信息'
    } 
  },
  {
    path:'/tasklist/taskdetail/lawuit',
    name:"lawuit",
    component: resolve => require(['../views/taskDetail/customerInfo/lawuit'],resolve),
    meta: {
      tit: '诉讼信息'
    } 
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to, from) => {
  document.title = to.meta.tit;
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.path!=="/login")) {
    if (!getStore('userId')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
  next();
})

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/index";
import My from '../views/home/my/my';
import { getStore } from '@/config/utils';
import { inApp } from '@/native';
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
      tit: '易回',
    },
    children: [
      {
        tit: "抢单列表",
        path: "/graborderlist",
        name: 'GrabOrderList',
        component: () => import(/* webpackChunkName: "grabOrderList" */ "../views/home/grabOrderList/grabOrderList"),
        meta: {
          tit: '抢单列表',
          keepAlive: true,
        } 
      },
      {
        path: "/tasklist",
        name: 'TaskList',
        component: () => import(/* webpackChunkName: "taskList" */ "../views/home/taskList/taskList"),
        meta: {
          tit: '任务单',
          keepAlive: true,
        }  
      },
      {
        path: "/my",
        name: 'My',
        component: My,
        meta: {
          tit: '催客',
          keepAlive: true,
        } 
      }
    ]
  },
  {
    path: "/my/leaderboard",
    name: "Leaderboard",
    component: () => import(/* webpackChunkName: "Leaderboard" */ "../views/home/my/more/leaderboard"),
    meta: {
      tit: '月个人回款榜'
    }
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
      tit: '任务单搜索',
      keepAlive: true,
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
    path:'/tasklist/taskdetail',
    name:"TaskDetail",
    component: () => import(/* webpackChunkName: "TaskDetail" */ "../views/taskDetail"),
    meta: {
      tit: '任务详情'
    } 
  },
  {
    path:'/tasklist/taskdetail/selfContact',
    name:"SelfContact",
    component: () => import(/* webpackChunkName: "SelfContact" */ "../views/taskDetail/customerInfo/selfContact"),
    meta: {
      tit: '客户本人信息'
    } 
  },
  {
    path:'/tasklist/taskdetail/relatedContact',
    name:"RelatedContact",
    component: () => import(/* webpackChunkName: "RelatedContact" */ "../views/taskDetail/customerInfo/relatedContact"),
    meta: {
      tit: '相关联系人信息'
    } 
  },
  {
    path:'/tasklist/taskdetail/clientAgreet',
    name:"ClientAgreet",
    component: () => import(/* webpackChunkName: "ClientAgreet" */ "../views/taskDetail/customerInfo/clientAgreet"),
    meta: {
      tit: '委托协议信息'
    }
  },
  {
    path:'/tasklist/taskdetail/checkLetter',
    name:"CheckLetter",
    component: () => import(/* webpackChunkName: "CheckLetter" */ "../views/taskDetail/customerInfo/checkLetter"),
    meta: {
      tit: '查看委托函'
    } 
  },
  {
    path:'/tasklist/taskdetail/replayChannel',
    name:"ReplayChannel",
    component: () => import(/* webpackChunkName: "ReplayChannel" */ "../views/taskDetail/customerInfo/replayChannel"),
    meta: {
      tit: '还款渠道'
    } 
  },
  {
    path:'/tasklist/taskdetail/targetInfo',
    name:"TargetInfo",
    component: () => import(/* webpackChunkName: "TargetInfo" */ "../views/taskDetail/customerInfo/targetInfo"),
    meta: {
      tit: '目标值信息'
    } 
  },
  {
    path:'/tasklist/taskdetail/debtList',
    name:"DebtList",
    component: () => import(/* webpackChunkName: "DebtList" */ "../views/taskDetail/customerInfo/debtList"),
    meta: {
      tit: '债务列表'
    } 
  },
  {
    path:'/tasklist/taskdetail/transferApply',
    name:"TransferApply",
    component: () => import(/* webpackChunkName: "TransferApply" */ "../views/taskDetail/transferApply"),
    meta: {
      tit: '流转申请'
    } 
  },
  {
    path:'/tasklist/taskdetail/applyRefund',
    name:"applyRefund",
    component: () => import(/* webpackChunkName: "applyRefund" */ "../views/taskDetail/applyRefund"),
    meta: {
      tit: '申请退单'
    } 
  },
  {
    path:'/tasklist/taskdetail/social',
    name:"social",
    component: () => import(/* webpackChunkName: "social" */ "../views/taskDetail/customerInfo/social"),
    meta: {
      tit: '其它信息'
    } 
  },
  {
    path:'/tasklist/taskdetail/lawuit',
    name:"lawuit",
    component: () => import(/* webpackChunkName: "lawuit" */ "../views/taskDetail/customerInfo/lawuit"),
    meta: {
      tit: '诉讼信息'
    } 
  },
  {
    path:'/tasklist/taskdetail/newContact',
    name:"newContact",
    component: () => import(/* webpackChunkName: "newContact" */ "../views/taskDetail/customerInfo/newContact"),
    meta: {
      tit: '新增信息'
    } 
  },
  {
    path:'/protocol',
    name:"protocol",
    component: () => import(/* webpackChunkName: "protocol" */ "../views/protocol/index"),
    meta: {
      tit: '隐私条款'
    } 
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.afterEach((to, from) => {
  document.title = to.meta.tit;
})

router.beforeEach((to, from, next) => {
  if(!inApp) {
    if (to.matched.some(record => {return record.path!=="/login"&&record.path!=="/protocol"})) {
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
  }
  next();
})

export default router;

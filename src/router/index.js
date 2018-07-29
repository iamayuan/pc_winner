import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/project',
                    component: resolve => require(['../components/page/Project.vue'], resolve),
                    meta: { title: '项目管理' }
                },
                {
                    path: '/menu',
                    component: resolve => require(['../components/page/Menu.vue'], resolve),
                    meta: { title: '菜单管理' }
                },
                {
                    path: '/article',
                    component: resolve => require(['../components/page/Articles.vue'], resolve),
                    meta: { title: '文章管理' }
                },
                {
                    path: '/feedback',
                    component: resolve => require(['../components/page/FeedBack.vue'], resolve),
                    meta: { title: '反馈管理' }
                },
                {
                    path: '/userlist',
                    component: resolve => require(['../components/page/UserList.vue'], resolve),
                    meta: { title: '用户管理' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

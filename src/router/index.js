import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: "/",
        name: "home",
        component: Home,
        children: [{
                path: '/dashboard',
                name: 'dashboard',
                meta: {
                    title: "首页"
                },
                component: () =>
                    import ("../views/Dashboard.vue")
            },
            {
                path: "/basetable",
                name: "basetable",
                meta: {
                    title: "表格"
                },
                component: () =>
                    import ("../views/BaseTable")
            },
            {
                path: "/mgt-user",
                name: "user",
                meta: {
                    title: "用户管理"
                },
                component: () =>
                    import ("../views/user")
            },
            {
                path: "/mgt-movie",
                name: "movie",
                meta: {
                    title: "电影管理"
                },
                component: () =>
                    import ("../views/movie")
            },
            {
                path: "/mgt-comment",
                name: "comment",
                meta: {
                    title: "评论管理"
                },
                component: () =>
                    import ("../views/comment")
            },
            {
                path: "/mgt-order",
                name: "order",
                meta: {
                    title: "订单管理"
                },
                component: () =>
                    import ("../views/order")
            },
            {
                path: "/mgt-hall",
                name: "hall",
                meta: {
                    title: "放映厅管理"
                },
                component: () =>
                    import ("../views/hall")
            },
            {
                path: "/mgt-session",
                name: "session",
                meta: {
                    title: "场次安排"
                },
                component: () =>
                    import ("../views/session")
            },
        ],
    }
];

const router = new VueRouter({
    mode: "history",
    // base: window.__POWERED_BY_QIANKUN__ ? '/vue' : process.env.BASE_URL,
    base: "/",
    routes
});

export default router;
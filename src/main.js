/**
 * Created by truncate on 2017/4/12.
 */
import Vue from 'vue'
import App from './App'
import Router from './router.js'
import Store from './vuex/store/index'
import IView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 IVIEW CSS
import './assets/style/customize/common.less' // 定制公共 less
import Toast from './libs/toast/' // 定制吐司
import Util from './libs/util' // 工具
import Http from './libs/http' //请求工具
import './libs/filter' //过滤器

Vue.use(Toast)
Vue.use(Http)
Vue.use(IView)
Vue.config.productionTip = false

Router.beforeEach(({meta, path}, from, next) => {
    Util.title(meta.title);
    var auth = meta.routeAuth == false ? false : true
    //var { a = 1} = { a: 3 } //a =3
    //var { auth = true} = meta
    //获取用户是否登陆
    let token = window.localStorage.getItem('token');
    if (auth && !token && path != '/login') {
        next({path: '/login'})
    } else if (path == '/login' && token) {
        next({path: '/manage/'})
    }
    next()
})

new Vue({
    el: '#app',
    router: Router,
    store: Store,
    template: '<App/>',
    components: {App},
    myOption: 'hello!'
})

Vue.prototype.myMethod = function () {
    alert(3333)
}

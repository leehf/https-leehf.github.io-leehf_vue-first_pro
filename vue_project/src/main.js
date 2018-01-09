// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//Vue.prototype.axios = axios;

Vue.config.productionTip = false

router.afterEach((to, from, next) => {
	window.scrollTo(0, 0);
}); //切换路由时，滚动条都初始化为顶部
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
});
//router.push('index');
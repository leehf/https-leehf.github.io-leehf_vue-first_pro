import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import nav from '@/components/nav'
import game from '@/components/game'
import footer from '@/components/footer'
import detail from '@/components/detail'
import about from '@/components/about'
import register from '@/components/register'
import toast from '@/components/toast'

Vue.use(Router)

export default new Router({
//	mode: 'history',
	routes: [{
			path: '/',
			name: 'index',
			component: index
		},
		{
			path: '/index',
			name: 'index',
			component: index
		},
		{
			path: "/toast",
			name: 'toast',
			component: toast
		},
		{
			path: "/game",
			name: 'game',
			component: game
		},
		{
			path: "/footer",
			name: 'footer',
			component: footer
		},
		{
			//path:"/detail/:id",//相对应
			path: "/detail",
			name: 'detail',
			component: detail
		},
		{
			path: "/about",
			name: 'about',
			component: about
		},
		{
			path: "/register",
			name: 'register',
			component: register
		}
	]
})
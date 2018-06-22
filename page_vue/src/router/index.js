import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import pageList from '@/components/pageList'
import pageDemo from '@/components/pageDemo'
import pageDemo2 from '@/components/pageDemo2'
import bus1 from '@/demo/bus1'
import bus2 from '@/demo/bus2'

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
			path: '/pageDemo',
			name: 'pageDemo',
			component: pageDemo
		},
		{
			path: '/pageDemo2',
			name: 'pageDemo2',
			component: pageDemo2
		},
		{
			path: "/bus1",
			name: "bus1",
			component: bus1
		},
		{
			path: "/bus2",
			name: "bus2",
			component: bus2
		}

	]
})
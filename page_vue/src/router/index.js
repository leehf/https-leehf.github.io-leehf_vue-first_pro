import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import pageList from '@/components/pageList'
import pageDemo from '@/components/pageDemo'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/HelloWorld',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/pageDemo',
			name: 'pageDemo',
			component: pageDemo
		}
	]
})
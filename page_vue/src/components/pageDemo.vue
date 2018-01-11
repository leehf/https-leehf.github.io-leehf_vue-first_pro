<template>
	<div>
		<pageList :url="url" :pageCount="pageCount" :pageCurr="pageCurr" :pageListNum="pageListNum" v-on:listenToChildEvent="receiveMsgFormChild"></pageList>
	</div>
</template>

<script>
	import axios from 'axios' //更好突显此组件中引入该方法
	import pageList from './pageList'
	export default {
		name: "pageDemo",
		components: {
			pageList
		},
		data() {
			return {
				url: "./page.json",//翻页请求的URL
				pageCount: 3,//总数据
				pageCurr: 2,//当前数据
				pageListNum:3//显示的翻页的条数，默认设为3条
			}
		},
		methods: {
			receiveMsgFormChild(data) { //子组件传至父组件
				/*debugger*/
				console.log(data);
				/*获取子组件请求得到的数据*/
			}
		}
	}
</script>

<style>

</style>
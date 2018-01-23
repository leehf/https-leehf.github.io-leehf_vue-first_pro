<template>
	<div>
		<ul class="clearfix fr">
			<li class="fl" v-show="pageCurr !==1" @click="sendMsgToParent(1)" v-if="firstButton">首页</li>
			<li class="fl" v-show="pageCurr !==1" v-if="prevButton" @click="sendMsgToParent(pageCurr-1)">上一页</li>
			<li class="fl sl" v-show="prevSl">...</li>

			<li class="fl" v-for="pageNum in getListNum" :class="{curr:pageNum==pageCurr}" @click="sendMsgToParent(pageNum)">{{pageNum}}</li>

			<li class="fl sl" v-show="nextSl">...</li>
			<li class="fl" v-show="pageCurr !== pageCount" v-if="nextButton" @click="sendMsgToParent(pageCurr+1)">下一页</li>
			<li class="fl" v-show="pageCurr !== pageCount" v-if="nextButton" @click="sendMsgToParent(pageCount)">尾页</li>
			<a class="fl noBoder" @click="sendMsgToParent(inputNum)" href="javascript:" v-show="pageCurr !==1">跳转</a>
			<input type="text" @keyup="limitInput()" v-model="inputNum" />
		</ul>
	</div>
</template>
<script>
	import axios from 'axios' //更好突显此组件中引入该方法
	export default {
		name: "pageList",
		props: {
			"url": {
				type: String,
				default: ""
			},
			"pageCount": {
				type: Number,
				default: 0
			},
			"pageCurr": {
				type: Number,
				default: 0
			},
			"firstButton": { //首页按钮
				type: Boolean,
				default: true
			},
			"lastButton": { //尾页按钮
				type: Boolean,
				default: true
			},
			"prevButton": { //上一页按钮
				type: Boolean,
				default: true
			},
			"nextButton": { //上一页按钮
				type: Boolean,
				default: true
			},
			"pageListNum": {
				type: Number,
				default: 3
			}
		},
		data() {
			return {
				prevSl: true,
				nextSl: true,
				inputNum: ""
			}
		},
		mounted() {},
		computed: {
			pageListNum1() { //判断每页显示的页码个数，如为偶数则相应转换为该偶数-1的页码数
				if(this.pageListNum % 2 !== 1) {
					this.pageListNum = this.pageListNum - 1;
				}
				return this.pageListNum;
			},
			getListNum() { //获取分页的条数
				var list = [];
				if(this.pageCount <= this.pageListNum) {
					for(let i = 1; i <= this.pageCount; i++) {
						list.push(i);
					}
				} else {
					/*if(this.pageCurr == 1 || this.pageCurr == 2 || this.pageCurr == this.pageCount || this.pageCurr == this.pageCount - 1) {
						var i, length;

						if(this.pageCurr == this.pageCount) {
							for(i = this.pageListNum - 1; i > -1; i--) {
								list.push(this.pageCount - i);
							}
						} else if(this.pageCurr == this.pageCount - 1) {
							i = -3;
							length = this.pageListNum - 3
							for(i; i < length; i++) {
								list.push(this.pageCurr + i);
							}
						} else {
							this.pageCurr == 1 ? i = 0 : i = -1;
							this.pageCurr == 1 ? length = this.pageListNum : length = this.pageListNum - 1;
							for(i; i < length; i++) {
								list.push(this.pageCurr + i);
							}
						}
					} else {*/
					for(var i = (-(this.pageListNum - 1) / 2); i <= (this.pageListNum - 1) / 2; i++) {
						if(this.pageCurr + i <= 0) {
							list.push(this.pageCurr + (this.pageListNum - 1) / 2 - i);
						} else if(this.pageCurr + i > this.pageCount) {
							list.push(this.pageCount - (this.pageListNum - 1) / 2 - i);
						} else {
							list.push(this.pageCurr + i);
						}
					}
					//	}
				}
				list.sort(this.sortNumber);
				list[0] == 1 && (this.prevSl = false);
				list[list.length - 1] == this.pageCount && (this.nextSl = false);
				return list;
			}
		},
		methods: {
			sortNumber(a, b) {
				return a - b; //排序判断
			},
			sendMsgToParent(num) { //数据请求并将数据返回父组件
				debugger;
				let that = this;
				axios.get(this.url, parseInt(num)).then(function(res) {
					console.log(res);
					if(res.data.statusCode == 200) {
						//在组件中 直接修改请求回来的当前页和总页码,也可以将页码返回至父组件中去修改
						that.pageCount = res.data.pageCount;
						that.pageCurr = res.data.pageCurr;
						that.$emit("listenToChildEvent", res.data); //该条语句是向父组件通信传值
					}
				})
				//该条语句是向父组件通信传值
				//this.$emit("listenToChildEvent", num);
			},
			limitInput() {
				/*限制输入框的数据在首页和总页码之间*/
				let min = 1;
				let n = this.inputNum;
				if(parseInt(n) < min || parseInt(n) > this.pageCount) {
					alert('输入错误');
					this.inputNum = null;
				}
			}
		}

	}
</script>

<style scoped lang="scss">
	* {
		padding: 0 0;
		margin: 0 0;
		box-sizing: border-box;
	}
	
	ul {
		list-style: none;
	}
	
	.clearfix {
		&:after {
			content: "";
			display: table;
			clear: both;
		}
	}
	
	a {
		text-decoration: none;
		color: inherit;
		display: inline-block;
		line-height: 26px;
		font-size: 14px;
		margin: 0 10px;
		&:hover {
			color: #5a98de;
		}
	}
	
	.noBoder {
		display: inline;
		border: none;
	}
	
	input {
		box-sizing: border-box;
		border: solid 1px #ddd;
		width: 100%;
		-webkit-transition: all .2s linear 0s;
		-moz-transition: all .2s linear 0s;
		-o-transition: all .2s linear 0s;
		transition: all .2s linear 0s;
		font-size: 12px;
		height: 23px;
		padding: 1px 2px;
		line-height: 1.42857;
		width: 40px;
		height: 26px;
	}
	
	$float-data: (fl, left),
	(fr, right);
	@each $float,
	$direction in $float-data {
		.#{$float} {
			float: #{$direction};
		}
	}
	
	ul {
		li {
			border: 1px solid #ccc;
			cursor: pointer;
			display: inline-block;
			margin-left: 2px;
			text-align: center;
			text-decoration: none;
			color: #666;
			height: 26px;
			line-height: 26px;
			text-decoration: none;
			margin: 0 0 6px 6px;
			padding: 0 10px;
			font-size: 14px;
			&:not(.sl) {
				&.curr,
				&:hover {
					background: #5a98de;
					color: #fff;
				}
			}
			&.sl {
				border: none;
			}
		}
	}
</style>
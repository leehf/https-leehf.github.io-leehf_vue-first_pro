<template>
	<div>
		<na></na>
		<div class="detail">

			<div v-if="data.articleAd.list[0].href1 !==''">
				<a target="_blank" :href="data.articleAd.list[0].href1" :style="{background:'url('+ data.articleAd.list[0].bigImg +')no-repeat center'}" class="img"></a>

			</div>
			<div v-else>
				<a target="_blank" href="javascript:" :style="{background:'url('+ data.articleAd.list[0].bigImg +')no-repeat center'}" class="img"></a>

			</div>

			<div class="content clearfix">
				<div class="fl left_content">
					<h2>{{data.article.title}}</h2>
					<p>
						<span class="time">发布时间：
						{{(new Date(parseInt(data.article.onlineDate)).getFullYear())+"-"+(new Date(parseInt(data.article.onlineDate)).getMonth()+1)+"-"+(new Date(parseInt(data.article.onlineDate)).getDate())}}
					</span>|<span class="org">来源：{{data.article.source}}</span></p>
					<div class="text" v-html="data.article.content">
					</div>
				</div>
				<div class="fr rmyx">
					<div class="Rgame"  :class="{fid:ad_Num==2}">
						<h2>热门游戏</h2>
						<ul>
							<li :key="index" v-for="(articleHotGame,index) in data.articleHotGame.list" v-show="index <= ad_Num">
								<a target="_blank" :href="articleHotGame.href1">
									<img :src="articleHotGame.bigImg" alt="">
									<div class="lay"></div>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios' //更好突显此组件中引入该方法
	import na from './nav'
	export default {
		name: 'detail',
		components: {
			na
		},
		data() {
			return {
				scroll: "",
				ad_Num: 5,
				data: {
					article: {
						title: "",
						onlineDate: "",
						source: "",
						content: ""
					},
					articleAd: {
						list: [{
							bigImg: "",
							desc: "",
							href1: "",
							href2: "",
							href3: "",
							name: "",
							smallImg: ""
						}],
						name: "",
						type: "",
						updateUserName: "",
						updateUserId: ""
					},
					articleHotGame: {
						list: []
					}
				}
			}
		},
		created() {
			console.log(this.$route.query.id)
			let that = this;
			let url = "http://op.yueeyou.com/portal/api/article/detail?id=" + this.$route.query.id;
			axios.get(url).then(function(res) {
				console.log(res.data);
				that.data = res.data.data;
			})
		},
		mounted() {
			window.addEventListener('scroll', this.scrol)
		},
		methods: {
			scrol() {
				this.scroll = document.body.scrollTop || document.documentElement.scrollTop;
				var rm_game_height = document.querySelector(".Rgame").offsetTop;
				this.scroll > rm_game_height ? this.ad_Num = 2 : this.ad_Num = 5;
				console.log(this.scroll)
			}
		}
	}
</script>

<style scoped lang="stylus" src="../common/style/detail.styl">

</style>
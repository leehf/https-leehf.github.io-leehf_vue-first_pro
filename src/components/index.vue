<template>
	<div>
		<na :activeIndex="activeIndex"></na>
		<div class="firstModel">
			<!--<div class="banner-swiper banner" v-swiper:banner-swiper="swiperOption">
                <ul class="swiper-wrapper">
                    <li class="swiper-slide num" v-for="(banner,index) in data.homeBanner.list">
                        <a :href="banner.href1" target="_blank" :style="{background:'url() no-repeat center'}">
                            <img :src="banner.bigImg" alt="">
                        </a>
                    </li>
                </ul>
            </div>-->
			<swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
				<swiper-slide class="" :key="index" v-for="(banner,index) in data.homeBanner.list">
					<a :href="banner.href1" target="_blank" :style="{background:'url() no-repeat center'}">
						<img :src="banner.bigImg" alt="">
					</a>
				</swiper-slide>
			</swiper>
			<div class="bannerContent clearfix">
				<span class="prev" @click="prev()"><i class="background-icon"></i></span>
				<span class="next" @click="next()"><i class="background-icon"></i></span>
				<nav class="nav bannerNav">
					<ul class="clearfix">
						<li class="li" :class="{curr:index===activeIndex}" :key="index" v-for="(banner,index) in data.homeBanner.list" @click="slid(index,1)">
							<a href="javascript:"></a>
						</li>
					</ul>
				</nav>
				<div class="leftContent fl">
					<div class="layer"></div>
					<swiper :options="swiperOption1" :not-next-tick="notNextTick" ref="mySwiper1">
						<swiper-slide class="" :key="index" v-for="(homeAd,index) in data.homeAd.list">
							<a :href="homeAd.href1" target="_blank" :style="{background:'url() no-repeat center'}">
								<img :src="homeAd.bigImg" alt="">
							</a>
						</swiper-slide>
					</swiper>

					<nav class="nav contentNav ">
						<ul class="clearfix fr">
							<li class="li fl" :class="{curr:index===activeIndex1}" :key="index" v-for="(homeAd,index) in data.homeAd.list" @click="slid(index,2)">
								<a href="javascript:"></a>
							</li>
						</ul>
					</nav>
				</div>
				<div class="rightContent fr">
					<div class="title">
						<h2>最新动态</h2>
					</div>
					<div class="detail">
						<!--   [:if((data.articles.length >0 && typeof(data.articles)!=="undefined")){:]
                        [:for(var i=0;i< 5 && i< data.articles.length;i++){:]-->
						<div class="text" v-if="data.articles.length > 0 && data.articles.length < 5" :key="index" v-for="(articles,index) in data.articles">
							<!--<a target="_blank" href='detail?id= articles.id'>-->
							<!--<router-link :to="/detail/+articles.id">-->
								<router-link :to="{path:'/detail',query: {id: articles.id}}">
								<i class="background-icon"></i><span>{{articles.title}}</span>
							</router-link>
							<!--</a>-->
						</div>
					</div>
				</div>
			</div>
		</div>
		<article class="popularGame" v-if="data.homeHotGame.list.length >0 && data.homeHotGame.list.length < 6 && typeof(data.homeHotGame.list)!=='undefined'">
			<div class="gameTit">
				<h2>热门游戏</h2>
			<router-link to="/game">MORE +</router-link>
			</div>
			<div class="gameContent">
				<ul class="clearfix">
					<li class="fl" :key="index" v-for="(homeHotGame,index) in data.homeHotGame.list">
						<div>
							<img :src="homeHotGame.bigImg" alt="">
							<div class="fixedFooter">
								<div class="clearfix">
									<img class="fl" :src="homeHotGame.smallImg" alt="">
									<p class="fl">{{homeHotGame.desc}}</p>
								</div>
								<div class="btn">
									<a target="_blank" 
										v-if="homeHotGame.href1 !==''" 
										:href="homeHotGame.href1">进入官网</a>
									<a v-if="homeHotGame.href2 !==''" :href="homeHotGame.href2" class="download">游戏下载</a>
								</div>
							</div>
						</div>
						<span class="gameName">
                         {{homeHotGame.name}}
                        </span>
					</li>
				</ul>
			</div>
		</article>
	</div>
</template>
<script>
	import na from './nav'
	import axios from 'axios'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'

	export default {
		name: 'index',
		components: {
			na,
			swiper,
			swiperSlide
		},
		data() {
			return {
				notNextTick: true,
				data: {
					homeBanner: {
						list: ""
					},
					homeAd: {
						list: ""
					},
					articles: {},
					homeHotGame: {
						list: ""
					}
				},
				activeIndex: "",
				activeIndex1: "",
				swiperOption: {
					autoplay: 100,
					effect: 'fade',
					//					loop: true,
					/*			prevButton: '.prev',
								nextButton: '.next',*/
					observer: true,
					//                    grabCursor: true,
					// if you need use plugins in the swiper, you can config in here like this
					// 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
					onInit: function(swiper) {
						//						console.log('onSlideChangeEnd', swiper.realIndex)
					},
					onSlideChangeEnd: function(swiper) {
						//						console.log('onSlideChangeEnd', swiper.realIndex)
					}
				},
				swiperOption1: {
					autoplay: 100,
					effect: 'fade',
					//					loop: true,
					/*			prevButton: '.prev',
								nextButton: '.next',*/
					observer: true,
					//                    grabCursor: true,
					// if you need use plugins in the swiper, you can config in here like this
					// 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
					onInit: function(swiper) {
						/*console.log('onSlideChangeEnd', swiper.realIndex)*/
					},
					onSlideChangeEnd: function(swiper) {
						//						console.log('onSlideChangeEnd', swiper.realIndex)
					}
				}
			}
		},
		created() {
			let that = this;
			axios.get("http://op.yueeyou.com/portal/api/homeData").then(function(res) {
				console.log(res);
				that.data = res.data.data;
			})
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.swiper
			},
			swiper2() {
				return this.$refs.mySwiper1.swiper
			}
		},
		mounted() {
			this.activeIndex1 = this.swiper2.activeIndex;
			this.activeIndex = this.swiper.activeIndex;
			this.change();
			// you can use current swiper instance object to do something(swiper methods)
			// 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
		},
		methods: {
			slid(index, num) {
				//debugger
				if(num === 1) {
					this.activeIndex = index;
					this.swiper.slideTo(index, 1000, false);
				} else if(num === 2) {
					this.activeIndex1 = index;
					this.swiper2.slideTo(index, 1000, false);
				}

			},
			prev() {
				//debugger
				let index;
				//				if(str = "") {
				this.swiper.activeIndex == 0 ? index = this.data.homeBanner.list.length - 1 : index = this.swiper.activeIndex - 1;
				this.activeIndex = index;
				this.swiper.slideTo(index, 1000, false);
				/*	} else {
						this.swiper2.activeIndex == 0 ? index = this.data.homeAd.list.length - 1 : index = this.swiper2.activeIndex - 1;
						this.activeIndex1 = index;
						this.swiper2.slideTo(index, 1000, false);
					}*/
			},
			next() {
				/*debugger*/
				let index;
				//				if(str = "") {
				this.swiper.activeIndex == this.data.homeBanner.list.length - 1 ? index = 0 : index = this.swiper.activeIndex + 1;
				this.activeIndex = index;
				this.swiper.slideTo(index, 1000, false);
				/*} else {
					this.swiper2.activeIndex == this.data.homeAd.list.length - 1 ? index = 0 : index = this.swiper2.activeIndex + 1;
					this.activeIndex1= index;
					this.swiper2.slideTo(index, 1000, false);
				}*/
			},
			change() { //切换时的方法
				let that = this;
				this.swiper2.on("onSlideChangeStart", function(swipe) {
					/*debugger*/
					that.activeIndex1 = swipe.realIndex;
					console.log(swiper);
				});
				this.swiper.on("onSlideChangeStart", function(swipe) {
					/*debugger*/
					that.activeIndex = swipe.realIndex;
					console.log(swiper);
				})
			}
		}
	}
</script>
<style scoped lang="stylus">
	@import "../common/style/swiper.min.css";
	@import "../common/style/index.styl";
</style>
<template>
	<div>
		<na :activeIndex="activeIndex"></na>
		<div class="about">
			<div v-if="data.aboutUs.adImg !==''">
				<a target="_blank" href="javascript:"
					 :style="{background:'url('+ data.aboutUs.adImg +')no-repeat center'}" class="img"></a>
			</div>
			<div class="content">
                <div class="aboutTit">
                    <h2>关于我们
                        <span>About Us</span>
                    </h2>
                </div>
                <div class="text"><p>{{data.aboutUs.cnDesc}}</p></div>
                <div class="text"><p>{{data.aboutUs.enDesc}}</p></div>
                <div class="imgShow clearfix">
                    <!--[:for(var i=0;i< 4;i++){}}-->
                    <div class="fl" v-for="(imgs,index) in data.aboutUs.imgs" v-show="index < 4">
                        <img :src="imgs" alt="">
                    </div>
                    <!--[:}}}-->
                </div>
                <div class="aboutTit">
                    <h2>
                        联系我们
                        <span>Contact Us</span>
                    </h2>
                </div>
                <div class="contact">
                    <ul>
                        <li class="fl">
                            <i class="background-icon address"></i>
                            <h3>地址</h3>
                            <p>{{data.aboutUs.address}}</p>
                        </li>
                        <li class="fl">
                            <i class="background-icon contactTo"></i>
                            <h3>联系人</h3>
                            <p>{{data.aboutUs.contactTo}}</p>
                        </li>
                        <li class="fl">
                            <i class="background-icon contactTel"></i>
                            <h3>联系电话</h3>
                            <p>{{data.aboutUs.contactTel}}</p>
                        </li>
                    </ul>
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
				activeIndex: 2,
				data: {
					aboutUs: {
						adImg: "",
						cnDesc:"",
						enDesc:""
					}
				}
			}
		},
		created() {
			let that = this;
			axios.get("http://op.yueeyou.com/portal/api/aboutUs").then(function(res) {
				console.log(res);
				debugger
				that.data = res.data.data;
			})
		}
	}
</script>

<style scoped lang="stylus" src="../common/style/about.styl">

</style>
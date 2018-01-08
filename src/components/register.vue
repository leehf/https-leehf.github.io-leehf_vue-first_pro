<template>
	<div>
		<na></na>
		<toast :toastMsg="toastMsg" :msgShow="msgShow" @sendMsg="sendMsg"></toast>
		<div id="content" class="warpper index">
			<form action="http://user.yueeyou.com/register" method="post" v-show="formShow===1">
				<h1>免费注册悦游账号</h1>
				<input type="text" name="name" v-model.trim="name" placeholder="用户名（6-20位）">
				<input type="password" name="password" v-model.trim="password" placeholder="密码（由6-16位英文字母及数字组成）">
				<input type="password" name="rePassword" v-model.trim="rePassword" placeholder="重复密码">
				<input type="tel" name="mobile" v-model.trim="mobile" placeholder="手机号">
				<input type="text" name="realName" v-model.trim="realName" placeholder="真实姓名">
				<input type="text" name="idNumber" v-model.trim="idNumber" placeholder="身份证号">
				<input type="text" name="contact" v-model.trim="contact" placeholder="联系方式">
				<div>
					<input id="agree" name="agree" v-model="agree" type="checkbox"><label for="agree">我同意</label>
					<a @click="dialog()" href="javascript:">《悦游账号用户协议》</a>
				</div>
				<!--<input type="submit" class="submitBtn" value="免费注册账号">-->
				<span class="submitBtn" @click="register()">免费注册账号</span>
				<p>已有悦游账号？
					<a class="toggle" href="javascript:" @click="show(2)">点此登录</a>
				</p>
			</form>
			<form class="signForm" v-show="formShow===2" action="http://user.yueeyou.com/login" method="post">
				<h1>登录悦游账号</h1>
				<input type="text" name="name" v-model.trim="loginName" placeholder="用户名">
				<input type="password" name="password" v-model.trim="loginPassword" placeholder="密码">
				<!--<input type="submit" class="sign" value="登录">-->
				<span class="sign" @click="login()">登录</span>
				<p>没有悦游账号？
					<a class="toggle" href="javascript:" @click="show(1)">点此注册</a>
				</p>
			</form>
			<div class="success" v-show="formShow===3">
				<div>
					<p><span class="name">{{registerName}}</span>，欢迎您！</p>
					<p><span class="time">{{js_time}}</span>秒后回到首页</p>
				</div>
			</div>
		</div>
		<p class="text">
			* 按照2010年8月1日实施的《网络游戏管理暂行办法》，网游用户需要先进行实名注册后，再进入游戏。<br> * 为了您顺畅的游戏体验，享受健康游戏生活，请您尽快填写上方的身份信息<br> * 身份信息只能提交一次，不能随意修改，请慎重填写。<br> * 未满18岁的用户，在游戏过程中，将有防沉迷的消息提示。<br> &nbsp;&nbsp;游戏过程，会提示您的累计在线时间。
			<br> &nbsp;&nbsp;累计游戏时间超过3小时，游戏收益（经验，金钱）减半。
			<br> &nbsp;&nbsp;累计游戏时间超过5小时，游戏收益为0。
		</p>
		<div class="dialog" v-show="dialog_show">
			<div>
				<div class="dialogTitle">
					用户服务协议
					<a href="javascript:" class="dialogTitleClose" @click="dialog()">x</a>
				</div>
				<div class="dialogContent">
					<pre>
                            重要须知:\r\n本协议是您(个人或单一实体)与本游戏的开发者之间关于开发者向您提供本游戏所涉关相服务的法律协议。在此特别提醒,用户(您)欲使用相关服务,必须事先认真阅读本服条务款中各条款,包括免除或者限制开发者责任的免责条款及对用户的权利限制。请您审阅接并受或不接受本服务条款(未成年人审阅时应得到法定监护人的陪同)。本服务条款一旦发生变更,将在网页上公布修改内容。修改后的服务条款一旦在网页上公布即有效代替原来的服务条款。您可随时登陆网页查阅最新版服务条款。您若不同意对服务条款的修改,您应使不用或主动取消相关服务,否则,您的任何对相关服务的登陆、查看等使用行为将被视为您对相关修改和本协议的理解和接受。\r\n\r\n如果您选择接受本协议开通服务,即表示您同意接受协议各项条件的约束。如果您不同本意服务条款,则不能获得使用本服务的权利。您若有违反本条款的任何规定,开发者有权时随中止或终止您服务的使用资格并保留追究相关法律责任的权利。\r\n\r\n*如无特别说明,下列术语在本协议中的含义为:\r\n开发者:指经有效申请并经过乐初游戏公司同意,将其开发的或有权的各种游戏接入基于腾社讯区开放平台而向用户提供各种服务的,具备民事行为能力的个人、法人或其他组织。\r\n游戏:指由开发者开发的可向用户提供各种服务的游戏程序,包括但不限于游戏类服务、工具类服务、电子商务类服务、视频或音乐类服务等现存的各种服务及今后可能出现的种各服务。\r\n\r\n1.本游戏及服务由开发者开发,受中华人民共和国版权法及国际版权条约和其他知识产权法及条约的保护。\r\n\r\n2.用户在遵守法律及本条款的前提下可依本协议使用游戏及享受服务,但用户无权实施包括但不限于下列行为:\r\n2.1.删除游戏及其他副本上所有关于版权的信息、内容;\r\n2.2.对游戏进行反向工程、反向汇编、反向编译等;\r\n2.3.对于游戏中相关信息等,未经**书面同意,用户不得擅自实施包括但不限于下列行为:使用、复制、修改、链接、转载、汇编、发表、出版,建立镜像站点、擅自借“助软件”发展与之有关的衍生产品、作品等。\r\n2.4.利用游戏及服务发表、传送、传播、储存危害国家安全、祖国统一、社会稳定的内容,或侮辱诽谤、色情、暴力、引起他人不安及任何违反国家法律法规政策的内容。\r\n2.5.利用发表、传送、传播、储存侵害他人知识产权、商业机密权等合法权利的内容。\r\n2.6.进行任何危害计算机网络安全的行为,包括但不限于:使用未经许可的数据或进入未经许可的服务器/帐户;未经允许进入公众计算机网络或者他人计算机系统并删除、修改、增加存储信息;未经许可,企图探查、扫描、测试本“软件”系统或网络的弱点或其它实施破坏网络安全的行为;企图干涉、破坏本“软件”系统或网站的正常运行,故意传播恶意程序或病毒以及其他破坏干扰正常网络信息服务的行为;伪造TCP/IP数据包名称或部分名称。\r\n\r\n3.用户须明白,使用本服务产品涉及到互联网服务,可能会受到各个环节不稳定因素的影响。因此服务存在不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用关户机以及其他任何技术、互联网络、通信线路原因等造成的服务中断或不能满足用户要求风的险。\r\n\r\n4.用户须明白,在使用本服务产品存在有来自任何他人的包括威胁性的、诽谤性的、令人反感的或非法的内容或行为或对他人权利的侵犯(包括知识产权)的匿名或冒名的信息风的险,用户须承担以上风险,开发者对服务不作任何类型的担保,不论是明确的或隐含的包,括所有有关信息真实性、适商性、适于某一特定用途、所有权和非侵权性的默示担保件和,条对因此导致任何因用户不正当或非法使用服务产生的直接、间接、偶然、特殊及后续害的,损不承担任何责任。\r\n\r\n5.使用本服务必须遵守国家有关法律和政策等,维护国家利益,保护国家安全,并遵守本条款,对于用户违法或违反本协议的使用(包括但不限于言论发表、传送等)而引起的一切责任,由用户负全部责任。\r\n\r\n6.尊重用户个人隐私信息的私有性是本游戏及服务的原则,开发者将会采取合理的措施保护用户的个人隐私信息,除法律或有法律赋予权限的政府部门要求或用户同意等原因外未,经用户同意不向第三方公开、透露用户个人隐私信息。\r\n\r\n7.特别提醒用户,使用互联网必须遵守国家有关的政策和法律,如刑法、国家安全法、保密法、计算机信息系统安全保护条例等,保护国家利益,保护国家安全,对于违法使用联互网络而引起的一切责任,由用户负全部责任。\r\n7.1.用户不得使用本游戏及服务发送或传播任何妨碍社会治安或非法、虚假、骚扰性、辱侮性、恐吓性、伤害性、破坏性、挑衅性、淫秽色情性等内容的信息。\r\n7.2.用户不得使用本游戏及服务发送或传播敏感信息和违反国家法律制度的信息。\r\n7.3.本游戏及服务同大多数因特网产品一样,易受到各种安全问题的困扰,包括但不限于:1)透露详细个人资料,被不法分子利用,造成现实生活中的骚扰。2)哄骗、破译密码。3)下载安装的其它软件中含有“特洛伊木马”等病毒,威胁到个人计算计上信息和数据的安全,继而威胁对本游戏及服务的使用。\r\n\r\n8.请用户注意勿在使用本游戏及服务中透露自己的各类财产帐户、银行卡、信用卡、QQ号码及对应密码等重要资料,否则由此带来的任何损失由用户自行承担。\r\n\r\n9.用户应规范、合法地使用本游戏及服务,如用户有在公共环境下捣乱、骚扰、欺骗其他用户等行为或者实施其他违反本协议的行为,一经发现,开发者有权停止服务。\r\n\r\n10.用户须明白,开发者为了本游戏整体运营的需要,在经乐初游戏公司许可后,开发者拥有随时修改或中断、中止或终止服务而不需通知您的权利,开发者行使前述权利不需对您或何任第三方负责或承担任何赔偿责任。\r\n\r\n11.用户须明白,本游戏及相关服务由开发者向用户提供,乐初游戏公司仅提供本游戏的运营平台,基于本游戏的用户与开发者之间发生的任何纠纷由开发者与用户协商解决,相关责任和赔偿由开发者单独承担,与乐初游戏公司无关,用户无权向乐初游戏公司主张任何权利和赔偿。\r\n\r\n12.本服务条款的解释,效力及纠纷的解决,适用于中华人民共和国大陆法律。若发生任何纠纷或争议,应当友好协商解决,协商不成的,均应提交成都市高新区人民法院解决。(完)
                   </pre>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import na from './nav'
	import toast from './toast'
	import axios from 'axios'
	export default {
		name: 'index',
		components: {
			na,
			toast
		},
		data() {
			return {
				dialog_show: false,
				formShow: 1,
				registerName: "",
				loginUrl: "http://user.yueeyou.com/login",
				registerUrl: "http://user.yueeyou.com/register",
				loginName: "",
				loginPassword: "",
				//				data: {
				name: "",
				rePassword: "",
				password: "",
				mobile: "",
				realName: "",
				idNumber: "",
				contact: "",
				//				},
				agree: false,
				toastMsg: "",
				msgShow: false,
				errorMsg: "",
				js_time: 5
			}
		},
		methods: {
			dialog() {
				this.dialog_show == false ? this.dialog_show = true : this.dialog_show = false;
			},
			show(index) {
				this.formShow = index;
			},
			js() {
				let that = this;
				if(that.js_time === 0) {
					that.$router.push('/index');
				} else {
					setTimeout(function() {
						that.js_time--;
						that.js();
					}, 1000);
				}
			},
			axios(url, data) {
				let that = this;
				axios.post(url, data).then(function(res) {
					console.log(res);
					if(res.data.name !== undefined) {
						that.registerName = res.data.name;
						that.formShow = 3;
						that.js();
					} else {
						that.errorMsg = res.data.msg;
						that.sendMsg();
					}
				})
			},
			sendMsg() {
				let that = this;
				that.toastMsg = that.errorMsg;
				that.msgShow = true;
				setTimeout(function() {
					that.msgShow = false;
				}, 3000);
			},
			judgment(str1, str2) {
				return new RegExp(str1).test(str2);
			},
			login() {
				/*debugger*/
				let that = this;
				var data = "name=" + that.loginName + "&password=" + that.loginPassword;
				that.axios(that.loginUrl, data);
			},
			register() {
				/*debugger*/
				if(!this.agree) {
					this.errorMsg = "请同意《乐初账号用户协议》！"
					this.sendMsg();
					//					this.sendMsg("请同意《乐初账号用户协议》！");
				} else if(!this.judgment("^[a-zA-Z0-9_-]{4,16}", this.name)) {
					this.errorMsg = "请正确输入用户名！";
					this.sendMsg();
					//					this.sendMsg("请正确输入用户名！");
				} else if(!this.judgment("^1\\d{10}$", this.mobile)) {
					this.errorMsg = "请正确输入手机号！";
					this.sendMsg();
					//					this.sendMsg("请正确输入手机号！");
				} else if(!this.judgment("^[a-zA-Z0-9]{6,16}$", this.password)) {
					this.errorMsg = "请正确输入密码！";
					this.sendMsg();
					//					this.sendMsg("请正确输入密码！");
				} else if(this.password !== this.rePassword) {
					this.errorMsg = "两次输入的密码不匹配！";
					this.sendMsg();
					//					this.sendMsg("两次输入的密码不匹配！");
				} else if(!this.judgment("^.+$", this.realName)) {
					this.errorMsg = "请正确输入真实姓名！";
					this.sendMsg();
					//					this.sendMsg("请正确输入真实姓名！");
				} else if(!this.judgment("^(\\d{15}$|^\\d{17}(\\d|X|x))$", this.idNumber)) {
					this.errorMsg = "请正确输入身份证号！";
					this.sendMsg();
					//					this.sendMsg("请正确输入身份证号！");
				} else {
					let that = this;
					var data = "name=" + that.name + "&password=" + that.password + "&rePassword" + that.rePassword + "&mobile=" + that.mobile + "&realName=" + that.realName + "&idNumber=" + that.idNumber + "&contact=" + that.contact + "&agree=on";
					that.axios(that.registerUrl, data);
				}
			}
		}
	}
</script>

<style scoped lang="stylus">
	@import "../common/style/register.styl";
	.warpper {
		margin-top: 100px;
	}
</style>
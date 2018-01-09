<template>
	<div>
		<div v-show="msgShow" class="toast">
			{{toastMsg}}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'nav',
		props: {
			'msgShow': {
				type: Boolean,
				default: false
			},
			'toastMsg': {
				type: String,
				default: ""
			}
		}
	}
</script>

<style scoped>
	.toast {
		height: 40px;
		line-height: 40px;
		padding: 0 10px;
		box-sizing: border-box;
		position: fixed;
		top: 50%;
		left: 50%;
		margin-top: -20px;
		text-align: center;
		/*background: rgba(0, 0, 0, .4);*/
		border-radius: 10px;
		background: #e1e1e1;
		font-size: 14px;
		color: #333;
		-webkit-transform: translate(-50%);
		-moz-transform: translate(-50%);
		-ms-transform: translate(-50%);
		-o-transform: translate(-50%);
		transform: translate(-50%);
		z-index: 111;
	}
</style>
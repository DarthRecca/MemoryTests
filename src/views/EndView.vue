<template>
	<div class="thanks">
		<h2><b>Thank You!</b></h2>
		<div class="more-info">
			<br />
			<p class="more-links">
				If you want to take Intelligence Test click
				<a href="https://forms.gle/TVUcM3dNiFLZA85B8">Here</a>
			</p>
			<br />
			<p>Please Share this test with your friends and family!</p>
			<s-whats-app :window-features="whatsappShareOptions.windowFeatures" :share-options="whatsappShareOptions.shareOptions" :use-native-behavior="whatsappShareOptions.useNativeBehavior">
				<v-icon icon="mdi-whatsapp" color="green"></v-icon>
			</s-whats-app>
			<s-twitter :window-features="twitterShareOptions.windowFeatures" :share-options="twitterShareOptions.shareOptions" :use-native-behavior="twitterShareOptions.useNativeBehavior">
				<v-icon icon="mdi-twitter" color="blue-lighten-1"></v-icon>
			</s-twitter>
			<s-facebook :window-features="windowFeatures" :share-options="shareOptions" :use-native-behavior="useNativeBehavior">
				<v-icon icon="mdi-facebook" color="blue-darken-1"></v-icon>
			</s-facebook>
		</div>
		<br />
	</div>
</template>

<script>
export default {
	name: 'EndView',
	data() {
		return {
			whatsappShareOptions: {
				windowFeatures: {},
				shareOptions: {
					number: '',
					text: "Here is a free online MEMORY TEST that I found to be useful. It measures your memory function in a scientific way and can help you learn more about your learning ability. Please take the test in a quiet place where you won't be disturbed for 15 minutes.You can take the test as many times as you like. Link - https://www.psychologytestingforall.com/memory-test"
				},
				useNativeBehavior: false
			},
			twitterShareOptions: {
				windowFeatures: {},
				shareOptions: {
					url: 'https://www.psychologytestingforall.com/memory-test',
					text: "Here is a free online MEMORY TEST that I found to be useful. It measures your memory function in a scientific way and can help you learn more about your learning ability. Please take the test in a quiet place where you won't be disturbed for 15 minutes.You can take the test as many times as you like.",
					hashtags: [],
					via: ''
				},
				useNativeBehavior: false
			},
			facebookShareOptions: {
				windowFeatures: {},
				shareOptions: {
					url: 'https://www.psychologytestingforall.com/memory-test',
					quote: "Here is a free online MEMORY TEST that I found to be useful. It measures your memory function in a scientific way and can help you learn more about your learning ability. Please take the test in a quiet place where you won't be disturbed for 15 minutes.You can take the test as many times as you like.",
					hashtag: ''
				},
				useNativeBehavior: false
			}
		};
	},
	methods: {},
	mounted() {}
};
</script>
<style>
.thanks {
	align-items: center;
	text-align: center;
	font-size: 50px;
}

.more-info {
	border: 5px solid black;
	margin: 10px;
	padding: 25px;
	align-items: center;
	text-align: center;
	font-size: 25px;
}
</style>

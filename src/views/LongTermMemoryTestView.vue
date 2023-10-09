<template>
	<div class="long-term-memory-test-title">
		<h1>Short Term and Long Term Memory Test</h1>
	</div>

	<div class="instructions" v-if="!this.testStartFlag && this.testType == 'short'">
		<div class="information">
			<h3>This Test measures both long term and short term memory</h3>
		</div>
		<h2 class="instructions-title">Instructions</h2>
		<br />
		<p>
			This test measures your short-term and long-term memory.<br />
			You will be shown 10 words below.<br />
			Memorise them in your mind number of times.<br />
			If you want you can take a bit of time to remember them.<br />
			You will be asked to recall these words shortly(In the next screen) and after about 20 minutes(Towards the end
			of the test).<br />
			Please do not save them in any manner because your real memory will not get tested.<br />
			Testing memory in this manner from time to time is a good practice to maintain the health of the mind.<br />
		</p>
		<div>
			<p class="memorize-these-title">Memorise these 10 words<br /></p>
			<p class="memorize-these-items">
				Key<br />
				Ear<br />
				King<br />
				Cake<br />
				Cat<br />
				Car<br />
				Red<br />
				Cup<br />
				Bat<br />
				River<br />
			</p>
			<br />
		</div>
	</div>
	<div v-if="!this.testStartFlag && this.testType == 'short'" class="start-button">
		<v-btn @click="this.startTest()" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
	</div>
	<div v-if="this.testStartFlag || this.testType == 'long'">
		<LongTermMemoryTest :testType="this.testType" />
	</div>
</template>

<script>
import LongTermMemoryTest from '@/components/LongTermMemoryTest.vue';

export default {
	name: 'LongTermMemoryTestView',
	data() {
		return {
			testStartFlag: false,
			testType: ''
		};
	},
	components: {
		LongTermMemoryTest
	},
	methods: {
		startTest() {
			this.testStartFlag = true;
		}
	},
	mounted() {
		this.testType = this.$route.params.type;
	}
};
</script>
<style>
.long-term-memory-test-title {
	text-align: center;
	font-weight: bold;
}

.information {
	text-align: center;
}

.instructions {
	align-items: center;
	font-size: larger;
	padding: 25px;
}

.instructions-title {
	align-items: center;
	text-align: center;
}

.memorize-these-title {
	font-weight: bold;
	text-align: center;
}

.memorize-these-items {
	text-align: center;
}
</style>

<template>
	<div class="s-digit-span-test-title">
		<h1>Ordered Digit Span Test(Ascending Order)</h1>
	</div>
	<div class="instructions" v-if="!this.testStartFlag">
		<div class="information">
			<h3>This test measures short term memory and working memory</h3>
		</div>
		<h2 class="instructions-title">Instructions</h2>
		<p>
			You will be shown a sequence of digits on the screen, one at a time similar to previous test. <br />
			Remember the digits in the order that they are shown. <br />
			When prompted, enter the digits in ASCENDING ORDER in the space provided. <br />
		</p>
		<p>
			Example:<br />
			If you are shown the following digits: <br />
			<b>8 3 5 0 9 </b><br />
			You would enter the following digits in the space provided: <br />
			<b>0 3 5 8 9 </b><br />
		</p>
		<br />
	</div>
	<div class="real-test-indicator" v-if="!this.testStartFlag">
		<p>Note:There will not be a trial for this test</p>
		<div v-if="!this.testStartFlag" class="start-button">
			<v-btn @click="this.startTest()" size="x-large" block color="red-lighten-3" rounded="lg">Click Here to Start
				Test</v-btn>
		</div>
	</div>
	<div v-if="this.testStartFlag">
		<SequenceDigitSpanTest />
	</div>
</template>

<script>
import SequenceDigitSpanTest from '@/components/SequenceDigitSpanTest.vue';
export default {
	name: 'SequenceDigitSpanTestView',
	data() {
		return {
			testStartFlag: false
		};
	},
	components: {
		SequenceDigitSpanTest
	},
	methods: {
		startTest() {
			this.testStartFlag = true;
		}
	}
};
</script>

<style scoped>
.s-digit-span-test-title {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.start-button {
	text-align: center;
	align-items: center;
	border: solid black 1px;
	border-radius: 8px;
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

.real-test-indicator {
	text-align: center;
}
</style>

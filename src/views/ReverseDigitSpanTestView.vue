<template>
	<div class="r-digit-span-test-title">
		<h1>Reverse Digit Span Test</h1>
	</div>
	<div class="instructions" v-if="!this.testStartFlag">
		<div class="information">
			<h3>This test measures short term memory and working memory</h3>
		</div>
		<h2 class="instructions-title">Instructions</h2>
		<p>
			In this experiment, you will be shown a sequence of numbers on the screen. These numbers are called
			digits.<br />
			You need to remember the sequence, REVERSE it in your memory, and enter the number into the space provided when
			prompted.<br />
			If you make mistakes while entering the sequence, you can correct the last mistake using the Clear button.<br />
			Once you have entered all of the digits, press the ENTER button.<br />
			For example if the numbers are shown as 2 6 8 3 then you need to enter 3 8 6 2<br />
			The length of the digit sequence will start from 2 and will increase until you are no longer able to remember
			it.<br />
			You will be given three trials for each length.<br />
			If you successfully complete two of the three trials for a given length, you will move on to the next length.
			Otherwise, the test will end.<br />
		</p>
		<br />
	</div>
	<div class="real-test-indicator" v-if="!this.testStartFlag">
		<div v-if="!this.testStartFlag" class="start-button">
			<v-btn @click="this.startTest()" size="x-large" block color="red-lighten-3" rounded="lg">Click Here to Start
				Test</v-btn>
		</div>
	</div>
	<div v-if="this.testStartFlag">
		<ReverseDigitSpanTest />
	</div>
</template>

<script>
import ReverseDigitSpanTest from '@/components/ReverseDigitSpanTest.vue';
export default {
	name: 'ReverseDigitSpanTestView',
	data() {
		return {
			testStartFlag: false
		};
	},
	components: {
		ReverseDigitSpanTest
	},
	methods: {
		startTest() {
			this.testStartFlag = true;
		}
	}
};
</script>

<style scoped>
.r-digit-span-test-title {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.start-button {
	text-align: center;
	align-items: center;
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

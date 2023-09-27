<template>
	<div class="digit-span-test-title">
		<h1>Digit Span Test</h1>
	</div>
	<div class="instructions" v-if="!this.testStartFlag && !this.trialStartFlag && !this.trialCompleted">
		<h2 class="instructions-title">Instructions</h2>
		<p>
			In this experiment, you will be shown a sequence of numbers on the screen. These numbers are called digits.<br />
			You need to remember the sequence and enter it into the space provided on the screen when prompted.<br />
			If you make mistakes while entering the sequence, you can correct the last mistake using the Clear button.<br />
			Once you have entered all of the digits, press the ENTER button.<br />
			The length of the digit sequence will start from 2 and will increase until you are no longer able to remember it.<br />
			You will be given three trials for each length.<br />
			If you successfully complete two of the three trials for a given length, you will move on to the next length. Otherwise, the test will end.<br />
		</p>
		<br />
	</div>
	<div class="real-test-indicator" v-if="this.trialCompleted && !this.testStartFlag">
		<h2>
			<p>Your Real Test Starts Now!</p>
		</h2>
		<br />
		<div v-if="!this.testStartFlag && this.trialCompleted" class="start-button">
			<v-btn @click="this.startTest()" size="x-large" block color="red-lighten-3" rounded="lg">Click Here to Start Test</v-btn>
		</div>
	</div>
	<div v-if="!this.testStartFlag && !this.trialStartFlag" class="start-button">
		<v-btn @click="this.startTrial()" size="x-large" block color="red-lighten-3" rounded="lg"> Start Trial </v-btn>
	</div>
	<br />

	<div v-if="this.trialStartFlag && !this.trialCompleted">
		<DigitSpanTrial @trial-completed="this.completedTrial()" />
	</div>
	<div v-if="this.trialCompleted && this.testStartFlag">
		<DigitSpanTest />
	</div>
</template>

<script>
import DigitSpanTest from '@/components/DigitSpanTest.vue';
import DigitSpanTrial from '@/components/DigitSpanTrial.vue';
export default {
	name: 'DigitSpanTestView',
	data() {
		return {
			testStartFlag: false,
			trialStartFlag: false,
			trialCompleted: false
		};
	},
	components: {
		DigitSpanTest,
		DigitSpanTrial
	},
	methods: {
		startTest() {
			this.testStartFlag = true;
		},
		startTrial() {
			this.trialStartFlag = true;
		},
		completedTrial() {
			this.trialCompleted = true;
		}
	}
};
</script>

<style scoped>
.digit-span-test-title {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.start-button {
	text-align: center;
	align-items: center;
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

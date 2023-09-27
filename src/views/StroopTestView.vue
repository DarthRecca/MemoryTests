<template>
	<div class="stroop-title">
		<h1>Stroop Test</h1>
	</div>
	<div class="instructions" v-if="!this.trialStartFlag && !this.testStartFlag && !this.trialCompleted">
		<h2 class="instructions-title">Instructions</h2>
		<p>
			In this task, you will see color names (RED, GREEN, BLUE, and YELLOW) printed
			in different colors.<br /> You need to respond to the color of the print, not the word itself.<br />
			For example, if you see the word "RED" printed in green ink, you should press the
			Green button.<br />
		</p>
		<br />
		<p>
			Note - In this test your response time is measured. It is important therefore that you
			need to respond to the given tasks as early as possible but without making the
			mistakes.<br />
		</p>
		<br />
	</div>
	<div class="real-test-indicator" v-if="this.trialCompleted && !this.testStartFlag">
		<h2>
			<p>Your Real Test Starts Now!</p>
		</h2>
		<div v-if="!this.testStartFlag && this.trialCompleted" class="start-button">
			<v-btn @click="this.startTest()" size="x-large" block color="red-lighten-3" rounded="lg">Click Here to Start
				Test</v-btn>
		</div>
	</div>
	<div v-if="!this.testStartFlag && !this.trialStartFlag" class="start-button">
		<v-btn @click="this.startTrial()" size="x-large" block color="red-lighten-3" rounded="lg"> Start Trial </v-btn>
	</div>
	<br />
	<div v-if="this.trialStartFlag && !this.trialCompleted">
		<StroopTrial @trial-completed="this.completedTrial()" />
	</div>
	<div v-if="this.trialCompleted && this.testStartFlag">
		<StroopTest />
	</div>
</template>

<script>
import StroopTest from '@/components/StroopTest.vue';
import StroopTrial from '@/components/StroopTrial.vue';
export default {
	name: 'StroopTestView',
	data() {
		return {
			testStartFlag: false,
			trialStartFlag: false,
			trialCompleted: false
		};
	},
	components: {
		StroopTest,
		StroopTrial
	},
	methods: {
		startTest() {
			this.testStartFlag = true;
		},
		startTrial() {
			this.trialStartFlag = true
		},
		completedTrial() {
			this.trialCompleted = true;
		}
	}
};
</script>

<style>
.stroop-title {
	text-align: center;
	display: flex;
	flex-direction: column;
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

.start-button {
	text-align: center;
	align-items: center;
}
</style>

<template>
	<div class="nback-title">
		<h1>N-Back Test</h1>
	</div>
	<div class="instructions" v-if="!this.trialStartFlag && !this.testStartFlag && !this.trialCompleted">
		<h2 class="instructions-title">Instructions</h2>
		<p>
			In this task, you will see letters displayed on the screen one at a time.<br />
			Each letter will be displayed for a few seconds, and then the next letter will be displayed.<br />
			You need to remember the last two letters that were displayed, and compare the current letter to the letter that was displayed two letters ago.<br />
			If the current letter is the same as the letter that was displayed two letters ago, press the MATCHES button.<br />
			If the current letter is different from the letter that was displayed two letters ago, do not press anything.<br />
			This is called the N=2 back test, because you are comparing the current letter to the letter that was displayed two letters ago.<br />
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
		<NBackTrial @trial-completed="this.completedTrial()" />
	</div>
	<div v-if="this.trialCompleted && this.testStartFlag">
		<NBackTest />
	</div>
</template>

<script>
import NBackTest from '@/components/NBackTest.vue';
import NBackTrial from '@/components/NBackTrial.vue';
export default {
	name: 'NBackTestView',
	data() {
		return {
			testStartFlag: false,
			trialStartFlag: false,
			trialCompleted: false
		};
	},
	components: {
		NBackTest,
		NBackTrial
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

<style>
.nback-title {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.real-test-indicator {
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

.start-button {
	text-align: center;
	align-items: center;
}
</style>

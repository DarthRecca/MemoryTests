<template>
	<div class="nback-title">
		<h1>N-Back Test</h1>
	</div>
	<div class="instructions" v-if="!this.trialStartFlag && !this.testStartFlag && !this.trialCompleted">
		<div class="information">
			<h3>This test measures the working memory and processing speed</h3>
		</div>
		<h2 class="instructions-title">Instructions</h2>
		<p>
			You will be presented with a sequence of letters or numbers one by one.<br />
			Your task is to press the MATCHES button if the current letter matches the one that was presented 2 trials
			ago.<br />
			If it does not match, do not press the button.<br />
			For example, let's say the current letter is B and the last two letters were B and T. Since the letter two
			letters ago (B) matches the current letter (B), you should press MATCHES.<br />
			If the next letter is P, you should not press MATCHES because the letter two letters ago (T) does not match the
			current letter (P).<br />

			This is called the N=2 back test, because you are comparing the current letter to the letter that was displayed
			two letters ago.<br />
		</p>
		<br />
	</div>
	<div class="real-test-indicator" v-if="this.trialCompleted && !this.testStartFlag">
		<h2>
			<p>Your Real Test Starts Now!</p>
		</h2>
		<br />
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

.start-button {
	text-align: center;
	align-items: center;
}
</style>

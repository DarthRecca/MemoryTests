<template>
	<div class="nback-title">
		<h1>N-Back Test</h1>
	</div>
	<div class="instructions" v-if="!this.trialStartFlag && !this.testStartFlag && !this.trialCompleted && (!this.demoStartFlag || !this.demoCompleted)">
		<div class="information">
			<h3>This test measures the working memory and processing speed</h3>
		</div>
		<h2 class="instructions-title">Instructions</h2>
		<p>
			You will be presented with a sequence of letters or numbers one by one.<br />
			Your task is to press the MATCHES button if the current letter matches the one that was presented 2 trials ago.<br />
			If it does not match, do not press the button.<br />
			For example, let's say the current letter is B and the last two letters were B and T. Since the letter two letters ago (B) matches the current letter (B), you should press MATCHES.<br />
			If the next letter is P, you should not press MATCHES because the letter two letters ago (T) does not match the current letter (P).<br />

			This is called the N=2 back test, because you are comparing the current letter to the letter that was displayed two letters ago.<br />
		</p>
		<br />
	</div>
	<div v-if="this.demoStartFlag && !this.demoCompleted">
		<NBackDemo @demo-completed="this.completedDemo()" />
	</div>
	<div v-if="!this.demoStartFlag && !this.demoCompleted && !this.trialStartFlag" class="start-button">
		<v-btn @click="this.startDemo()" size="x-large" block color="red-lighten-3" rounded="lg"> Start Demo </v-btn>
	</div>
	<br />
	<div v-if="this.trialStartFlag && !this.trialCompleted && !this.demoStartFlag && this.demoCompleted">
		<NBackTrial @trial-completed="this.completedTrial()" />
	</div>
	<div v-if="this.trialCompleted && this.testStartFlag && !this.demoStartFlag && this.demoCompleted">
		<NBackTest />
	</div>
</template>

<script>
import NBackTest from '@/components/NBackTest.vue';
import NBackTrial from '@/components/NBackTrial.vue';
import NBackDemo from '@/components/NBackDemo.vue';
export default {
	name: 'NBackTestView',
	data() {
		return {
			localizationMarathi: false,
			localizationHindi: false,
			testStartFlag: false,
			trialStartFlag: false,
			trialCompleted: false,
			demoStartFlag: false,
			demoCompleted: false
		};
	},
	components: {
		NBackTest,
		NBackTrial,
		NBackDemo
	},
	methods: {
		startTest() {
			this.testStartFlag = true;
		},
		startTrial() {
			this.trialStartFlag = true;
		},
		startDemo() {
			this.demoStartFlag = true;
		},
		completedTrial() {
			this.trialCompleted = true;
			this.startTest();
		},
		completedDemo() {
			this.demoStartFlag = false;
			this.demoCompleted = true;
			this.startTrial();
		}
	},
	mounted() {
		this.localizationHindi = this.$route.params.localizationHindi;
		this.localizationMarathi = this.$route.params.localizationMarathi;
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

.demo-video {
	align-items: center;
	border: 3px solid black;
}

video {
	border: 1px solid;
	width: 100%;
	height: auto;
}

.start-button {
	text-align: center;
	align-items: center;
	border: solid black 1px;
	border-radius: 8px;
}
</style>

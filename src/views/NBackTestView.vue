<template>
	<div class="nback-title">
		<h1>N-Back Test</h1>
	</div>
	<br />
	<div class="instructions" v-if="!this.trialStartFlag && !this.testStartFlag && !this.trialCompleted && !this.demoStartFlag && !this.demoCompleted">
		<div class="information">
			<h3>This test measures the working memory and processing speed</h3>
		</div>
		<h2 class="instructions-title">Instructions</h2>
		<p>
			{{ $t('nback.instructions.line1') }}<br />
			{{ $t('nback.instructions.line2') }}<br />
			{{ $t('nback.instructions.line3') }}<br />
			{{ $t('nback.instructions.line4') }}<br />
			{{ $t('nback.instructions.line5') }}<br />
			{{ $t('nback.instructions.line6') }}<br />
			{{ $t('nback.instructions.note') }}<br />
		</p>
		<br />
	</div>
	<div v-if="this.demoStartFlag && !this.demoCompleted" class="demo">
		<NBackDemo @demo-completed="this.completedDemo()" />
	</div>
	<div v-if="!this.demoStartFlag && !this.demoCompleted && !this.trialStartFlag" class="start-button">
		<v-btn @click="this.startDemo()" size="x-large" block color="red-lighten-3" rounded="lg"> Start Assisted Trial </v-btn>
	</div>
	<br />
	<div v-if="this.trialStartFlag && !this.trialCompleted && !this.demoStartFlag && this.demoCompleted" class="trial">
		<NBackTrial @trial-completed="this.completedTrial()" />
	</div>
	<div v-if="this.trialCompleted && this.testStartFlag && !this.demoStartFlag && this.demoCompleted" class="test">
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
	margin: 5px;
}

.instructions-title {
	align-items: center;
	text-align: center;
}

.demo {
	margin: 5px;
}

.trial {
	margin: 5px;
}

.test {
	margin: 5px;
}

.start-button {
	margin: 5px;
	text-align: center;
	align-items: center;
	border: solid black 1px;
	border-radius: 8px;
}
</style>

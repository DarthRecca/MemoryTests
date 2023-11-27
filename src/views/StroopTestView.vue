<template>
	<div class="stroop-title">
		<h1>Stroop Test</h1>
	</div>
	<br />
	<div class="instructions" v-if="!this.trialStartFlag && !this.testStartFlag && !this.trialCompleted">
		<div class="information">
			<h3>This test measures the selective attention and inhibitory control</h3>
		</div>
		<h2 class="instructions-title">Instructions</h2>
		<p>
			{{ $t('stroop.instructions.line1') }}<br />
			{{ $t('stroop.instructions.line2') }}<br />
			{{ $t('stroop.instructions.line3a') }}(eg. <span class="example">RED</span>){{ $t('stroop.instructions.line3b') }}<br />
		</p>
		<br />
		<p>{{ $t('stroop.instructions.note') }}<br /></p>
		<br />
	</div>
	<br />
	<div class="real-test-indicator" v-if="this.trialCompleted && !this.testStartFlag">
		<h2>
			<p>Your Real Test Starts Now!</p>
		</h2>
		<div v-if="!this.testStartFlag && this.trialCompleted" class="start-button">
			<v-btn @click="this.startTest()" size="x-large" block color="red-lighten-3" rounded="lg">Click Here to Start Test</v-btn>
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
			this.trialStartFlag = true;
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

.information {
	text-align: center;
}

.instructions {
	border: 5px black solid;
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
	border: 5px solid black;
}

.start-button {
	text-align: center;
	align-items: center;
	border: solid black 1px;
	border-radius: 8px;
	margin: 5px;
}

.example {
	color: green;
}
</style>

<template>
	<div class="digit-span-test-title">
		<h1>Digit Span Test</h1>
	</div>

	<div class="instructions" v-if="!this.testStartFlag && !this.trialStartFlag && !this.trialCompleted">
		<div class="information">
			<h3>This test measures short term memory</h3>
		</div>
		<h2 class="instructions-title">Instructions</h2>
		<p>
			{{ $t('digitspan.instructions.line1') }}<br />
			{{ $t('digitspan.instructions.line2') }}<br />
			{{ $t('digitspan.instructions.line3') }}<br />
			{{ $t('digitspan.instructions.line4') }}<br />
			{{ $t('digitspan.instructions.line5') }}<br />
			{{ $t('digitspan.instructions.line6') }}<br />
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
	},
	mounted() {
		this.$i18n.locale;
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

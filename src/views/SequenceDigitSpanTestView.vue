<template>
	<div class="s-digit-span-test-title">
		<h1>Ordered Digit Span Test(Ascending Order)</h1>
	</div>
	<br />
	<div class="instructions" v-if="!this.testStartFlag">
		<div class="information">
			<h3>This test measures short term memory and working memory</h3>
		</div>
		<h2 class="instructions-title">Instructions</h2>
		<p>
			{{ $t('sequencedigitspan.instructions.line1') }}<br />
			{{ $t('sequencedigitspan.instructions.line2') }}<br />
			{{ $t('sequencedigitspan.instructions.line3') }}<br />
		</p>
		<p>
			{{ $t('sequencedigitspan.instructions.example1') }}<br />
			{{ $t('sequencedigitspan.instructions.example2') }}<br />
			<b>{{ $t('sequencedigitspan.instructions.example3') }}</b
			><br />
			{{ $t('sequencedigitspan.instructions.example4') }}<br />
			<b>{{ $t('sequencedigitspan.instructions.example5') }}</b
			><br />
		</p>
		<br />
	</div>
	<div class="real-test-indicator" v-if="!this.testStartFlag">
		<p>Note:There will not be a trial for this test</p>
		<div v-if="!this.testStartFlag" class="start-button">
			<v-btn @click="this.startTest()" size="x-large" block color="red-lighten-3" rounded="lg">Click Here to Start Test</v-btn>
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

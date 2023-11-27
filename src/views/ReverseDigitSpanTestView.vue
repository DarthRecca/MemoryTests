<template>
	<div class="r-digit-span-test-title">
		<h1>Reverse Digit Span Test</h1>
	</div>
	<br />
	<div class="instructions" v-if="!this.testStartFlag">
		<div class="information">
			<h3>This test measures short term memory and working memory</h3>
		</div>
		<h2 class="instructions-title">Instructions</h2>
		<p>
			{{ $t('reversedigitspan.instructions.line1') }}<br />
			{{ $t('reversedigitspan.instructions.line2') }}<br />
			{{ $t('reversedigitspan.instructions.line3') }}<br />
			{{ $t('reversedigitspan.instructions.line4') }}<br />
			{{ $t('reversedigitspan.instructions.line5') }}<br />
			{{ $t('reversedigitspan.instructions.line6') }}<br />
			{{ $t('reversedigitspan.instructions.line7') }}<br />
			{{ $t('reversedigitspan.instructions.line8') }}<br />
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
	border: solid black 1px;
	border-radius: 8px;
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
}
</style>

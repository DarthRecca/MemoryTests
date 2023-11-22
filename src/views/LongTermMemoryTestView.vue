<template>
	<div class="long-term-memory-test-title">
		<h1>Short Term and Long Term Memory Test</h1>
	</div>
	<div class="instructions" v-if="!this.testStartFlag && this.testType == 'short'">
		<div class="information">
			<p>This Test measures both long term and short term memory</p>
		</div>
		<br />
		<h2 class="instructions-title">Instructions</h2>
		{{ $t('longtermmemory.note') }}
		<br />
		<p>
			{{ $t('shorttermmemory.instructions.line1') }}<br />
			{{ $t('shorttermmemory.instructions.line2') }}<br />
			{{ $t('shorttermmemory.instructions.line3') }}<br />
			{{ $t('shorttermmemory.instructions.line4') }}<br />
			{{ $t('shorttermmemory.instructions.line5') }}<br />
			{{ $t('shorttermmemory.instructions.line6') }}<br />
		</p>
		<div>
			<br />
			<p class="memorize-these-title">Memorise these 10 words<br /></p>
			<p class="memorize-these-items">
				Key<br />
				Ear<br />
				King<br />
				Cake<br />
				Cat<br />
				Car<br />
				Red<br />
				Cup<br />
				Bat<br />
				River<br />
			</p>
		</div>
	</div>
	<div v-if="!this.testStartFlag && this.testType == 'short'" class="start-button">
		<v-btn @click="this.startTest()" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
	</div>
	<div v-if="this.testStartFlag || this.testType == 'long'">
		<LongTermMemoryTest :testType="this.testType" />
	</div>
</template>

<script>
import LongTermMemoryTest from '@/components/LongTermMemoryTest.vue';

export default {
	name: 'LongTermMemoryTestView',
	data() {
		return {
			testStartFlag: false,
			testType: ''
		};
	},
	props: {
		localizationMarathi: Boolean,
		localizationHindi: Boolean
	},
	components: {
		LongTermMemoryTest
	},
	methods: {
		startTest() {
			this.testStartFlag = true;
		}
	},
	mounted() {
		this.testType = this.$route.params.type;
	}
};
</script>
<style>
.long-term-memory-test-title {
	text-align: center;
	font-weight: bold;
}

.information {
	text-align: center;
	font-size: 10;
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

.memorize-these-title {
	font-weight: bold;
	text-align: center;
}

.memorize-these-items {
	text-align: center;
}

.start-button {
	border: solid black 1px;
	border-radius: 8px;
	margin: 5px;
}
</style>

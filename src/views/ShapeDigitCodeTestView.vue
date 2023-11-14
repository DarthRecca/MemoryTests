<template>
	<div class="shape-digit-code-test-title">
		<h1>Processing Speed Test (Shape Digit Coding Test)</h1>
	</div>
	<div class="instructions" v-if="!this.trialStartFlag && !this.testStartFlag">
		<div class="information">
			<h3>This test measures the processing speed</h3>
		</div>
		<br />
		<h2 class="instructions-title">Instructions</h2>
		<p>1. {{ $t('shapedigitcode.instructions.line1') }}</p>
		<br />
		<div class="instructions-key-table">
			<center>
				<table>
					<tr>
						<td>Shapes</td>
						<td v-for="(shape, idx) in this.keyShapes" :key="idx">
							<v-icon size="x-large" color="black" :icon="shape"></v-icon>
						</td>
					</tr>
					<tr>
						<td>Digits</td>
						<td v-for="(digit, idx) in this.keyDigits" :key="idx">
							{{ digit }}
						</td>
					</tr>
				</table>
			</center>
		</div>
		<br />
		<p>
			2. {{ $t('shapedigitcode.instructions.line2') }}<br />
			3. {{ $t('shapedigitcode.instructions.line3') }}<br />
			4. {{ $t('shapedigitcode.instructions.line4') }}<br />
			5. {{ $t('shapedigitcode.instructions.line5') }}<br />
			6. {{ $t('shapedigitcode.instructions.line6') }}<br />
		</p>
		<br />
	</div>
	<div v-if="!this.testStartFlag && !this.trialStartFlag" class="start-button">
		<v-btn @click="this.startTrial()" size="x-large" block color="red-lighten-3" rounded="lg"> Start Trial </v-btn>
	</div>
	<div class="shape-digit-code-trial-container" v-if="this.trialStartFlag && !this.trialCompleted">
		<ShapeDigitCodeTrial @completed-trial="completedTrial()" />
	</div>
	<div class="shape-digit-code-test-container" v-if="this.trialCompleted && this.testStartFlag">
		<ShapeDigitCodeTest />
	</div>
</template>

<script>
import ShapeDigitCodeTrial from '@/components/ShapeDigitCodeTrial.vue';
import ShapeDigitCodeTest from '@/components/ShapeDigitCodeTest.vue';

export default {
	name: 'ShapeDigitCodeTestView',
	components: {
		ShapeDigitCodeTrial,
		ShapeDigitCodeTest
	},
	data() {
		return {
			testStartFlag: false,
			trialStartFlag: false,
			trialCompleted: false,
			keyShapes: ['mdi-arrow-right', 'mdi-clover', 'mdi-rhombus', 'mdi-circle', 'mdi-emoticon', 'mdi-square', 'mdi-water', 'mdi-flask-empty', 'mdi-rocket', 'mdi-heart'],
			keyDigits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
		};
	},
	methods: {
		startTrial() {
			this.trialStartFlag = true;
		},
		completedTrial() {
			this.trialCompleted = true;
			this.startTest();
		},
		startTest() {
			this.testStartFlag = true;
		}
	}
};
</script>

<style>
.shape-digit-code-test-title {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.information {
	text-align: center;
}

.instructions {
	font-size: larger;
	padding: 25px;
}

.instructions-title {
	align-items: center;
	text-align: center;
}

.instructions-key-table {
	align-items: center;
	margin: 0 auto;
}

table {
	border: 1px solid black;
	border-collapse: collapse;
	background-color: teal;
	overflow-x: auto;
}

tr {
	border: 1px solid black;
}

td {
	border: 1px solid black;
	text-align: center;
	padding: 5px;
}

.start-button {
	text-align: center;
	align-items: center;
	border: solid black 1px;
	border-radius: 8px;
}
</style>

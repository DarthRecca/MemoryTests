<template>
	<div class="shape-digit-code-test-title">
		<h1>Processing Speed Test (Shape Digit Coding Test)</h1>
	</div>
	<br />
	<div class="instructions" v-if="!this.trialStartFlag && !this.testStartFlag">
		<h3 class="instructions-title">Instructions</h3>
		<p>1. {{ $t('shapedigitcode.instructions.line1') }}</p>
		<br />
		<div class="instructions-key-table" v-if="this.isMobile()" :class="[this.isMobile() ? 'mobile' : 'not-mobile']">
			<center>
				<table class="shape-digit-key">
					<thead>
						<tr>
							<th>Shape</th>
							<th>Digit</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(keyObj, idx) in this.keyItems" :key="idx">
							<td><v-icon size="x-large" color="black" :icon="keyObj.shape"></v-icon></td>
							<td>{{ keyObj.digit }}</td>
						</tr>
					</tbody>
				</table>
			</center>
		</div>
		<div class="instructions-key-table" v-else :class="[this.isMobile() ? 'mobile' : 'not-mobile']">
			<center>
				<table class="shape-digit-key">
					<tr>
						<td>Shape</td>
						<td v-for="(shape, idx) in this.keyShapes" :key="idx">
							<v-icon size="x-large" color="black" :icon="shape"></v-icon>
						</td>
					</tr>
					<tr>
						<td>Digit</td>
						<td v-for="(digit, idx) in this.keyDigits" :key="idx">{{ digit }}</td>
					</tr>
				</table>
			</center>
		</div>
		<br />
		<p>
			2. {{ $t('shapedigitcode.instructions.line2') }}<br />
			{{ $t('shapedigitcode.instructions.line2_eg1') }} <v-icon size="large" color="black" icon="mdi-arrow-right" /> {{ $t('shapedigitcode.instructions.line2_eg2') }}<br />
			3. {{ $t('shapedigitcode.instructions.line3') }}<br />
			4. {{ $t('shapedigitcode.instructions.line4') }}<br />
			5. {{ $t('shapedigitcode.instructions.line5') }}<br />
			6. {{ $t('shapedigitcode.instructions.line6') }}<br />
		</p>
		<br />
	</div>
	<br />
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
			keyItems: [
				{ shape: 'mdi-arrow-right', digit: 1 },
				{ shape: 'mdi-clover', digit: 2 },
				{ shape: 'mdi-rhombus', digit: 3 },
				{ shape: 'mdi-circle', digit: 4 },
				{ shape: 'mdi-emoticon', digit: 5 },
				{ shape: 'mdi-square', digit: 6 },
				{ shape: 'mdi-water', digit: 7 },
				{ shape: 'mdi-flask-empty', digit: 8 },
				{ shape: 'mdi-rocket', digit: 9 },
				{ shape: 'mdi-heart', digit: 0 }
			],
			keyShapes: ['mdi-arrow-right', 'mdi-clover', 'mdi-rhombus', 'mdi-circle', 'mdi-emoticon', 'mdi-square', 'mdi-water', 'mdi-flask-empty', 'mdi-rocket', 'mdi-heart'],
			keyDigits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
		};
	},
	methods: {
		isMobile() {
			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				return true;
			} else {
				return false;
			}
		},
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
	border: 5px black solid;
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
	overflow-x: auto;
}

tr {
	border: 1px solid black;
}

td {
	border: 1px solid black;
	text-align: center;
	background-color: aqua;
	padding: 5px;
}

th {
	border: 1px solid black;
	text-align: center;
	background-color: aqua;
	padding: 5px;
}

.shape-digit-code-trial-container {
	margin: 5px;
}

.shape-digit-code-test-container {
	margin: 5px;
}

.start-button {
	margin: 5px;
	text-align: center;
	align-items: center;
	border: solid black 1px;
	border-radius: 8px;
}

.mobile {
	font-size: 16px;
}

.not-mobile {
	font-size: 22px;
}
</style>

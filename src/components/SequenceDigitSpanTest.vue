<template>
	<v-container class="s-digit-span-test-container">
		<div class="s-digit-span-test" v-if="!this.testCompleted">
			<div v-if="showPrompt" class="s-digit-span-prompt">
				<p>{{ this.digit }}</p>
			</div>
			<div v-else class="s-digit-span-prompt"></div>
			<br />
			<div v-if="!showPrompt">
				<h2>Entered Numbers</h2>
				<div class="entered-numbers" v-if="this.enteredNumbers">
					<p>{{ enteredNumbers }}</p>
				</div>
				<div class="entered-numbers" v-else></div>
				<v-row class="numpad">
					<v-col v-for="(num, idx) in numpadNumbers" :key="idx" cols="3">
						<v-btn @click="onNumpadClick(num)" :disabled="numpadDisabled[num]" class="numpad-button"
							size="large">
							{{ num }}
						</v-btn>
					</v-col>
					<v-col cols="auto">
						<v-btn @click="backspace" class="backspace-button" size="large"> Clear </v-btn>
					</v-col>
					<v-col cols="auto">
						<v-btn @click="checkAnswer()" v-if="!showPrompt" size="large" color="red-lighten-3"
							class="enter-button" cols="auto">Enter</v-btn>
					</v-col>
				</v-row>
				<br />
			</div>
		</div>
		<div v-if="this.testCompleted" class="result">
			<h2>Test Completed</h2>
			<br />
			<p><b>Note: </b>This is a computerized analysis and not a medical diagnosis</p>
			<div>
				<h3>Maximum length of digits that you can remember and organise in Order(Ascending Order) is: {{
					this.sequenceDigitSpanTestData.highestSequenceDigitSpan }}</h3>
				<br />
				<div class="expected-outcome">
					<p>
						<b>Expected Results for Order Digit-Span Test:</b>
					</p>
					<ul>
						<li>4 to 8, depending on your age and educational background.</li>
						<li>If your results are less than 4, don't panic. The results can be affected by many factors, such
							as your attention level, health, and anxiety. Please repeat the test after a few days. If your
							results are consistently below 4, please consult with an expert.</li>
					</ul>
					<br />
				</div>
			</div>
			<br />
			<div class="next-button">
				<v-btn value="StroopLink" to="/strooptest" size="x-large" block color="red-lighten-3"
					rounded="lg">Next</v-btn>
			</div>
		</div>
	</v-container>
</template>

<script>
import { useTestStore } from '@/store/tests';

function generateRandomPrompt(length) {
	const digits = Array.from({ length: 10 }, (_, i) => i);
	let prompt = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * digits.length);
		const digit = digits.splice(randomIndex, 1)[0];
		prompt += digit;
	}

	return prompt;
}

export default {
	name: 'SequenceDigitSpanTest',
	data() {
		return {
			showPrompt: true,
			showResult: false,
			prompt: '',
			digit: '',
			expectedInput: '',
			sequenceInput: '',
			digitIndex: 2,
			result: '',
			correctCount: 0,
			incorrectCount: 0,
			totalResponseTime: 0,
			sequenceDigitSpanTestData: {
				highestSequenceDigitSpan: 0,
				performanceParameters: {
					averagePromptResponseTime: 0
				}
			},
			promptEndTime: '',
			answerEndTime: '',
			numpadDisabled: Array(10).fill(false),
			numpadNumbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
			enteredNumbers: '',
			testCompleted: false,
			totalTasks: 0
		};
	},
	methods: {
		onNumpadClick(num) {
			if (num === 'Backspace') {
				return;
			}
			this.sequenceInput += num;
			this.numpadDisabled[num] = true;
			this.enteredNumbers += num;
		},
		backspace() {
			const lastDigit = this.sequenceInput.slice(-1);
			this.numpadDisabled[lastDigit] = false;
			this.sequenceInput = this.sequenceInput.slice(0, -1);
			this.enteredNumbers = this.enteredNumbers.slice(0, -1);
		},
		async nextDigitSpan() {
			this.prompt = generateRandomPrompt(this.digitIndex);
			if (this.digitIndex < 10) {
				this.digitDisplay(this.prompt, 0);
			}
		},
		async digitDisplay(prompt, index) {
			if (index < this.digitIndex) {
				this.digit = prompt.charAt(index);
				setTimeout(() => {
					this.digitDisplay(prompt, index + 1);
				}, 1000);
			} else {
				this.promptEndTime = Date.now();
				this.showPrompt = false;
			}
		},
		async checkAnswer() {
			this.expectedInput = this.prompt
				.split('')
				.sort((a, b) => a.localeCompare(b))
				.join('');
			if (this.sequenceInput === this.expectedInput) {
				this.result = 'correct';
				this.correctCount++;
			} else {
				this.result = 'incorrect';
				this.incorrectCount++;
			}
			this.answerEndTime = Date.now();
			const timeTaken = this.answerEndTime - this.promptEndTime;
			this.totalResponseTime += timeTaken;
			this.totalTasks += 1;
			this.expectedInput = '';
			this.sequenceInput = '';
			this.enteredNumbers = '';
			this.resetNumpad();
			this.prompt = '';
			this.digit = '';
			if (this.digitIndex < 10) {
				if (this.correctCount >= 2) {
					this.digitIndex++;
					this.correctCount = 0;
					this.incorrectCount = 0;
				}
				if (this.incorrectCount >= 2) {
					this.correctCount = 0;
					this.incorrectCount = 0;
					this.completedTest();
				}
				this.showPrompt = true;
				setTimeout(() => {
					this.nextDigitSpan();
				}, 500);
			} else {
				this.completedTest();
			}
		},
		resetNumpad() {
			for (let i = 0; i <= 9; i++) {
				this.numpadDisabled[i] = false;
			}
		},
		completedTest() {
			this.sequenceDigitSpanTestData.highestSequenceDigitSpan = this.digitIndex - 1;
			this.sequenceDigitSpanTestData.performanceParameters.averagePromptResponseTime = this.averagePromptResponseTime;
			useTestStore().addSequenceDigitSpanTestData(this.sequenceDigitSpanTestData);
			this.showResult = true;
			this.testCompleted = true;
		}
	},
	computed: {
		averagePromptResponseTime() {
			return Math.floor(this.totalResponseTime / this.totalTasks);
		}
	},
	mounted() {
		setTimeout(() => {
			this.nextDigitSpan();
		}, 1000);
	}
};
</script>

<style scoped>
.s-digit-span-test-container {
	text-align: center;
	border: solid 5px black;
}

.s-digit-span-test {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
}

.s-digit-span-prompt {
	font-size: 100px;
	margin: 10px;
	font-weight: bold;
	height: 150px;
	align-items: center;
	text-align: center;
}

.numpad {
	display: grid;
	grid-template-columns: auto auto auto;
	grid-gap: 10px;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 20px;
}

.numpad-button {
	width: 60px;
	height: 60px;
	font-size: 24px;
	margin: 5px;
	padding: 5px;
}

.backspace-button {
	width: 60px;
	height: 60px;
	font-size: 18px;
	margin: 5px;
}

.enter-button {
	width: 60px;
	height: 60px;
	font-size: 18px;
	margin: 5px;
}

.entered-numbers {
	font-size: 36px;
	margin-top: 10px;
	align-items: start;
	height: 75px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.result {
	font-size: 18px;
	margin-top: 10px;
}

.expected-outcome {
	text-align: left;
	padding-left: 25px;
}

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}
</style>

<template>
	<v-container class="digit-span-test-container">
		<div class="digit-span-test" v-if="!this.testCompleted">
			<div v-if="showPrompt" class="digit-span-prompt">
				<p>{{ this.digit }}</p>
			</div>
			<div v-else class="digit-span-prompt"></div>
			<br />
			<div v-if="!showPrompt">
				<h2>Entered Numbers</h2>
				<div class="entered-numbers" v-if="this.enteredNumbers">
					<p>{{ enteredNumbers }}</p>
				</div>
				<div class="entered-numbers" v-else></div>
				<v-row class="numpad">
					<v-col v-for="(num, idx) in numpadNumbers" :key="idx" cols="3">
						<v-btn @click="onNumpadClick(num)" :disabled="numpadDisabled[num]" class="numpad-button" size="large">
							{{ num }}
						</v-btn>
					</v-col>
					<v-col cols="auto">
						<v-btn @click="backspace" class="backspace-button" size="large"> Clear </v-btn>
					</v-col>
					<v-col cols="auto">
						<v-btn @click="checkAnswer()" v-if="!showPrompt" size="large" color="red-lighten-3" class="enter-button" cols="auto">Enter</v-btn>
					</v-col>
				</v-row>
				<br />
			</div>
		</div>
		<div v-if="this.testCompleted">
			<h2>Test Completed</h2>
			<br />
			<p><b>Note: </b>This is a computerized analysis and not a medical diagnosis</p>
			<br />
			<div>
				<h3>Your best sequence that is maximum length of digits that you can remember (Digit Span) is: {{ this.digitSpanTestData.highestDigitSpan }}</h3>
				<br />
			</div>
			<br />
			<v-btn value="StroopLink" to="/strooptest" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
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
	data() {
		return {
			showPrompt: true,
			showResult: false,
			prompt: '',
			digit: '',
			userInput: '',
			digitIndex: 2,
			result: '',
			correctCount: 0,
			incorrectCount: 0,
			digitSpanTestData: {
				individualPromptData: [],
				highestDigitSpan: 0
			},
			numpadDisabled: Array(10).fill(false),
			numpadNumbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
			enteredNumbers: '',
			testCompleted: false
		};
	},
	methods: {
		onNumpadClick(num) {
			if (num === 'Backspace') {
				return;
			}
			this.userInput += num;
			this.numpadDisabled[num] = true;
			this.enteredNumbers += num;
		},
		backspace() {
			const lastDigit = this.userInput.slice(-1);
			this.numpadDisabled[lastDigit] = false;
			this.userInput = this.userInput.slice(0, -1);
			this.enteredNumbers = this.enteredNumbers.slice(0, -1);
		},
		nextDigitSpan() {
			this.prompt = generateRandomPrompt(this.digitIndex);
			if (this.digitIndex < 10) {
				this.digitDisplay(this.prompt, 0);
			}
		},
		digitDisplay(prompt, index) {
			if (index < this.digitIndex) {
				this.digit = prompt.charAt(index);
				setTimeout(() => {
					this.digitDisplay(prompt, index + 1);
				}, 1000);
			} else {
				this.showPrompt = false;
			}
		},
		checkAnswer() {
			if (this.userInput === this.prompt) {
				this.result = 'correct';
				this.correctCount++;
			} else {
				this.result = 'incorrect';
				this.incorrectCount++;
			}
			const promptData = {
				prompt: this.prompt,
				answer: this.userInput,
				result: this.result
			};
			this.digitSpanTestData.individualPromptData.push(promptData);
			this.userInput = '';
			this.enteredNumbers = '';
			this.resetNumpad();

			if (this.digitIndex < 10) {
				if (this.correctCount === 2) {
					this.digitIndex++;
					this.correctCount = 0;
					this.incorrectCount = 0;
				}
				if (this.incorrectCount === 2) {
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
			this.showResult = true;
			this.digitSpanTestData.highestDigitSpan = this.digitIndex - 1;
			useTestStore().addDigitSpanTestData(this.digitSpanTestData);
			this.testCompleted = true;
		}
	},
	mounted() {
		setTimeout(() => {
			this.nextDigitSpan();
		}, 500);
	}
};
</script>

<style scoped>
.digit-span-test-container {
	text-align: center;
	border: solid black;
	border-width: 15px;
}

.digit-span-test {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100vh;
}

.digit-span-prompt {
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
</style>

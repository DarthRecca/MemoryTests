<template>
	<v-container class="stroop-test-container">
		<v-sheet class="stroop-test" color="teal-lighten-3">
			<div v-if="!this.completed">
				<div class="stroop-prompt" v-if="this.showPrompt">
					<p :style="{ color: textColor }">{{ colorName }}</p>
				</div>
				<div class="stroop-prompt" v-else>
				</div>
				<br />
				<div class="answer-choices">
					<v-btn @click="checkAnswer('red')" class="answer-choice" color="black">Red</v-btn>
					<v-btn @click="checkAnswer('green')" class="answer-choice" color="black">Green</v-btn>
					<v-btn @click="checkAnswer('blue')" class="answer-choice" color="black">Blue</v-btn>
					<v-btn @click="checkAnswer('yellow')" class="answer-choice" color="black">Yellow</v-btn>
				</div>
				<br />
				<div v-if="this.showResult" class="result">
					<p>Your answer is {{ result }}!</p>
				</div>
				<div v-else class="result">
				</div>
				<br />
			</div>
			<div v-if="this.completed">
				<p>Trial Completed</p>
				<v-btn @click="$emit('trialCompleted')" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
			</div>
		</v-sheet>
	</v-container>
</template>

<script>
export default {
	name: 'StroopTest',
	props: {},
	data() {
		return {
			totalIterations: 10,
			currentIteration: 0,
			colorNames: ['Red', 'Green', 'Blue', 'Yellow'],
			textColors: ['red', 'green', 'blue', 'yellow'],
			colorName: '',
			textColor: '',
			correctAnswer: '',
			result: '',
			showResult: false,
			showPrompt: true,
			completed: false
		};
	},
	mounted() {
		this.completed = false;
		this.nextStroop();
	},
	methods: {
		nextStroop() {
			const randomIndexName = Math.floor(Math.random() * this.colorNames.length);
			this.colorName = this.colorNames[randomIndexName];
			const randomIndexColor = Math.floor(Math.random() * this.textColors.length);
			this.textColor = this.textColors[randomIndexColor];
			this.correctAnswer = this.textColor.toLowerCase();
			this.hideResult();
			setTimeout(() => {
				this.togglePrompt();
			}, 1000);
		},
		checkAnswer(answer) {
			this.currentIteration += 1;
			if (answer.toLowerCase() === this.correctAnswer) {
				this.result = 'Correct';
			} else {
				this.result = 'Incorrect';
			}
			this.displayResult();

			if (this.currentIteration < this.totalIterations) {
				setTimeout(() => {
					this.togglePrompt();
					this.nextStroop();
				}, 1000);
			} else {
				this.testCompleted();
			}
		},
		togglePrompt() {
			this.showPrompt = !this.showPrompt;
		},
		displayResult() {
			this.showResult = true;
		},
		hideResult() {
			this.showResult = false;
		},
		testCompleted() {
			this.completed = true;
			this.hideResult();
		}
	},
	emits: ["trialCompleted"],
	computed: {}
};
</script>

<style scoped>
.stroop-test-container {
	justify-content: center;
	text-align: center;
	align-items: center;
	padding: 10px;
	height: 100vh;
	width: 100%;
}

.stroop-test {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: solid black
}

.stroop-prompt {
	margin: 10px;
	font-size: 52px;
	font-weight: bold;
	height: 150px;
	align-items: center;
	text-align: center;
}

.answer-choices {
	margin-top: 20px;
	height: 50px;
}

.answer-choice {
	font-size: 24px;
	margin: 5px;
}

.result {
	font-size: 18px;
	margin-top: 10px;
	height: 15px
}
</style>

<template>
	<v-container class="stroop-test-container">
		<v-sheet class="stroop-test" color="teal-lighten-3">
			<div v-if="!this.completed">
				<div class="stroop-prompt" v-if="this.showPrompt">
					<p :style="{ color: textColor }">{{ colorName }}</p>
				</div>
				<div class="stroop-prompt" v-else></div>
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
				<div v-else class="result"></div>
				<br />
			</div>
			<div v-if="this.completed">
				<p>Test Completed</p>
				<br />
				<p><b>Note: </b>This is a computerized analysis and not a medical diagnosis</p>
				<br />
				<p>Your Stroop Score (Incongruent Avg Time - Congruent Avg Time): {{ stroopScore }}ms</p>
				<br />
				<div class="result-expected">
					<p>The expected values of Stroop Test scores vary depending on the individual's age, education level and the device used. However, as a general guide, the following can be expected:<br /></p>
					<ul>
						<li>Children: 50-100 milliseconds</li>
						<li>Adults: 75-150 milliseconds</li>
						<li>Older adults: 100-200 milliseconds</li>
					</ul>
					<br />
					<p>It is important to note that these are just general guidelines and you should not panic if your score is higher than above values.<br /></p>
					<br />
					<div class="next-button">
						<v-btn value="NBackLink" to="/nbacktest" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
					</div>
				</div>
				<br />
			</div>
		</v-sheet>
	</v-container>
</template>

<script>
import { useTestStore } from '@/store/tests';

export default {
	name: 'StroopTest',
	props: {},
	data() {
		return {
			totalIterations: 50,
			currentIteration: 0,
			colorNames: ['Red', 'Green', 'Blue', 'Yellow'],
			textColors: ['red', 'green', 'blue', 'yellow'],
			colorName: '',
			textColor: '',
			correctAnswer: '',
			result: '',
			showResult: false,
			showPrompt: true,
			completed: false,
			promptStartTime: '',
			promptEndTime: '',
			isCongruent: false,
			stroopTestData: {
				testScore: 0,
				performanceParameters: {
					congruentTotal: 0,
					incongruentTotal: 0,
					congruentCorrect: 0,
					incongruentCorrect: 0,
					congruentIncorrect: 0,
					incongruentIncorrect: 0,
					congruentCorrectPercent: 0,
					incongruentCorrectPercent: 0,
					congruentIncorrectPercent: 0,
					incongruentIncorrectPercent: 0,
					congruentAvgTime: 0,
					incongruentAvgTime: 0
				},
				totalTestTime: 0
			},
			congruentTotalTime: 0,
			incongruentTotalTime: 0
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
			this.promptStartTime = Date.now();
			if (this.textColor == this.colorName.toLowerCase()) {
				this.stroopTestData.performanceParameters.congruentTotal += 1;
				this.isCongruent = true;
			} else {
				this.stroopTestData.performanceParameters.incongruentTotal += 1;
				this.isCongruent = false;
			}
			this.hideResult();
			setTimeout(() => {
				this.togglePrompt();
			}, 1000);
		},
		checkAnswer(answer) {
			this.promptEndTime = Date.now();
			this.currentIteration += 1;
			if (answer.toLowerCase() === this.correctAnswer) {
				this.result = 'Correct';
				if (this.isCongruent) {
					this.stroopTestData.performanceParameters.congruentCorrect += 1;
				} else {
					this.stroopTestData.performanceParameters.incongruentCorrect += 1;
				}
			} else {
				this.result = 'Incorrect';
				if (this.isCongruent) {
					this.stroopTestData.performanceParameters.congruentIncorrect += 1;
				} else {
					this.stroopTestData.performanceParameters.incongruentIncorrect += 1;
				}
			}
			this.displayResult();
			const promptTimeTaken = this.promptEndTime - this.promptStartTime;
			if (this.isCongruent) {
				this.congruentTotalTime += promptTimeTaken;
			} else {
				this.incongruentTotalTime += promptTimeTaken;
			}
			this.stroopTestData.totalTestTime += promptTimeTaken;

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
		async testCompleted() {
			this.stroopTestData.performanceParameters.congruentAvgTime = this.congruentAvgTime;
			this.stroopTestData.performanceParameters.incongruentAvgTime = this.incongruentAvgTime;
			this.stroopTestData.performanceParameters.congruentCorrectPercent = this.congruentCorrectPct;
			this.stroopTestData.performanceParameters.congruentIncorrectPercent = this.congruentIncorrectPct;
			this.stroopTestData.performanceParameters.incongruentCorrectPercent = this.incongruentCorrectPct;
			this.stroopTestData.performanceParameters.incongruentIncorrectPercent = this.incongruentIncorrectPct;
			this.stroopTestData.testScore = this.stroopScore;
			useTestStore().addStroopTestData(this.stroopTestData);
			this.completed = true;
			this.hideResult();
		}
	},
	computed: {
		stroopTestResults() {
			return useTestStore().getStroopTestData();
		},
		totalTasks() {
			return this.stroopTestData.performanceParameters.congruentTotal + this.stroopTestData.performanceParameters.incongruentTotal;
		},
		totalCorrect() {
			return this.stroopTestData.performanceParameters.congruentCorrect + this.stroopTestData.performanceParameters.incongruentCorrect;
		},
		totalIncorrect() {
			return this.stroopTestData.performanceParameters.congruentIncorrect + this.stroopTestData.performanceParameters.incongruentIncorrect;
		},
		totalAvgTime() {
			return Math.floor((this.congruentTotalTime + this.incongruentTotalTime) / this.totalTasks);
		},
		stroopScore() {
			const number = Math.floor(this.congruentAvgTime - this.incongruentAvgTime);
			return Math.abs(number);
		},
		congruentAvgTime() {
			return this.congruentTotalTime / this.stroopTestData.performanceParameters.congruentTotal;
		},
		congruentCorrectPct() {
			const cPect = this.stroopTestData.performanceParameters.congruentCorrect / this.stroopTestData.performanceParameters.congruentTotal;
			return cPect;
		},
		congruentIncorrectPct() {
			const incPect = this.stroopTestData.performanceParameters.congruentIncorrect / this.stroopTestData.performanceParameters.congruentTotal;
			return incPect;
		},
		incongruentAvgTime() {
			return this.incongruentTotalTime / this.stroopTestData.performanceParameters.incongruentTotal;
		},
		incongruentCorrectPct() {
			const cPect = this.stroopTestData.performanceParameters.incongruentCorrect / this.stroopTestData.performanceParameters.incongruentTotal;
			return cPect;
		},
		incongruentIncorrectPct() {
			const incPect = this.stroopTestData.performanceParameters.incongruentIncorrect / this.stroopTestData.performanceParameters.incongruentTotal;
			return incPect;
		}
	}
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
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: solid 5px black;
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
	height: 15px;
}

.result-expected {
	text-align: left;
	padding-left: 25px;
}

.performance-table {
	border: 1px solid;
	border-collapse: collapse;
	background-color: teal;
	overflow-x: auto;
}

caption {
	background: teal;
	border: solid 1px black;
	border-left: none;
	border-right: none;
	border-top: none;
}

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}
</style>

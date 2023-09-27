<template>
	<v-container class="stroop-test-container">
		<div v-if="!this.completed" class="stroop-test">
			<div class="stroop-prompt" v-if="this.showPrompt">
				<p :style="{ color: textColor }">{{ colorName }}</p>
				<br />
			</div>
			<div class="answer-choices">
				<v-btn @click="checkAnswer('red')" class="answer-choice" color="red">Red</v-btn>
				<v-btn @click="checkAnswer('green')" class="answer-choice" color="green">Green</v-btn>
				<v-btn @click="checkAnswer('blue')" class="answer-choice" color="blue">Blue</v-btn>
				<v-btn @click="checkAnswer('yellow')" class="answer-choice" color="yellow">Yellow</v-btn>
			</div>
			<p v-if="this.showResult" class="result">Your answer is {{ result }}!</p>
		</div>
		<div v-if="this.completed">
			<p>Test Completed</p>
			<br />
			<v-table class="perfromance-table">
				<caption>Your Performance</caption>
				<thead>
					<tr>
						<th>
							Parameter
						</th>
						<th>
							Quantity
						</th>
						<th>
							No. of correct tasks
						</th>
						<th>
							No. of incorrect tasks
						</th>
						<th>
							Time Taken for task(ms)
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							Congruent Trials (Trials that had same colour
							as the words e.g RED printed in red colour)
						</td>
						<td>
							{{ this.performanceParameters.congruentTotal }}
						</td>
						<td>
							{{ this.performanceParameters.congruentCorrect }}
						</td>
						<td>
							{{ this.performanceParameters.congruentIncorrect }}
						</td>
						<td>
							{{ this.performanceParameters.congruentAvgTime }}
						</td>
					</tr>
					<tr>
						<td>
							In-congruent Trials (Trials that had different colour
							as the words e.g RED printed in green colour)
						</td>
						<td>
							{{ this.performanceParameters.incongruentTotal }}
						</td>
						<td>
							{{ this.performanceParameters.incongruentCorrect }}
						</td>
						<td>
							{{ this.performanceParameters.incongruentIncorrect }}
						</td>
						<td>
							{{ this.performanceParameters.incongruentAvgTime }}
						</td>
					</tr>
					<tr>
						<td>
							Total
						</td>
						<td>
							{{ this.totalTasks }}
						</td>
						<td>
							{{ this.totalCorrect }}
						</td>
						<td>
							{{ this.totalIncorrect }}
						</td>
						<td>
							{{ this.totalAvgTime }}
						</td>
					</tr>
				</tbody>
			</v-table>
			<br />
			<p>
				Your Stroop Score(Absolute of Congruent - Incongruent Avg Time): {{ this.stroopScore }}
			</p>
			<br />
			<v-btn value="NBackLink" to="/nbacktest" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
		</div>
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
			testScore: 0,
			showResult: false,
			showPrompt: true,
			completed: false,
			promptStartTime: '',
			promptEndTime: '',
			individualPromptData: [],
			totalTestTime: 0,
			isCongruent: false,
			performanceParameters: {
				congruentTotal: 0,
				incongruentTotal: 0,
				congruentCorrect: 0,
				incongruentCorrect: 0,
				congruentIncorrect: 0,
				incongruentIncorrect: 0,
				congruentAvgTime: 0,
				incongruentAvgTime: 0
			}
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
				this.performanceParameters.congruentTotal += 1
				this.isCongruent = true
			}
			else {
				this.performanceParameters.incongruentTotal += 1
				this.isCongruent = false
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
					this.performanceParameters.congruentCorrect += 1
				}
				else {
					this.performanceParameters.incongruentCorrect += 1
				}
			} else {
				this.result = 'Incorrect';
				if (this.isCongruent) {
					this.performanceParameters.congruentIncorrect += 1
				}
				else {
					this.performanceParameters.incongruentIncorrect += 1
				}
			}
			this.displayResult();
			const promptTimeTaken = this.promptEndTime - this.promptStartTime;
			if (this.isCongruent) {
				this.performanceParameters.congruentAvgTime += promptTimeTaken
			}
			else {
				this.performanceParameters.incongruentAvgTime += promptTimeTaken
			}
			const score = this.result === 'Correct' ? 1 : 0;
			this.totalTestTime += promptTimeTaken;
			this.testScore += score;

			this.individualPromptData.push({
				promptText: this.colorName,
				promptColor: this.textColor,
				answerChosen: answer,
				result: this.result,
				timeTaken: promptTimeTaken
			});

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
			useTestStore().addStroopTestData({
				score: this.testScore,
				individualPromptData: this.individualPromptData,
				totalTimeTaken: this.totalTestTime
			});
			this.performanceParameters.congruentAvgTime = Math.floor(this.performanceParameters.congruentAvgTime / this.performanceParameters.congruentTotal)
			if (isNaN(this.performanceParameters.congruentAvgTime)) {
				this.performanceParameters.congruentAvgTime = 9999
			}
			this.performanceParameters.incongruentAvgTime = Math.floor(this.performanceParameters.incongruentAvgTime / this.performanceParameters.incongruentTotal)
			if (isNaN(this.performanceParameters.incongruentAvgTime)) {
				this.performanceParameters.congruentAvgTime = 9999
			}
			this.hideResult();
		}
	},
	computed: {
		stroopTestResults() {
			return useTestStore().getStroopTestData();
		},
		totalTasks() {
			return this.performanceParameters.congruentTotal + this.performanceParameters.incongruentTotal
		},
		totalCorrect() {
			return this.performanceParameters.congruentCorrect + this.performanceParameters.incongruentCorrect
		},
		totalIncorrect() {
			return this.performanceParameters.congruentIncorrect + this.performanceParameters.incongruentIncorrect
		},
		totalAvgTime() {
			return Math.floor(this.totalTestTime / this.totalTasks)
		},
		stroopScore() {
			const number = this.performanceParameters.incongruentAvgTime - this.performanceParameters.congruentAvgTime
			return Math.abs(number)
		}
	}
};
</script>

<style scoped>
.stroop-test-container {
	text-align: center;
}

.stroop-test {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}

.stroop-prompt {
	font-size: 52px;
	align-items: center;
	text-align: center;
}

.answer-choices {
	margin-top: 20px;
}

.answer-choice {
	font-size: 24px;
	margin: 5px;
}

.result {
	font-size: 18px;
	margin-top: 10px;
}

.perfromance-table {
	border: 1px solid black;
	border-collapse: collapse;
	background-color: teal;
}
</style>

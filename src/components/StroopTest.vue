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
				<v-table class="perfromance-table">
					<caption>
						Your Performance
					</caption>
					<v-divider></v-divider>
					<thead>
						<tr>
							<th>Parameter</th>
							<th>Quantity</th>
							<th>No. of correct tasks</th>
							<th>No. of incorrect tasks</th>
							<th>Average Time Taken for task(ms)</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Congruent Trials (Trials that had same colour as the words e.g RED printed in red colour)</td>
							<td>
								{{ this.stroopTestData.performanceParameters.congruentTotal }}
							</td>
							<td>
								{{ this.stroopTestData.performanceParameters.congruentCorrect }}
							</td>
							<td>
								{{ this.stroopTestData.performanceParameters.congruentIncorrect }}
							</td>
							<td>
								{{ this.stroopTestData.performanceParameters.congruentAvgTime }}
							</td>
						</tr>
						<tr>
							<td>In-congruent Trials (Trials that had different colour as the words e.g RED printed in green colour)</td>
							<td>
								{{ this.stroopTestData.performanceParameters.incongruentTotal }}
							</td>
							<td>
								{{ this.stroopTestData.performanceParameters.incongruentCorrect }}
							</td>
							<td>
								{{ this.stroopTestData.performanceParameters.incongruentIncorrect }}
							</td>
							<td>
								{{ this.stroopTestData.performanceParameters.incongruentAvgTime }}
							</td>
						</tr>
						<tr>
							<td>Total</td>
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
				<p>Your Stroop Score(Incngruent Avg Time - Congruent Avg Time): {{ this.stroopTestData.testScore }}ms</p>
				<br />
				<v-btn value="NBackLink" to="/nbacktest" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
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
				individualPromptData: [],
				performanceParameters: {
					congruentTotal: 0,
					incongruentTotal: 0,
					congruentCorrect: 0,
					incongruentCorrect: 0,
					congruentIncorrect: 0,
					incongruentIncorrect: 0,
					congruentAvgTime: 0,
					incongruentAvgTime: 0
				},
				totalTestTime: 0
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
				this.stroopTestData.performanceParameters.congruentAvgTime += promptTimeTaken;
			} else {
				this.stroopTestData.performanceParameters.incongruentAvgTime += promptTimeTaken;
			}
			this.stroopTestData.totalTestTime += promptTimeTaken;

			this.stroopTestData.individualPromptData.push({
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
			this.stroopTestData.performanceParameters.congruentAvgTime = Math.floor(this.stroopTestData.performanceParameters.congruentAvgTime / this.stroopTestData.performanceParameters.congruentTotal);
			if (isNaN(this.stroopTestData.performanceParameters.congruentAvgTime)) {
				this.stroopTestData.performanceParameters.congruentAvgTime = 9999;
			}
			this.stroopTestData.performanceParameters.incongruentAvgTime = Math.floor(this.stroopTestData.performanceParameters.incongruentAvgTime / this.stroopTestData.performanceParameters.incongruentTotal);
			if (isNaN(this.stroopTestData.performanceParameters.incongruentAvgTime)) {
				this.stroopTestData.performanceParameters.congruentAvgTime = 9999;
			}
			this.stroopTestData.testScore = this.stroopScore;
			useTestStore().addStroopTestData({
				score: this.stroopTestData.testScore,
				individualPromptData: this.stroopTestData.individualPromptData,
				totalTimeTaken: this.stroopTestData.totalTestTime,
				performanceParameters: this.stroopTestData.performanceParameters
			});
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
			return Math.floor(this.stroopTestData.totalTestTime / this.totalTasks);
		},
		stroopScore() {
			const number = this.stroopTestData.performanceParameters.incongruentAvgTime - this.stroopTestData.performanceParameters.congruentAvgTime;
			return Math.abs(number);
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
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: solid black;
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
	height: 5px;
}

.perfromance-table {
	border: 1px solid black;
	border-collapse: collapse;
	background-color: teal;
}

caption {
	background: teal;
	border: solid 1px black;
	border-left: none;
	border-right: none;
	border-top: none;
}
</style>

<template>
	<div class="n-back-container" v-if="!this.completed">
		<div class="n-back-prompt" v-if="this.showPrompt">
			<p>{{ prompt }}</p>
		</div>
		<div class="n-back-prompt" v-else></div>
		<br />
		<div class="n-back-input-container">
			<v-btn @click="this.checkAnswer()" color="green" size="large">Matches</v-btn>
		</div>
		<br />
		<div v-if="showResult" class="result">
			<p>Your answer is {{ result }}!</p>
		</div>
		<div v-else class="result"></div>
	</div>
	<div v-if="this.completed">
		<p class="completed">Test Completed</p>
		<br />
		<v-table class="performance-table">
			<caption>
				Your Performance
			</caption>
			<thead>
				<tr>
					<th>Parameter</th>
					<th>Quantity</th>
					<th>No. of correct tasks</th>
					<th>%age of correct tasks</th>
					<th>No. of incorrect tasks</th>
					<th>%age of incorrect tasks</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<b>Trials that had match</b>
					</td>
					<td>
						{{ this.nBackTestData.performanceParameters.matchTrialsTotal }}
					</td>
					<td>
						{{ this.nBackTestData.performanceParameters.matchTrialsCorrect }}
					</td>
					<td>
						{{ this.matchTrialsCorrectPercent }}
					</td>
					<td>
						{{ this.nBackTestData.performanceParameters.matchTrialsIncorrect }}
					</td>
					<td>
						{{ this.matchTrialsIncorrectPercent }}
					</td>
				</tr>
				<tr>
					<td>
						<b>Trials that had no match</b>
					</td>
					<td>
						{{ this.nBackTestData.performanceParameters.nonMatchTrialsTotal }}
					</td>
					<td>
						{{ this.nBackTestData.performanceParameters.nonMatchTrialsCorrect }}
					</td>
					<td>
						{{ this.nonMatchTrialsCorrectPercent }}
					</td>
					<td>
						{{ this.nBackTestData.performanceParameters.nonMatchTrialsIncorrect }}
					</td>
					<td>
						{{ this.nonMatchTrialsIncorrectPercent }}
					</td>
				</tr>
				<tr>
					<td>
						<b>Total of trials</b>
					</td>
					<td>
						{{ this.totalTasks }}
					</td>
					<td>
						{{ this.totalCorrect }}
					</td>
					<td>
						{{ this.totalCorrectPercent }}
					</td>
					<td>
						{{ this.totalIncorrect }}
					</td>
					<td>
						{{ this.totalIncorrectPercent }}
					</td>
				</tr>
			</tbody>
		</v-table>
		<br />
		<v-btn to="/longtermmemorytest/long" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
	</div>
</template>

<script>
import { useTestStore } from '@/store/tests';

export default {
	data() {
		return {
			maxIterations: 50,
			currentIteration: 0,
			prompt: '',
			sequence: [],
			turnsTillRepeat: 0,
			n: 2,
			result: '',
			showResult: false,
			showPrompt: true,
			promptTime: '',
			resposeTime: '',
			nBackTestData: {
				individualPromptData: [],
				nBackTestScore: 0,
				performanceParameters: {
					matchTrialsTotal: 0,
					matchTrialsCorrect: 0,
					matchTrialsIncorrect: 0,
					nonMatchTrialsTotal: 0,
					nonMatchTrialsCorrect: 0,
					nonMatchTrialsIncorrect: 0
				}
			},
			score: 0,
			inputReceived: false,
			repeatFlag: false,
			completed: false
		};
	},
	methods: {
		generatePrompt() {
			this.showResult = false;
			this.checkMiss();

			if (this.turnsTillRepeat == 0) {
				if (this.sequence.length - this.n >= 0) {
					this.prompt = this.sequence[this.sequence.length - 1 - (this.n - 1)];
					this.sequence.push(this.prompt);
					this.repeatFlag = true;
					this.nBackTestData.performanceParameters.matchTrialsTotal += 1;
				} else {
					this.prompt = String.fromCharCode(65 + Math.floor(Math.random() * 26));
					this.sequence.push(this.prompt);
					this.nBackTestData.performanceParameters.nonMatchTrialsTotal += 1;
				}
				this.turnsTillRepeat = Math.floor(Math.random() * 8);
			} else {
				this.prompt = String.fromCharCode(65 + Math.floor(Math.random() * 26));
				this.sequence.push(this.prompt);
				this.turnsTillRepeat = this.turnsTillRepeat - 1;
				this.nBackTestData.performanceParameters.nonMatchTrialsTotal += 1;
			}
			setTimeout(() => {
				this.showPrompt = true;
			}, 2500);
			setTimeout(() => {
				this.showPrompt = false;
			}, 1000);
			if (this.sequence.length > 7) {
				this.sequence.shift();
			}
			this.currentIteration += 1;
			this.promptTime = Date.now();

			if (this.currentIteration == this.maxIterations) {
				this.testCompleted();
			} else {
				setTimeout(() => {
					this.generatePrompt();
				}, 2000);
			}
		},
		checkMiss() {
			if (this.inputReceived == false) {
				if (this.repeatFlag == true) {
					this.score = this.score - 1;
					const promptData = {
						prompt: this.prompt,
						answer: '',
						result: 'Miss'
					};
					this.nBackTestData.individualPromptData.push(promptData);
					this.nBackTestData.performanceParameters.matchTrialsIncorrect += 1;
				} else {
					this.nBackTestData.performanceParameters.nonMatchTrialsCorrect += 1;
					this.score += 1;
				}
			} else {
				if (this.repeatFlag == false) {
					this.nBackTestData.performanceParameters.nonMatchTrialsIncorrect += 1;
					this.score = this.score - 1;
				} else {
					this.nBackTestData.performanceParameters.matchTrialsCorrect += 1;
				}
			}
			this.repeatFlag = false;
			this.inputReceived = false;
		},
		checkAnswer() {
			this.responseTime = Date.now();
			const targetStimulus = this.sequence[this.sequence.length - 1 - this.n];
			this.inputReceived = true;

			if (this.prompt === targetStimulus.toString()) {
				this.score += 1;
				this.result = 'Correct';
			} else {
				this.result = 'Incorrect';
			}
			const timeTaken = this.responseTime - this.promptTime;
			const promptData = {
				prompt: this.prompt,
				answer: targetStimulus.toString(),
				result: this.result,
				timeTaken: timeTaken
			};
			this.nBackTestData.individualPromptData.push(promptData);
			this.showResult = true;
		},
		testCompleted() {
			this.nBackTestData.nBackTestScore = this.score;
			useTestStore().addNBackTestData(this.nBackTestData);
			this.completed = true;
		}
	},
	computed: {
		matchTrialsCorrectPercent() {
			return Math.floor((this.nBackTestData.performanceParameters.matchTrialsCorrect / this.nBackTestData.performanceParameters.matchTrialsTotal) * 100);
		},
		matchTrialsIncorrectPercent() {
			return Math.floor((this.nBackTestData.performanceParameters.matchTrialsIncorrect / this.nBackTestData.performanceParameters.matchTrialsTotal) * 100);
		},
		nonMatchTrialsCorrectPercent() {
			return Math.floor((this.nBackTestData.performanceParameters.nonMatchTrialsCorrect / this.nBackTestData.performanceParameters.nonMatchTrialsTotal) * 100);
		},
		nonMatchTrialsIncorrectPercent() {
			return Math.floor((this.nBackTestData.performanceParameters.nonMatchTrialsIncorrect / this.nBackTestData.performanceParameters.nonMatchTrialsTotal) * 100);
		},
		totalTasks() {
			return this.nBackTestData.performanceParameters.matchTrialsTotal + this.nBackTestData.performanceParameters.nonMatchTrialsTotal;
		},
		totalCorrect() {
			return this.nBackTestData.performanceParameters.matchTrialsCorrect + this.nBackTestData.performanceParameters.nonMatchTrialsCorrect;
		},
		totalCorrectPercent() {
			return Math.floor((this.totalCorrect / this.totalTasks) * 100);
		},
		totalIncorrect() {
			return this.nBackTestData.performanceParameters.matchTrialsIncorrect + this.nBackTestData.performanceParameters.nonMatchTrialsIncorrect;
		},
		totalIncorrectPercent() {
			return Math.floor((this.totalIncorrect / this.totalTasks) * 100);
		}
	},
	mounted() {
		this.generatePrompt();
	}
};
</script>

<style scoped>
.n-back-container {
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
}

.n-back-prompt {
	margin: 10px;
	font-size: 80px;
	height: 150px;
	font-weight: bold;
}

.n-back-input-container {
	margin-top: 20px;
}

.n-back-input {
	font-size: 24px;
}

.result {
	font-size: 32px;
	margin-top: 10px;
	height: 5px;
}

.completed {
	align-items: center;
	font-size: 25px;
	text-align: center;
}

.performance-table {
	border: 1px solid;
	border-collapse: collapse;
	background-color: teal;
}
</style>

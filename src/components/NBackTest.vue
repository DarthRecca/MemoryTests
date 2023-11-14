<template>
	<div class="n-back-container" v-if="!this.completed">
		<div class="n-back-prompt" v-if="this.showPrompt">
			<p>{{ prompt }}</p>
		</div>
		<div class="n-back-prompt" v-else></div>
		<br />
		<div class="n-back-input-container">
			<v-btn @click="this.setInputReceived()" color="green" size="large">Matches</v-btn>
		</div>
		<br />
		<div v-if="this.showResult" class="result">
			<p>{{ result }}!</p>
		</div>
		<div v-else class="result"></div>
	</div>
	<div v-if="this.completed">
		<p class="completed">Test Completed</p>
		<br />
		<p><b>Note: </b>This is a computerized analysis and not a medical diagnosis</p>
		<br />
		<v-table class="performance-table">
			<caption>
				Your Performance
			</caption>
			<thead>
				<tr>
					<th>Parameter</th>
					<th>%age of correct tasks</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						<b>Trials that had match</b>
					</td>
					<td>
						{{ this.matchTrialsCorrectPercent }}
					</td>
				</tr>
			</tbody>
		</v-table>
		<br />
		<br />
		<div class="expected-results">
			<p>The expected scores of N=2 back test of working memory vary depending on the age and education level of the
				individual. However, as a general guide, the following can be expected:<br /></p>
			<ul>
				<li>Children: 60-80% accuracy</li>
				<li>Adults: 80-90% accuracy</li>
				<li>Older adults: 70-80% accuracy</li>
			</ul>
			<br />
			<p>It is important to note that these are just general guidelines, and there is a wide range of normal scores.
				If your score is less than above numbers, please do not panic. Your score could be lower than expected
				values if you are not well, have anxiety or are not in a sound state of mind. You may take the test again
				after a few days. If you consistently find your score much lower than above values and experience
				difficulties in concentrating on the task or processing the information mentally then you may consult the
				experts.</p>
		</div>
		<br />
		<div class="next-button">
			<v-btn to="/shapedigitcodetest" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
		</div>
	</div>
</template>

<script>
import { useTestStore } from '@/store/tests';

export default {
	data() {
		return {
			maxIterations: 50,
			iterationCheck: false,
			currentIteration: 0,
			prompt: '',
			sequence: [],
			turnsTillRepeat: 0,
			n: 2,
			result: '',
			showResult: false,
			showPrompt: true,
			promptTime: 0,
			responseTime: 0,
			nBackTestData: {
				nBackTestScore: 0,
				performanceParameters: {
					matchTrialsTotal: 0,
					matchTrialsCorrect: 0,
					matchTrialsIncorrect: 0,
					matchTrialsCorrectPercent: 0,
					matchTrialsIncorrectPercent: 0,
					matchTrialsAvgTime: 0,
					nonMatchTrialsTotal: 0,
					nonMatchTrialsCorrect: 0,
					nonMatchTrialsIncorrect: 0,
					nonMatchTrialsCorrectPercent: 0,
					nonMatchTrialsIncorrectPercent: 0,
					nonMatchTrialsAvgTime: 0,
					totalTasks: 0,
					totalCorrect: 0,
					totalIncorrect: 0,
					totalCorrectPercent: 0,
					totalIncorrectPercent: 0,
					totalAvgTime: 0
				}
			},
			score: 0,
			inputReceived: false,
			repeatFlag: false,
			completed: false,
			matchTotalTime: 0,
			nonMatchTotalTime: 0
		};
	},
	methods: {
		async generatePrompt() {
			if (this.iterationCheck == false) {
				this.checkAnswer();
			} else {
				this.iterationCheck = false;
			}
			this.resetShowResultToggle();
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
				this.turnsTillRepeat = Math.floor(Math.random() * 5);
			} else {
				this.prompt = String.fromCharCode(65 + Math.floor(Math.random() * 26));
				this.sequence.push(this.prompt);
				this.turnsTillRepeat = this.turnsTillRepeat - 1;
				this.nBackTestData.performanceParameters.nonMatchTrialsTotal += 1;
			}
			setTimeout(() => {
				this.showPrompt = true;
				this.promptTime = Date.now();
			}, 2500);
			setTimeout(() => {
				this.showPrompt = false;
			}, 500);
			if (this.sequence.length > 7) {
				this.sequence.shift();
			}
			this.currentIteration += 1;

			if (this.currentIteration == this.maxIterations) {
				this.testCompleted();
			} else {
				setTimeout(() => {
					this.generatePrompt();
				}, 2500);
			}
		},
		async checkAnswer() {
			this.responseTime = Date.now();
			const timeTaken = this.responseTime - this.promptTime;
			if (this.inputReceived == false) {
				if (this.repeatFlag == true) {
					this.score = this.score - 1;
					this.result = 'Incorrect';
					this.matchTotalTime += timeTaken;
					this.nBackTestData.performanceParameters.matchTrialsIncorrect += 1;
				} else {
					this.result = 'Correct';
					this.nBackTestData.performanceParameters.nonMatchTrialsCorrect += 1;
					this.nonMatchTotalTime += timeTaken;
					this.score += 1;
				}
			} else {
				if (this.repeatFlag == false) {
					this.result = 'Incorrect';
					this.nonMatchTotalTime += timeTaken;
					this.nBackTestData.performanceParameters.nonMatchTrialsIncorrect += 1;
					this.score = this.score - 1;
				} else {
					this.result = 'Correct';
					this.matchTotalTime += timeTaken;
					this.nBackTestData.performanceParameters.matchTrialsCorrect += 1;
					this.score += 1;
				}
			}
			this.repeatFlag = false;
			this.inputReceived = false;
		},
		async setShowResultToggle() {
			this.showResult = true;
		},
		async resetShowResultToggle() {
			this.showResult = false;
		},
		setInputReceived() {
			this.inputReceived = true;
			this.setShowResultToggle();
			this.checkAnswer();
			this.iterationCheck = true;
		},
		testCompleted() {
			this.nBackTestData.performanceParameters.nonMatchTrialsCorrect = this.nBackTestData.performanceParameters.nonMatchTrialsCorrect - 2;
			this.nBackTestData.performanceParameters.matchTrialsCorrectPercent = this.matchTrialsCorrectPercent;
			this.nBackTestData.performanceParameters.nonMatchTrialsCorrectPercent = this.nonMatchTrialsCorrectPercent;
			this.nBackTestData.performanceParameters.matchTrialsIncorrectPercent = this.matchTrialsIncorrectPercent;
			this.nBackTestData.performanceParameters.nonMatchTrialsIncorrectPercent = this.nonMatchTrialsIncorrectPercent;
			this.nBackTestData.performanceParameters.totalTasks = this.totalTasks;
			this.nBackTestData.performanceParameters.totalCorrect = this.totalCorrect;
			this.nBackTestData.performanceParameters.totalCorrectPercent = this.totalCorrectPercent;
			this.nBackTestData.performanceParameters.totalIncorrect = this.totalIncorrect;
			this.nBackTestData.performanceParameters.totalIncorrectPercent = this.totalIncorrectPercent;
			this.nBackTestData.performanceParameters.totalAvgTime = this.totalAvgTime;
			this.nBackTestData.performanceParameters.matchTrialsAvgTime = this.matchTrialsAvgTime;
			this.nBackTestData.performanceParameters.nonMatchTrialsAvgTime = this.nonMatchTrialsAvgTime;
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
		matchTrialsAvgTime() {
			return Math.floor(this.matchTotalTime / this.nBackTestData.performanceParameters.matchTrialsTotal);
		},
		nonMatchTrialsCorrectPercent() {
			return Math.floor((this.nBackTestData.performanceParameters.nonMatchTrialsCorrect / this.nBackTestData.performanceParameters.nonMatchTrialsTotal) * 100);
		},
		nonMatchTrialsIncorrectPercent() {
			return Math.floor((this.nBackTestData.performanceParameters.nonMatchTrialsIncorrect / this.nBackTestData.performanceParameters.nonMatchTrialsTotal) * 100);
		},
		nonMatchTrialsAvgTime() {
			return Math.floor(this.nonMatchTotalTime / this.nBackTestData.performanceParameters.nonMatchTrialsTotal);
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
		},
		totalAvgTime() {
			return Math.floor((this.matchTotalTime + this.nonMatchTotalTime) / this.totalTasks);
		}
	},
	mounted() {
		this.responseTime = Date.now();
		this.promptTime = Date.now();
		this.generatePrompt();
	}
};
</script>

<style scoped>
.n-back-container {
	border: solid 5px black;
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

.result {
	font-size: 40px;
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
	overflow-x: auto;
}

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}
</style>

<template>
	<div class="shape-digit-test" v-if="!this.completed">
		<div class="top-information-bar">
			<v-container>
				<v-row>
					<v-col class="timer" cols="10">
						<v-progress-linear :model-value="this.progress" color="purple" height="40"></v-progress-linear>
					</v-col>
					<v-col class="score-text" cols="auto"> Your Score </v-col>
					<v-col class="score-num" cols="auto">
						{{ this.score }}
					</v-col>
				</v-row>
			</v-container>
		</div>
		<div class="shape-digit-code-key">
			<center>
				<table>
					<tr>
						<td>Shapes</td>
						<td v-for="(shape, idx) in keyShapes" :key="idx">
							<v-icon size="x-large" color="black" :icon="shape"></v-icon>
						</td>
					</tr>
					<tr>
						<td>Digits</td>
						<td v-for="(digit, idx) in keyDigits" :key="idx">
							{{ digit }}
						</td>
					</tr>
				</table>
			</center>
		</div>
		<br />
		<v-container>
			<v-row>
				<v-col>
					<div class="trial-assist" v-if="this.trialAssist">
						<h3>Trial Assistance:</h3>
						<br />
						<v-icon size="large" color="black" :icon="this.promptShape"></v-icon> Corresponds to {{ this.promptDigit }}<br />
						<p>Click on {{ this.promptDigit }}</p>
					</div>
				</v-col>
				<v-col>
					<div class="shape-digit-code-prompt">
						<p>
							<v-icon size="x-large" color="black" :icon="this.promptShape"></v-icon>
						</p>
					</div>
				</v-col>
				<v-col> </v-col>
			</v-row>
		</v-container>
		<v-row class="numpad">
			<v-col v-for="(num, idx) in numpadNumbers" :key="idx" cols="3">
				<v-btn @click="checkAnswer(num)" class="numpad-button" size="large">
					{{ num }}
				</v-btn>
			</v-col>
		</v-row>
	</div>
	<div v-if="this.completed" class="completed">
		<br />
		<p>Trial Completed</p>
		<p>Click on Next to take Real Test</p>
		<br />
		<div class="next-button">
			<v-btn @click="this.completedTrial()" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ShapeDigitCodeTrial',
	data() {
		return {
			userInput: '',
			numpadNumbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
			keyShapes: ['mdi-arrow-right', 'mdi-clover', 'mdi-rhombus', 'mdi-circle', 'mdi-emoticon', 'mdi-square', 'mdi-water', 'mdi-flask-empty', 'mdi-rocket', 'mdi-heart'],
			keyDigits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
			promptShape: '',
			promptDigit: 0,
			score: 0,
			timer: 0,
			completed: false,
			selectedDigit: '',
			trialAssist: true,
			randomIndex: 0,
			progress: 0
		};
	},
	methods: {
		checkAnswer(num) {
			this.selectedDigit = num;
			if (this.selectedDigit == this.promptDigit) {
				this.score += 1;
			}
			this.generatePrompt();
		},
		async updateTimer() {
			this.timer = this.timer + 3;
			this.progress = (this.timer / 120) * 100;
			if (this.timer >= 120) {
				this.completed = true;
				return;
			} else {
				if (this.timer >= 50) {
					this.trialAssist = false;
				}
				setTimeout(() => {
					this.updateTimer();
				}, 3000);
			}
		},
		async generatePrompt() {
			this.randomIndex = Math.floor(Math.random() * this.keyDigits.length);
			if (this.promptDigit == this.keyDigits[this.randomIndex]) {
				if (this.randomIndex - 1 >= 0) {
					this.randomIndex = this.randomIndex - 1;
				} else {
					this.randomIndex = this.randomIndex + 1;
				}
			}
			this.promptDigit = this.keyDigits[this.randomIndex];
			this.promptShape = this.keyShapes[this.randomIndex];
		},
		completedTrial() {
			this.$emit('completed-trial');
		}
	},
	emits: ['completed-trial'],
	mounted() {
		this.updateTimer();
		this.generatePrompt();
	}
};
</script>

<style>
.shape-digit-container {
	justify-content: center;
	text-align: center;
	align-items: center;
	padding: 10px;
	height: 100vh;
	width: 100%;
}

.shape-digit-test {
	text-align: center;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: solid 5px black;
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

.trial-assist {
	border: 2px solid black;
	text-align: center;
	align-items: center;
}

.shape-digit-code-prompt {
	font-size: 80px;
	border: 2px solid black;
	font-weight: bold;
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

.completed {
	align-items: center;
	font-size: 25px;
	text-align: center;
}

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}

.top-information-bar {
	align-items: center;
	font-size: 25px;
	text-align: center;
}

.progress-timer {
	align-items: center;
	font-size: 25px;
	text-align: center;
}

.score-text {
	align-items: center;
	font-size: 25px;
	text-align: center;
}

.score-num {
	align-items: center;
	font-size: 25px;
	text-align: center;
}

.shape-digit-code-key {
	align-items: center;
	font-size: 25px;
	text-align: center;
}
</style>

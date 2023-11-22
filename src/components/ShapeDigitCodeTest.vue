<template>
	<div class="shape-digit-test" v-if="!this.completed">
		<div class="top-information-bar">
			<v-container>
				<v-row>
					<v-col class="progress-timer" cols="10">
						<v-progress-linear :model-value="this.progress" color="purple" height="40">{{ this.timer }}</v-progress-linear>
					</v-col>
					<v-col class="score-text" cols="auto"> Your Progress </v-col>
					<v-col class="score-num" cols="auto"> {{ this.correct }} / {{ this.total }} </v-col>
				</v-row>
			</v-container>
		</div>
		<div class="shape-digit-code-key" v-if="!this.isMobile()">
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
				<v-col cols="8">
					<div>
						<p class="shape-digit-code-prompt">
							<v-icon size="large" color="black" :icon="this.promptShape"></v-icon>
						</p>
						<v-container class="numpad">
							<v-row>
								<v-col>
									<v-btn @click="checkAnswer(9)" class="numpad-button" size="medium"> 9 </v-btn>
								</v-col>
								<v-col>
									<v-btn @click="checkAnswer(6)" class="numpad-button" size="medium"> 6 </v-btn>
								</v-col>
								<v-col>
									<v-btn @click="checkAnswer(3)" class="numpad-button" size="medium"> 3 </v-btn>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<v-btn @click="checkAnswer(8)" class="numpad-button" size="medium"> 8 </v-btn>
								</v-col>
								<v-col>
									<v-btn @click="checkAnswer(5)" class="numpad-button" size="medium"> 5 </v-btn>
								</v-col>
								<v-col>
									<v-btn @click="checkAnswer(2)" class="numpad-button" size="medium"> 2 </v-btn>
								</v-col>
							</v-row>
							<v-row>
								<v-col>
									<v-btn @click="checkAnswer(7)" class="numpad-button" size="medium"> 7 </v-btn>
								</v-col>
								<v-col>
									<v-btn @click="checkAnswer(4)" class="numpad-button" size="medium"> 4 </v-btn>
								</v-col>
								<v-col>
									<v-btn @click="checkAnswer(1)" class="numpad-button" size="medium"> 1 </v-btn>
								</v-col>
							</v-row>
							<v-row>
								<v-col cols="10">
									<v-btn @click="checkAnswer(0)" class="numpad-button" size="medium"> 0 </v-btn>
								</v-col>
							</v-row>
						</v-container>
					</div>
				</v-col>
				<v-col cols="2">
					<div class="shape-digit-code-key" v-if="this.isMobile()">
						<table class="shape-digit-key">
							<thead>
								<tr>
									<th>Shape</th>
									<th>Digit</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(keyObj, idx) in this.keyItems" :key="idx">
									<td><v-icon size="large" color="black" :icon="keyObj.shape"></v-icon></td>
									<td>{{ keyObj.digit }}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</v-col>
			</v-row>
		</v-container>
	</div>
	<div v-if="this.completed" class="completed">
		<br />
		<div class="results">
			<center>
				<table>
					<tr>
						<td>%age of Correct Digits Coded</td>
						<td>
							{{ this.percentScore }}
						</td>
					</tr>
				</table>
			</center>
		</div>
		<br />
		<p>Click on Next to continue</p>
		<div class="next-button">
			<v-btn to="/longtermmemorytest/long" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
		</div>
	</div>
</template>

<script>
import { useTestStore } from '@/store/tests';

export default {
	name: 'ShapeDigitCodeTest',
	data() {
		return {
			userInput: '',
			numpadNumbers: [7, 8, 9, 4, 5, 6, 1, 2, 3, 0],
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
			keyDigits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
			promptShape: '',
			promptDigit: '',
			score: 0,
			correct: 0,
			total: 0,
			timer: 0,
			completed: false,
			selectedDigit: '',
			randomIndex: 0,
			progress: 0
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
		checkAnswer(num) {
			this.selectedDigit = num;
			if (this.selectedDigit == this.promptDigit) {
				this.correct += 1;
			}

			this.generatePrompt();
		},
		async updateTimer() {
			this.timer += 3;
			this.progress = (this.timer / 120) * 100;
			if (this.timer >= 120) {
				this.testCompleted();
				return;
			} else {
				setTimeout(() => {
					this.updateTimer();
				}, 3000);
			}
		},
		generatePrompt() {
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
			this.total += 1;
		},
		testCompleted() {
			useTestStore().addShapeDigitCodeTestData({
				shapeDigitCodeTestScore: this.percentScore,
				shapeDigitCodeTestTotal: this.total,
				shapeDigitCodeTestCorrect: this.correct
			});
			this.completed = true;
		}
	},
	computed: {
		percentScore() {
			return Math.floor((this.correct / this.total) * 100);
		}
	},
	mounted() {
		this.generatePrompt();
		this.updateTimer();
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

.shape-digit-code-prompt {
	font-size: 70px;
	font-weight: bold;
	border: 2px solid black;
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

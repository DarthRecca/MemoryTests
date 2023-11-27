<template>
	<div class="shape-digit-test" v-if="!this.completed">
		<div class="top-information-bar">
			<v-container>
				<v-row>
					<v-col class="progress-timer" cols="10">
						<v-progress-linear :model-value="this.progress" color="purple" height="40">{{ this.timer }}</v-progress-linear>
					</v-col>
					<v-col class="score-text" cols="auto"> Your Score: </v-col>
					<v-col class="score-num" cols="auto"> {{ this.correct }} / {{ this.total }} </v-col>
				</v-row>
			</v-container>
		</div>
		<div class="shape-digit-code-key" v-if="!this.isMobile()" :class="[this.isMobile() ? 'mobile' : 'not-mobile']">
			<center>
				<table>
					<tr>
						<td>Shapes</td>
						<td v-for="(shape, idx) in keyShapes" :key="idx">
							<v-icon size="large" color="black" :icon="shape"></v-icon>
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
		<v-container class="shape-digit-code-main">
			<v-row>
				<v-col>
					<div>
						<p v-if="this.showResult" class="result">{{ this.result }}</p>
						<p v-else class="result"></p>
					</div>
				</v-col>
			</v-row>
			<v-row>
				<v-col :cols="this.isMobile() ? 0 : 3" v-if="!this.isMobile()"></v-col>
				<v-col :cols="this.isMobile() ? 8 : 6">
					<div class="shape-digit-code-prompt">
						<p>
							<v-icon size="large" color="black" :icon="this.promptShape"></v-icon>
						</p>
					</div>
					<v-container class="numpad" :class="[this.isMobile() ? 'mobile' : 'not-mobile']">
						<v-row>
							<v-col v-for="(num, idx) in numpadNumbers" :key="idx" cols="4">
								<v-btn @click="checkAnswer(num)" class="numpad-button" :size="this.isMobile ? 'medium' : 'large'">
									{{ num }}
								</v-btn>
							</v-col>
						</v-row>
					</v-container>
				</v-col>
				<v-col :cols="this.isMobile() ? 2 : 3" v-if="this.isMobile()">
					<div class="shape-digit-code-key" :class="[this.isMobile() ? 'mobile' : 'not-mobile']">
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
			promptDigit: 0,
			result: '',
			showResult: false,
			correct: 0,
			total: 0,
			timer: 0,
			completed: false,
			selectedDigit: '',
			trialAssist: true,
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
			this.total += 1;
			this.selectedDigit = num;
			if (this.selectedDigit == this.promptDigit) {
				this.correct += 1;
				this.result = 'Correct';
				this.showResult = true;
				setTimeout(() => {
					this.showResult = false;
				}, 1000);
			} else {
				this.result = 'Incorrect';
				this.showResult = true;
				setTimeout(() => {
					this.showResult = false;
				}, 1000);
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
	padding: 5px;
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
	overflow-x: auto;
}

tr {
	border: 1px solid black;
}

td {
	border: 1px solid black;
	background-color: aqua;
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

.shape-digit-code-main {
	align-items: center;
}

.numpad {
	align-items: center;
	text-align: center;
}

.numpad-button {
	font-size: 18px;
	margin: 15px;
}

.result {
	height: 10px;
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
	text-align: center;
}

.shape-digit-key {
	align-items: center;
	text-align: center;
}

.mobile {
	font-size: 16px;
}

.not-mobile {
	font-size: 22px;
}
</style>

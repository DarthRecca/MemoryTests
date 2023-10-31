<template>
	<div class="n-back-container" v-if="!this.completed">
		<div class="n-back-prompt" v-if="this.showPrompt">
			<p>{{ prompt }}</p>
		</div>
		<div class="n-back-prompt" v-else></div>
		<br />
		<div class="n-back-input-container">
			<v-btn @click="this.setInputReceived()" color="green" block size="large">Matches</v-btn>
		</div>
		<br />
		<div v-if="this.showResult" class="result">
			<p>{{ result }}!</p>
		</div>
		<div v-else class="result"></div>
	</div>
	<div v-if="this.completed" class="completed">
		<br />
		<p>Trial Completed</p>
		<br />
		<div class="next-button">
			<v-btn @click="$emit('trialCompleted')" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			maxIterations: 20,
			iterationCheck: false,
			currentIteration: 0,
			prompt: '',
			sequence: [],
			turnsTillRepeat: 0,
			n: 2,
			result: '',
			showResult: false,
			showPrompt: true,
			inputReceived: false,
			repeatFlag: false,
			completed: false
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
				} else {
					this.prompt = String.fromCharCode(65 + Math.floor(Math.random() * 26));
					this.sequence.push(this.prompt);
				}
				this.turnsTillRepeat = Math.floor(Math.random() * 5);
			} else {
				this.prompt = String.fromCharCode(65 + Math.floor(Math.random() * 26));
				this.sequence.push(this.prompt);
				this.turnsTillRepeat = this.turnsTillRepeat - 1;
			}
			setTimeout(() => {
				this.showPrompt = true;
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
			if (this.inputReceived == false) {
				if (this.repeatFlag == true) {
					this.result = 'Incorrect';
				} else {
					this.result = 'Correct';
				}
			} else {
				if (this.repeatFlag == false) {
					this.result = 'Incorrect';
				} else {
					this.result = 'Correct';
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
			this.completed = true;
		}
	},
	emits: ['trialCompleted'],
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
	border: solid 5px black;
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

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}
</style>

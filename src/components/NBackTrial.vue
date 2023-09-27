<template>
	<div class="n-back-container" v-if="!this.completed">
		<h1 class="n-back-prompt" v-if="this.showPrompt">{{ prompt }}</h1>
		<div class="n-back-input-container">
			<v-btn @click="checkAnswer" color="green" block size="large">Matches</v-btn>
		</div>
		<p v-if="showResult" class="result">Your answer is {{ result }}!</p>
	</div>
	<div v-if="this.completed" class="completed">
		<p>Trial Completed</p>
		<v-btn @click='$emit("trialCompleted")' size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
	</div>
</template>

<script>

export default {
	data() {
		return {
			maxIterations: 20,
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
		generatePrompt() {
			this.showResult = false;
			this.checkMiss();

			if (this.turnsTillRepeat == 0) {
				if (this.sequence.length - (this.n) >= 0) {
					this.prompt = this.sequence[(this.sequence.length - 1) - (this.n - 1)];
					this.sequence.push(this.prompt);
					this.repeatFlag = true
				} else {
					this.prompt = String.fromCharCode(65 + Math.floor(Math.random() * 26));
					this.sequence.push(this.prompt);
				}
				this.turnsTillRepeat = Math.floor(Math.random() * 8);
			} else {
				this.prompt = String.fromCharCode(65 + Math.floor(Math.random() * 26));
				this.sequence.push(this.prompt);
				this.turnsTillRepeat = this.turnsTillRepeat - 1;
			}
			setTimeout(() => {
				this.showPrompt = true
			}, 2500)
			setTimeout(() => {
				this.showPrompt = false
			}, 1000)
			if (this.sequence.length > 7) {
				this.sequence.shift();
			}
			this.currentIteration += 1

			if (this.currentIteration == this.maxIterations) {
				this.testCompleted()
			} else {
				setTimeout(() => {
					this.generatePrompt();
				}, 2000);
			}
		},
		checkMiss() {
			this.repeatFlag = false
			this.inputReceived = false
		},
		checkAnswer() {
			const targetStimulus = this.sequence[(this.sequence.length - 1) - (this.n)];
			this.inputReceived = true

			if (this.prompt === targetStimulus.toString()) {
				this.result = 'Correct';
			} else {
				this.result = 'Incorrect';
			}

			this.showResult = true;
		},
		testCompleted() {
			this.completed = true
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
	font-size: 80px;
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
}

.completed {
	align-items: center;
	font-size: 25px;
	text-align: center;
}
</style>

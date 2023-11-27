<template>
	<div class="n-back-container" v-if="!this.completed">
		<v-container>
			<br /><br />
			<v-row>
				<v-col cols="3">
					<h3>N-2</h3>
				</v-col>
				<v-col cols="3">
					<h3>N-1</h3>
				</v-col>
				<v-col cols="6">
					<h3>N</h3>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="3">
					<div class="n-back-prompt">
						{{ n_2 }}
					</div>
				</v-col>
				<v-col cols="3">
					<div class="n-back-prompt">
						{{ n_1 }}
					</div>
				</v-col>
				<v-col cols="6">
					<div class="n-back-prompt">
						<p>{{ prompt }}</p>
					</div>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="6">
					<div v-if="this.prompt == this.n_2" class="match-indicator">{{ n_2 }} equals {{ prompt }}.</div>
					<div v-else class="match-indicator">{{ n_2 }} not equals {{ prompt }}.</div>
				</v-col>
				<v-col cols="6">
					<div class="n-back-input-container">
						<v-btn @click="this.setInputReceived()" color="green" block size="large">Matches</v-btn>
					</div>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<div v-if="this.prompt == this.n_2" class="match-indicator">Press MATCHES button</div>
					<div v-else class="match-indicator">Do not Press MATCHES button</div>
				</v-col>
				<v-col cols="6">
					<div v-if="this.showResult" class="result">
						<p>{{ result }}!</p>
					</div>
					<div v-else class="result"></div>
				</v-col>
			</v-row>
		</v-container>
		<br />
	</div>
	<div v-if="this.completed" class="completed">
		<br />
		<p>Assisted Trial Completed</p>
		<p>Click on Next to take Unassisted Trial</p>
		<br />
		<div class="next-button">
			<v-btn @click="$emit('demoCompleted')" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
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
			n_1: '',
			n_2: '',
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
			this.n_2 = this.n_1;
			this.n_1 = this.prompt;
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

			if (this.sequence.length > 7) {
				this.sequence.shift();
			}
			this.currentIteration += 1;

			if (this.currentIteration == this.maxIterations) {
				this.testCompleted();
			} else {
				setTimeout(() => {
					this.generatePrompt();
				}, 3000);
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
	emits: ['demoCompleted'],
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
	border: 2px black solid;
}

.n-back-input-container {
	margin-top: 20px;
}

.match-indicator {
	margin-top: 20px;
	font-size: 32px;
}

.result {
	font-size: 40px;
	margin-top: 10px;
	height: 5px;
}

.completed {
	border: 5px black solid;
	margin: 5px;
	align-items: center;
	font-size: 25px;
	text-align: center;
}

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}
</style>

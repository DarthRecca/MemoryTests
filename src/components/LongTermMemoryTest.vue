<template>
	<v-container class="long-term-test-container">
		<div v-if="this.testType == 'short'" class="long-term-memory-test-title">
			<p>Short Term Memory</p>
			{{ $t('shorttermmemory.note') }}
			<br />
		</div>
		<div v-if="this.testType == 'long'" class="long-term-memory-test-title">
			<p>Long Term Memory</p>
			{{ $t('longtermmemory.note') }}
			<br />
		</div>
		<div v-if="!this.completed">
			<p>
				{{ $t('longtermmemory.instructions.line1') }}<br />
				{{ $t('longtermmemory.instructions.line2') }}<br />
			</p>
			<br />
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.first" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.second" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.third" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.fourth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.fifth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.sixth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.seventh" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.eighth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.ninth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.tenth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
			</v-row>
			<div class="next-button">
				<v-btn @click="this.checkKeys()" size="x-large" block color="red-lighten-3" rounded="lg">Submit</v-btn>
			</div>
		</div>
		<div v-if="this.completed" class="completed">
			<h3>Total Number of Words Recalled Correctly(out of 10): {{ this.keysMatched }}</h3>
			<br />
			<p><b>Note: </b>This is a computerized analysis and not a medical diagnosis</p>
			<br />
			<div class="result-expected">
				<p>
					{{ $t('longtermmemory.expected_result.line1') }}<br />
					{{ $t('longtermmemory.expected_result.line2') }}<br />
					{{ $t('longtermmemory.expected_result.line3') }}<br />
					{{ $t('longtermmemory.expected_result.line4') }}<br />
				</p>
			</div>
			<br />
			<div class="next-button" v-if="this.testType == 'short'">
				<v-btn to="/digitspantest" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
			</div>
			<div class="next-button" v-if="this.testType == 'long'">
				<v-btn to="/consolidatedreport" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
			</div>
		</div>
	</v-container>
</template>

<script>
import { useTestStore } from '@/store/tests';
import axios from 'axios';

export default {
	name: 'LongTermMemoryTest',
	data() {
		return {
			keys: {
				first: '',
				second: '',
				third: '',
				fourth: '',
				fifth: '',
				sixth: '',
				seventh: '',
				eighth: '',
				ninth: '',
				tenth: ''
			},
			answerKeys: ['Key', 'Ear', 'King', 'Cake', 'Cat', 'Car', 'Red', 'Cup', 'Bat', 'River'],
			usedKeys: [],
			completed: false,
			keysMatched: 0
		};
	},
	props: {
		testType: String
	},
	computed: {},
	methods: {
		checkKeys() {
			let inputKeyList = [];
			const answers = this.answerKeys.map((word) => word.toLowerCase());
			inputKeyList.push(this.keys.first, this.keys.second, this.keys.third, this.keys.fourth, this.keys.fifth, this.keys.sixth, this.keys.seventh, this.keys.eighth, this.keys.ninth, this.keys.tenth);
			for (let i = 0; i < inputKeyList.length; i++) {
				const inp = inputKeyList[i].toLowerCase().trim();
				if (answers.includes(inp) && !this.usedKeys.includes(inp)) {
					this.keysMatched += 1;
					this.usedKeys.push(inputKeyList[i]);
				}
			}
			this.completed = true;
			if (this.testType == 'short') {
				useTestStore().addShortTermMemoryTestData({
					score: this.keysMatched
				});
			} else if (this.testType == 'long') {
				useTestStore().addLongTermMemoryTestData({
					score: this.keysMatched
				});
				this.pushDataToDB();
			}
		},
		async pushDataToDB() {
			const token = sessionStorage.getItem('jwtToken');
			if (!token) {
				console.error('User is not authenticated.');
				return;
			}

			const data = useTestStore().getData();
			const dataPacket = {
				userID: sessionStorage.getItem('userID'),
				timestamp: data.userDetailsData.date,
				device: data.userDetailsData.device,
				education: data.userDetailsData.education,
				emailID: data.userDetailsData.emailID,
				language: data.userDetailsData.language,
				locationOfExam: data.userDetailsData.locationOfExam,
				monthOfBirth: data.userDetailsData.monthOfBirth,
				yearOfBirth: data.userDetailsData.yearOfBirth,
				name: data.userDetailsData.name,
				consent: data.userDetailsData.consent,
				stroopTestScore: data.stroopTestData.stroopTestScore,
				stroopTestTime: data.stroopTestData.stroopTestTime,
				stroopCongruentAvgTime: data.stroopTestData.stroopCongruentAvgTime,
				stroopCongruentCorrect: data.stroopTestData.stroopCongruentCorrect,
				stroopCongruentIncorrect: data.stroopTestData.stroopCongruentIncorrect,
				stroopCongruentCorrectPercent: data.stroopTestData.stroopCongruentCorrectPercent,
				stroopCongruentIncorrectPercent: data.stroopTestData.stroopCongruentIncorrectPercent,
				stroopCongruentTotal: data.stroopTestData.stroopCongruentTotal,
				stroopIncongruentAvgTime: data.stroopTestData.stroopIncongruentAvgTime,
				stroopIncongruentCorrect: data.stroopTestData.stroopIncongruentCorrect,
				stroopIncongruentIncorrect: data.stroopTestData.stroopIncongruentIncorrect,
				stroopIncongruentCorrectPercent: data.stroopTestData.stroopIncongruentCorrectPercent,
				stroopIncongruentIncorrectPercent: data.stroopTestData.stroopIncongruentIncorrectPercent,
				stroopIncongruentTotal: data.stroopTestData.stroopIncongruentTotal,
				shortTermMemoryTestScore: data.shortTermMemoryTestData.score,
				longTermMemoryTestScore: data.longTermMemoryTestData.score,
				highestDigitSpan: data.digitSpanTestData.highestDigitSpan,
				digitSpanAveragePromptResponseTime: data.digitSpanTestData.performanceParameters.averagePromptResponseTime,
				highestReverseDigitSpan: data.reverseDigitSpanTestData.highestReverseDigitSpan,
				reverseDigitSpanAveragePromptResponseTime: data.reverseDigitSpanTestData.performanceParameters.averagePromptResponseTime,
				highestSequenceDigitSpan: data.sequenceDigitSpanData.highestSequenceDigitSpan,
				sequenceDigitSpanAveragePromptResponseTime: data.sequenceDigitSpanData.performanceParameters.averagePromptResponseTime,
				nBackTestScore: data.nBackTestData.nBackTestScore,
				nBackTestMatchTrialsAvgTime: data.nBackTestData.performanceParameters.matchTrialsAvgTime,
				nBackTestMatchTrialsCorrect: data.nBackTestData.performanceParameters.matchTrialsCorrect,
				nBackTestMatchTrialsIncorrect: data.nBackTestData.performanceParameters.matchTrialsIncorrect,
				nBackTestMatchTrialsCorrectPercent: data.nBackTestData.performanceParameters.matchTiralsCorrectPercent,
				nBackTestMatchTrialsIncorrectPercent: data.nBackTestData.performanceParameters.matchTrialsIncorrectPercent,
				nBackTestMatchTrialsTotal: data.nBackTestData.performanceParameters.macthTiralsTotal,
				nBackTestNonMatchTrialsAvgTime: data.nBackTestData.performanceParameters.nonMatchTrialsAvgTime,
				nBackTestNonMatchTrialsCorrect: data.nBackTestData.performanceParameters.nonMatchTrialsCorrect,
				nBackTestNonMatchTrialsIncorrect: data.nBackTestData.performanceParameters.nonMatchTrialsIncorrect,
				nBackTestNonMatchTrialsCorrectPercent: data.nBackTestData.performanceParameters.nonMatchTrialsCorrectPercent,
				nBackTestNonMatchTrialsIncorrectPercent: data.nBackTestData.performanceParameters.nonMatchTrialsIncorrectPercent,
				nBackTestNonMatchTrialsTotal: data.nBackTestData.performanceParameters.nonMatchTrialsTotal,
				nBackTestTotalAvgTime: data.nBackTestData.performanceParameters.totalAvgTime,
				nBackTestTotalCorrect: data.nBackTestData.performanceParameters.totalCorrect,
				nBackTestTotalIncorrect: data.nBackTestData.performanceParameters.totalIncorrect,
				nBackTestTotalCorrectPercent: data.nBackTestData.performanceParameters.totalCorrectPercent,
				nBackTestTotalIncorrectPercent: data.nBackTestData.performanceParameters.totalIncorrectPercent,
				nBackTestTotalTasks: data.nBackTestData.performanceParameters.totalTasks
			};
			try {
				const response = await axios.post(
					'https://learningwithiqplus.com/wp-json/custom/v1/memoryTestScore',
					{
						dataPacket: dataPacket
					},
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);
				console.log('Score saved:', response.data);
			} catch (error) {
				console.error('Failed to save score:', error);
			}
		}
	},
	mounted() {}
};
</script>

<style>
.long-term-memory-test-title {
	text-align: left;
	font-weight: bold;
}

.long-term-test-container {
	border: 5px black solid;
}

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}

.result-expected {
	text-align: left;
	padding-left: 25px;
}
</style>

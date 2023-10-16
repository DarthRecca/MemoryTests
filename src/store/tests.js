// Utilities
import { defineStore } from 'pinia';

export const useTestStore = defineStore('tests', {
	state: () => ({
		userDetailsData: {
			date: '',
			name: '',
			emailID: '',
			yearOfBirth: '',
			monthOfBirth: '',
			locationOfExam: '',
			education: '',
			device: '',
			language: '',
			consent: false
		},
		shortTermMemoryTestData: {
			score: 0
		},
		longTermMemoryTestData: {
			score: 0
		},
		digitSpanTestData: {
			highestDigitSpan: 0,
			performanceParameters: {
				averagePromptResponseTime: 0
			}
		},
		reverseDigitSpanTestData: {
			highestReverseDigitSpan: 0,
			performanceParameters: {
				averagePromptResponseTime: 0
			}
		},
		sequenceDigitSpanTestData: {
			highestSequenceDigitSpan: 0,
			performanceParameters: {
				averagePromptResponseTime: 0
			}
		},
		stroopTestData: {
			score: 0,
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
			totalTimeTaken: 0
		},
		nBackTestData: {
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
			},
			score: 0
		}
	}),
	actions: {
		addNBackTestData(data) {
			this.nBackTestData = data;
		},
		addDigitSpanTestData(data) {
			this.digitSpanTestData = data;
		},
		addReverseDigitSpanTestData(data) {
			this.reverseDigitSpanTestData = data;
		},
		addSequenceDigitSpanTestData(data) {
			this.sequenceDigitSpanTestData = data;
		},
		addStroopTestData(data) {
			this.stroopTestData = data;
		},
		addFormData(data) {
			this.userDetailsData = data;
		},
		addLongTermMemoryTestData(data) {
			this.longTermMemoryTestData = data;
		},
		addShortTermMemoryTestData(data) {
			this.shortTermMemoryTestData = data;
		},
		getStroopTestData() {
			return this.stroopTestData;
		},
		getDigitSpanTestData() {
			return this.digitSpanTestData;
		},
		getReverseDigitSpanTestData() {
			return this.reverseDigitSpanTestData;
		},
		getSequenceDigitSpanTestData() {
			return this.sequenceDigitSpanTestData;
		},
		getNBackTestData() {
			return this.nBackTestData;
		},
		getUserDetailsData() {
			return this.userDetailsData;
		},
		getLongTermMemoryTestData() {
			return this.longTermMemoryTestData;
		},
		getShortTermMemoryTestData() {
			return this.shortTermMemoryTestData;
		},
		getData() {
			return {
				userDetailsData: this.userDetailsData,
				digitSpanTestData: this.digitSpanTestData,
				reverseDigitSpanTestData: this.reverseDigitSpanTestData,
				sequenceDigitSpanTestData: this.sequenceDigitSpanTestData,
				stroopTestData: this.stroopTestData,
				nBackTestData: this.nBackTestData,
				shortTermMemoryTestData: this.shortTermMemoryTestData,
				longTermMemoryTestData: this.longTermMemoryTestData
			};
		}
	}
});

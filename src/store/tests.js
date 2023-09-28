// Utilities
import { defineStore } from 'pinia';

export const useTestStore = defineStore('tests', {
	state: () => ({
		userDetailsData: {
			name: '',
			emailID: '',
			age: '',
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
			individualPromptData: [],
			highestDigitSpan: 0
		},
		stroopTestData: {
			score: 0,
			individualPromptData: [],
			performanceParameters: {
				congruentTotal: 0,
				incongruentTotal: 0,
				congruentCorrect: 0,
				incongruentCorrect: 0,
				congruentIncorrect: 0,
				incongruentIncorrect: 0,
				congruentAvgTime: 0,
				incongruentAvgTime: 0,
				totalTasks: 0,
				totalCorrect: 0,
				totalIncorrect: 0,
				totalAvgTime: 0
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
				nonMatchTrialsTotal: 0,
				nonMatchTrialsCorrect: 0,
				nonMatchTrialsIncorrect: 0,
				nonMatchTrialsCorrectPercent: 0,
				nonMatchTrialsIncorrectPercent: 0,
				totalTasks: 0,
				totalCorrect: 0,
				totalIncorrect: 0,
				totalCorrectPercent: 0,
				totalIncorrectPercent: 0
			},
			individualPromptData: [],
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
		addStroopTestData(data) {
			this.stroopTestData = data;
		},
		addFormData(data) {
			this.userDetailsData = data;
		},
		getStroopTestData() {
			return this.stroopTestData;
		},
		getDigitSpanTestData() {
			return this.digitSpanTestData;
		},
		getNBackTestData() {
			return this.nBackTestData;
		},
		getData() {
			return {
				userDetailsData: this.userDetailsData,
				digitSpanTestData: this.digitSpanTestData,
				stroopTestData: this.stroopTestData,
				nBackTestData: this.nBackTestData,
				shortTermMemoryTestData: this.shortTermMemoryTestData,
				longTermMemoryTestData: this.longTermMemoryTestData
			};
		}
	}
});

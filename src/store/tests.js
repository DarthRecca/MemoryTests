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
		longTermMemoryTestData: {
			longTermMemoryTesScore: 0
		},
		digitSpanTestData: {
			individualPromptData: [],
			highestDigitSpan: 0
		},
		stroopTestData: {
			score: 0,
			individualPromptData: [],
			totalTimeTaken: 0
		},
		nBackTestData: {
			individualPromptData: [],
			nBackTestScore: 0
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
		}
	}
});

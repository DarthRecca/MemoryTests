<template>
	<div class="report-title">
		<h3>Consolidated Report</h3>
		<br />
	</div>
	<div class="report">
		<v-table>
			<thead>
				<tr>
					<th>Test</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Short Term Memory Words Recalled Correctly(out of 10)</td>
					<td>{{ this.data.shortTermMemoryTestData.score }}</td>
				</tr>
				<tr>
					<td>Maximum length of digits that you can remember (Digit Span)</td>
					<td>{{ this.data.sequenceDigitSpanTestData.highestSequenceDigitSpan }}</td>
				</tr>
				<tr>
					<td>Maximum length of digits that you can remember in Reverse order (Reverse Digit Span)</td>
					<td>{{ this.data.sequenceDigitSpanTestData.highestSequenceDigitSpan }}</td>
				</tr>
				<tr>
					<td>Maximum length of digits that you can remember and organise in Order(Ascending Order)</td>
					<td>{{ this.data.sequenceDigitSpanTestData.highestSequenceDigitSpan }}</td>
				</tr>
				<tr>
					<td>Your Stroop Score (Incongruent Avg Time - Congruent Avg Time)</td>
					<td>{{ this.data.stroopTestData.testScore }} ms</td>
				</tr>
				<tr>
					<td>NBack Test Trials Correct Percentage(for trials that had a match)</td>
					<td>{{ this.data.nBackTestData.performanceParameters.matchTrialsCorrectPercent }} %</td>
				</tr>
				<tr>
					<td>Shape Digit Coding Test Score</td>
					<td>{{ this.data.shapeDigitCodeTestData.shapeDigitCodeTestScore }}</td>
				</tr>
				<tr>
					<td>Long Term Memory Test Words Recalled Correctly(out of 10)</td>
					<td>{{ this.data.longTermMemoryTestData.score }}</td>
				</tr>
			</tbody>
		</v-table>
	</div>
	<br />
	<div class="next-button">
		<v-btn to="/endscreen" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
	</div>
</template>

<script>
import { useTestStore } from '@/store/tests';

export default {
	name: 'ConsolidatedReportView',
	data() {
		return {
			data: {
				userDetailsData: {
					date: '',
					name: '',
					gender: '',
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
					testScore: 0,
					performanceParameters: {
						congruentTotal: 0,
						incongruentTotal: 0,
						congruentCorrect: 0,
						incongruentCorrect: 0,
						congruentIncorrect: 0,
						incongruentIncorrect: 0,
						congruentAvgTime: 0,
						incongruentAvgTime: 0,
						congruentCorrectPercent: 0,
						incongruentCorrectPercent: 0,
						congruentIncorrectPercent: 0,
						incongruentIncorrectPercent: 0
					},
					totalTestTime: 0
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
					nBackTestScore: 0
				},
				shapeDigitCodeTestData: {
					shapeDigitCodeTestScore: 0,
				}
			}
		};
	},
	methods: {
		getData() {
			this.data = useTestStore().getData();
		}
	},
	mounted() {
		this.getData();
	}
};
</script>
<style>
.report-title {
	align-items: center;
	text-align: center;
	font-size: 50px;
}

.title {
	align-items: center;
	text-align: center;
	font-size: 30px;
}

table {
	border: 3px solid black;
	background-color: aquamarine;
	overflow-x: auto;
}

tr {
	padding: 0px;
}

th {
	border: 1px solid black;
	font-weight: bold;
	background-color: aqua;
	padding: 0px;
}

td {
	border: 1px solid black;
	padding: 0px;
}

.report {
	align-items: center;
	font-size: 20px;
}

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}
</style>

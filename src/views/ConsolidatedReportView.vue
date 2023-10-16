<template>
	<div class="report-title">
		<h3>Consolidated Report</h3>
		<br />
		<div class="short-term-report">
			<div class="title">
				<p>Short Term Memory Test</p>
			</div>
			<br />
			<v-table>
				<tbody>
					<tr>
						<td>Total Number of Words Recalled Correctly(out of 10)</td>
						<td>{{ this.data.shortTermMemoryTestData.score }}</td>
					</tr>
				</tbody>
			</v-table>
		</div>
		<br />
		<div class="digit-span-report">
			<div class="title">
				<p>Digit Span Test</p>
			</div>
			<br />
			<v-table>
				<tbody>
					<tr>
						<td>Maximum length of digits that you can remember (Digit Span)</td>
						<td>{{ this.data.sequenceDigitSpanTestData.highestSequenceDigitSpan }}</td>
					</tr>
				</tbody>
			</v-table>
		</div>
		<br />
		<div class="reverse-digit-span-report">
			<div class="title">
				<p>Reverse Digit Span Test</p>
			</div>
			<br />
			<v-table>
				<tbody>
					<tr>
						<td>Maximum length of digits that you can remember in Reverse order (Reverse Digit Span)</td>
						<td>{{ this.data.sequenceDigitSpanTestData.highestSequenceDigitSpan }}</td>
					</tr>
				</tbody>
			</v-table>
		</div>
		<br />
		<div class="sequence-digit-span-report">
			<div class="title">
				<p>Ordered Digit Span Test</p>
			</div>
			<br />
			<v-table>
				<tbody>
					<tr>
						<td>Maximum length of digits that you can remember and organise in Order(Ascending Order)</td>
						<td>{{ this.data.sequenceDigitSpanTestData.highestSequenceDigitSpan }}</td>
					</tr>
				</tbody>
			</v-table>
		</div>
		<br />
		<div class="stroop-report">
			<div class="title">
				<p>Stroop Test</p>
			</div>
			<br />
			<v-table>
				<tbody>
					<tr>
						<td>Your Stroop Score (Incongruent Avg Time - Congruent Avg Time)</td>
						<td>{{ this.data.stroopTestData.testScore }}ms</td>
					</tr>
				</tbody>
			</v-table>
		</div>
		<br />
		<div class="nback-report">
			<div class="title">
				<p>N-Back Test</p>
			</div>
			<br />
			<v-table>
				<thead>
					<tr>
						<th></th>
						<th style="text-align: center">%age of correct tasks</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<b>Trials that had match</b>
						</td>
						<td>
							{{ this.data.nBackTestData.performanceParameters.matchTrialsCorrectPercent }}
						</td>
					</tr>
					<tr>
						<td>
							<b>Trials that had no match</b>
						</td>
						<td>
							{{ this.data.nBackTestData.performanceParameters.nonMatchTrialsCorrectPercent }}
						</td>
					</tr>
					<tr>
						<td>
							<b>Total of trials</b>
						</td>
						<td>
							{{ this.data.nBackTestData.performanceParameters.totalCorrectPercent }}
						</td>
					</tr>
				</tbody>
			</v-table>
		</div>
		<br />
		<div class="long-term-report">
			<div class="title">
				<p>Long Term Memory Test</p>
			</div>
			<br />
			<v-table>
				<tbody>
					<tr>
						<td>Total Number of Words Recalled Correctly(out of 10)</td>
						<td>{{ this.data.longTermMemoryTestData.score }}</td>
					</tr>
				</tbody>
			</v-table>
		</div>
		<br />
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
						congruentCorrectPercent: 0,
						incongruentCorrectPercent: 0,
						congruentIncorrectPercent: 0,
						incongruentIncorrectPercent: 0,
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
	border: 1px solid;
	border-collapse: collapse;
	text-align: center;
	background-color: teal;
	overflow-x: auto;
}

.short-term-report {
	align-items: center;
	text-align: center;
	font-size: 20px;
}

.digit-span-report {
	align-items: center;
	text-align: center;
	font-size: 20px;
}

.reverse-digit-span-report {
	align-items: center;
	text-align: center;
	font-size: 20px;
}

.sequence-digit-span-report {
	align-items: center;
	text-align: center;
	font-size: 20px;
}

.stroop-report {
	align-items: center;
	text-align: center;
	font-size: 20px;
}

.nback-report {
	align-items: center;
	text-align: center;
	font-size: 20px;
}

.long-term-report {
	align-items: center;
	text-align: center;
	font-size: 20px;
}

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}
</style>

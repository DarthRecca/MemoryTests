<template>
	<div class="report-title">
		<h3>Consolidated Report</h3>
		<br />
	</div>
	<div>
		<v-btn @click="exportToPDF()" color="black" rounded="0" prepend-icon="mdi-download">Download PDF Report</v-btn>
	</div>
	<div class="report" ref="report" id="report">
		<center>
			<img src="/src/assets/header_consolidated_reults.png" class="img-header" />
			<p><span class="title">Result of the memory test based on computer analysis</span></p>
			<br />
			<table>
				<tr>
					<td class="type-field" colspan="1">Name</td>
					<td class="value-field" colspan="2">{{ this.data.userDetailsData.name }}</td>
				</tr>
				<tr>
					<td class="type-field" colspan="1">Email ID</td>
					<td class="value-field" colspan="2">{{ this.data.userDetailsData.emailID }}</td>
				</tr>
				<tr>
					<td class="type-field" colspan="1">Gender</td>
					<td class="value-field" colspan="2">{{ this.data.userDetailsData.gender }}</td>
				</tr>
				<tr class="divider-1">
					<td colspan="3"></td>
				</tr>
				<tr>
					<td class="type-field" colspan="3">Please note this is a result of a computerized memory test. This is NOT a medical diagnosis</td>
				</tr>
				<tr>
					<td class="type-field" colspan="3">कृपया लक्षात घ्या की हा संगणकीकृत मेमरी चाचणीचा निकाल आहे. हा निकाल म्हणजे वैद्यकीय निदान नाही</td>
				</tr>
				<tr>
					<td class="type-field" colspan="3">कृपया ध्यान दें कि यह आपके संगणक द्वारे किया हुआ मेमरी टेस्ट का परिणाम है। यह परिणाम वैद्यकीय निदान नहीं है।</td>
				</tr>
				<tr class="divider-2">
					<td colspan="3"></td>
				</tr>
				<tr>
					<td class="head-field">Assessment</td>
					<td class="head-field">Observations Based on Computer Analysis of your responses</td>
					<td class="head-field">Expected Results</td>
				</tr>
				<tbody>
					<tr>
						<td class="type-field">Short Term Memory Test</td>
						<td class="value-field">You recalled {{ this.data.shortTermMemoryTestData.score }} words correctly out of 10</td>
						<td class="value-field" rowspan="2">
							Age group 12 to 20: around 7 to 8<br />
							Age group 20 to 60: around 6-7<br />
							Age group 60+: around 5 to 6
						</td>
					</tr>
					<tr>
						<td class="type-field">Long Term Memory Test</td>
						<td class="value-field">You recalled {{ this.data.longTermMemoryTestData.score }} words correctly out of 10</td>
					</tr>
					<tr class="stroop-results">
						<td class="type-field">Stroop Test(for Inhibition Control)</td>
						<td class="value-field">Your Stroop Score (Incongruent Avg Time - Congruent Avg Time) is {{ this.data.stroopTestData.testScore }} ms</td>
						<td class="value-field">
							Age group 12 to 20: 50-200 ms<br />
							Age group 20 to 60: 75-250 ms<br />
							Age group 60+: 200-300 ms
						</td>
					</tr>
					<tr class="nback-results">
						<td class="type-field">N-2 Back test(for Working Memory)</td>
						<td class="value-field">Your Percentage of correct tasks in trials that had match was {{ this.data.nBackTestData.performanceParameters.matchTrialsCorrectPercent }}%</td>
						<td class="value-field">
							Age group 12 to 20: 60-80 % <br />
							Age group 20 to 60: 80-90 %<br />
							Age group 60+: 70-80 %
						</td>
					</tr>
					<tr>
						<td class="type-field">Shape Digit Coding(for measuring Processing Speed)</td>
						<td class="value-field">Number of shapes correctly coded in 2 mins by you was {{ this.data.shapeDigitCodeTestData.shapeDigitCodeTestScore }}</td>
						<td class="value-field">40+</td>
					</tr>
					<tr>
						<td class="type-field">Digit Span Test(for Short Term Memory)</td>
						<td class="value-field">Maximum length of digits that you can remember {{ this.data.digitSpanTestData.highestDigitSpan }}</td>
						<td class="value-field">5 to 9</td>
					</tr>
					<tr>
						<td class="type-field">Reverse Digit Span Test(for Short Term Memory and Working Memory)</td>
						<td class="value-field">Maximum length of digits that you can remember in REVERSE order (REVERSE Digit Span) is {{ this.data.reverseDigitSpanTestData.highestReverseDigitSpan }}</td>
						<td class="value-field" rowspan="2">4 to 8</td>
					</tr>
					<tr class="sequence-digit-span-results">
						<td class="type-field">Ordered Digit Span Test(for Short Term Memory and Working Memory)</td>
						<td class="value-field">Maximum length of digits that you can remember and organize in ascending order is {{ this.data.sequenceDigitSpanTestData.highestSequenceDigitSpan }}</td>
					</tr>
				</tbody>
				<tfoot class="footer">
					<tr class="footer-1">
						<td class="foot-field" colspan="3">
							It is well-known that you can improve your memory and other brain functions by training the brain.<br />
							The best part of this memory test is, it also serves as a <b>Brain Trainer</b>.<br />
							Practice the test every alternate day to improve your score and brain function.
						</td>
					</tr>
					<tr>
						<td class="value-field" colspan="3"><b>Do you have less score than expected results?</b><br />Do not be panic. The number can vary depending on the age, attention, overall mind health and memory strategies. You can take the test many times. Consult the expert if your results are consistently low.</td>
					</tr>
					<tr>
						<td class="value-field" colspan="3"><b>तुमचा निकाल अपेक्षित निकालापेक्षा कमी आहे का?</b><br />काळजी नको. तुमचा निकाल तुमचे वय, दिलेले लक्ष, एकूणच मनाचे आरोग्य आणि स्मरण करण्याचे धोरण यानुसार संख्या बदलू शकतात. परत टेस्ट द्या आणि जर निकाल नेहमीच कमी असतील तर तज्ज्ञांचा सल्ला घ्या.</td>
					</tr>
					<tr>
						<td class="value-field" colspan="3"><b>क्या आपका परिणाम अपेक्षित परिणाम से कम है?</b><br />चिंता मत करो. आपके परिणाम आपकी उम्र, दिया हुआ ध्यान, समग्र दिमागी स्वास्थ्य और स्मृति रणनीतियों के आधार पर भिन्न हो सकती है। दोबारा परीक्षण करे और यदी परिणाम लगातार कम आ रहे हैं, तो किसी विशेषज्ञ से परामर्श लें।</td>
					</tr>
					<tr class="divider-3">
						<td colspan="3" class="value-field"></td>
					</tr>
					<tr>
						<td class="value-field" colspan="3">
							<p>Want to test your intelligence? Save the link below and take the test when you have time. (40 min)</p>
							<a href="https://forms.gle/TVUcM3dNiFLZA85B8">https://forms.gle/TVUcM3dNiFLZA85B8</a>
						</td>
					</tr>
				</tfoot>
			</table>
		</center>
		<br />
	</div>
	<br />
	<div class="next-button">
		<v-btn to="/endscreen" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
	</div>
</template>

<script>
import { useTestStore } from '@/store/tests';
import html2pdf from 'html2pdf.js';
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
					shapeDigitCodeTestScore: 0
				}
			}
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
		getData() {
			this.data = useTestStore().getData();
		},
		exportToPDF() {
			var opt = {
				margin: 1,
				filename: 'Report_' + this.data.userDetailsData.name + '.pdf',
				pagebreak: {
					before: ['.stroop-results', '.footer-1']
				},
				image: {
					quality: 1,
					type: 'png'
				}
			};
			html2pdf().set(opt).from(document.getElementById('report')).save();
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
	font-weight: bold;
}

.img-header {
	border: 3px solid black;
	max-width: 95%;
}

table {
	border: 3px solid black;
	border-collapse: collapse;
	overflow-x: auto;
	max-width: 95%;
	width: auto;
}

tr {
	padding: 0px;
}

td {
	padding: 10px;
	text-align: left;
	border: 1px solid black;
}

.head-field {
	background-color: #339499;
	font-weight: bold;
}

.foot-field {
	background-color: #339499;
	text-align: center;
}

.type-field {
	background-color: #05c7b0;
	width: 25%;
}

.value-field {
	background-color: white;
}

.blank-row {
	height: 10px;
}

.blank-cell {
	background-color: white;
}

.mobile-img {
	width: 120px;
	height: 120px;
}

.not-mobile-img {
	width: fit-content;
	height: fit-content;
}

.report {
	border: 5px black solid;
	align-items: center;
	font-size: 20px;
}

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}
</style>

<template>
	<v-container>
		<v-sheet color="teal-lighten-3" class="detail-form">
			<div>
				<h2>Test of Intelligence - Memory Function<br /></h2>
				<br />
			</div>
			<div>
				<p>
					This module is a battery of tests that assess different aspects of memory, such as short-term memory,
					long-term memory, attention Span, inhibition Control, working memory, Processing Speed etc.<br />
					The test is developed and validated especially for Indian culture.<br />
					The test is conducted online and is a fully automated computerised solution to test the memory.<br />
					No manual intervention in conducting the test nor in analysing the results is involved.<br />
					Please provide your information below so that we can compare your results to those
					of other people of your age and education level and let you know where do you
					stand.<br />
					You will also have to provide a consent to taking the test.<br />
				</p>
			</div>
			<v-form>
				<v-text-field v-model="name" label="Name(Optional)" hide-details="auto" persistent-hint
					hint="You can enter a dummy name"></v-text-field>
				<v-text-field v-model="emailId" label="Email-ID" required></v-text-field>
				<v-radio-group v-model="gender" required>
					Gender
					<v-radio label="Male" value="male"></v-radio>
					<v-radio label="Female" value="female"></v-radio>
					<v-radio label="Prefer Not to Say" value="undisclosed"></v-radio>
				</v-radio-group>
				<v-text-field v-model="age" required>
					<v-label>Age</v-label>
				</v-text-field>
				<v-text-field v-model="locationOfExam">
					<v-label>Place from where you are giving the test</v-label>
				</v-text-field>
				<v-select v-model="education" label="Education Completed" :items="edItems" required></v-select>
				<v-select v-model="device" label="Which device are you using" :items="devItems" required></v-select>

				<v-radio-group v-model="language">
					Language Preffered
					<v-radio label="English" value="english"></v-radio>
					<v-radio label="English/Marathi" value="marathi" disabled></v-radio>
					<v-radio label="English/Hindi" value="hindi" disabled></v-radio>
				</v-radio-group>
				Please read carefully and give your consent to following:<br />
				<ol type="a">
					<li>I understand this is a psychological test to test the memory and intelligence related functions and
						I am voluntarily participating in this assessment.</li>
					<li>I fully understand that this is an online test and the results are NOT an expert opinion or a
						medical diagnosis. I understand the results will be produced by the computerized analysis of my own
						responses and there is no human involved in analysing / preparing the outcome.</li>
					<li>I have been assured that my answers and results will remain confidential and my individual results
						will NOT be shared with my institute (school / college), employer or my parents.</li>
					<li>I understand the results will be used for researchers or Psychology experts without my Name,
						identity or other personal details. If I give consent, they may give me the counselling service on
						how to improve my memory function or intelligence.</li>
					<li>I am aware that the outcome of this exercise entirely depends on how honestly, I answer the
						questions and give the test. I also understand that the outcome of the test depends on my current
						state of mind, my freshness and my overall health.</li>
				</ol>
				<v-checkbox v-model="consent" label="I am giving my consent to this assessment by checking in this box"
					required></v-checkbox>
			</v-form>
			<v-btn @click="formCompleted()">Next</v-btn>
		</v-sheet>
	</v-container>
</template>

<script>
import { useTestStore } from '@/store/tests';

export default {
	name: 'DetailsForm',
	data() {
		return {
			name: '',
			emailId: '',
			gender: '',
			age: '',
			locationOfExam: '',
			device: '',
			education: '',
			edItems: ['10th Standard', '12th Standard', 'Diploma', 'First Year of any Graduation', 'Second Year of any Graduation', 'Third Year of any Graduation', 'Fourth Year of any Graduation', 'Graduation Complete', 'Post Graduate', 'PhD'],
			devItems: ['Phone', 'Tablet', 'Laptop', 'Desktop'],
			language: '',
			consent: false
		};
	},
	computed: {},
	methods: {
		formCompleted() {
			useTestStore().addFormData({
				date: Date(),
				name: this.name,
				emailID: this.emailId,
				age: this.age,
				locationOfExam: this.locationOfExam,
				education: this.education,
				language: this.language,
				consent: this.consent
			});
			this.$router.push('/longtermmemorytest/short');
		}
	},
	mounted() { }
};
</script>

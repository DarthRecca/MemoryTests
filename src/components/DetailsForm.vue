<template>
	<v-container>
		<v-sheet color="teal-lighten-3" class="detail-form">
			<div>
				<h2>Test of Intelligence - Memory Function<br /></h2>
				<br />
			</div>
			<div>
				<p>
					This module is a battery of tests that assess different aspects of memory, such as short-term memory, long-term memory, attention Span, inhibition Control, working memory, Processing Speed etc.<br />
					The test is developed and validated especially for Indian culture.<br />
					The test is conducted online and is a fully automated computerised solution to test the memory.<br />
					No manual intervention in conducting the test nor in analysing the results is involved.<br />
					Please provide your information below so that we can compare your results to those of other people of your age and education level and let you know where do you stand.<br />
					You will also have to provide a consent to taking the test.<br />
				</p>
				<br />
			</div>
			<br />
			<v-form validate-on="submit">
				<v-text-field v-model="name" label="Name" hide-details="auto" persistent-hint hint="You can enter a dummy name" :rules="[rules.required]" variant="solo"></v-text-field>
				<v-text-field v-model="emailId" label="Email-ID" :rules="[rules.required]" hint="This email will be used to send report of test" variant="solo"></v-text-field>
				<v-radio-group v-model="gender">
					Gender
					<v-radio label="Male" value="male"></v-radio>
					<v-radio label="Female" value="female"></v-radio>
					<v-radio label="Prefer Not to Say" value="undisclosed"></v-radio>
				</v-radio-group>
				<v-text-field v-model="yearOfBirth" label="Year of Birth" :rules="[rules.required]" variant="solo"></v-text-field>
				<v-select v-model="monthOfBirth" label="Month of Birth" :rules="[rules.required]" :items="months" variant="solo"> </v-select>
				<v-text-field v-model="locationOfExam" label="Place from where you are giving the test" variant="solo"> </v-text-field>
				<v-select v-model="education" label="Education Completed" :items="edItems" :rules="[rules.required]" variant="solo"></v-select>
				<v-select v-model="device" label="Which device are you using" :items="devItems" :rules="[rules.required]" variant="solo"></v-select>

				<v-radio-group v-model="language">
					Language Preffered
					<v-radio label="English" value="english"></v-radio>
					<v-radio label="English/Marathi(WIP)" value="marathi" disabled></v-radio>
					<v-radio label="English/Hindi(WIP)" value="hindi" disabled></v-radio>
				</v-radio-group>
				Please read carefully and give your consent to following:<br />
				<ol type="a">
					<li>I understand this is a psychological test to test the memory and intelligence related functions and I am voluntarily participating in this assessment.</li>
					<li>I fully understand that this is an online test and the results are NOT an expert opinion or a medical diagnosis. I understand the results will be produced by the computerized analysis of my own responses and there is no human involved in analysing / preparing the outcome.</li>
					<li>I have been assured that my answers and results will remain confidential and my individual results will NOT be shared with my institute (school / college), employer or my parents.</li>
					<li>I understand the results will be used by researchers or Psychology experts without my Name, identity or other personal details. If I give consent, they may give me the counselling service on how to improve my memory function or intelligence.</li>
					<li>I am aware that the outcome of this exercise entirely depends on how honestly, I answer the questions and give the test. I also understand that the outcome of the test depends on my current state of mind, my freshness and my overall health.</li>
				</ol>
				<v-checkbox v-model="consent" label="I am giving my consent to this assessment by checking in this box" :rules="[rules.required]" color="black"></v-checkbox>
			</v-form>
			<div class="next-button">
				<v-btn type="submit" size="x-large" block color="red-lighten-3" rounded="lg" @click="this.formCompleted()">Next</v-btn>
			</div>
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
			yearOfBirth: '',
			monthOfBirth: '',
			locationOfExam: '',
			device: '',
			education: '',
			edItems: ['10th Standard Complete', '12th Standard Complete', 'Diploma Complete(Any)', 'First Year of any Graduation Complete(Any)', 'Second Year of any Graduation Complete(Any)', 'Third Year of any Graduation Complete(Any)', 'Graduation Complete(Any)', 'Post Graduate Complete(Any)', 'PhD Complete(Any)'],
			devItems: ['Phone', 'Tablet', 'Laptop', 'Desktop'],
			months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			language: '',
			consent: false,
			rules: {
				required: (value) => !!value || 'Required.'
			}
		};
	},
	computed: {},
	methods: {
		formCompleted() {
			if (this.name == '') {
				alert('Please enter a Name. A dummy name may be used.');
				return false;
			}
			if (this.emailId == '') {
				alert('Please enter an email-ID.');
				return false;
			}
			if (this.gender == '') {
				alert('Please choose a gender option');
				return false;
			}
			if (this.yearOfBirth == '') {
				alert('Please enter your Birth Year.');
				return false;
			}
			if (this.monthOfBirth == '') {
				alert('Please enter your Birth Month.');
				return false;
			}
			if (this.locationOfExam == '') {
				alert('Please enter the location where you are giving this exam from.');
				return false;
			}
			if (this.device == '') {
				alert('Please enter the type of device you are using');
				return false;
			}
			if (this.education == '') {
				alert('Please select your highest education level.');
				return false;
			}
			if (this.consent == false) {
				alert('Please give your consent to give this test.');
				return false;
			}

			useTestStore().addFormData({
				date: Date(),
				name: this.name,
				emailID: this.emailId,
				yearOfBirth: this.yearOfBirth,
				monthOfBirth: this.monthOfBirth,
				locationOfExam: this.locationOfExam,
				education: this.education,
				language: this.language,
				device: this.device,
				consent: this.consent
			});
			this.$router.push('/longtermmemorytest/short');
		}
	},
	mounted() {}
};
</script>

<style>
.detail-form {
	padding: 5px;
}

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}
</style>

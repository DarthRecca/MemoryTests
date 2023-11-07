<template>
	<v-container>
		<v-sheet color="teal-lighten-3" class="detail-form">
			<div>
				<h2>Test of Intelligence - Memory Function<br /></h2>
				<br />
				{{ $t('detailsform.note') }}
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
			<v-form>
				<v-text-field v-model="name" label="Name" hide-details="auto" persistent-hint hint="You can enter a dummy name" :rules="[rules.required]" variant="solo"></v-text-field>
				<v-text-field v-model="emailId" label="Email-ID" :rules="[rules.required]" hint="This email will be used to send report of test" variant="solo"></v-text-field>
				<v-radio-group v-model="gender">
					Gender
					<v-radio label="Male" value="male"></v-radio>
					<v-radio label="Female" value="female"></v-radio>
					<v-radio label="Prefer Not to Say" value="undisclosed"></v-radio>
				</v-radio-group>
				<v-select v-model="yearOfBirth" label="Year of Birth" :rules="[rules.required]" :items="years" variant="solo"> </v-select>
				<v-select v-model="monthOfBirth" label="Month of Birth" :rules="[rules.required]" :items="months" variant="solo"> </v-select>
				<v-text-field v-model="locationOfExam" label="Place from where you are giving the test" variant="solo"> </v-text-field>
				<v-select v-model="education" label="Education Completed" :items="edItems" :rules="[rules.required]" variant="solo"></v-select>
				<v-select v-model="device" label="Which device are you using" :items="devItems" :rules="[rules.required]" variant="solo"></v-select>

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
				<v-btn size="x-large" block color="red-lighten-3" rounded="lg" @click="this.formCompleted()" :loading="dialog"> Next </v-btn>
			</div>
			<v-dialog v-model="this.dialog" :scrim="false">
				<v-card title="Form Validation">
					<v-card-text>
						<div v-if="!this.formCompletedFlags.name">
							<p>Please enter a Name. A dummy name may be used<br /></p>
						</div>
						<div v-if="!this.formCompletedFlags.email">
							<p>Please enter an email-ID<br /></p>
						</div>
						<div v-if="!this.formCompletedFlags.gender">
							<p>Please choose a gender option<br /></p>
						</div>
						<div v-if="!this.formCompletedFlags.year">
							<p>Please enter your Birth Year<br /></p>
						</div>
						<div v-if="!this.formCompletedFlags.month">
							<p>Please enter your Birth Month<br /></p>
						</div>
						<div v-if="!this.formCompletedFlags.location">
							<p>Please enter the location where you are giving this exam from<br /></p>
						</div>
						<div v-if="!this.formCompletedFlags.device">
							<p>Please enter the type of device you are using<br /></p>
						</div>
						<div v-if="!this.formCompletedFlags.education">
							<p>Please select your highest education level<br /></p>
						</div>
						<div v-if="!this.formCompletedFlags.consent">
							<p>Please give your consent to give this test<br /></p>
						</div>
					</v-card-text>
				</v-card>
			</v-dialog>
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
			years: [],
			language: '',
			consent: false,
			rules: {
				required: (value) => !!value || 'Required.'
			},
			formCompletedFlags: {
				name: false,
				email: false,
				gender: false,
				year: false,
				month: false,
				location: false,
				device: false,
				education: false,
				consent: false
			},
			dialog: false
		};
	},
	computed: {},
	methods: {
		formCompleted() {
			this.dialog = true;

			if (this.name == '') {
				this.formCompletedFlags.name = false;
				return false;
			} else {
				this.formCompletedFlags.name = true;
			}
			if (this.emailId == '') {
				this.formCompletedFlags.email = false;
				return false;
			} else {
				this.formCompletedFlags.email = true;
			}
			if (this.gender == '') {
				this.formCompletedFlags.gender = false;
				return false;
			} else {
				this.formCompletedFlags.gender = true;
			}
			if (this.yearOfBirth == '') {
				this.formCompletedFlags.year = false;
				return false;
			} else {
				this.formCompletedFlags.year = true;
			}
			if (this.monthOfBirth == '') {
				this.formCompletedFlags.month = false;
				return false;
			} else {
				this.formCompletedFlags.month = true;
			}
			if (this.locationOfExam == '') {
				this.formCompletedFlags.location = false;
				return false;
			} else {
				this.formCompletedFlags.location = true;
			}
			if (this.device == '') {
				this.formCompletedFlags.device = false;
				return false;
			} else {
				this.formCompletedFlags.device = true;
			}
			if (this.education == '') {
				this.formCompletedFlags.education = false;
				return false;
			} else {
				this.formCompletedFlags.education = true;
			}
			if (this.consent == false) {
				this.formCompletedFlags.consent = false;
				return false;
			} else {
				this.formCompletedFlags.consent = true;
			}
			if (this.formCompletedFlags.name && this.formCompletedFlags.email && this.formCompletedFlags.gender && this.formCompletedFlags.year && this.formCompletedFlags.month && this.formCompletedFlags.location && this.formCompletedFlags.device && this.formCompletedFlags.education && this.formCompletedFlags.consent) {
				this.dialog = false;
			} else {
				this.dialog = true;
				return false;
			}
			useTestStore().addFormData({
				date: Date(),
				name: this.name,
				gender: this.gender,
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
	mounted() {
		const arrayRange = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);

		this.years = arrayRange(1950, 2020, 1);
	}
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

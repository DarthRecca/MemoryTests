<template>
	<v-container>
		<div v-if="!this.completed">
			<p>
				Recall the words you were shown in the previously and enter in following boxes one by one.<br />
				You can enter in any order (sequence).<br />
				Try entering them as accurately as possible but a minor spelling mistake will be accommodated.<br />
			</p>
			<br />
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.first" label="Enter Here"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.second" label="Enter Here"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.third" label="Enter Here"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.fourth" label="Enter Here"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.fifth" label="Enter Here"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.sixth" label="Enter Here"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.seventh" label="Enter Here"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.eighth" label="Enter Here"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.ninth" label="Enter Here"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.tenth" label="Enter Here"></v-text-field>
				</v-col>
			</v-row>
			<v-btn @click="this.checkKeys()" size="x-large" block color="red-lighten-3" rounded="lg">Submit</v-btn>
		</div>
		<div v-if="this.completed" class="completed">
			<h3>Total Number of Words Recalled Correctly(out of 10): {{ this.keysMatched }}</h3>
			<br />
			<br />
			<v-btn to="/digitspantest" v-if="this.testType == 'short'" size="x-large" block color="red-lighten-3"
				rounded="lg">Next</v-btn>
			<v-btn to="/endscreen" v-if="this.testType == 'long'" size="x-large" block color="red-lighten-3"
				rounded="lg">Finish</v-btn>
		</div>
	</v-container>
</template>

<script>
import { useTestStore } from '@/store/tests';

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
			const answers = this.answerKeys.map(word => word.toLowerCase())
			inputKeyList.push(this.keys.first, this.keys.second, this.keys.third, this.keys.fourth, this.keys.fifth, this.keys.sixth, this.keys.seventh, this.keys.eighth, this.keys.ninth, this.keys.tenth);
			for (let i = 0; i < inputKeyList.length; i++) {
				const inp = inputKeyList[i].toLowerCase()
				if (answers.includes(inp)) {
					this.keysMatched += 1;
				}
			}
			this.completed = true;
			if (this.testType == "short") {
				useTestStore().addshortTermMemoryTestData({
					score: this.keysMatched
				})
			} else if (this.testType == "long") {
				useTestStore().addLongTermMemoryTestData({
					score: this.keysMatched
				})
			}
		}
	},
	mounted() { }
};
</script>

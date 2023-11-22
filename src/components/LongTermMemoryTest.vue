<template>
	<v-container>
		<div v-if="this.testType == 'short'" class="long-term-memory-test-title">
			<p>Short Term Memory</p>
			{{ $t('shorttermmemory.note') }}
			<br />
		</div>
		<div v-if="this.testType == 'long'" class="long-term-memory-test-title">
			<p>Long Term Memory</p>
			{{ $t('longtermmemory.note') }}
			<br />
		</div>
		<div v-if="!this.completed">
			<p>
				{{ $t('longtermmemory.instructions.line1') }}<br />
				{{ $t('longtermmemory.instructions.line2') }}<br />
				{{ $t('longtermmemory.instructions.line3') }}<br />
			</p>
			<br />
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.first" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.second" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.third" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.fourth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.fifth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.sixth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.seventh" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.eighth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col>
					<v-text-field v-model="this.keys.ninth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="this.keys.tenth" label="Enter Here" variant="solo"></v-text-field>
				</v-col>
			</v-row>
			<div class="next-button">
				<v-btn @click="this.checkKeys()" size="x-large" block color="red-lighten-3" rounded="lg">Submit</v-btn>
			</div>
		</div>
		<div v-if="this.completed" class="completed">
			<h3>Total Number of Words Recalled Correctly(out of 10): {{ this.keysMatched }}</h3>
			<br />
			<p><b>Note: </b>This is a computerized analysis and not a medical diagnosis</p>
			<br />
			<div class="next-button" v-if="this.testType == 'short'">
				<v-btn to="/digitspantest" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
			</div>
			<div class="next-button" v-if="this.testType == 'long'">
				<v-btn to="/consolidatedreport" size="x-large" block color="red-lighten-3" rounded="lg">Next</v-btn>
			</div>
		</div>
	</v-container>
</template>

<script>
import { useTestStore } from '@/store/tests';
import { collection, addDoc } from 'firebase/firestore';

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
			usedKeys: [],
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
			const answers = this.answerKeys.map((word) => word.toLowerCase());
			inputKeyList.push(this.keys.first, this.keys.second, this.keys.third, this.keys.fourth, this.keys.fifth, this.keys.sixth, this.keys.seventh, this.keys.eighth, this.keys.ninth, this.keys.tenth);
			for (let i = 0; i < inputKeyList.length; i++) {
				const inp = inputKeyList[i].toLowerCase();
				if (answers.includes(inp) && !this.usedKeys.includes(inp)) {
					this.keysMatched += 1;
					this.usedKeys.push(inputKeyList[i]);
				}
			}
			this.completed = true;
			if (this.testType == 'short') {
				useTestStore().addShortTermMemoryTestData({
					score: this.keysMatched
				});
			} else if (this.testType == 'long') {
				useTestStore().addLongTermMemoryTestData({
					score: this.keysMatched
				});
				this.pushDataToDB();
			}
		},
		async pushDataToDB() {
			const data = useTestStore().getData();
			const fireStore = this.$fireStore;
			const dataPacket = {
				userDetails: data.userDetailsData,
				testData: {
					longTermMemoryTestData: data.longTermMemoryTestData,
					shortTermMemoryTestData: data.shortTermMemoryTestData,
					digitSpanTestData: data.digitSpanTestData,
					reverseDigitSpanTestData: data.reverseDigitSpanTestData,
					sequenceDigitSpanTestData: data.sequenceDigitSpanTestData,
					stroopTestData: data.stroopTestData,
					nBackTestData: data.nBackTestData,
					shapeDigitCodeTestData: data.shapeDigitCodeTestData
				},
				timestamp: data.userDetailsData.date
			};
			try {
				const docRef = await addDoc(collection(fireStore, 'testData'), dataPacket);
				console.log('Document written with ID: ', docRef.id);
			} catch (e) {
				console.error('Error adding document: ', e);
			}
		}
	},
	mounted() {}
};
</script>

<style>
.long-term-memory-test-title {
	text-align: left;
	font-weight: bold;
}

.next-button {
	border: solid black 1px;
	border-radius: 8px;
}
</style>

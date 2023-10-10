<template>
	<div class="thanks">
		<p>Thank YOU!</p>
		<p>
			If you want to take Intelligence Test click
			<a href="https://forms.gle/TVUcM3dNiFLZA85B8">Here</a>
		</p>
	</div>
</template>

<script>
import { useTestStore } from '@/store/tests';
import { collection, addDoc } from 'firebase/firestore';

export default {
	name: 'EndView',
	data() {
		return {};
	},
	methods: {
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
					nBackTestData: data.nBackTestData
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
	mounted() {
		this.pushDataToDB();
	}
};
</script>
<style>
.thanks {
	align-items: center;
	text-align: center;
	font-size: 50px;
}
</style>

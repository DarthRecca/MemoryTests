<template>
	<div class="thanks">
		<p>Thank YOU!</p>
		<p>If you want to take full Interlligence Tests go to <a
				href="https://www.psychologytestingforall.com/use-our-free-resources">Our Site</a></p>
	</div>
</template>

<script>
import { useTestStore } from '@/store/tests';

export default {
	name: 'EndView',
	data() {
		return {};
	},
	methods: {
		async pushDataToDB() {
			const data = useTestStore().getData();
			try {
				const firebaseApp = this.$firebaseApp;
				const db = firebaseApp.database();
				const messagesRef = db.ref('/TestData');
				const dataPacket = {
					userDetails: data.userDetailsData,
					longTermMemoryTest: data.longTermMemoryTestData,
					shortTermMemoryTest: data.shortTermMemoryTestData,
					digitSpanTest: data.digitSpanTestData,
					stroopTest: data.stroopTestData,
					nBackTest: data.nBackTestData,
					timestamp: new Date().toString()
				}
				messagesRef.push(dataPacket);

			} catch (error) {
				console.error('Error saving message:', error);
			}
		},
		mounted() {
			this.pushDataToDB();
		}
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

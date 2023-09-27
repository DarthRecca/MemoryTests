<template>
	<div class="thanks">
		<p>Thank YOU!</p>
		<p>If you want to take full Interlligence Tests go to <a
				href="https://www.psychologytestingforall.com/use-our-free-resources">Our Site</a></p>
	</div>
</template>

<script>

import useTestStore from '@/store/tests'

export default {
	name: "EndView",
	data() {
		return {

		}
	},
	methods: {
		pushDataToDB() {
			const data = useTestStore().getData()
			this.axios({
				method: 'post',
				url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-masjt/endpoint/data/v1/action/findOne',
				data: data,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Request-Headers': '*',
					'api-key': 'fkzxxn1wd4m8jqqONMJLxGdIrwl1hMdzQljKJ2x36p0ye6AWDNTPSgrJKo8VSr3S',
				},
			}).then(response => {
				console.log(response)
			}).catch(error => {
				console.log(error)
			})
		},
	},
	mounted() {
		this.pushDataToDB()
	}
}

</script>
<style>
.thanks {
	align-items: center;
	text-align: center;
	font-size: 50px;
}
</style>

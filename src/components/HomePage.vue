<template>
	<v-container>
		<v-responsive>
			<div class="welcome-screen">
				<div>
					<h1>Welcome to Memory Test</h1>
					<p>
						Link to our website:
						<a href="https://www.psychologytestingforall.com">https://www.psychologytestingforall.com</a>
					</p>
				</div>
				<br />

				<div class="start-button">
					<v-btn to="/detailsform" size="x-large" block color="red-lighten-3" rounded="lg">
						<h1>Click here to Start Test</h1>
					</v-btn>
				</div>
			</div>
		</v-responsive>
	</v-container>
</template>

<script>
export default {
	name: 'HomePage',
	data() {
		return {};
	},
	computed: {},
	methods: {},
	mounted() {}
};
</script>

<style>
.welcome-screen {
	align-items: center;
	text-align: center;
}

.start-button {
	text-align: center;
	align-items: center;
}

.button-label {
	font-size: larger;
	border: 5px;
	border-width: solid black;
}
</style>

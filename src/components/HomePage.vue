<template>
	<v-container>
		<v-responsive>
			<div class="welcome-screen">
				<div>
					<h1>Welcome to Memory Test</h1>
				</div>
				<br />

				<div class="start-button">
					<v-btn to="/detailsform" size="x-large" block color="red-lighten-3" rounded="lg">
						<h1>Start the Test</h1>
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
	border: black 1px solid;
	border-radius: 8px;
}

.button-label {
	font-size: larger;
	border: 5px;
	border-width: solid black;
}
</style>

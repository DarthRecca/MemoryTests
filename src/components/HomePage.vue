<template>
	<v-container>
		<v-responsive>
			<div class="welcome-screen">
				<div>
					<h1>{{ $t('welcome.welcome-message') }}</h1>
					<br />
					{{ this.userID }}
				</div>
				<br />

				<div class="start-button">
					<v-btn to="/detailsform" size="x-large" block color="red-lighten-3" rounded="lg">
						<h1>{{ $t('welcome.start-button') }}</h1>
					</v-btn>
				</div>
			</div>
		</v-responsive>
	</v-container>
</template>

<script>
import axios from 'axios';

export default {
	name: 'HomePage',
	data() {
		return {};
	},
	computed: {
		userID() {
			return sessionStorage.getItem('userID');
		}
	},
	methods: {
		async getJwtToken() {
			try {
				const response = await axios.get('https://learningwithiqplus.com/wp-json/custom/v1/get-jwt-token', { withCredentials: true });
				const token = response.data.token;
				const userID = response.data.userID;
				sessionStorage.setItem('jwtToken', token);
				sessionStorage.setItem('userID', userID);
				return token;
			} catch (error) {
				console.error('Failed to get JWT token:', error);
				return null;
			}
		},
		async authenticateUser() {
			let token = sessionStorage.getItem('jwtToken');
			if (!token) {
				token = await this.getJwtToken();
			}
			if (token) {
				console.log('JWT token:', token);
			} else {
				console.log('User is not logged in or failed to retrieve token.');
			}
		}
	},
	mounted() {
		this.authenticateUser();
	}
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

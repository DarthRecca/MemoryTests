<template>
	<v-main class="main-container">
		<v-sheet color="teal-lighten-3" class="main-sheet">
			<v-btn-toggle v-model="locale" mandatory divided @click="setLocale()" class="locale-picker">
				<v-btn value="en" class="locale-picker-btn en" color="blue-lighten-1">ENGLISH</v-btn>
				<v-btn value="mr" class="locale-picker-btn mr" color="blue-lighten-1">मराठी(Marathi)</v-btn>
				<v-btn value="hi" class="locale-picker-btn hi" color="blue-lighten-1">हिन्दी(Hindi)</v-btn>
			</v-btn-toggle>
			<v-responsive>
				<router-view></router-view>
			</v-responsive>
		</v-sheet>
	</v-main>
</template>

<script>
export default {
	name: 'MainModule',
	data() {
		return {
			locale: 'en'
		};
	},
	methods: {
		setLocale() {
			this.$i18n.locale = this.locale;
		}
	}
};
</script>

<style>
.main-sheet {
	font-size: larger;
	border-width: 15px;
	padding: auto;
	margin: auto;
	height: 100%;
}

.locale-picker {
	align-items: right;
}

.locale-picker-btn {
	border: 2px black solid;
}
</style>

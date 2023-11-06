<template>
	<v-app>
		<v-main class="main-container">
			<v-sheet color="teal-lighten-3" class="main-sheet">
				<v-responsive>
					<router-view></router-view>
				</v-responsive>
			</v-sheet>
		</v-main>
	</v-app>
</template>

<script setup>
//
</script>

<style>
.main-sheet {
	font-size: larger;
	border-width: 15px;
	padding: auto;
	margin: auto;
	height: 100%;
}
</style>

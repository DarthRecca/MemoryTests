<template>
	<v-app>
		<v-main>
			<div class="main-sheet">
				<v-sheet color="teal-lighten-3" border>
					<router-view></router-view>
				</v-sheet>
			</div>
		</v-main>
	</v-app>
</template>

<script setup>
//
</script>

<style>
.main-sheet {
	background-color: dimgray;
	font-size: larger;
	border-width: 50;
	padding: auto;
	margin: auto
}
</style>
// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'HomeView',
		component: () => import('@/views/HomeView.vue')
	},
	{
		path: '/detailsform',
		name: 'DetailsFormView',
		component: () => import('@/views/DetailsFormView.vue')
	},
	{
		path: '/longtermmemorytest/:type',
		name: 'LongTermMemoryTestView',
		component: () => import('@/views/LongTermMemoryTestView.vue')
	},
	{
		path: '/digitspantest',
		name: 'DigitSpanTestView',
		component: () => import('@/views/DigitSpanTestView.vue')
	},
	{
		path: '/reversedigitspantest',
		name: 'ReverseDigitSpanTestView',
		component: () => import('@/views/ReverseDigitSpanTestView.vue')
	},
	{
		path: '/strooptest',
		name: 'StroopTestView',
		component: () => import('@/views/StroopTestView.vue')
	},
	{
		path: '/nbacktest',
		name: 'NBackTestView',
		component: () => import('@/views/NBackTestView.vue')
	},
	{
		path: '/endscreen',
		name: 'EndView',
		component: () => import('@/views/EndView.vue')
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;

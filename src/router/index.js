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
		component: () => import('@/views/LongTermMemoryTestView.vue'),
		props: true
	},
	{
		path: '/digitspantest',
		name: 'DigitSpanTestView',
		component: () => import('@/views/DigitSpanTestView.vue'),
		props: true
	},
	{
		path: '/reversedigitspantest',
		name: 'ReverseDigitSpanTestView',
		component: () => import('@/views/ReverseDigitSpanTestView.vue'),
		props: true
	},
	{
		path: '/sequencedigitspantest',
		name: 'SequenceDigitSpanTestView',
		component: () => import('@/views/SequenceDigitSpanTestView.vue'),
		props: true
	},
	{
		path: '/strooptest',
		name: 'StroopTestView',
		component: () => import('@/views/StroopTestView.vue'),
		props: true
	},
	{
		path: '/nbacktest',
		name: 'NBackTestView',
		component: () => import('@/views/NBackTestView.vue'),
		props: true
	},
	{
		path: '/shapedigitcodetest',
		name: 'ShapeDigitCodeTestView',
		component: () => import('@/views/ShapeDigitCodeTestView.vue'),
		props: true
	},
	{
		path: '/consolidatedreport',
		name: 'ConsolidatedReportView',
		component: () => import('@/views/ConsolidatedReportView.vue'),
		props: true
	},
	{
		path: '/endscreen',
		name: 'EndView',
		component: () => import('@/views/EndView.vue'),
		props: true
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;

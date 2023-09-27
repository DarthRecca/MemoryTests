// Plugins
import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import pinia from '../store';
import router from '../router';
import axios from 'axios';
import VueAxios from 'vue-axios';

export function registerPlugins(app) {
	loadFonts();
	app.use(vuetify).use(pinia).use(router).use(VueAxios, axios);
}

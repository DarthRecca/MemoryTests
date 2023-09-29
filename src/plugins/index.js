// Plugins
import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import pinia from '../store';
import router from '../router';
import FirebasePlugin from './firebase';

export function registerPlugins(app) {
	loadFonts();
	app.use(vuetify).use(pinia).use(router).use(FirebasePlugin);
}

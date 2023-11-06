// Plugins
import { loadFonts } from './webfontloader';
import vuetify from './vuetify';
import i18n from './vue_i18n';
import pinia from '../store';
import router from '../router';
import FirebasePlugin from './firebase';
import VueSocials from 'vue-socials';

export function registerPlugins(app) {
	loadFonts();
	app.use(vuetify).use(i18n).use(pinia).use(router).use(FirebasePlugin).use(VueSocials);
}

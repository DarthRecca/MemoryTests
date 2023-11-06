import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

export default createI18n({
	locale: process.env.VUE_APP_I18N_LOCALE || 'en',
	globalInjection: true,
	messages
});

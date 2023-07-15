import { createApp } from 'vue';
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';

import resources from './locales';
import App from './App.vue';

const DEFAULT_LANGUAGE = 'en';

const i18nInstance = i18next.createInstance();

i18nInstance.init({
  lng: DEFAULT_LANGUAGE,
  resources,
});

createApp(App)
  .use(I18NextVue, { i18next: i18nInstance })
  .mount('#app');

import { createApp } from 'vue';
import i18next from 'i18next';
import I18NextVue from 'i18next-vue';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

import 'vue3-toastify/dist/index.css';

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
  .use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions)
  .mount('#app');

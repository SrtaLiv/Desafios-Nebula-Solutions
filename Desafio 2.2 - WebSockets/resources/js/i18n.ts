import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json';
import es from './locales/es.json';

i18n.use(initReactI18next).init({
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    resources: {
        en: en,
        es: es,
    },
    // ns: ['common'],
    // defaultNS: 'common',
    interpolation: {
        escapeValue: false,
    },
});

export function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
}

// export const t = (key: string, options?: any) => i18n.t(key, options);
globalThis.t = (key: string, options?: any) => i18n.t(key, options) as string;

export default i18n;

/*

    [-] Example Usage:
    import { t } from './i18n';                             // import the t function on the componen header instead of redefining the i18n instance 
    const title = t('common.hello_world');                  // use the t function to get the translated string

    [-] Change Language
    use changeLanguage('es') to change language (only applies to client side)
    and stores the preference in localStorage

    [-] Interpolation Example:
    { "common.welcome_user": "Welcome, {{name}}!" } 
    t('common.welcome_user', { name: 'John' });  ->  "Welcome, John!"

*/
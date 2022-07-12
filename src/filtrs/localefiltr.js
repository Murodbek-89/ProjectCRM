import store from '@/store';
import En from '@/locales/localEn.json';
import Ru from '@/locales/localRu.json';

const locales = {
  'ru-RU': Ru,
  'en-US': En,
};

export default function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru-RU';
  return locales[locale][key] || `[Localize error]: key ${key} not found`;
}

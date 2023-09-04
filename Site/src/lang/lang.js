import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

const DEFAULT_LANG = "en";

const locales = {
  en: require("./i18n/en.json"),
  es: require("./i18n/es.json"),
  de: require("./i18n/de.json")
};
const i18n = new VueI18n({
  locale: DEFAULT_LANG,
  messages: locales
});

export default i18n;

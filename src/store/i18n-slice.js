import { createSlice } from "@reduxjs/toolkit";
import { defaultLang, supportedLangs } from "../i18n/i18nConfig";
import { translations } from "../i18n/translations";

const initialState = {
  lang: defaultLang, // "en" when app loads
  supportedLangs: { ...supportedLangs },
  translations: translations,
  selectedTranslation: translations[defaultLang],
};
const i18nSlice = createSlice({
  name: "i18n",
  initialState,
  reducers: {
    setLang(state, action) {
      const newLang = action.payload;
      state.lang = newLang;
      state.selectedTranslation = state.translations[newLang];
    },
  },
});

export const i18nActions = i18nSlice.actions;
export default i18nSlice;

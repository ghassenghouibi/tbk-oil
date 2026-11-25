import { createContext, useContext } from 'react';
import fr from './fr.js';
import en from './en.js';
import ar from './ar.js';

/* One page per language: / (French, the default), /en and /ar. Each is prerendered with its own <head>. */
export const DICTS = { fr, en, ar };
export const DEFAULT_LANG = 'fr';

export const langFromPath = (pathname) => pathname.match(/^\/(en|ar)(?:\/|$)/)?.[1] ?? DEFAULT_LANG;

const I18n = createContext(fr);
export const I18nProvider = I18n.Provider;
export const useT = () => useContext(I18n);

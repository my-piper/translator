import dotenv from "dotenv";
import { Langs } from "./langs";

dotenv.config({ override: true });

export const DEEPL_API_KEY = process.env["DEEPL_API_KEY"] || "xyzXYZ";
export const DEEPL_API_URL =
  process.env["DEEPL_API_URL"] || "http://localhost/";

export const OPENAI_API_ASSIST = process.env["OPENAI_API_ASSIST"] || "xyzXYZ";
export const OPENAI_API_KEY = process.env["OPENAI_API_KEY"] || "xyzXYZ";
export const OPENAI_LOCALES = [Langs.zhTW, Langs.hi];

export const BASE_PATH = "../frontend/src/locale";
export const LANG_FILE_PATH = (lang: string) => `${BASE_PATH}/${lang}.json`;
export const LABELS_TO_SAVE = 10;

export const ALL_LOCALES = [
  Langs.ru,
  Langs.de,
  Langs.es,
  Langs.ptBR,
  Langs.fr,
  Langs.ja,
  Langs.ko,
  Langs.zhCN,
  Langs.zhTW,
  Langs.hi,
  Langs.tr,
  Langs.it,
];

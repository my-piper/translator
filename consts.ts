import dotenv from "dotenv";
import { Languages } from "./enums/languages";

dotenv.config({ override: true });

export const DEEPL_API_KEY = process.env["DEEPL_API_KEY"] || "xyzXYZ";
export const DEEPL_API_URL =
  process.env["DEEPL_API_URL"] || "http://localhost/";

export const OPENAI_API_ASSIST = process.env["OPENAI_API_ASSIST"] || "xyzXYZ";
export const OPENAI_API_KEY = process.env["OPENAI_API_KEY"] || "xyzXYZ";
export const OPENAI_LOCALES = [
  Languages.ru,
  Languages.de,
  Languages.es,
  Languages.ptBR,
  Languages.fr,
  Languages.ja,
  Languages.ko,
  Languages.zhCN,
  Languages.zhTW,
  Languages.hi,
  Languages.tr,
  Languages.it,
];

export const BASE_PATH = "../frontend/src/locale";
export const LANG_FILE_PATH = (lang: string) => `${BASE_PATH}/${lang}.json`;
export const LABELS_TO_SAVE = 10;

export const ALL_LOCALES = [
  Languages.ru,
  Languages.de,
  Languages.es,
  Languages.ptBR,
  Languages.fr,
  Languages.ja,
  Languages.ko,
  Languages.zhCN,
  Languages.zhTW,
  Languages.hi,
  Languages.tr,
  Languages.it,
];

import axios from "axios";
import { plainToInstance, Type } from "class-transformer";
import { DEEPL_API_KEY, DEEPL_API_URL } from "./consts";
import { Langs } from "./langs";

class Translation {
  @Type(() => String)
  text!: string;
}

class Response {
  @Type(() => Translation)
  translations!: Translation[];
}

export class Deepl {
  async translate(
    text: string,
    toLocale: Langs,
    fromLocale: Langs = Langs.en
  ): Promise<string | null> {
    try {
      const { data } = await axios({
        method: "POST",
        url: DEEPL_API_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        },
        data: {
          text: [text],
          source_lang: fromLocale.toUpperCase(),
          target_lang: toLocale == Langs.zhCN ? "ZH" : toLocale.toUpperCase(),
          context:
            "An image creator and editor that allows users to create custom adult imagery content.",
          preserve_formatting: true,
        },
      });

      const {
        translations: [translation],
      } = plainToInstance(Response, data);
      return translation?.text || null;
    } catch (e) {
      throw e;
    }
  }
}

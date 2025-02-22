import { Expose, plainToInstance, Type } from "class-transformer";
import OpenAI from "openai";
import { TextContentBlock } from "openai/resources/beta/threads/messages";
import { OPENAI_API_ASSIST, OPENAI_API_KEY } from "../consts";
import { Languages } from "../enums/languages";

class Translation {
  @Expose()
  @Type(() => String)
  text!: string;
}

class Response {
  @Expose()
  @Type(() => Translation)
  translations!: Translation[];
}

export class ChatGPT {
  private openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  async translate(text: string, toLocale: Languages): Promise<string | null> {
    try {
      const thread = await this.openai.beta.threads.create();

      await this.openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: `{"targetLanguage": "${toLocale.toUpperCase()}", "text": "${text}"}`,
      });

      const run = await this.openai.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: OPENAI_API_ASSIST,
      });

      if (run.status === "completed") {
        const messages = await this.openai.beta.threads.messages.list(
          thread.id
        );

        const { content } = messages.data
          .filter((m) => m.run_id === run.id && m.role === "assistant")
          .pop();

        if (!content || content.length == 0) {
          return null;
        }

        const {
          text: { value },
        } = <TextContentBlock>content[0];

        const {
          translations: [translation],
        } = plainToInstance(Response, JSON.parse(value));
        return translation?.text || null;
      } else {
        return null;
      }
    } catch (e) {
      throw e;
    }
  }
}

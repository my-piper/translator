import minimist from "minimist";
import "reflect-metadata";
import { Langs } from "./langs";
import { Language } from "./language";
import { Translator } from "./translator";

const ARGS = {
  help: "help",
  label: "label",
};

function showHelp() {
  console.log(`
Usage:
    npx ts-node tasks/translate/main.ts -o
    npx ts-node tasks/translate/main.ts --option
    npx ts-node tasks/translate/main.ts --option=<argument>

Options:
    --label=label        Translate specific label for all locales
    -h, --help           Show help output
    `);
}

(async () => {
  const args = minimist(process.argv.slice(2), {
    string: [ARGS.label],
    boolean: [ARGS.help],
    alias: {
      [ARGS.help]: "h",
    },
    unknown: () => {
      console.log(
        `Please provide supported option. Use --help option to get help output`
      );
      return false;
    },
  });
  const from = new Language(Langs.en);
  const translator = new Translator();

  if (args[ARGS.help]) {
    showHelp();
  }

  if (!!args[ARGS.label]) {
    const label = args[ARGS.label];
    await translator.translateLabel(from, label);
  }

  process.exit(0);
})();

const _s = require("underscore.string");

class QuestionsPromptsCollector {
  constructor(prompter, { questionCount = Infinity, logger }) {
    this.prompter = prompter;
    this.questionCount = questionCount;
    this.logger = logger;
  }

  async run() {
    const result = [];

    this.logger.info("Please fill questions now.");

    if (!isFinite(this.questionCount)) {
      this.logger.info("Leave a word empty when you are done.");
    }

    for (let i = 0; i < this.questionCount; i++) {
      this.logger.info(`Question #${i + 1}`);

      const questionPrompt = await this.prompter([
        {
          name: "word",
          message: "Word",
          validate(answer) {
            if (answer === "") {
              return true;
            } else if (_s.clean(answer).split(" ").length > 1) {
              return "A word must be a single word.";
            } else if (answer.length > 1) {
              return true;
            }

            return "You have to provide either a word having at least 2 chars or leave empty if you have finished.";
          },
        },
        {
          name: "definition",
          message: "Definition",
          validate(answer) {
            if (answer.length < 5) {
              return "You have to provide a descriptive definition of a word.";
            }
            return true;
          },
          when(answers) {
            return answers.word !== "";
          },
        },
      ]);

      if (questionPrompt.word == "") {
        break;
      }

      const { word, definition } = questionPrompt;

      result.push(
        JSON.stringify({
          word,
          definition,
        })
      );
    }

    return result;
  }
}

module.exports = QuestionsPromptsCollector;

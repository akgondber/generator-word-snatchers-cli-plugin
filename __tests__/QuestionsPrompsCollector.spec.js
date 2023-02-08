const inquirer = require("inquirer");
const { randWord, randSentence } = require("@ngneat/falso");
const QuestionPrompsCollector = require("../app/QuestionsPromptsCollector");

let questionPrompsCollector;
let firstCallResult;
let secondCallResult;

jest.mock("inquirer");

beforeAll(() => {
  jest.spyOn(console, "info").mockImplementation(jest.fn());
});

beforeEach(() => {
  questionPrompsCollector = new QuestionPrompsCollector(inquirer.prompt, {
    questionCount: 2,
    logger: console,
  });
});

afterEach(() => {
  inquirer.prompt.mockClear();
});
describe("when a word and definition have been filled", () => {
  test("collects values with filled data", async () => {
    firstCallResult = {
      word: randWord({ length: 5 }),
      definition: randSentence({ length: 18 }),
    };
    secondCallResult = {
      word: randWord({ length: 5 }),
      definition: randSentence({ length: 18 }),
    };

    inquirer.prompt
      .mockImplementationOnce(() => Promise.resolve(firstCallResult))
      .mockImplementationOnce(() => Promise.resolve(secondCallResult));

    const result = await questionPrompsCollector.run();
    const expected = [firstCallResult, secondCallResult].map(JSON.stringify);

    expect(result).toEqual(expected);
  });
});

describe("when a word is empty", () => {
  test("collects values with filled data until first empty value", async () => {
    firstCallResult = {
      word: randWord({ length: 5 }),
      definition: randSentence({ length: 18 }),
    };
    secondCallResult = { word: "" };

    inquirer.prompt
      .mockImplementationOnce(() => Promise.resolve(firstCallResult))
      .mockImplementationOnce(() => Promise.resolve(secondCallResult));
    const result = await questionPrompsCollector.run();
    // expect(foo).toBeCalledWith({a: 'd'});
    // expect(fu.mock.calls[0]).toEqual(expect.arrayContaining([expect.objectContaining({name: 'word'})]));
    const expected = [JSON.stringify(firstCallResult)];

    expect(result).toEqual(expected);
  });
});

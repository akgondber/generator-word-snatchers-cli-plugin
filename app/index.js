const Generator = require("yeoman-generator");
const _s = require("underscore.string");
const QuestionsPromptsCollector = require("./QuestionsPromptsCollector");

module.exports = class extends Generator {
  constructor(...args) {
    super(...args);
    this.option("package-manager", {
      type: String,
      description: "Package manager to use",
    });
    this.option("question-count", {
      type: Number,
      description: "Question count you are about to fill",
    });
  }

  async detectPackageManagerWithFallback() {
    if (this.options.skipInstall) {
      return;
    }

    if (this.options.packageManager) {
      this.env.options.nodePackageManager = this.options.packageManager;
      return;
    }

    const result = await this.env.detectPackageManager();

    if (result === null) {
      this.debug(
        "Detecting package manager by local lock file have not been succeeded, trying to detect based on globally installed one."
      );
      const hasYarnGlobal = this._isPackageManagerInstalled("yarn");
      if (hasYarnGlobal) {
        this.debug(
          "Found yarn installed globally, use it as a package manager"
        );
        this.env.options.nodePackageManager = "yarn";
      } else {
        this.debug(
          "Yarn has not installed globally, using npm as a package manager"
        );
        this.env.options.nodePackageManager = "npm";
      }
    }
    return result;
  }

  async prompting() {
    const props = await this.prompt([
      {
        name: "moduleName",
        message: "What do you want to name your module",
        default: _s.slugify(this.appname),
      },
      {
        name: "moduleDescription",
        message: "What is your module description?",
        default: `My module`,
      },
      {
        name: "githubUsername",
        message: "What is your GitHub username?",
        store: true,
        validate: (x) =>
          x.length > 0 ? true : "You have to provide a username",
      },
    ]);

    const questionCount = this.options.questionCount
      ? this.options.questionCount
      : Infinity;
    const questionsPromptsCollector = new QuestionsPromptsCollector(
      this.prompt.bind(this),
      { questionCount, logger: this.log }
    );
    const pluginQuestions = await questionsPromptsCollector.run();
    const tpl = {
      moduleName: props.moduleName,
      moduleDescription: props.moduleDescription,
      githubUsername: props.githubUsername,
      classifiedPluginName: _s.classify(props.moduleName),
      camelizedPluginName: _s.camelize(props.moduleName),
      name: this.user.git.name(),
      email: this.user.git.email(),
      pluginQuestions,
    };
    this.fs.copyTpl(
      [`${this.templatePath()}/**/*`],
      this.destinationPath(),
      tpl
    );

    const configFiles = ["gitignore"];
    const templateFiles = [
      "_package.json",
      "_index.js",
      "tests/_index.test.js",
      "_README.md",
      "_LICENSE",
    ];
    templateFiles.map((templateFile) => {
      if (_s.include(templateFile, "/")) {
        const templatePathParts = templateFile.split("/");
        const fileName = templatePathParts.slice().reverse()[0];

        this.fs.move(
          this.destinationPath(templateFile),
          this.destinationPath(
            _s.rtrim(templatePathParts.join("/"), `${fileName}`) +
              _s.ltrim(fileName, "_")
          )
        );
      } else
        this.fs.move(
          this.destinationPath(templateFile),
          this.destinationPath(_s.ltrim(templateFile, "_"))
        );
    });
    configFiles.map((configFile) => {
      this.fs.move(
        this.destinationPath(configFile),
        this.destinationPath(`.${configFile}`)
      );
    });
  }

  writing() {
    const pkgJson = {
      scripts: {
        prettify: "prettier --write .",
      },
      devDependencies: {
        uvu: `^${this._getPackageLatestVersion("uvu")}`,
        prettier: `^${this._getPackageLatestVersion("prettier")}`,
      },
    };
    this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
  }

  git() {
    this.spawnCommandSync("git", ["init"]);
  }

  end() {
    if (!this.options.skipInstall) {
      this.spawnCommandSync(this.env.options.nodePackageManager, [
        "run",
        "prettify",
      ]);
    }
  }

  _getPackageLatestVersion(packageName) {
    return this.spawnCommandSync("npm", ["show", packageName, "version"], {
      stdio: "pipe",
    }).stdout;
  }

  async _isPackageManagerInstalled(packageManager) {
    try {
      this.spawnCommandSync(packageManager, ["--version"], { stdio: "pipe" })
        .stdout;
      return true;
    } catch (err) {
      return false;
    }
  }
};

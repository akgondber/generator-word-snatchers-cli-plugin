import PostCommandHook from "post-command-hook";
import InstallPackagesPlugin from "post-command-hook-install-packages-plugin";

const postCommandHook = new PostCommandHook({
  command: "echo",
  args: ["Some stuff going to be executed..."],
});

postCommandHook.use(new InstallPackagesPlugin(["prettier"], { saveDev: true }));

postCommandHook.use(
  new InstallPackagesPlugin(["jest", "@ngneat/falso"], { saveDev: true })
);

(async () => {
  await postCommandHook.run();
})();

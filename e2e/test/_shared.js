import { fork } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import _kill from "tree-kill";

const kill = promisify(_kill);

export const createRunner = (name) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const scenario = join(__dirname, "..", "src", `${name}.js`);
  const child = fork(scenario, [], {
    stdio: "pipe",
    env: {
      ...process.env,
      HEADLESS: "1",
    },
    detached: true, // needs to be detached so child processes will be automatically killed when child is killed, see https://github.com/jasongilman/proto-repl/pull/292/files
  });

  let stdout = [];
  let stderr = [];
  const handleStdoutData = (data) => {
    console.log({ stdout: data.toString() });
    stdout.push(data.toString());
  };

  child.stdout.on("data", handleStdoutData);
  const handleStdErrData = (data) => {
    stderr.push(data.toString());
    console.log({ stderr: data.toString() });
  };
  child.stderr.on("data", handleStdErrData);

  let killed = false;

  child.on("close", () => {
    killed = true;
  });

  let succeeded = false;

  child.on("message", (message) => {
    console.log({ message });
    if (message === "succeeded") {
      succeeded = true;
    }
  });

  return {
    get stdout() {
      return stdout;
    },
    get stderr() {
      return stderr;
    },
    async kill() {
      if (killed) {
        console.log("already killed");
        return;
      }
      try {
        // @ts-ignore
        await kill(child.pid); // TODO this is not working properly
      } catch (error) {
        console.info("[info] runner could not be killed", error);
      }
      // child.stderr?.destroy()
      // child.stdout?.destroy()
      // child.stdin?.destroy()
      // child.kill()
    },
    get succeeded() {
      return succeeded;
    },
  };
};

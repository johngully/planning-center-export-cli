import { exec } from "child_process";

function testExport() {
  exec("./cli.mjs", (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`, error);
      return;
    }

    if (stderr) {
      console.error(`stderr:`, stderr);
      return;
    }

    console.log("success:", stdout);
  });
};

testExport();
import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";
let question = {
  type: "input",
  name: "URL",
  message: "Enter an URL - ",
  default: "www.google.com",
};
inquirer
  .prompt([
    /* Pass your questions in here */
    question,
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    fs.readFile("./URL.txt", { encoding: "utf8" }, (err, data) => {
      if (err) throw err;
      if (data) {
        var qr_png = qr.image(answers.URL, { type: "png" });
        qr_png.pipe(fs.createWriteStream("qr-" + answers.URL + ".png"));

        var svg_string = qr.imageSync(answers.URL, { type: "png" });
        fs.writeFile("./URL.txt", data + "\n" + answers.URL, (err) => {
          if (err) throw err;
          console.log("DONE");
        });
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("tytERROR");
    } else {
      // Something else went wrong
      console.log("Something is wrong");
    }
  });

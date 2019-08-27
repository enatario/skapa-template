const gulp = require("gulp");
const archieml = require("archieml");
const request = require("request");
const fs = require("fs");

const configPath = `${process.cwd()}/src/data/config.json`;
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const google = config.google;

gulp.task("fetch:google", (cb) => {
  if (google[0].id.length > 0) {

    google.forEach((doc, index) => {
      const url = `https://docs.google.com/document/d/${doc.id}/export?format=txt`;

      request(url, function(error, response, body) {
        const parsed = archieml.load(body);
        const str = JSON.stringify(parsed);
        const name = doc.filename || `copy-${index}`;
        const file = `src/data/files/${name}.json`;

        fs.writeFile(file, str, function(err) {
          console.log(`${name}.json is now available`);
          if (err) {
            console.error(err);
          }
        });
      });
    });
  } else {
    console.error("No google doc");
    cb();
  }
});

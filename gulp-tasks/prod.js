const gulp = require("gulp");
const runSequence = require("run-sequence");

const runTasks = (cb) => {
  runSequence(
    "clean:prod",
    "css:prod",
    "js:prod",
    "assets:prod",
    "html:prod",
    cb,
  );
};

gulp.task("prod", () => {
  runTasks(() => {
    setTimeout(() => {
    }, 100);
  });
});

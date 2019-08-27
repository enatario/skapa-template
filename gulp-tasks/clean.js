const gulp = require("gulp");
const del  = require("del");

gulp.task("clean:dev", (cb) => {
  del(["dist/dev/**"]).then(() => cb());
});

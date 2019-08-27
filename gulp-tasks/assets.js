const gulp = require("gulp");
const browserSync = require("browser-sync");

const assetsPath = "src/assets/**/*";

gulp.task("assets:dev", () => {
  return gulp.src(assetsPath)
    .pipe(gulp.dest("dist/dev/assets"))
    .pipe(browserSync.stream());
});

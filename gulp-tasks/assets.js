const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const browserSync = require("browser-sync");

const assetsPath = "src/assets/**/*";

gulp.task("assets:dev", () => {
  return gulp.src(assetsPath)
    .pipe(gulp.dest("dist/dev/assets"))
    .pipe(browserSync.stream());
});

gulp.task("assets:prod", () => {
  return gulp.src(assetsPath)
    .pipe(imagemin({
      progressive: true,
    }))
    .pipe(gulp.dest("dist/prod/assets"));
});

const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync");

const cssPath = "src/css/app.scss";

gulp.task("css:dev", () => {
  return gulp.src(cssPath)
    .pipe(sass({
      sourcemaps: true,
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/dev"))
    .pipe(browserSync.stream());
});

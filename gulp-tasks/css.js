const gulp = require("gulp");
const sass = require("gulp-sass");
const bourbon = require("bourbon").includePaths;
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync");

const cssPath = "src/css/app.scss";

gulp.task("css:dev", () => {
  return gulp.src(cssPath)
    .pipe(sass({
      sourcemaps: true,
      includePaths: [
        bourbon,
      ],
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest("dist/dev"))
    .pipe(browserSync.stream());
});

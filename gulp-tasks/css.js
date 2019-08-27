const gulp = require("gulp");
const sass = require("gulp-sass");
const bourbon = require("bourbon").includePaths;
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync");

const cssPath = "src/css/app.scss";
const cssCommon = () => {
  return gulp.src(cssPath)
    .pipe(sass({
      sourcemaps: true,
      includePaths: [
        bourbon,
      ],
    }))
    .pipe(autoprefixer());
};

gulp.task("css:dev", () => {
  cssCommon()
    .pipe(gulp.dest("dist/dev"))
    .pipe(browserSync.stream());
});

gulp.task("css:prod", () => {
  cssCommon()
    .pipe(gulp.dest("dist/prod"));
});

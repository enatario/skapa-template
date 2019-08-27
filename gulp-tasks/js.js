const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const rename = require("gulp-rename");
const browserSync = require("browser-sync");

const jsPath = "src/js/app.js";

const webpackConfig = {
  mode: "none",
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
    ],
  },
};

gulp.task("js:dev", function() {
  return gulp.src(jsPath)
    .pipe(webpackStream(webpackConfig))
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest("dist/dev"))
    .pipe(browserSync.stream());
});

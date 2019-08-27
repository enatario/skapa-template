const gulp = require("gulp");
// const webpack = require("webpack");
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

const webpackConfig_prod = Object.assign({}, webpackConfig, {
  optimization: {
    minimize: true,
  },
});

gulp.task("js:dev", () => {
  return gulp.src(jsPath)
    .pipe(webpackStream(webpackConfig))
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest("dist/dev"))
    .pipe(browserSync.stream());
});

gulp.task("js:prod", () => {
  return gulp.src(jsPath)
    .pipe(webpackStream(webpackConfig_prod))
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest("dist/prod"));
});

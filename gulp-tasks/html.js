const gulp = require("gulp");
const hb = require("gulp-hb");
const path = require("path");
const foreach = require("gulp-foreach");
const cond = require("gulp-cond");
const include = require("gulp-file-include");
const rename = require("gulp-rename");
const browserSync = require("browser-sync");

const htmlPath = "src/html/*.hbs";
const svgPath = `${process.cwd()}/src/svg/`;
let dev = true;

const isDev = (dev) => {
  if (dev) {
    return (
      gulp.dest("dist/dev"),
      browserSync.stream()
    );
  } else {
    return gulp.dest("dist/prod");
  }
};

const htmlCommon = () => {
  const hbStream = hb()
    .partials("./src/html/partials/**/*.hbs")
    .helpers("./src/html/helpers/*.js")
    .data("./src/data/files/**/*.{js,json}")
    .data({timestamp: Date.now()});

  return gulp.src(htmlPath)
    .pipe(hbStream)
    .pipe(include({ basepath: svgPath }))
    .pipe(foreach(function(stream, file) {
      const filename = path.basename(file.path, ".hbs");
      const isIndex = filename === "index";
      return stream
        .pipe(cond(isIndex,
          rename({ extname: ".html" }),
          rename({
            dirname: filename + "/",
            basename: "index",
            extname: ".html",
          }),
        ))
        .pipe(isDev());
    }));
};

gulp.task("html:dev", () => {
  htmlCommon(dev);
});

gulp.task("html:prod", () => {
  htmlCommon();
});

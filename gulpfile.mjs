"use strict";

import gulp from "gulp";
import { deleteAsync } from "del";
import imagemin from "gulp-imagemin";
import uglify from "gulp-uglify";
import cleanCSS from "gulp-clean-css";
import htmlmin from "gulp-htmlmin";
import log from "fancy-log";
import { stream as critical } from "critical";
import i18n from "gulp-i18n-localize";
import fileinclude from "gulp-file-include";

function cleanDistEN() {
  return deleteAsync([
    "TDR-V1-EN/*.html",
    "TDR-V1-EN/css",
    "TDR-V1-EN/js",
    "TDR-V1-EN/images",
  ]);
}

function cleanDistFR() {
  return deleteAsync([
    "tdrFRbuild/*.html",
    "tdrFRbuild/css",
    "tdrFRbuild/js",
    "tdrFRbuild/images",
  ]);
}

function cleanDistIT() {
  return deleteAsync([
    "tdrITbuild/*.html",
    "tdrITbuild/css",
    "tdrITbuild/js",
    "tdrITbuild/images",
  ]);
}

function includeFilesEN() {
  return gulp
    .src("./src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("TDR-V1-EN"));
}

function includeFilesFR() {
  return gulp
    .src("./src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("tdrFRbuild"));
}

function includeFilesIT() {
  return gulp
    .src("./src/*.html")
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
      })
    )
    .pipe(gulp.dest("tdrITbuild"));
}

function addContentEN() {
  return gulp
    .src("TDR-V1-EN/*.html")
    .pipe(
      i18n({
        locales: ["en"],
        localeDir: "./src/lang",
      })
    )
    .pipe(gulp.dest("TDR-V1-EN"));
}

function addContentFR() {
  return gulp
    .src("tdrFRbuild/*.html")
    .pipe(
      i18n({
        locales: ["fr"],
        localeDir: "./src/lang",
      })
    )
    .pipe(gulp.dest("tdrFRbuild"));
}

function addContentIT() {
  return gulp
    .src("tdrITbuild/*.html")
    .pipe(
      i18n({
        locales: ["it"],
        localeDir: "./src/lang",
      })
    )
    .pipe(gulp.dest("tdrITbuild"));
}

function copyVideoEN() {
  return gulp
    .src("./src/images/tdr/*.{mp4,webm}")
    .pipe(gulp.dest("./TDR-V1-EN/images/tdr"));
}

function copyVideoFR() {
  return gulp
    .src("./src/images/tdr/*.{mp4,webm}")
    .pipe(gulp.dest("./tdrFRbuild/images/tdr"));
}

function copyVideoIT() {
  return gulp
    .src("./src/images/tdr/*.{mp4,webm}")
    .pipe(gulp.dest("./tdrITbuild/images/tdr"));
}

function compressImagesEN() {
  return gulp
    .src(["./src/images/tdr/*.{jpg,png,jpeg,gif,svg,webp}"])
    .pipe(imagemin())
    .pipe(gulp.dest("./TDR-V1-EN/images/tdr"));
}

function compressImagesFR() {
  return gulp
    .src(["./src/images/tdr/*.{jpg,png,jpeg,gif,svg,webp}"])
    .pipe(imagemin())
    .pipe(gulp.dest("./tdrFRbuild/images/tdr"));
}

function compressImagesIT() {
  return gulp
    .src(["./src/images/tdr/*.{jpg,png,jpeg,gif,svg,webp}"])
    .pipe(imagemin())
    .pipe(gulp.dest("./tdrITbuild/images/tdr"));
}

function minifyHTMLEN() {
  return gulp
    .src("./TDR-V1-EN/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        minifyCss: true,
        minifyJs: true,
      })
    )
    .pipe(gulp.dest("./TDR-V1-EN"));
}

function minifyHTMLFR() {
  return gulp
    .src("./tdrFRbuild/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        minifyCss: true,
        minifyJs: true,
      })
    )
    .pipe(gulp.dest("./tdrFRbuild"));
}

function minifyHTMLIT() {
  return gulp
    .src("./tdrITbuild/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        minifyCss: true,
        minifyJs: true,
      })
    )
    .pipe(gulp.dest("./tdrITbuild"));
}

function minifyJSEN() {
  return gulp
    .src(["./src/js/**/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("./TDR-V1-EN/js"));
}

function minifyJSFR() {
  return gulp
    .src(["./src/js/**/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("./tdrFRbuild/js"));
}

function minifyJSIT() {
  return gulp
    .src(["./src/js/**/*.js"])
    .pipe(uglify())
    .pipe(gulp.dest("./tdrITbuild/js"));
}

function minifyCSSEN() {
  return gulp
    .src("./src/css/**/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("./TDR-V1-EN/css"));
}

function minifyCSSFR() {
  return gulp
    .src("./src/css/**/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("./tdrFRbuild/css"));
}

function minifyCSSIT() {
  return gulp
    .src("./src/css/**/*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("./tdrITbuild/css"));
}

function inlineCriticalEN() {
  return gulp
    .src("TDR-V1-EN/*.html")
    .pipe(
      critical({
        inline: true,
        base: "TDR-V1-EN/",
        src: "index.html",
        target: {
          html: "index.html",
          css: "css/critical.css",
          uncritical: "css/uncritical.css",
        },
        dimensions: [
          {
            height: 900,
            width: 500,
          },
          {
            height: 900,
            width: 1200,
          },
        ],
      })
    )
    .on("error", (err) => {
      log.error(err.message);
    })
    .pipe(gulp.dest("TDR-V1-EN"));
}

function inlineCriticalFR() {
  return gulp
    .src("tdrFRbuild/*.html")
    .pipe(
      critical({
        inline: true,
        base: "tdrFRbuild/",
        src: "index.html",
        target: {
          html: "tdrFRbuild.html",
          css: "css/critical.css",
          uncritical: "css/uncritical.css",
        },
        dimensions: [
          {
            height: 900,
            width: 500,
          },
          {
            height: 900,
            width: 1200,
          },
        ],
      })
    )
    .on("error", (err) => {
      log.error(err.message);
    })
    .pipe(gulp.dest("tdrFRbuild"));
}

function inlineCriticalIT() {
  return gulp
    .src("tdrITbuild/*.html")
    .pipe(
      critical({
        inline: true,
        base: "tdrITbuild/",
        src: "index.html",
        target: {
          html: "tdrITbuild.html",
          css: "css/critical.css",
          uncritical: "css/uncritical.css",
        },
        dimensions: [
          {
            height: 900,
            width: 500,
          },
          {
            height: 900,
            width: 1200,
          },
        ],
      })
    )
    .on("error", (err) => {
      log.error(err.message);
    })
    .pipe(gulp.dest("tdrITbuild"));
}

function moveHTMLEN() {
  return gulp.src("TDR-V1-EN/en/*.html").pipe(gulp.dest("TDR-V1-EN"));
}

function moveHTMLFR() {
  return gulp.src("tdrFRbuild/fr/*.html").pipe(gulp.dest("tdrFRbuild"));
}

function moveHTMLIT() {
  return gulp.src("tdrITbuild/it/*.html").pipe(gulp.dest("tdrITbuild"));
}

function cleanEN() {
  return deleteAsync(["TDR-V1-EN/en"]);
}

function cleanFR() {
  return deleteAsync(["tdrFRbuild/fr"]);
}

function cleanIT() {
  return deleteAsync(["tdrITbuild/it"]);
}

export const build_EN = gulp.series(
  cleanDistEN,
  includeFilesEN,
  addContentEN,
  copyVideoEN,
  compressImagesEN,
  minifyJSEN,
  minifyCSSEN,
  inlineCriticalEN,
  moveHTMLEN,
  cleanEN,
  minifyHTMLEN
);

export const build_FR = gulp.series(
  cleanDistFR,
  includeFilesFR,
  addContentFR,
  copyVideoFR,
  compressImagesFR,
  minifyJSFR,
  minifyCSSFR,
  inlineCriticalFR,
  moveHTMLFR,
  cleanFR,
  minifyHTMLFR
);

export const build_IT = gulp.series(
  cleanDistIT,
  includeFilesIT,
  addContentIT,
  copyVideoIT,
  compressImagesIT,
  minifyJSIT,
  minifyCSSIT,
  inlineCriticalIT,
  moveHTMLIT,
  cleanIT,
  minifyHTMLIT
);

"use strict"

let gulp = require('gulp'),
  del = require('del'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass')(require('sass')),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  sassGlob = require('gulp-sass-glob'),
  browserSync = require('browser-sync').create();

const paths = {
  scss: {
    srcGlobalBase: './scss/base/*.scss',
    destBase: './css/base',
    srcGlobalLayout: './scss/layout/*.scss',
    srcGlobalState: './scss/state/*.scss',
    srcComponentsState: './scss/state/**/*.scss',
    destLayout: './css/layout',
    destState: './css/state',
    srcGlobalModule: './scss/module/*.scss',
    srcComponentsModule:'./scss/module/**/*.module.scss',
    destModule: './css/module',
    srcGlobalTheme: './scss/theme/*.scss',
    srcComponentsTheme: './scss/theme/**/*.theme.scss',
    destTheme: './css/theme'
  },
  js: {
    srcComponentJs: './templates/components/**/*.js',
    dest: './js'
  }
};

// Cleanup build dirs before fresh build.
function cleanStyles() {
  return del([
    paths.scss.destBase,
    paths.scss.destLayout,
    paths.scss.destTheme
  ]);
}

function cleanJs() {
  return del([
    paths.js.dest,
  ]);
}

// Compile base into CSS & auto-inject into browsers
function baseStyles () {
  return gulp.src([paths.scss.srcGlobalBase],{ allowEmpty: true })
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.destBase))
    .pipe(browserSync.stream());
}

// Compile layout into CSS & auto-inject into browsers
function layoutStyles () {
  return gulp.src([paths.scss.srcGlobalLayout],{ allowEmpty: true })
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.destLayout))
    .pipe(browserSync.stream());
}

// Compile module into CSS & auto-inject into browsers
function moduleStyles () {
  return gulp.src([paths.scss.srcGlobalModule, paths.scss.srcComponentsModule],{ allowEmpty: true })
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.destModule))
    .pipe(browserSync.stream());
}

// Compile state into CSS & auto-inject into browsers
function stateStyles () {
  return gulp.src([paths.scss.srcComponentsState, paths.scss.srcGlobalState],{ allowEmpty: true })
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.destState))
    .pipe(browserSync.stream());
}

// Compile sass into CSS & auto-inject into browsers
function themeStyles () {
  return gulp.src([paths.scss.srcGlobalTheme, paths.scss.srcComponentsTheme],{ allowEmpty: true })
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write())
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.destTheme))
    .pipe(browserSync.stream());
}

// Move the javascript files into our js folder.
function themeJs() {
  return gulp.src([paths.js.srcComponentJs],{ allowEmpty: true })
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// Static Server + watching scss/html files.
function sass_watch() {
  gulp.watch([paths.scss.srcGlobalBase], baseStyles).on('change', browserSync.reload);
  gulp.watch([paths.scss.srcGlobalLayout], layoutStyles).on('change', browserSync.reload);
  gulp.watch([paths.scss.srcGlobalTheme, paths.scss.srcComponentsTheme], themeStyles).on('change', browserSync.reload);
  gulp.watch([paths.scss.srcGlobalState, paths.scss.srcComponentsState], stateStyles).on('change', browserSync.reload);
  gulp.watch([paths.scss.srcGlobalModule, paths.scss.srcComponentsModule], moduleStyles).on('change', browserSync.reload);

}

exports.baseStyles = baseStyles;
exports.layoutStyles = layoutStyles;
exports.themeStyles = themeStyles;
exports.stateStyles = stateStyles;
exports.moduleStyles = moduleStyles;
exports.themeJs = themeJs;
exports.sass_watch = sass_watch;
exports.cleanStyles = cleanStyles;
exports.cleanJs = cleanJs;

exports.sass = gulp.series(gulp.parallel(cleanStyles, cleanJs), gulp.parallel(baseStyles, layoutStyles, themeStyles, moduleStyles, stateStyles, themeJs));
exports.sass_watch = sass_watch;

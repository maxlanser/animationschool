const { src, dest, series, parallel, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');
const newer = require('gulp-newer');
const woff = require('gulp-ttf2woff');
const woff2 = require('gulp-ttf2woff2');
const babel = require("gulp-babel");
const concat = require('gulp-concat');
const gulpBabelMinify = require('gulp-babel-minify');
const gcmq = require('gulp-group-css-media-queries');
const argv = require('yargs').argv;
const gulpif = require('gulp-if');
const w3cjs = require('gulp-w3cjs');
const through2 = require('through2');

const isProduction = (argv.production === undefined) ? false : true;

const svgSprite = require('gulp-svg-sprite');



function w3() {
  return src('./dev/*.html')
    .pipe(w3cjs())
    //.pipe(w3cjs.reporter());
    .pipe(through2.obj(function(file, enc, cb){
      cb(null, file);
      if (!file.w3cjs.success){
          throw new Error('HTML validation error(s) found');
      }
    }));
}


function bSync(done) {
  browserSync.init({
    server: {
        baseDir: "./dev"
    },
    open: false
  });
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

function images() {
  return src('./src/images/**/*.+(jpg|JPG|png|PNG)')
    .pipe(newer('./dev/images'))
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(dest('./dev/images/'));
}

function sprite() {
  return src('./src/images/icons/sprite.svg')
    .pipe(dest('./dev/images/icons/'));
}

function copySvg() {
  return src(['./src/images/icons/*.svg', '!./src/images/icons/sprite.svg'])
    .pipe(newer('./dev/images/icons'))
    .pipe(dest('./dev/images/icons'));
}

function images2webp(){
  return src('./src/images/**/*.+(jpg|JPG|png|PNG)')
    .pipe(newer('./dev/images'))
    .pipe(webp())
    .pipe(dest('./dev/images'));
}

function fonts(){
  return src('./src/fonts/*.*')
    .pipe(dest('./dev/fonts'));
}

function fonts2woff(){
  return src('./src/fonts/*.ttf')
    .pipe(woff())
    .pipe(dest('./dev/fonts'));
}

function fonts2woff2(){
  return src('./src/fonts/*.ttf')
    .pipe(woff2())
    .pipe(dest('./dev/fonts'));
}

function images2avif(){
  return src('./src/images/**/*.+(jpg|JPG|png|PNG)')
    .pipe(newer('./dev/images'))
    .pipe(avif({
      quality: 50
    }))
    .pipe(dest('./dev/images'));
}

function script(){
  return src([
    "./node_modules/swiper/swiper-bundle.min.js",
    "./src/js/libs/*.js",
    "./src/js/components/*.js",
    "./src/js/main.js"
    ])
    //.pipe(babel({presets: ["@babel/preset-env"]}))
    .pipe(concat('app.js'))
    //.pipe(gulpBabelMinify())
    .pipe(dest("./dev/js"));
}

function cleanDev(){
  return src('./dev/', {read: false, allowEmpty: true})
      .pipe(clean());
}

function pugTask(){
  return src('./src/pug/pages/*.pug')
    .pipe(
      pug({
        basedir: './src/pug/',
        pretty: true
      })
    )
    .pipe(dest('./dev'));
}

function generateSprite() {
  const svgspriteConfig = {
    shape: {
      spacing: { // Add padding
        padding: 0
      },
      dest: 'images/intermediate-svg' // Keep the intermediate files
    },
    mode: {
      css: { // Activate the «css» mode
        render: {
          scss: true // Activate CSS output (with default options)
        },
        dest: 'scss/',
        dimensions: true,
        sprite: '../images/icons/sprite.svg',
        prefix: '.icon--%s',
        bust: false
      }
    }
  };
  return src(['./src/images/icons/*.svg', '!./src/images/icons/sprite.svg'])
    .pipe(imagemin([
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(svgSprite(svgspriteConfig))
    .pipe(dest('./src/'));
}

function styles() {
  return src('./src/scss/main.scss')
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(gulpif(isProduction, gcmq()))
    .pipe(rename('style.css'))
    .pipe(gulpif(!isProduction, sourcemaps.write('.')))
    .pipe(dest('./dev/css'))
    .pipe(browserSync.stream());
};


function watching() {
  watch('./src/pug/**/*.pug', series(pugTask, reload));
  watch('./src/scss/**/*.scss', styles);
  watch('./src/js/**/*.js', series(script, reload));
  watch('./src/images/**/*.*', series(parallel(images, copySvg), reload));
  //watch(['./dev/**/*.*', '!./dev/css/**/*.*']).on("change", browserSync.reload);
}

exports.html = pugTask;
exports.styles = styles;
exports.cleandev = cleanDev;
exports.svg = generateSprite;

exports.default = series(parallel(
  pugTask,
  styles,
  script,
  images,
  copySvg,
  series(generateSprite, sprite),
  fonts,
  //images2webp,
  //images2avif,
  //fonts2woff,
  //fonts2woff2
  ), bSync, watching);

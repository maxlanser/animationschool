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

const svgSprite = require('gulp-svg-sprite');




function bSync(done) {
  browserSync.init({
    server: {
        baseDir: "./dev"
    },
    open: false
  });
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
        padding: 1
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
        prefix: '.svg-icon--%s',
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
  return src('./src/scss/**/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			cascade: false
		}))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('maps/'))
    .pipe(dest('./dev/css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
};


function watching() {
  watch('./src/pug/**/*.pug').on("change", pugTask);
  watch('./src/scss/**/*.scss', styles);
  watch('./src/js/**/*.js', script);
  watch(['./dev/**/*.*', '!./dev/css/**/*.*']).on("change", browserSync.reload);
}

exports.html = pugTask;
exports.styles = styles;
exports.cleandev = cleanDev;
exports.svg = generateSprite;

exports.dev = series(parallel(
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

const {src, dest, watch, series, parallel} = require("gulp");
//series - Se inicia una tarea, y hasta finaliza, inicia la siguiente
//parallel - Todas inician al mismo tiempo

/*CSS Y SASS*/
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");

/*IMG*/
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(done){
    //Compilar SASS
    //pasos 1 - identificar el archivo, 2 - Compilarlo, 3 - Guardar el .css
    src("src/scss/app.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write("."))
        .pipe(dest("build/css"))
   done();
}

function imagenes(done){
    src("src/img/**/*")
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest("build/img"))
    done();
}

function versionWebp(done){
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{png,jpg}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"))
    done();
}

function versionAvif(done){
    const opciones = {
        quality: 50
    };
    src("src/img/**/*.{png,jpg}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"))
    done();
}

function dev(){
    watch("src/scss/**/*.scss", css);
    watch("src/img/**/*", imagenes);
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = parallel(imagenes,versionWebp,versionAvif,css,dev)
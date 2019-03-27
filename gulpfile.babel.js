import BrowserSync from "browser-sync"
import browserSyncConfig from "./.browsersyncrc.js"
import del from "del"
import fs from "fs"
import path from 'path'
import gulp from "gulp"
import GulpConfig from "./gulp.config.js"
import imagemin from "gulp-imagemin"
import named from "vinyl-named"
import newer from "gulp-newer"
import { dirname, basename } from "path"
import postcss from "gulp-postcss"
import rename from "gulp-rename"
import runsequence from "run-sequence"
import { spawn } from "child_process"
import sprite from "gulp-svg-sprite"
import sourcemaps from "gulp-sourcemaps"
import through from "through2"
import util from "gulp-util"
import webpack from "webpack-stream"
import webpackConfig from "./.webpackrc.js"
import toml from "toml"
import S from "string"

const browserSync = BrowserSync.create()
const gulpConfig = GulpConfig()
const generatorEnvVar = gulpConfig.generator.label.toUpperCase() + "_ENV"
const env = (process.env[generatorEnvVar] || process.env.NODE_ENV || "development")
const argsType = process.env.GENERATOR_ARGS || env
const isProduction = env === "production"

/**
 * @task generator
 * Runs SSG with environment-based
 * build arguments
 */
gulp.task("generator", cb => build(cb))

/**
 * @task build
 * Builds all static assets, and then
 * compiles the static site
 */
gulp.task("build", ["clean"], cb => {
  runsequence(["styles", "scripts", "images", "svg"], "generator", cb)
})

/**
 * @task server
 * Initializes browsersync server and
 * sets up watch tasks to rebuild
 */
gulp.task("server", ["build"], () => {
  browserSync.init(browserSyncConfig())
  gulp.watch(gulpConfig.styles.watch, ["styles"])
    .on('error', (err) => {
      log(err, err.toString(), ["Styles"])
      this.emit(end)
    })
  gulp.watch(gulpConfig.scripts.watch, ["scripts"])
    .on('error', (err) => {
      log(err, err.toString(), ["Scripts"])
      this.emit(end)
    })
  gulp.watch(gulpConfig.svg.watch, ["svg"])
    .on('error', (err) => {
      log(err, err.toString(), ["SVG"])
      this.emit(end)
    })
  gulp.watch(
    [
      gulpConfig.dest + "/**/*",
      `!${gulpConfig.styles.dest}/**/*`,
      `!${gulpConfig.scripts.dest}/**/*`
    ],
    ["generator"]
  )
    .on('error', (err) => {
      log(err, err.toString(), [gulpConfig.generator.label])
      this.emit(end)
      process.exit(1)
    })
})

/**
 * @task styles
 * Compiles all css
 */
gulp.task("styles", cb => {
  runsequence("styles:production", "styles:development", cb)
})

/**
 * @task styles:production
 * Compiles the production-ready CSS to project folder
 * and streams it if its a production server environment
 */
gulp.task("styles:production", cb => {
  const task = gulp
    .src(gulpConfig.styles.src)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      postcss({ env: "production" }).on("error", err => {
        log(err, err.toString(), "PostCSS")
        process.exit(1)
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(
      rename(path => {
        path.dirname = "/"

        if (path.extname.indexOf(".map") < 0) path.extname = ".min.css"

        return path
      })
    )
    .pipe(gulp.dest(gulpConfig.styles.dest))

  if (isProduction) {
    task.pipe(browserSync.stream())
  }

  return task
})

/**
 * @task styles:development
 * Generates the non-production styles to temp folder
 * and streams it if its a development server environment
 */
gulp.task("styles:development", cb => {
  if (isProduction) return cb()

  return gulp
    .src(gulpConfig.styles.src)
    .pipe(postcss().on("error", err => {
      log(err, err.toString(), "PostCSS")
      process.exit(1)
    }))
    .pipe(
      rename(path => {
        path.dirname = "/"

        if (path.extname.indexOf(".map") < 0) path.extname = ".min.css"

        return path
      })
    )
    .pipe(gulp.dest(gulpConfig.styles.tmp))
    .pipe(browserSync.stream())
})

/**
 * @task scripts
 * Compiles all js
 */
gulp.task("scripts", cb => {
  runsequence("scripts:production", "scripts:development", cb)
})

/**
 * @task scripts:production
 * Compiles the production-ready JS to project folder
 * and streams it if its a production server environment
 */
gulp.task("scripts:production", cb => {
  const task = gulp
    .src(gulpConfig.scripts.src)
    .pipe(named())
    .pipe(
      webpack(webpackConfig("production")).on("error", function (err) {
        log(err, err.toString(), "Webpack")
        this.emit("end")
        process.exit(1)
      })
    )
    .pipe(
      rename(path => {
        if (path.extname === ".js") path.extname = ".min.js"
        indexSearch()
        return path
      })
    )
    .pipe(gulp.dest(gulpConfig.scripts.dest))

  if (isProduction) {
    task.pipe(browserSync.stream())
  }

  return task
})

/**
 * @task scripts:development
 * Generates the non-production styles to temp folder
 * and streams it if its a development server environment
 */
gulp.task("scripts:development", cb => {
  if (isProduction) return cb()

  return gulp
    .src(gulpConfig.scripts.src)
    .pipe(named())
    .pipe(
      webpack(webpackConfig()).on("error", function (err) {
        log(err, err.toString(), "Webpack")
        this.emit("end")
        process.exit(1)
      })
    )
    .pipe(
      rename(path => {
        if (path.extname === ".js") path.extname = ".min.js"
        indexSearch()
        return path
      })
    )
    .pipe(gulp.dest(gulpConfig.scripts.tmp))
    .pipe(browserSync.stream())
})

/**
 * @task images
 * Optimizes all images
 * and streams it if its a development server environment
 */
gulp.task("images", () => {
  return gulp
    .src(gulpConfig.images.src)
    .pipe(newer(gulpConfig.images.dest))
    .pipe(imagemin([], { verbose: isProduction ? true : false }))
    .pipe(gulp.dest(gulpConfig.images.dest))
    .pipe(browserSync.stream())
})

/**
 * @task svg
 * Generates an SVG symbol for use in
 * theme and layouts
 */
gulp.task("svg", () => {
  return gulp
    .src(gulpConfig.svg.src)
    .pipe(newer(gulpConfig.svg.dest))
    .pipe(
      sprite(gulpConfig.svg.config).on("error", err =>
        log(err, err.toString(), "SVG Sprite")
      )
    )
    .pipe(gulp.dest(gulpConfig.svg.dest))
    .pipe(browserSync.stream())
})

/**
 * @task clean
 * Cleans the build and temp directories
 */
gulp.task("clean", () => {
  return del([gulpConfig.tmp, gulpConfig.build], { dot: true })
})

/**
 * Execute SSG with Build Arguments based
 * upon environment variables
 * @param {Function} cb
 */
function build(cb) {
  const args = gulpConfig.generator.args.default.concat(
    gulpConfig.generator.args[argsType] || []
  )

  process.env.NODE_ENV = env
  process.env[generatorEnvVar] = env
  console.log(generatorEnvVar)

  const generator = spawn(gulpConfig.generator.command, args, { env: process.env, stdio: "pipe", encoding: "utf-8" })

  generator.stdout.on("data", data => {
    log(null, data.toString(), gulpConfig.generator.label)
  })

  generator.stderr.on("data", data => {
    log(null, data.toString(), gulpConfig.generator.label)
  })

  generator.on("error", err => {
    log(err, err.toString(), gulpConfig.generator.label)
    cb("Build failed")
    process.exit(1)
  })

  generator.on("close", code => {
    browserSync.reload()
    cb()
  })
}

/**
 * Logs errors and messages to the
 * console
 *
 * @param {Error} err
 * @param {String} log
 * @param {String} name
 */
function log(err, log, name) {
  const messages = log.replace(/^,|,$/g, "").split("\n") // Get rid leading/trailing commas
  const spacer = " ".repeat(name.length + 2) // Indent additional lines

  if (err) {
    util.beep()
    browserSync.notify(err.message)
  }

  messages.forEach((message, i) => {
    if (i === 0) {
      util.log("[" + util.colors.blue(name) + "]", message)
    } else {
      util.log(spacer, message)
    }
  })
}

function indexSearch() {
  const CONTENT_PATH_PREFIX = `${__dirname}/hugo/content/blog`;
  log(null, "Building search index", gulpConfig.generator.label)

  const indexPages = function () {
    const pagesIndex = [];
    const filenames = fs.readdirSync(CONTENT_PATH_PREFIX);
    filenames.forEach(filename => {
      log(null, "Parsing file for indexing: " + filename, gulpConfig.generator.label)
      pagesIndex.push(processFile(path.join(CONTENT_PATH_PREFIX, filename), filename))
    })

    return pagesIndex;
  };

  const processFile = function (abspath, filename) {
    let pageIndex;
    if (S(filename).endsWith(".html")) {
      pageIndex = processHTMLFile(abspath, filename);
    } else {
      pageIndex = processMDFile(abspath, filename);
    }

    return pageIndex;
  };

  const processHTMLFile = function (abspath, filename) {
    const content = fs.readFileSync(abspath);
    const pageName = S(filename).chompRight(".html").s;
    const href = S(abspath)
      .chompLeft(CONTENT_PATH_PREFIX).s;
    return {
      title: pageName,
      href: href,
      content: S(content).trim().stripTags().stripPunctuation().s
    };
  };

  const processMDFile = function (abspath, filename) {
    let content = fs.readFileSync(abspath, 'utf-8');
    let pageIndex;
    // First separate the Front Matter from the content and parse it
    content = content.split("+++");
    let frontMatter;
    try {
      frontMatter = toml.parse(content[1].trim());
    } catch (e) {
      log(e, e.message, gulpConfig.generator.label)
    }
    let href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(".md").s;
    // href for index.md files stops at the folder name
    if (filename === "index.md") {
      href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).s;
    }
    href = href.substring(1)
    // Build Lunr index for this page
    if (frontMatter) {
    pageIndex = {
      title: frontMatter.title,
      tags: frontMatter.tags,
      categories: frontMatter.categories,
      href: href,
      content: S(content[2]).trim().stripTags().stripPunctuation().s
    };

      return pageIndex;
    }
    return
  };

  fs.writeFileSync("hugo/static/js/lunr/PagesIndex.json", JSON.stringify(indexPages()));
  log(null, "Search index built", gulpConfig.generator.label)
}

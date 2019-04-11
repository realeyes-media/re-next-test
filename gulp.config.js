// Configures gulp build
// See gulpfile.babel.js for build pipeline
import { resolve } from "path"

export default function (env) {
  const src = "src/"
  const dest = "hugo/"
  const tmp = ".tmp/"
  const build = "dist/"
  const isProduction = process.env.NODE_ENV === "production"
  const branch = process.env.CI ? process.env.BITBUCKET_BRANCH : 'default'
  const override = process.env.REWEB_BASE

  // Hacking in the BaseURL. REWEB_URL will always win if set in the env
  let url = 'https://www.realeyes.com'
  if (override !== '') {
    url = override
  } else if (branch === 'dev') {
    url = 'https://dev-web.realeyes.dev'
  } else if (branch === 'stage') {
    url = 'https://stage-web.realeyes.dev'
  }
  console.log("BaseURL set to: " + url)

  return {
    src: src,
    dest: dest,
    tmp: tmp,
    build: build,
    generator: {
      label: "Hugo",
      command: 'hugo',
      args: {
        default: ["-v", "--source", resolve(dest), "--destination", resolve(build)],
        development: ["-b", "http://localhost:3000", "--buildDrafts", "--buildFuture", "--buildExpired"],
        preview: ["-b", "http://localhost:3000"],
        production: ["--baseURL", url]
      }
    },
    styles: {
      src: src + "css/*.css",
      watch: src + "css/**/*.css",
      dest: dest + "static/css",
      tmp: tmp + "css"
    },
    scripts: {
      src: src + "js/*+(js|jsx)",
      watch: src + "js/**/*+(js|jsx)",
      dest: dest + "static/js/",
      tmp: tmp + "js/"
    },
    images: {
      src: src + "img/**/*.+(png|jpg|jpeg|gif|svg|webp)",
      watch: src + "img/**/*.+(png|jpg|jpeg|gif|svg|webp)",
      dest: dest + "static/img/"
    },
    svg: {
      src: src + "img/**/*.svg",
      watch: src + "img/**/*.svg",
      dest: dest + "static/svg/",
      config: {
        dest: ".",
        mode: {
          symbol: {
            sprite: "sprite.symbol.svg",
            prefix: "svg-%s",
            dest: "."
          }
        },
        example: (isProduction) ? false : true
      }
    }
  }
}

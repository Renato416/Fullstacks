// karma.conf.cjs
const path = require("path");

module.exports = function (config) {
  config.set({
    // Frameworks
    frameworks: ["jasmine"],

    // Archivos de test
    files: [
      "src/_tests_/**/*.spec.ts",
      "src/_tests_/**/*.spec.tsx"
    ],

    // Preprocesadores
    preprocessors: {
      "src/_tests_/**/*.spec.ts": ["webpack", "sourcemap"],
      "src/_tests_/**/*.spec.tsx": ["webpack", "sourcemap"]
    },

    // Configuración de Webpack
    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: [path.resolve(__dirname, "src"), "node_modules"]
      },
      module: {
        rules: [
          // TypeScript / TSX
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: "ts-loader",
                options: {
                  configFile: "tsconfig.karma.json",
                  transpileOnly: true
                }
              }
            ],
            exclude: /node_modules/
          },
          // CSS
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          // Assets (imágenes)
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: "asset/resource",
            generator: {
              filename: "assets/[name][ext]" // evita errores 404
            }
          }
        ]
      }
    },

    webpackMiddleware: {
      stats: "errors-only",
      // evita logs excesivos
      noInfo: true
    },

    // Reporteros
    reporters: ["progress"],

    // Navegadores
    browsers: ["ChromeHeadless"],

    // Ejecución única
    singleRun: true,

    // Tiempo máximo de espera
    browserNoActivityTimeout: 60000,

    // Configuración para React Testing Library y act()
    client: {
      jasmine: {
        random: false
      },
      clearContext: false
    },

    // Evita errores con act() y React 18+
    browserConsoleLogOptions: {
      level: "error"
    },

    // Servir assets estáticos desde webpack
    proxies: {
      "/assets/": "/base/src/assets/"
    }
  });
};

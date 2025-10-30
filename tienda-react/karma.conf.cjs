const path = require("path");

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      "src/_tests_/**/*.spec.ts",
      "src/_tests_/**/*.spec.tsx"
    ],
    preprocessors: {
      "src/_tests_/**/*.spec.ts": ["webpack", "sourcemap"],
      "src/_tests_/**/*.spec.tsx": ["webpack", "sourcemap"]
    },
    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        modules: [path.resolve(__dirname, "src"), "node_modules"]
      },
      module: {
        rules: [
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
          // ✅ Soporte para CSS
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
          },
          // ✅ Soporte para imágenes
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            type: "asset/resource"
          }
        ]
      }
    },
    reporters: ["progress"],
    browsers: ["ChromeHeadless"],
    singleRun: true
  });
};

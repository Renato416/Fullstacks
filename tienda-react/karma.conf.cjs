module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/_tests_/**/*.spec.tsx' // Todos tus tests
    ],
    preprocessors: {
      'src/_tests_/**/*.spec.tsx': ['webpack', 'sourcemap']
    },
    webpack: {
      mode: 'development',
      resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
      devtool: 'inline-source-map'
    },
    reporters: ['progress'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    mime: {
      'text/x-typescript': ['ts','tsx']
    }
  });
};

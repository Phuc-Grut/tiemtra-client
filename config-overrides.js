module.exports = function override(webpackConfig, env) {
  const oneOfRule = webpackConfig.module.rules.find((rule) =>
    Array.isArray(rule.oneOf)
  );

  if (oneOfRule) {
    oneOfRule.oneOf.forEach((rule) => {
      if (
        rule.use &&
        rule.use[0] &&
        typeof rule.use[0] === 'object' &&
        rule.use[0].loader &&
        rule.use[0].loader.includes('@svgr/webpack')
      ) {
        rule.test = /\.(svg)$/;
        rule.exclude = [/node_modules\/@ckeditor/];
        rule.use[0].options = {
          ...rule.use[0].options,
          throwIfNamespace: false,
        };
      }
    });

    oneOfRule.oneOf.unshift({
      test: /\.svg$/,
      include: [/node_modules\/@ckeditor/],
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    });
  }

  return webpackConfig;
};
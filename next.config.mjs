/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        sequelize: 'commonjs sequelize',
      });
    }

    config.module.rules.push({
      test: /node_modules[\\/]sequelize[\\/]lib[\\/]dialects[\\/]abstract[\\/]connection-manager\.js/,
      use: {
        loader: 'string-replace-loader',
        options: {
          search: 'require\\((.+?)\\)',
          replace: 'require.resolve($1)',
          flags: 'g',
        },
      },
    });

    return config;
  },
};

export default nextConfig;

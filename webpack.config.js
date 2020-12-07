const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

// Configuration adapted from https://www.typescriptlang.org/docs/handbook/react-&-webpack.html#create-a-webpack-configuration-file.
module.exports = {
    mode: 'production',

    // https://webpack.js.org/concepts/entry-points/
    entry: {
        links: './typescript/scripts/links.ts',
        ready: './typescript/scripts/ready.ts',
        theme: './typescript/scripts/theme.ts',

        404: './404.ts',
        index: './index.ts',
        tools: './tools/script.tsx',

        internet: './internet/script.tsx',
    },

    output: {
        filename: '[name].min.js',
        path: __dirname + '/assets/scripts/internal',
    },

    optimization: {
        chunkIds: 'deterministic',
        moduleIds: 'deterministic',

        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },

    performance: {
        hints: false,
    },

    // Enable sourcemaps for debugging webpack's output.
    // devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.ts', '.tsx', '.js', '.jsx'],

        // Add aliases to avoid bundling the same package several times.
        alias: {
            'safe-buffer': path.resolve(__dirname, 'node_modules/safe-buffer/'),
        },

        fallback: {
            'stream': require.resolve('stream-browserify'),
        },
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: 'ts-loader' },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            // { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
        ],
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    },

    plugins: [
        new WebpackBuildNotifierPlugin(),
        new DuplicatesPlugin(),
    ],
};

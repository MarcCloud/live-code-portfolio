import webpack from 'webpack';
import { resolve, join } from 'path';

export default {
    context: __dirname,
    entry: [
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './app/index.js'
    ],
    output: {
        path: join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: '#source-map',
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                ISOMORPHINE_HOST: '"http:0.0.0.0"',
                ISOMORPHINE_PORT: 3000,
                NODE_ENV: JSON.stringify('development'),
                BABEL_ENV: JSON.stringify('development/client')
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
    module: {
        preLoaders: [{loader: 'isomorphine'}],
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel'],
            exclude: /node_modules/
        }]
    }
};

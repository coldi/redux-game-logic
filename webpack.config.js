import path from "path";
import webpack from "webpack";
import autoprefixer from "autoprefixer";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export const SRC_DIR = './src/';
export const BUILD_DIR = './build/';
export const DIST_DIR = './dist/';

export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || 3000;
export const URL = `http://${HOST}:${PORT}`;

const devServerEntries = [
    'webpack-dev-server/client?'+URL,
    'webpack/hot/dev-server' //'webpack/hot/only-dev-server'
];

export default (DEV_MODE) => ({
    entry: {
        app: (DEV_MODE
            ? devServerEntries
            : [])
            .concat([
                'babel-polyfill',
                SRC_DIR + 'styles/main.scss',
                SRC_DIR + 'main.js'
            ])
    },
    output: {
        path: path.resolve(DIST_DIR),
        publicPath: '/',
        filename: '[name].bundle.js'
    },

    target: 'web',

    debug: DEV_MODE,

    devtool: DEV_MODE
        ? 'eval-source-map'
        : 'source-map',

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loaders: (DEV_MODE
                    ? ['react-hot']
                    : [])
                    .concat([
                        queryLoader('babel', {
                            plugins: ['transform-runtime'],
                            presets: ['es2015', 'stage-0', 'react']
                        })
                    ]),
                exclude: /node_modules/
            },

            {
                test: /\.(css|scss)$/,
                loader: DEV_MODE
                    ? 'style!css?sourceMap&modules&localIdentName=[name]_[local]__[hash:base64:4]!postcss!sass?sourceMap'
                    : ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]__[hash:base64:6]!postcss!sass')
            },

            { test: /\.json$/, loader: 'json' },
            { test: /\.jpe?g/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
            { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
            { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png' },
            { test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg' }
        ]
    },

    postcss: [
        autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        })
    ],
    sassLoader: {
        includePaths: [path.resolve(SRC_DIR, 'styles')]
    },

    plugins: (DEV_MODE
        ? [ new webpack.HotModuleReplacementPlugin() ]
        : [
        new ExtractTextPlugin('style.css', {allChunks: false}),
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
            mangle: {screw_ie8: true, keep_fnames: true}
        })
    ]),

    resolve: {
        modulesDirectories: ['./node_modules/'],
        extensions: ['', '.js', '.jsx']
    }

});


function queryLoader(loader, query) {
    return loader + '?' + JSON.stringify(query);
}
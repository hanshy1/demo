const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        app: './src/main.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'DemoBundle.js',
    },
    plugin: [
        new VueLoaderPlugin()
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                appendTsSuffixTo: [/\.vue$/]
            }
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
]
    }
}
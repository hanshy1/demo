const path = require('path')

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'DemoBundle.js',
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: {
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            }
        }]
    }
}
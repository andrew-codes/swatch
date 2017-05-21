const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const getWebpackConfig = require('./../getWebpackConfig');

module.exports.name = 'build';
module.exports.exec = (inputs, flags) => {
    process.env.NODE_ENV = 'production';

    let optionsFromConfigFile = {};
    if (flags.config) {
        optionsFromConfigFile = require(path.resolve(process.cwd(), flags.config));
    }
    const options = Object.assign({}, optionsFromConfigFile, flags);

    const webpackConfig = getWebpackConfig(options);
    webpack(webpackConfig, (error) => {
        if (error) {
            throw new Error(error);
        }
    });
};

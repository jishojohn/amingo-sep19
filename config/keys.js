if (process.env.NODE_ENV === 'production'){
    console.log('ENV is production');
    module.exports = require('./keys_prod');
} else {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    console.log('ENV is development');
    module.exports = require('./keys_dev');
}
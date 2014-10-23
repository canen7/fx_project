var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../server/mailer/templates')
  , notifier = {
      service: 'postmark',
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      key: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    }

module.exports = {
  development: {
    db: 'mongodb://localhost/fx_project_dev',
    //db: 'mongodb://heroku_app30863453:654h6i1jniaftg2hb00aaaicet@ds047030.mongolab.com:47030/heroku_app30863453',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    }
  },

  test: {
    db: 'mongodb://heroku_app30863453:654h6i1jniaftg2hb00aaaicet@ds047030.mongolab.com:47030/heroku_app30863453',
    //db: 'mongodb://localhost/noobjs_test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    }  
  },
   
  production: {
    db: 'mongodb://heroku_app30863453:654h6i1jniaftg2hb00aaaicet@ds047030.mongolab.com:47030/heroku_app30863453',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Nodejs Express Mongoose Demo'
    },   
  }
}
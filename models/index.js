var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false
});

// define only takes 3 arguments: (1) table name, (2) table columns (3) methods
const Page = db.define('page',
{
  title: {type: Sequelize.STRING, allowNull: false},
  urlTitle: {type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.ENUM('open', 'closed')},
  date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
},
{
  getterMethods: {
    route () {return '/wiki/' + this.urlTitle;}
  },
  hooks: {
    beforeValidate: (page, title) => { //should add logic to require unique titles
      if (page.title) {
        let specialChars = /[^a-zA-Z0-9 :]/g; //non alphanumeric
        let whiteSpace = /\s+/g; //for white space
        page.urlTitle = page.title.replace(specialChars, '').replace(whiteSpace, '_').toLowerCase();
      }
      else {
        page.urlTitle = Math.random().toString(36).substring(2, 7);
      }
    }
  }
});

// Page.hook('beforeValidate', (page, title) => {
//         if (page.title) {
//         let specialChars = /[^a-zA-Z0-9 :]/g; //non alphanumeric
//         let whiteSpace = /\s+/g; //for white space
//         page.urlTitle = page.title.replace(specialChars, '').replace(whiteSpace, '_');
//       }
//       else {
//         page.urlTitle = Math.random().toString(36).substring(2, 7);
//       }
// });

const User = db.define('user', {
  name: {type: Sequelize.STRING, allowNull: false},
  email: {type: Sequelize.STRING, allowNull: false, validate: {isEmail: true}}
},
{
  getterMethods: {
    route() {return '/users/' + this.id;}
  }
});

Page.belongsTo(User, { as: 'author' });

module.exports = {db: db, Page: Page, User: User};

//READY TO ADD MORE VALIDATIONS
//http://docs.sequelizejs.com/manual/tutorial/models-definition.html#validations

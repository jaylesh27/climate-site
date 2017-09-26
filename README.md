# Carbon impact site
A site that will help a user determine his/her carbon impact.  [Link to website](https://cryptic-harbor-25365.herokuapp.com/)

In order to assess the user's climate impact, he/she must register and create an account on the site.  After account creation is completed, the user will be redirected to a survey that will ask the user questions about how much money they spend on categories such as transportation, utilities, groceries, and a miscellaneous category that includes items such as clothing and appliances.  After the user completes the survey, they will be directed to their user profile page which will take the answers from the survey and show the carbon impact as a result of their expenditures on the previously described categories.

# Built With
1.  MySQL as the database portion of the back-end
2.  [Sequelize](https://www.npmjs.com/package/sequelize) as the ORM
3.  [Express handlebars](https://www.npmjs.com/package/express-handlebars) semantic templating for the front-end
4.  [PassportJS](http://passportjs.org/) for local user authentication
5.  [Bcrypt](https://www.npmjs.com/package/bcrypt) for hashing a user passwords
6.  [Express](https://expressjs.com/) as the server side web application framework
7.  [Express-validator](https://www.npmjs.com/package/express-validator) middleware for validating user authentication

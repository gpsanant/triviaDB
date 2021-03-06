const triviaDB = require('./index');

(async() => {
    console.log(await triviaDB.getCategories())
    //works with either the id of the category or name
    console.log(await triviaDB.getCategoryInfo(17))
    console.log(await triviaDB.getCategoryInfo("History"))
    console.log(await triviaDB.getToken())
    console.log(await triviaDB.getGlobalQuestionsInfo())
    //replace unused parameters with null
    console.log(await triviaDB.getQuestions(3, null, 12))
})()
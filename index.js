const axios = require('axios');
const baseApiUrl = 'https://opentdb.com';
const categories = [{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]

module.exports = { getQuestions, getCategories, getCategoryInfo, getGlobalQuestionsInfo, getToken, resetToken }

async function get(url){
    return (await axios.get(url)).data;
}

/**
 * Retrieves at most 50 questions from the Open Trivia Database
 * @date 2020-08-21
 * @param {number} amount
 * @param {string} encoding
 * @param {string | number} category
 * @param {string} diffulty
 * @param {string} type
 * @param {string} token
 * @returns {any} A JSON of the questions requested
 */
async function getQuestions(amount, encoding, category, diffulty, type, token){
    if(encoding !== "urlLegacy" && encoding !== "url3986" && encoding !== "base64" && encoding)
        throw new Error("encoding must be urlLegacy, url3986, base64, or null");
    if(amount > 50 || amount < 0)
        throw new Error("Only at most 50 questions can be retrieved at a time");
    if(typeof category === 'string')
        category = categories.find((x) => x.name === category)
    if(diffulty !== 'hard' && diffulty !== 'medium' && diffulty !== 'easy' && diffulty)
        throw new Error("difficuly must be hard, easy, medium, or null");
    if(type !== "boolean" && type !== "multiple" && type)
        throw new Error("type must be the word boolean, multiple, or null");
    var url = `${baseApiUrl}/api.php?amount=${amount}`
    if(encoding) url += `&encode=${encoding}`
    if(category) url += `&category=${category.id || category}`
    if(diffulty) url += `&diffulty=${diffulty}`
    if(type) url += `&type=${type}`
    if(token) url += `&token=${token}`
    return await get(url);
}

/**
 * Get list of categories and their ids
 * @date 2020-08-21
 * @returns {any} A JSON of the category names and ids
 */
async function getCategories(){
    return await get(`${baseApiUrl}/api_category.php`)
}

/**
 * Get the info about questions in a category
 * @date 2020-08-21
 * @param {string | number} category
 * @returns {any} A JSON of the number of Total, Pending, Verified, and Rejected questions in the category
 */
async function getCategoryInfo(category){
    if(typeof category === 'string')
        category = categories.find((x) => x.name === category)
    return await get(`${baseApiUrl}/api_count.php?category=${category.id}`)
}

/**
 * Get the info about questions in the database
 * @date 2020-08-21
 * @returns {any} A JSON of the number of Total, Pending, Verified, and Rejected questions in the database and in each category
 */
async function getGlobalQuestionsInfo(){
    return await get(`${baseApiUrl}/api_count_global.php`)
}

/**
 * Gets a token from the database
 * @date 2020-08-21
 * @returns {any} A JSON containing a token for future requests
 */
async function getToken(){
    return await get(`${baseApiUrl}/api_token.php?command=request`)
}

/**
 * Resets a token
 * @date 2020-08-21
 * @param {any} token
 * @returns {any}
 */
async function resetToken(token){
    return await get(`${baseApiUrl}/api_token.php?command=reset&token=${token}`)
}
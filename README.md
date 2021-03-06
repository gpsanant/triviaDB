# triviaDB
A JavaScript Library for the Open Trivia Database
<br>
For questions, contact me at gpsanant@gmail.com

# Installation
```npm i triviadb```

# Notes
The API appends a "Response Code" to each API Call to help tell developers what the API is doing.
<br><br>
* Code 0: Success Returned results successfully.<br>
* Code 1: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)<br>
* Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)<br>
* Code 3: Token Not Found Session Token does not exist.<br>
* Code 4: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.<br><br>

The API supports Base64 Encoding, URL Encoding (RFC 3986), Legacy URL encoding, and defaults to HTML Character Entities (http://www.amp-what.com/).
<br>
For Base64 Encoding, pass in "base64" as the encoding parameter. <br>
For URL Encoding, pass in "url3986" as the encoding parameter. <br>
For Legacy URL Encoding, pass in "urlLegacy" as the encoding parameter.<br>


# Example Usage
```js script
const triviaDB = require('triviadb');

(async() => {
    console.log(await triviaDB.getCategories())
    //works with either the id of the category or name
    console.log(await triviaDB.getCategoryInfo(17))
    console.log(await triviaDB.getCategoryInfo("History"))
    console.log(await triviaDB.getToken())
    console.log(await triviaDB.getGlobalQuestionsInfo())
    //replace unused parameters with null
    console.log(await triviaDB.getQuestions(3, null, "hard")) //3 hard questions.
})()
```

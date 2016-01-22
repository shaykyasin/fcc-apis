   
# FCC API Challenges
------------------------------

This dependency free node.js app was written as part of the [Freecodecamp API challenges](http://www.freecodecamp.com/map#nested-collapseAPIProjects) . A live version of the app is [here](https://shaykyasin-fcc-apis.herokuapp.com/).

## 1. Timestamp Microservice
### API Endpoint:
```
https://shaykyasin-fcc-apis.herokuapp.com/timestamp
```
The contracts of the app are as follows:
> User stories:
 * I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
 * If it does, it returns both the Unix timestamp and the natural language form of that date.
 * If it does not contain a date or Unix timestamp, it returns null for those properties.

#### Usage
Send "GET" requests to the above endpoint with queries as described above.
```
https://shaykyasin-fcc-apis.herokuapp.com/timestamp/January%2019,%202016
https://shaykyasin-fcc-apis.herokuapp.com/timestamp/1453218679

```
#### Response
```js
{"unix":1453218679,"natural":"January 19, 2016"}
```
---
## 2. Request Header Parser
### API Endpoint:
```
https://shaykyasin-fcc-apis.herokuapp.com/whoami
```
The contracts of the app are as follows:
> User stories:
* I can get the IP address, language and operating system for my browser.

#### Usage
Just send a "GET" request to the endpoint.
#### Response
```js
{"ip-address":"123:123:123:123","language":"en-GB","operating-system":"Macintosh; Intel Mac OS X 10_9_5"}
```
---
## 3. URL Shortener
### API Endpoint:
```
https://shaykyasin-fcc-apis.herokuapp.com/shorty
```
The contracts of the app are as follows:
> User stories:
* I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
* If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
* When I visit that shortened URL, it will redirect me to my original link.

#### Usage
Send a "GET" request to the endpoint with the URL you wish to shorten.
```
https://shaykyasin-fcc-apis.herokuapp.com/shorty/http://www.freecodecamp.com
```
#### Response
```js
{"status":"success","shorturl":"https://shaykyasin-fcc-apis.herokuapp.com/shorty/1"}
```
The returned 'shorturl' can now be used and it will redirected to the appropriate url.

---
## 4. File Metadata Microservice
### API Endpoint:
```
https://shaykyasin-fcc-apis.herokuapp.com/sizer/data
```
The contracts of the app are as follows:
> User stories:
*  I can submit a FormData object that includes a file upload.
* When I submit something, I will receive the file size in bytes within the JSON response

#### Usage
"POST" a FormData Object through XHR to the above endpoint.
#### Response
JSON object containing file size in bytes.
```js
{fileSize: 1613}
```

---
Released under the MIT License

Copyright (c) 2015 Shayk Yasin
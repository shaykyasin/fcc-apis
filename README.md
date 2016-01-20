   
# FCC API Challenges
------------------------------

This dependency free node.js app was written as part of the [Freecodecamp API challenges](http://www.freecodecamp.com/map#nested-collapseAPIProjects) . A live version of the app is [here](https://shaykyasin-fcc-apis.herokuapp.com/).

## Timestamp Microservice
------------------------------
API Endpoint:
```
https://shaykyasin-fcc-apis.herokuapp.com/timestamp
```
The contracts of the app are as follows:
> User stories:
> * I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016).
> * If it does, it returns both the Unix timestamp and the natural language form of that date.
> * If it does not contain a date or Unix timestamp, it returns null for those properties.

#### Usage
Send 'GET' requests to the above endpoint with queries as described above.
```
https://shaykyasin-fcc-apis.herokuapp.com/timestamp/January%2019,%202016
https://shaykyasin-fcc-apis.herokuapp.com/timestamp/1453218679

```
#### Response
```
{"unix":1453218679,"natural":"January 19, 2016"}

```
## Request Header Parser
------------------------------
API Endpoint:
```
https://shaykyasin-fcc-apis.herokuapp.com/whoami

```
The contracts of the app are as follows:
> User stories:
> * I can get the IP address, language and operating system for my browser.
#### Usage
Just send a 'GET' request to the endpoint.
#### Response
```
{"ip-address":"123:123:123:123","langguage":"en-GB","operating-system":"Macintosh; Intel Mac OS X 10_9_5"}
```
Released under the MIT License

Copyright (c) 2015 Shayk Yasin
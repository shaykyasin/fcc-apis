var http = require('http')
var url = require('url')
var fs = require('fs')

var services = {
	timestamp: require('./timestamp'),
	whoami: require('./whoami'),
	shorty: require('./shorty')
}
var hits = 0

var server = http.createServer(function (request, response) {
	hits++
	var query = decodeURI(url.parse(request.url, true).path.substr(1))
	var servicesList = ['timestamp', 'whoami', 'shorty']
	var i = 0
	console.log('Requests served since up: ' + hits)
	if(query == '') {
		staticServe('index', response)
	} else if (query == 'style.css') {
		staticServe('style', response)
	} else {
		for(var j; j=servicesList[i]; i++) {
			if(query.substr(0, j.length) == j) {
				query = query.substr(j.length + 1)
				if (query || i == 1) {
					services[j](query, request, response)
				} else{
					staticServe(j, response)
				}
				break
			}
		}
	}

	if(i == servicesList.length) {
		staticServe('index', response)
	}	
})
server.listen((process.env.PORT || 5000))

function staticServe(file, res) {
	file = file + '.html'
	fs.createReadStream(file).pipe(res)
}
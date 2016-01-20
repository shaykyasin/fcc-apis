var http = require('http')
var url = require('url')
var fs = require('fs')

var services = {
	timestamp: require('./timestamp'),
	whoami: require('./whoami')
}
var hits = 0

var server = http.createServer(function (request, response) {
	hits++
	var query = decodeURI(url.parse(request.url, true).pathname.substr(1))
	var servicesList = ['timestamp', 'whoami']
	var i = 0
	console.log('Requests served: ' + hits)
	if(query == '') {
		staticServe('index', response)
	} else if (query == 'style.css') {
		staticServe('style', response)
	} else {
		for(var j; j=servicesList[i]; i++) {
			if(query.substr(0, j.length) == j) {
				query = query.substr(j.length)
				if (query || j == 'whoami') {
					response.writeHead(200, {"Content-Type": "application/json"})
					response.end(services[j](query, request))
				} else {
					staticServe(j, response)
				}
				break
			}
		}
	}

	if(i == servicesList.length) {
		staticServe('index', response)
	}	
});
server.listen((process.env.PORT || 5000))

function staticServe(file, res) {
	file = file + '.html'
	fs.createReadStream(file).pipe(res)
}
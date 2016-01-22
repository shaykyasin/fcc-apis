var fs = require('fs')
var urlList = {urls:2,"http://www.freecodecamp.com/":1,"https://github.com/shaykyasin/fcc-apis":2}

function sendError(res, msg){
	res.writeHead(200, '{"Content-Type": "application/json"')
	res.end(JSON.stringify({ status: 'error', message: msg }))
}

module.exports = function(query, req, res) {
	if (!isNaN(query) || /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/.test(query)) {
		if(isNaN(query)){
			if(query.charAt(query.length - 1) != '/') query = query + '/'
			if(urlList.hasOwnProperty(query)) {
				urlList.urls = urlList[query]
			} else {
				urlList[query] = ++urlList.urls
				fs.writeFile('redirect.json', JSON.stringify(urlList), function(err){
					if (err) throw err
					console.log('Url ' + query + 'was added at ' + urlList.urls)
				})
			}
			res.writeHead(200, '{"Content-Type": "application/json"')
			res.end(JSON.stringify({
				status: 'success',
				shorturl: req.headers.host + '/shorty/' + urlList.urls
			}))	
		} else {
			query = parseInt(query)
			if(query <= urlList.urls) {
				for(var urlname in urlList) {
					if( urlList[urlname] === query  && urlname != 'urls') {
						res.writeHead(301, {Location: urlname})
						res.end()
						break
					}
				}
			} else {
				sendError(res, 'Not Found. Try creating a new one')
			}
		}
	} else {
		sendError(res, 'Wrong Usage. Please take a look here: ' + req.headers.host + '/shorty')
	}
}



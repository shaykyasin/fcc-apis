var json = JSON.parse(require('fs').readFileSync('redirect.json', 'utf8'))

function sendError(res, msg){
	res.writeHead(200, '{"Content-Type": "application/json"')
	res.end(JSON.stringify({ status: 'error', message: msg }))
}

module.exports = function(query, req, res) {
	console.log(query)
	if (!isNaN(query) || /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/.test(query)) {
		if(isNaN(query)){
			if(query.charAt(query.length - 1) != '/') query = query + '/'
			if(json.hasOwnProperty(query)) {
				json.urls = json[query]
			} else {
				json[query] = ++json.urls
				fs.writeFile('redirect.json', JSON.stringify(json), function(err){
					if (err) throw err
					console.log('Url ' + query + 'was added at ' + json.urls)
				})
			}
			res.writeHead(200, '{"Content-Type": "application/json"')
			res.end(JSON.stringify({
				status: 'success',
				shorturl: req.headers.host + '/shorty/' + json.urls
			}))	
		} else {
			query = parseInt(query)
			if(query <= json.urls) {
				for(var urlname in json) {
					if( json[urlname] === query  && urlname != 'urls') {
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
		sendError(res, 'Wrong Usage. Please take a look here: ' + req.headers.host + '/')
	}
}



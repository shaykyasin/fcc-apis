var https = require('https')
var url = require('url')
var recent = [{"query":"witcher 3","time":"2016-01-22T14:08:30.208Z"},{"query":"witcher 3","time":"2016-01-22T14:08:30.208Z"},{"query":"witcher 3","time":"2016-01-22T10:41:21.006Z"},{"query":"witcher 3","time":"2016-01-22T10:29:08.277Z"},{"query":"witcher 3","time":"2016-01-22T14:08:30.208Z"},{"query":"witcher 3","time":"2016-01-22T10:21:40.490Z"},{"query":"witcher 3","time":"2016-01-22T07:02:27.489Z"},{"query":"witcher 3","time":"2016-01-22T06:29:19.622Z"},{"query":"witcher 3","time":"2016-01-22T06:10:08.969Z"},{"query":"witcher 3","time":"2016-01-22T06:07:16.815Z"}]

module.exports = function(query, req, response) {
	if(query == 'recent/' || query == 'recent'){
		response.writeHead(200, '{"Content-Type": "application/json"}')
		response.end(JSON.stringify(recent))
	} else {
		var parsedReq = url.parse(query, true)
		var offset = parsedReq.query.offset ? '&start=' + parsedReq.query.offset : ''
		var endPoint  = 'https://www.googleapis.com/customsearch/v1?cx=' + process.env.CSE_ID + 
			'&key=' + process.env.GAE_KEY + '&searchType=image&q=' + parsedReq.pathname + offset
		var data = ''
		var results = []

		recent.push({query: decodeURI(parsedReq.pathname), time: new Date().toISOString()})
		recent.shift()

		https.get(endPoint, function(res){
			res.on('data', function(chunk) {
				data += chunk
			})

			res.on('end', function(){
				data = JSON.parse(data)
				if(data.items) {
					data.items.forEach(function (val){
						results.push({
							url: val.link,
							thumbnail: val.image.thumbnailLink,
							alt: val.snippet,
							context: val.image.contextLink
						})
					})
				} else {
					results.push({
						error: 400,
						message: 'An error was encountered. Please try setting offset to a lower value'
					})
				}
				response.writeHead(200, '{"Content-Type": "application/json"}')
				response.end(JSON.stringify(results))
			})
		})
	}
}
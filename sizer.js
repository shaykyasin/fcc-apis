module.exports = function(query, req, res) {
	if(req.method == 'POST') {
		var data = ''
		req.on('data', function (chunk) {
    		data += chunk
  		})

		req.on('end', function(){
			data = data.split('\r\n')
			for(var i=0; i < 4; i++) {
				data.shift()
			}
			for(var i=0; i < 2; i++) {
				data.pop()
			}
			data = data.join()
			res.writeHead(200, '{"Content-Type": "application/json"}')
			res.end(JSON.stringify({fileSize: data.length}))
		})
	}
}
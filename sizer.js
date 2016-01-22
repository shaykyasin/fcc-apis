module.exports = function(query, req, res) {
	if(req.method == 'POST') {
		var data = ''
		req.on('data', function (chunk) {
    		data += chunk
  		})

		req.on('end', function(){
			data = data.split('\r\n')
			res.writeHead(200, '{"Content-Type": "application/json"}')
			if (data.length == 7) {
				res.end(JSON.stringify({fileSize: data[4].length}))
			} else {
				for(var i=0; i < 4; i++) {
					data.shift()
				}
				for(var i=0; i < 2; i++) {
					data.pop()
				}
				data = data.join()
				res.end(JSON.stringify({fileSize: data.length}))
			}
		})
	}
}
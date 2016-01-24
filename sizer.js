module.exports = function(query, req, res) {
	if(req.method == 'POST') {
		var data = ''
		req.on('data', function (chunk) {
    		data += chunk
  		})

		req.on('end', function(){
			data = data.split('\r\n')
			var newdata = data[4]
			for(var i=5; i < data.length - 2; i++) {
				newdata += '\r\n' + data[i]
			}
			res.writeHead(200, '{"Content-Type": "application/json"}')
			res.end(JSON.stringify({fileSize: newdata.length}))
		})
	}
}
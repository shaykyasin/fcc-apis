var fs = require('fs')

module.exports = function(query, req, res) {
	if(req.method == 'POST') {
		var ip = req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"] : req.connection.remoteAddress
		ip = ip.replace(/[\/:\\]/g, '')
		var file = '/tmp/' + ip + 'at' + new Date().getTime()
		var tempFile = fs.createWriteStream(file)

		req.pipe(tempFile)

		req.on('end', function(){
			tempFile.on('finish', function(){
				fs.readFile(file, function(err, data){
					if(err) throw err
					data = data.toString().split('\r\n')
					data = data[0] + '\r\n' + data[1] + '\r\n' + data[2] + '\r\n' + data[3] + '\r\n' + data[data.length - 2] + '\r\n' + data[data.length - 1] + '\r\n' 
					fs.stat(file, function(err, stat){
						if(err) throw err
						res.writeHead(200, '{"Content-Type": "application/json"}')
						res.end(JSON.stringify({fileSize: stat.size - data.length}))
						fs.unlink(file)
					})
				})
			})
		})
	}
}
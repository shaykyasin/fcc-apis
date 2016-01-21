var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getTimestamp(val) {
	val = parseInt(val)
	var d = new Date(val)
	return {
		unix: val/1000,
		natural: months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() 
	}
}

module.exports = function(query, req, res) {
	if(req.method == 'GET')	{
	var reply = {}
		if (isNaN(query)) {
			var d = new Date(query + ' 00:00:00')
			if(d == 'Invalid Date') {
				reply = {
					unix: null,
					natural: null
				}
			} else {
				reply = getTimestamp(d.getTime())
			}
		} else {
			reply = getTimestamp(query + '000')
		}
		res.writeHead(200, '{"Content-Type": "application/json"')
		res.end(JSON.stringify(reply))
	}
}
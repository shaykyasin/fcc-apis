var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function getTimestamp(val) {
	val = parseInt(val)
	var d = new Date(val)
	return {
		unix: val/1000,
		natural: months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() 
	}
}

module.exports = function(query, req) {
	if(req.method == 'GET')	{
	query = query.substr(1)
	var res = {}
		if (isNaN(query)) {
			var d = new Date(query + ' 00:00:00')
			if(d == 'Invalid Date') {
				res = {
					unix: null,
					natural: null
				}
			} else {
				res = getTimestamp(d.getTime())
			}
		} else {
			res = getTimestamp(query + '000')
		}
		return JSON.stringify(res)
	}
}
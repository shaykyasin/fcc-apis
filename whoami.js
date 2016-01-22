module.exports = function(query, req, res) {
	if(req.method == 'GET') {
		var ip = req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"] : req.connection.remoteAddress
		var ua = req.headers['user-agent']
		var lang = req.headers['accept-language']
		var langend = lang.indexOf(',') < lang.indexOf(';') ? lang.indexOf(',') : lang.indexOf(';')

		ua = ua.substring(ua.indexOf('(') + 1, ua.indexOf(')'))
		lang = lang.substring(0, langend)

		res.writeHead(200, '{"Content-Type": "application/json"}')
		res.end(JSON.stringify({
				"ip-address": ip,
				"language": lang,
				"operating-system": ua
			}))
	}
}
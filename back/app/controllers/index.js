var fs = require("fs");

module.exports = function (app, db) {
	var res = {};

	fs.readdirSync(__dirname).forEach(function(file) {
		if (file != null && file.match(/\.js$/) != null && file != 'index.js') {
			var name = file.replace('.js', '');
    	
    		res[name] = require('./' + file)(app);
		}
		return res;
	});
}
(function( window, undefined ){ 
	var _app = {
		title: "Control de Gastos APP",
		db_name: "db_app",	
		version: "0.0.1",
	};

	var _db = {
		executeSQL: function (statements,success,error) {
			var db = openDatabase(window.app.db_name, '1.0', window.app.db_name, 2 * 1024 * 1024);
			db.transaction(function (tx) {
			   tx.executeSql(statements,[],success,error); 
			});
		},	
	}
	
	var _typeOf = function (obj) {
		return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
	}

	var _stringToFunction = function(str) {
		var arr = str.split(".");
		var fn = (window || this);
		for (var i = 0, len = arr.length; i < len; i++) {
			fn = fn[arr[i]];
		}

		if (typeof fn !== "function") {
			throw new Error("function not found");
		}

		return  fn;
	};
	
	window.findClass = _stringToFunction;
	window.typeOf = _typeOf;
	window.app = _app;
	window.db = _db;
})( window );
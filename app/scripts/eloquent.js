(function( window, undefined ){ 
	function _eloquent() {}	
	
	/*	
		Find function: @id: ID of de model	
	*/
	
	_eloquent.prototype.find = function (id,_success,_error) {
		var o = this;
		var timestamp = o['_timestamp'] ? o['_timestamp'] : false;		
		var tableName = o['_table'] || o.constructor.name;
		var success = _success || function () {};
		var error   = _error || function () {};
		
		var sql = squel.select()
					.from(tableName)
					.where("id = " + id)
					.toString(); 		
					
		window.db.executeSQL(sql.toString(), function(tx,result){
			var len = result.rows.length, i;
			if (len == 0) return error(tx,"No existe el campo ");
			var obj = result.rows.item(0);
			
			for(var a in obj) { 
				if (a === "_table" || a ==="_timestamp") continue;
				switch(window.typeOf(o[a])) {
					case 'boolean':
					case 'string':
					case 'number':
					case 'undefined':
						o[a] = obj[a]; 
						break;
				}		
			}
			return success(o);
			
		} ,function (tx,err) { 
			error(err.message);
		});	
	};
	
	/*	
		Save function: Insert of updete of de model
	*/
	
	_eloquent.prototype.save = function(_success,_error) { 
		var success = _success || function () {};
		var error   = _error || function () {};
		var o = this;
		var timestamp = o['_timestamp'] ? o['_timestamp'] : false;		
		var tableName = o['_table'] || o.constructor.name;
		
		var sql;
		if (o["id"] === 0) {
			sql = squel.insert().into(tableName);
			if (timestamp) {
				sql = sql.set("created_at",Date());
			}
		} else {
			sql = squel.update().table(tableName).where("id = " + o["id"]);		
		}
		if (timestamp) {
				sql = sql.set("modified_at",Date()); 
		}	
		for(var a in o) { 
			if (a === "_table" || a ==="_timestamp" || a === "id") continue;
			switch(window.typeOf(o[a])) {
				case 'boolean':
				case 'string':
				case 'number':
				case 'undefined':
					if (o[a] !== undefined ) {
						sql = sql.set(a, o[a]);
					} else {
						sql = sql.set(a,null);
					}	
					break;
			}		
		} 
		window.db.executeSQL(sql.toString(), function(tx,result){
			if (o['id'] === 0) {
				o.id = result.insertId;	
			}
			success(o);
		},function (tx,err) { 
			error(err.message);
		}); 	
	};
	
	/*	
		ALL function: Insert of updete of de model
	*/
	_eloquent.prototype.all = function(_success,_error) { 
		var success = _success || function () {};
		var error   = _error || function () {};
		var o = this;
		var timestamp = o['_timestamp'] ? o['_timestamp'] : false;		
		var tableName = o['_table'] || o.constructor.name;
		
		var sql = squel.select()
					.from(tableName) 
					.toString(); 		
					
					
		window.db.executeSQL(sql.toString(), function(tx,result){
			var len = result.rows.length; 
			var res = [];
			for (var i = 0; i < len ; i++) {
				var obj = result.rows.item(i);
				var temp = window.findClass(o.constructor.name); 
				for(var a in obj) { 
					if (a === "_table" || a ==="_timestamp") continue;
					switch(window.typeOf(o[a])) {
						case 'boolean':
						case 'string':
						case 'number':
						case 'undefined':
							temp[a] = obj[a]; 
							break;
					}		
				}
				
				res.push(temp);
			} 
			return success(res);
			
		} ,function (tx,err) { 
			error(err.message);
		});	
		
	};
	
	
	window.Eloquent = _eloquent;
})( window );
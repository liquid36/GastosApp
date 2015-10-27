




//save(v);



function testing()
{ 
	//window.db.executeSQL("DROP TABLE viajes");
	//window.db.executeSQL("CREATE TABLE IF NOT EXISTS viajes (id INTEGER PRIMARY KEY ASC, Origen TEXT, Destino TEXT,created_at TEXT, modified_at TEXT)");
	
	/*var v = new Viaje();	
	v.Destino = "Hola";
	v.save(function(o){console.log("ID GUARDADO " + o.id);},function(transaction, error){console.log("Error: " + error.message);});
	
	var v = new Viaje();	
	v.Destino = "chau";
	v.save(function(o){console.log("ID GUARDADO " + o.id);},function(transaction, error){console.log("Error: " + error.message);});
	*/
	
	/*var all = new Viaje().all(function(res){ 
		console.log(res); 
	});*/
	
	var all = new Viaje().where("Origen = ''").first(function(res){ 
		console.log(res); 
	}, function (msg) { console.log(msg) } );
	
	
	/*v = new Viaje();
	v.find(1,
		function(obj){
			console.log(obj.getDestino());
		},
		function(msg){ 
			console.log(msg); 
		}
	);*/
	
}


/*
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

db.transaction(function (tx) {
   tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
   tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
   tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
});

db.transaction(function (tx) {
   tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
      var len = results.rows.length, i;
      //msg = "<p>Found rows: " + len + "</p>";
      //document.querySelector('#status').innerHTML +=  msg;
	
      for (i = 0; i < len; i++){
         alert(results.rows.item(i).log );
      }
	
   }, null);
});

var stringToFunction = function(str) {
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
Example:

my = {};
my.namespaced = {};
(my.namespaced.MyClass = function() {
  console.log("constructed");
}).prototype = {
  do: function() {
    console.log("doing");
  }
};

var MyClass = stringToFunction("my.namespaced.MyClass");
var instance = new MyClass();
instance.do();





*/
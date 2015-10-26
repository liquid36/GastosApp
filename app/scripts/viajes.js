
function Viaje() {
	this._table = "viajes";
	this._timestamp = true;
	this.id = 0;
    this.Origen = "";
    this.Destino = "";
}

Viaje.prototype = new window.Eloquent();
Viaje.prototype.constructor = Viaje;
Viaje.prototype.getOrigen = function() {
    return this.Origen;
};
Viaje.prototype.getDestino = function() {
    return this.Destino;
};


var bit = {
	position: null,
	status: 0,
	height: 0,
	width: 0,

	create: function(x, y, h, w, stat){
		var obj = Object.create(this);
		obj.position = vector.create(x, y);
		obj.height = h;
		obj.width = w;
		obj.status = stat;
		return obj;
	},

	setStatus: function(stat){
		this.status = stat;
	},

	getStatus: function(){
		return this.status;
	}
}
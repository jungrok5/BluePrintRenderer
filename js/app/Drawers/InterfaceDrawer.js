var InterfaceDrawer = Class({
	constructor: function (nodes, drawer) {
		this.nodes = nodes;
		this.drawer = drawer;
		this.scaleLabel = null;
		this.menuRect = null;
		this.selectRect = null;
	},
	render: function () {
		var draw = this.drawer.group();
		this.scaleLabel = this.drawScaleLabel();
		this.scaleLabel.style('pointer-events', 'none')
		this.menuRect = this.drawMenuRect();
		this.menuRect.style('pointer-events', 'none')
		draw.add(this.menuRect);
		draw.add(this.scaleLabel);
		return draw;
	},
	setScaleLabelText: function (step) {
		if (step > 0)
			step = "+" + step;
		else if (step === 0)
			step = "1:1"
		this.scaleLabel.text("Zoom {0}".format(step));
	},
	drawMenuRect: function () {
		var rect = this.drawer.rect(this.drawer.width(), 48);
		rect.opacity(0.4);
		rect.backward();
		return rect;
	},
	drawScaleLabel: function () {
		var draw = this.drawer.group();
		var scaleLabel = draw.text("Zoom 1:1");

		scaleLabel.font({
			family: 'Roboto'
			, size: 24
			, anchor: 'end'
			, color: "#7f7f7f"
		});
		scaleLabel.style('font-weight', 'bold');
		scaleLabel.style('-webkit-user-select', 'none');
		scaleLabel.style('-moz-user-select', 'none');
		scaleLabel.style('-ms-user-select', 'none');
		scaleLabel.translate(this.drawer.width() - 5, 0);
		scaleLabel.fill({color: "#7f7f7f"});
		//	scaleLabel.opacity(0.2);

		return scaleLabel;

	},
	drawSelectRect: function (coordsStart, coordsEnd) {
		if (this.selectRect)
			this.selectRect.remove();
		var draw = this.drawer.group();
		this.selectRect = draw.rect(Math.abs(coordsEnd.x - coordsStart.x), Math.abs(coordsEnd.y - coordsStart.y)).fill({opacity: 0}).stroke({color: "#fff", width: 1, dasharray: "10,5"});
		if (coordsStart.x < coordsEnd.x && coordsStart.y < coordsEnd.y) {
			this.selectRect.move(coordsStart.x, coordsStart.y);
		}
		else if (coordsStart.x < coordsEnd.x && coordsStart.y > coordsEnd.y) {
			this.selectRect.move(coordsStart.x, coordsEnd.y);
		}
		else if (coordsStart.x > coordsEnd.x && coordsStart.y < coordsEnd.y) {
			this.selectRect.move(coordsEnd.x, coordsStart.y);
		}
		else {
			this.selectRect.move(coordsEnd.x, coordsEnd.y);
		}
	},
	removeSelectRect: function () {
		if (this.selectRect)
			this.selectRect.remove();
	}
});
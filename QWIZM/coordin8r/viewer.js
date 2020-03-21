var eduk8r = eduk8r || {};
eduk8r.sprites = eduk8r.sprites || {};

eduk8r.sprites.viewer = (function () {

	"use strict";

	// don't like this style but eclipse's javascript formatter can't handle
	// comma-separated variable declarations with line-wrapping :(
	var stage = null,
		c,
		sprites = eduk8r.sprites;
	// var simutils = eduk8r.utils.sim;
	var $canvas = $('canvas')[0];

	// called by the browser's onload event
	function init() {
		$canvas = $('canvas')[0];
		stage = new createjs.Stage($canvas);
		createjs.Ticker.addEventListener("tick", tick);
		hideMostStuff();
	}

	var viewModel = {
		update: true,
		// vertical: true
	};

	// keeps track of which sprite is currently visible/active
	var spriteTypeModel = {
		pinnedSupport: false,
		rocker: false,
		rollerSupport: false,
		line: false,
		arc: false,
		simpleMember: false,
		bl45trMember: false
	};

	function falsify(obj) {
		$.each(obj, function (key, value) {
			obj[key] = false; // dot doesn't work here ??
		});
	}

	function hideMostStuff(obj) {
		$('.reqdProps').each(function () {
			if (this.id == $('#spriteType option:selected').val()) {
				$(this).css('right', '0px');
			} else {
				$(this).css('right', '9999px');
			}
		});
	}

	function redraw() {
		var pinnedSupport = eduk8r.sprites.viewer.pinnedSupport;
		var rollerSupport = eduk8r.sprites.viewer.rollerSupport;
		var pt, pt2, obj;
		stage.removeAllChildren();
		c = new createjs.Container();
		stage.addChild(c);

		var selectedType = $('#spriteType option:selected').val();

		switch (selectedType) {
			case "pinnedSupport":
				pt = new createjs.Point(pinnedSupport.spriteModel.pX,
					pinnedSupport.spriteModel.pY);
				obj = pinnedSupport.props;
				c.addChild(new sprites.PinnedSupport(pt, obj));
				break;
			case "rollerSupport":
				pt = new createjs.Point(rollerSupport.spriteModel.pX,
					rollerSupport.spriteModel.pY);
				obj = rollerSupport.props;
				c.addChild(new sprites.RollerSupport(pt, obj));
				break;

			case "line":
				c.addChild(new sprites.Line(new createjs.Point(100, 200),
					new createjs.Point(400, 300)));
				break;
			case "arc":
				c.addChild(new sprites.Arc(new createjs.Point(250, 250), 100,
					Math.PI / 3, Math.PI));
				break;
			case "simpleMember":
				c.addChild(new sprites.SimpleMember(new createjs.Point(100, 200),
					new createjs.Point(490, 300)));
				break;
			case "bl45trMember":
				c.addChild(new sprites.BL45TRMember(new createjs.Point(100, 400),
					new createjs.Point(400, 100)));
				break;
		}
	}

	function tick() {
		if (viewModel.update === true) {
			viewModel.update = false;
			redraw();
			stage.update();
		}
	}

	return {
		init: init,
		spriteTypeModel: spriteTypeModel,
		viewModel: viewModel,
		falsify: falsify,
		hideMostStuff: hideMostStuff
	};

}());
var eduk8r = eduk8r || {};
eduk8r.sprites = eduk8r.sprites || {};
eduk8r.sprites.viewer = eduk8r.sprites.viewer || {};

eduk8r.sprites.viewer.events = (function() {

	"use strict";

	$(window).load(function() {

		var viewer = eduk8r.sprites.viewer;

		// $('#spriteType :nth-child(0)').prop('selected', true);

		$('#spriteType').change(function() {
			viewer.falsify(viewer.spriteTypeModel);
			var type = $('#spriteType option:selected').val();
			viewer.spriteTypeModel[type] = viewer.viewModel.update = true;
			// move non-active sprite panels off the screen
			viewer.hideMostStuff();
		});

		// indicate that controls are clickable by changing the cursor to hand
		$('option').css('cursor', 'pointer');

		// 'initialize' coords div; it seems that css needs to have
		// visibility='visible' and then hide it here
		// to get fades to work as desired
		$('#coords').hide();

		// fade in coords div on mouse entering the canvas
		$("canvas").mouseenter(function(e) {
			// $('#coords').fadeIn(500);
			$('#coords').show();
		});

		// update the top and left of the coords div on mouse move
		$("canvas").mousemove(function(e) {
			var offset = $(this).parent().offset();
			var relX = e.pageX - offset.left;
			var relY = e.pageY - offset.top;
			var coordsX = relX + 5;
			var coordsY = relY - 20;
			$('#coords').html(relX + ', ' + relY).css({
				bottom : 480 - coordsY,
				left : coordsX
			});
		});

		// fade out coords div on mouse leaving the canvas
		$("canvas").mouseleave(function(e) {
			// $('#coords').fadeOut(300);
			$('#coords').hide();
		});

		// start the simulation
		eduk8r.sprites.viewer.init();

	});

}());

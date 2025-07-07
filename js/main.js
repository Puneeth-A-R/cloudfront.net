	var $gridFilter = '*';
	var $grid = null;
	var canLazyLoad = true;

	var positionFunc = Isotope.prototype._positionItem;
		Isotope.prototype._positionItem = function( item, x, y, isInstant ) {
		positionFunc(item, x, y, true);
	};

	function loadBackgrounds() {
		$('.has-background').each(function(event){
			$(this).css('background-image', 'url(' + $(this).data('background-src') + ')');
		});
	}

	$(window).on('load', function() {
		
		loadBackgrounds();
		
		$('#menu-toggle').on('click',function(event){
			event.preventDefault();
			$('body').toggleClass('shownav');
		});
		
		$('#search-toggle').on('click',function(event){
			event.preventDefault();
			$('body').toggleClass('showsearch');
			$('#search-overlay input').focus();
		});
		
		$('#search-overlay .close').on('click',function(event){
			event.preventDefault();
			$('body').removeClass('showsearch');
		});

		if ($('#slider').length) {
			var $slider = $('#slider').flickity({
				cellAlign: 'left',
				contain: true,
				cellSelector: '.slide',
				prevNextButtons: false,
				pageDots: true,
				wrapAround: true
			});
		}

		if ($('.loading').length) {
			setTimeout(function(){
				$('#splash .collapsed').fadeTo('fast',1);

				setTimeout(function(){
					$('.loading').removeClass('loading');
				}, 1000);
			}, 1000);
		}

		if ($('.offscreen').length) {
			$('.offscreen').onScreen({
				container: window,
				direction: 'vertical',
				doIn: function() {
					$(this).addClass('onscreen');
				},
				doOut: function() {
				},
				tolerance: 0,
				throttle: 50
			});
		}

		if ($('#project-grid').length) {

			$grid = $('#project-grid');
			$grid.isotope({
				itemSelector: '.project',
				hiddenStyle: {
					opacity: 0,
					transform: 'scale(1)'
				},
				visibleStyle: {
					opacity: 1,
					transform: 'scale(1)'
				},
				masonry: {
					columnWidth: '.project',
					gutter: 40
				}
			});

			$grid.imagesLoaded().progress( function() {
				$grid.isotope('layout');
			});

			// if ($('#projects').length) {

			// 	$('#projects-filter li').on('click',function(event){
			// 		$gridFilter = $(this).data('category');

			// 		$grid.isotope(
			// 			{ filter: $gridFilter }
			// 		);

			// 		$('#projects-filter li').removeClass('current');
			// 		$(this).addClass('current');

			// 		$grid.isotope('layout');

			// 		$('.offscreen').onScreen({
			// 			container: window,
			// 			direction: 'vertical',
			// 			doIn: function() {
			// 				$(this).addClass('onscreen');
			// 			},
			// 			doOut: function() {
			// 			},
			// 			tolerance: 0,
			// 			throttle: 50
			// 		});

			// 		$.scrollTo(0,'normal');
			// 	});
			// }

			if ($grid.data('lazyload')) {
				$(window).scroll(function() {

					if($(window).scrollTop() + $(window).height() >= $(document).height() - 600 && canLazyLoad == true) {

						var offset = $('#project-grid .project').length;
						var category = $('#project-grid').data('category');

						$.ajax({
							url: baseUrl + 'actions/LazyLoad/Projects',
							type: 'POST',
							cache: false,
							data: {
								category: category,
								offset: offset,
								CRAFT_CSRF_TOKEN: csrfTokenValue
							},
							dataType: 'json',
							beforeSend: function(){
								$('#projects-loading').show();
								canLazyLoad = false;
							},
							success: function(data) {

								for (var i = 0, len = data.projects.length; i < len; i++) {
								
									var result = HeckerGuthrie.templates.project(data.projects[i]);
									
									var $newItems = $(result);
									$grid.isotope( 'insert', $newItems );

									loadBackgrounds();

								}

								$('#projects-loading').hide();

								setTimeout(function(){
									$grid.isotope('layout');

									$('.offscreen').onScreen({
										container: window,
										direction: 'vertical',
										doIn: function() {
											$(this).addClass('onscreen');
										},
										doOut: function() {
										},
										tolerance: 0,
										throttle: 50
									});
								}, 200);

								canLazyLoad = (data.projects.length < 20) ? false : true;
							},
							error: function() {
								$('#projects-loading').hide();
								canLazyLoad = true;
							}
						});
					}
				});
			}
		}

		if ($('#journal-posts').length) {
			$grid = $('#journal-grid-items');
			$grid.isotope({
				itemSelector: '.journal-grid-item',
				hiddenStyle: {
					opacity: 0,
					transform: 'scale(1)'
				},
				visibleStyle: {
					opacity: 1,
					transform: 'scale(1)'
				},
				masonry: {
					columnWidth: '.journal-grid-item',
					gutter: 40
				}
			});

			$grid.imagesLoaded().progress( function() {
				$grid.isotope('layout');
			});

			$('#journal-filter li').on('click',function(event){
				$('#journal-filter li').removeClass('current');
				$gridFilter = $(this).data('category');
				$(this).addClass('current');

				$grid.isotope(
					{ filter: $gridFilter }
				);

				$grid.isotope('layout');

				$('.offscreen').onScreen({
					container: window,
					direction: 'vertical',
					doIn: function() {
						$(this).addClass('onscreen');
					},
					doOut: function() {
					},
					tolerance: 0,
					throttle: 50
				});
			});
		}
		
		if ($('#awards-grid').length) {
			$grid = $('#awards-grid');
			$grid.isotope({
				itemSelector: '.award',
				hiddenStyle: {
					opacity: 0,
					transform: 'scale(1)'
				},
				visibleStyle: {
					opacity: 1,
					transform: 'scale(1)'
				},
				masonry: {
					columnWidth: '.award',
					gutter: 40
				}
			});

			$grid.imagesLoaded().progress( function() {
				$grid.isotope('layout');
			});

			$('#awards-filter li').on('click',function(event){
				$('#awards-filter li').removeClass('current');
				$gridFilter = $(this).data('category');
				$(this).addClass('current');

				$grid.isotope(
					{ filter: $gridFilter }
				);

				$grid.isotope('layout');

				$('.offscreen').onScreen({
					container: window,
					direction: 'vertical',
					doIn: function() {
						$(this).addClass('onscreen');
					},
					doOut: function() {
					},
					tolerance: 0,
					throttle: 50
				});
			});

			$(window).scroll(function() {

				if($(window).scrollTop() + $(window).height() >= $(document).height() - 600 && canLazyLoad == true) {

					var offset = $('#awards-grid .award').length;

					$.ajax({
						url: baseUrl + 'actions/LazyLoad/Awards',
						type: 'POST',
						cache: false,
						data: {
							offset: offset,
							category: $('#awards-grid').data('category'),
							CRAFT_CSRF_TOKEN: csrfTokenValue
						},
						dataType: 'json',
						beforeSend: function(){
							$('#awards-loading').show();
							canLazyLoad = false;
						},
						success: function(data) {

							for (var i = 0, len = data.awards.length; i < len; i++) {
								if (data.awards[i].download) {
								var result = HeckerGuthrie.templates.awarddownload(data.awards[i]);
								} else {
									var result = HeckerGuthrie.templates.award(data.awards[i]);
								}
								var $newItems = $(result);
								$grid.isotope( 'insert', $newItems );
							}

							$('#awards-loading').hide();

							setTimeout(function(){
								$grid.isotope('layout');

								$('.offscreen').each(function(){
									$(this).addClass('onscreen');
								});
							}, 200);

							canLazyLoad = (data.awards.length < 20) ? false : true;
						},
						error: function() {
							$('#awards-loading').hide();
							canLazyLoad = true;
						}
					});
				}
			});

			setInterval(function(){
				$grid.isotope('layout');
			}, 2000);
		}

		var headerController = new ScrollMagic.Controller();
		
		var headerScene = new ScrollMagic.Scene({triggerElement: "main", triggerHook: 'onLeave'})
			.setClassToggle("header", "stuck")
			.addTo(headerController);

		var stickyNavController = new ScrollMagic.Controller();
		
		var headerScene = new ScrollMagic.Scene({triggerElement: ".stickynavtrigger", triggerHook: 'onLeave'})
			.setClassToggle(".stickynav", "stuck")
			.addTo(headerController)
			.offset(-100);
	});
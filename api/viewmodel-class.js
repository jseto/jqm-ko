
var ViewModel = Class.extend({
	init: function( pageid, data ) {
		this.appliedBindings = false;
		this.page = this._generatePage( pageid, pageid+'.html' );	
	
		// Locales for this view
		ko.mapping.fromJS( locale, {}, this );

		// header and footer observables
//		self.header.title = ko.observable( locale.header_title );

		if (data) {
			$.extend( true, this, data );
		}
	},

	show: function( data ) {
		data.options.transition = 'slide';
		$.mobile.changePage( this.page, data.options );
		if ( !this.appliedBindings ) {
			ko.applyBindings( this );	
			this.applyBindings = true;	
		}
	},

	_generatePage: function( pageid, content, header, footer ){
		if ( $.inArray( pageid, pagesOnDOM ) == -1 ) {

			if ( !header ) {
				header = config.defaultHeader;
			}

			if ( !footer ) {
				footer = config.defaultFooter;
			}

			var page = $( '<div ' + 'id="' + pageid + '" data-role="page"></div>' );

			jQuery.ajaxSetup({async:false});

			$.get( viewFilePath( header ), function( data ) {
				page.append( data );
			});

			$.get( viewFilePath( content ), function( data ) {
				page.append( data );
			});

			$.get( viewFilePath( footer ), function( data ) {
				page.append( data );
			});
			
			jQuery.ajaxSetup({async:true});

			page.prependTo( $.mobile.pageContainer );
			pagesOnDOM.push( pageid );
			
			return page;
		}
		return $( '#'+pageid );
	},


});

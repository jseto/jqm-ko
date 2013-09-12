
var ViewModel = Class.extend({
	init: function( pageid ) {
		this.appliedBindings = false;
		this.page = this._generatePage( pageid, pageid+'.html' );	
	
		// Locales for this view
		ko.mapping.fromJS( locale, {}, this );

		// header and footer observables
		self.headerTitle = ko.observable( locale.header_title );

	},

	show: function( data ) {
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

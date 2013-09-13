
var ViewModel = Class.extend({
	init: function( pageid, data ) {
		this.appliedBindings = false;
		this.pageid =pageid;
		this.page = this._generatePage( pageid, pageid+'.html' );	
	
		// Locales for this view
		this.viewmodel = {
			header: ko.mapping.fromJS( locale.header, {} ),
		}

		ko.applyBindings( this.viewmodel.header, $('[data-role="header"]')[0] );
		ko.applyBindings( ko.mapping.fromJS( locale.footer, {} ), $('[data-role="footer"]')[0] );
		ko.mapping.fromJS( locale[pageid], {}, this );

		if (data) {
			$.extend( true, this, data );
		}

		if ( this.header && this.header.title ) {
			this.viewmodel.header.title( this.header.title() );
		}
	},

	show: function( options ) {
		this.page.page();
		// location.hash = this.pageid;
		$.mobile.changePage( '#'+this.pageid, options );
		if ( !this.appliedBindings ) {
			ko.applyBindings( this, $('[data-role="content"]')[0] );	
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


var ViewModel = Class.extend({
	init: function( data ) {
		this.appliedBindings = false;

		if (data) {
			$.extend( true, this, data );
		}

		this.pageObj = this._generatePage( this.page, this.content, this.header, this.footer );	
	
		// Locales for this view
		this.viewmodel = {
			header: ko.mapping.fromJS( locale.header, {} ),
			footer: ko.mapping.fromJS( locale.footer, {} )
		}

		if ( !this.appliedHeaderBindings ) {
			ko.applyBindings( this.viewmodel.header, this.pageObj.find('[data-role="header"]')[0] );
			ko.applyBindings( this.viewmodel.footer, this.pageObj.find('[data-role="footer"]')[0] );
			this.appliedHeaderBindings = true;
		}
		ko.mapping.fromJS( locale[this.page.id], {}, this );

		if ( this.header && this.header.title ) {
			this.viewmodel.header.title( this.header.title() );
		}
	},

	show: function( options ) {
		this.pageObj.page();
		// location.hash = this.page.id;
		$.mobile.changePage( '#'+ this.page.id, options );
		if ( !this.appliedBindings ) {
			ko.applyBindings( this, this.pageObj.find('[data-role="content"]')[0] );	
			this.appliedBindings = true;	
		}
	},

	_generatePage: function( page, content, header, footer ){
		if ( $.inArray( page.id, pagesOnDOM ) == -1 ) {

			if ( !header ) {
				header = { file: config.defaultHeader };
			}
			if ( !header.file ) {
				header.file = config.defaultHeader;
			}

			if ( !footer ) {
				footer = { file: config.defaultFooter };
			}
			if ( !footer.file ) {
				footer.file = config.defaultFooter;
			}

			if ( !content ) {
				content = { file: page.id+'.html' };
			}
			if ( !content.file ) {
				content.file = page.id+'.html';
			}

			var pageObj = $( '<div ' + 'id="' + page.id + '" data-role="page"></div>' );

			if ( page && page.attributes ) {
				pageObj.attr( page.attributes );
			}

			jQuery.ajaxSetup({async:false});

			$.get( viewFilePath( header.file ), function( data ) {
				$data = $(data);
				if ( header && header.attributes ) {
					$data.attr( header.attributes );
				}
				pageObj.append( $data );
			});

			$.get( viewFilePath( content.file ), function( data ) {
				$data = $(data);
				if ( content && content.attributes ) {
					$data.attr( content.attributes );
				}
				pageObj.append( $data );
			});

			$.get( viewFilePath( footer.file ), function( data ) {
				$data = $(data);
				if ( footer && footer.attributes ) {
					$data.attr( footer.attributes );
				}
				pageObj.append( $data );
			});
			
			jQuery.ajaxSetup({async:true});

			pageObj.appendTo( $.mobile.pageContainer );
			pagesOnDOM.push( page.id );
			
			return pageObj;
		}
		return $( '#'+page.id );
	},
});

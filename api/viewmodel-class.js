
var ViewModel = Class.extend({
	init: function( data ) {
		this.appliedBindings = false;

		if (data) {
			$.extend( true, this, data );
		}

		var self = this;
		self = this._parseLocales( this );

		this.$page = this._generatePage( this.page, this.content, this.header, this.footer );	
	
		// Locales for this view
		this.viewmodel = {
			header: ko.mapping.fromJS( Locale.get('header'), {} ),
			footer: ko.mapping.fromJS( Locale.get('footer'), {} )
		}
		this.viewmodel.header.pageid = ko.observable( this.page.id );

		if ( !this.appliedHeaderBindings ) {
			ko.applyBindings( this.viewmodel.header, this.$page.find('[data-role="header"]')[0] );
			ko.applyBindings( this.viewmodel.footer, this.$page.find('[data-role="footer"]')[0] );
			this.appliedHeaderBindings = true;
		}
		ko.mapping.fromJS( Locale.get(this.page.id), {}, this );
	},

	show: function( options ) {
		$.mobile.changePage( '#'+ this.page.id, options );
		if ( !this.appliedBindings ) {
			ko.applyBindings( this, this.$page.find('[data-role="content"]')[0] );	
			this.appliedBindings = true;	
		}
	},

	_parseLocales: function( data ) {
		var self = this;
		$.each( data, function( key, value ){
			if ( key == 'locale' ) {
				parentData[parentKey]=Locale.get(value);
				return parentData;
			} 
			else {
				parentKey = key;
				parentData = data;
				if ( typeof value === 'object' ) {
					return self._parseLocales( value );
				}
			}
		});
		return data;
	},

	_generatePage: function( page, content, header, footer ){
		var self = this;
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

		var $page = $( '<div ' + 'id="' + page.id + '" data-role="page"></div>' );

		if ( page && page.attributes ) {
			$page.attr( page.attributes );
		}

		jQuery.ajaxSetup({async:false});

		$.get( viewFilePath( header.file ), function( data ) {
			$data = $(data);
			if ( header && header.attributes ) {
				$data.attr( header.attributes );
			}
			$page.append( $data );
		});

		$.get( viewFilePath( content.file ), function( data ) {
			$data = $(data);
			if ( content && content.attributes ) {
				$data.attr( content.attributes );
			}
			$page.append( $data );
		});

		$.get( viewFilePath( footer.file ), function( data ) {
			$data = $(data);
			if ( footer && footer.attributes ) {
				$data.attr( footer.attributes );
			}
			$page.append( $data );
		});
		
		jQuery.ajaxSetup({async:true});

		$page.appendTo( $.mobile.pageContainer );
		
		return $page;
	},
});




var config = {
	localePath: 'locales',
	locale: 'ca',
	remoteUrl: 'http://padel.jasvisio.com/api',
	viewsPath: 'views',
	viewModelsPath: 'viewmodels',
	defaultHeader: 'header.html',
	defaultFooter: 'footer.html',
}

var pagesOnDOM =[];

function filePath( path, filename ) {
	return path + '/' + filename;
}

function viewFilePath( view ) {
	return filePath( config.viewsPath, view );
}
/*
var Header = function( init ) {
	var self = this;
	self.path = config.defaultHeader;
	self.options = {
		'data-position': 'fixed',
		'data-id': 'persistent',
		'data-add-back-btn': true,
		'data-fullscreen': false,
	}

	self.title: {
		text: '',
		options: {
//			'data-bind': 'text: headerTitle', //ie:
		}
	}

	self.render: function() {
		var el = $('<div data-role="header"></div>');
		$.each( self.options, function( key, value ) {
			$(el).attr( key, value );
		});
		$(el).append( <h1></h1> );

	}
}
*/
function generatePage( pageid, content, header, footer ){
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
}

window.locale = {};

$(document).on('pageinit', '#__start__', function( event ) {
	new Locale( 'ca', function( locale ) {
		window.locale = locale;

		$.mobile.changePage('#activeMatches');
	});
});

$(document).bind('pagebeforechange', function(e,data){
	if ( typeof data.toPage === 'string' ) {
		var page = generatePage( 'activeMatches', 'activeMatches.html' );
		ko.applyBindings( new ActiveMatchesList( window.locale ) );		
		$.mobile.changePage( page, data.options );
		e.preventDefault();
	}
});

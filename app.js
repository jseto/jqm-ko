
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

window.locale = {};
var viewModels = {};

$(document).on('pageinit', '#__start__', function( event ) {
	new Locale( 'ca', function( locale ) {
		window.locale = locale;

		viewModels.activeMatches = new ActiveMatches( 'activeMatches' );

		$.mobile.changePage('#activeMatches');
	});
});

function show( data ) {
	var pageid = data.toPage;
	var hashSymbolPos = pageid.indexOf('#');
	if ( hashSymbolPos >= 0 ) {
		pageid = pageid.substring( hashSymbolPos+1, pageid.length );
	}
	var viewmodel = viewModels[ pageid ];
	if ( !viewmodel ) {
		console.error( 'View model not found. id: ', pageid );
	}
	else {
		viewmodel.show( data );
	}
}

$(document).bind('pagebeforechange', function(e,data){
	if ( typeof data.toPage === 'string' ) {
		show( data );
		e.preventDefault();
	}
});

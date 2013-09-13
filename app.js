
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

// Sammy(function() {
//     this.get('#activeMatches', function() {
//     	viewModels.activeMatches.show();
//     });
//     this.get('#scorer', function() {
//     	viewModels.scorer.show();
//     });
// }).run();    

$(document).on('pageinit', '#__start__', function( event ) {
	new Locale( 'ca', function( locale ) {
		window.locale = locale;

		viewModels.activeMatches = new ActiveMatches( 'activeMatches' );
		viewModels.activeMatches.show();
	});
});

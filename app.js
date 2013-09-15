
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

var viewModels = {};

//$(document).on('pageinit', '#__start__', function( event ) {
$(document).ready( function() {
	Locale.init( 'ca' );
	viewModels.activeMatches = new ActiveMatches();
	viewModels.scorer = new Scorer();

	viewModels.activeMatches.show();
});

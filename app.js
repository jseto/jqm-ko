
/**** Global config ****/
var config = {
	localePath: 'locales',
	locale: 'ca',
	remoteUrl: 'http://padel.jasvisio.com/api',
	viewsPath: 'views',
	viewModelsPath: 'viewmodels',
	defaultHeader: 'header.html',
	defaultFooter: 'footer.html',
}

var viewModels = {};

//$(document).on('pageinit', '#__start__', function( event ) {
$(document).ready( function() {
	Locale.init( 'ca' );

	/**** Create the view models here *****/
	viewModels.activeMatches = new ActiveMatches();
	viewModels.scorer = new Scorer();

	viewModels.activeMatches.show();
});

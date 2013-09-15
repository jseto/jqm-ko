
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
//$(document).on('init', '#activeMatches', function( event ) {
$(document).ready( function() {
	$.mobile.buttonMarkup.hoverDelay = 0;
	Locale.init( 'ca' );

	/**** Create the view models here *****/
	viewModels.activeMatches = new ActiveMatches();
	viewModels.scorer = new Scorer();

	viewModels.activeMatches.show();
});



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

// $(document).bind("mobileinit", function(){
//     $.mobile.page.prototype.options.addBackBtn=true;
// });

window.locale = {};
var viewModels = {};

//$(document).on('pageinit', '#__start__', function( event ) {
$(document).ready( function() {
	new Locale( 'ca', function( locale ) {
		window.locale = locale;

		viewModels.activeMatches = new ActiveMatches( {
			page: { id: 'activeMatches' },
		});
		viewModels.scorer = new Scorer({
			page: {
				id: 'scorer',
				attributes: {
					"data-add-back-btn": true,
					"data-back-btn-text": locale.header.backButtonText,
				}
			},
			header: {
				title: ko.observable( locale.header.scorer ),
				attributes: {
					"data-fullscreen": true,
				}
			},
			footer: {
				attributes: {
					"data-fullscreen": true,
				}
			},
		});
		viewModels.activeMatches.show();
	});
});

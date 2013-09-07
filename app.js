var config = {
	localePath: 'locales',
	locale: 'ca',
	remoteUrl: 'http://padel.jasvisio.com/api',
}

$(document).ready(function () {
	locale = new Locale( 'ca', function( locale ) {
		ko.applyBindings( new ActiveMatchesList( locale ) );		
	});
});
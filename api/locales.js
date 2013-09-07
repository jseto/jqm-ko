
function setLocale( localeId ) {
	var self = this;

	$.getJSON( config.localePath + '/' + localeId + '.json')
		.done( function( data ) {
			self.locale = data;
			ko.applyBindings( self.locale );
		})
		.fail( function() {
			console.error( 'Locale "' + localeId +'" not loaded.' );
		});


 }

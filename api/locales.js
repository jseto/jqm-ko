
function Locale( localeId, onDataReady ) {
	var self = this;

	$.getJSON( config.localePath + '/' + localeId + '.json')
		.done( function( data ) {
			self.locale = data;
			onDataReady.call( this, data );
		})
		.fail( function() {
			console.error( 'Locale "' + localeId +'" not loaded.' );
		});

	return {
		getLocale: function() {
			return self.locale;
		}
	}
 }

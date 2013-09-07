
function Locale( localeId, onDataReady ) {
	var self = this;
	// self.locale = {
	// 	header_title: "Partides Actives",
	// 	navbar_matches: "Partides",
	// 	navbar_addMatch: "Nova Partida"
	// };


	$.getJSON( config.localePath + '/' + localeId + '.json')
		.done( function( data ) {
			self.locale = data;
			onDataReady.call( this, data );
//			ko.applyBindings( self.locale );
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

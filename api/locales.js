
var Locale = ( function(){
	var locale;

	return {
		init: function( localeId ) {
			jQuery.ajaxSetup({async:false});
			$.getJSON( config.localePath + '/' + localeId + '.json')
				.done( function( data ) {
					locale = data;
				})
				.fail( function() {
					console.error( 'Locale "' + localeId +'" not loaded.' );
			});
			jQuery.ajaxSetup({async:true});
		},

		get: function( key ) {
			return eval( 'locale.'+key );
		}
	}
})();

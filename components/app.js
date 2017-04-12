var React = require('react'); 
var Search = require('./search.js'); 
var Map = require('./map.js'); 
var CurrentLocation = require('./current_location.js'); 
var LocationList = require('./location_list'); 

var App = React.createClass({
	
	getInitialState(){
		var favorites = []
		if(localStorage.favorites){
			favorites = JSON.parse(localStorage.favorites)
		}

		return {
			favorites: favorites ,
			currentAddress: 'Portland, Oregon', 
			mapCoordinates: {
				lat: 45.5231076, 
				lng: -122.6688980
			}
		}; 
	}, 


	toggleFavorites(address){
		if(this.isAddressInFavorites(address)){
			this.removeFromFavorites(address); 
		} else {
			this.addToFavorites(address)
		}
	}, 

	addToFavorites(address){
		var favorites = this.state.favorites; 

		favorites.push({
			address: address, 
			timestamp: Date.now()
		}); 

		this.setState({
			favorites: favorites
		}); 

		localStorage.favorites = JSON.stringify(favorites); 
	}, 

	removeFromFavorites(address){
		var favorites = this.state.favorites
		var index = -1; 
		for(var i=0; i < favorites.length; i++){
			if (favorites[i].address === address){
				index = i; 
				break; 
			}
		}

		if(index === -1){
			favorites.splice(index, 1); 
			this.setState({
				favorites: favorites
			}); 
			localStorage.favorites = JSON.stringify(favorites); 
		}
	}, 

	isAddressInFavorites(address){
		var favorites = this.state.favorites
		for(var i = 0; i < favorites.length; i++){
			if (favorites[i].address === address) {
				return true; 
			}
		}
		return false; 
	}, 

	searchForAddress(address){
		var self = this; 
		GMaps.geocode({
			address: address, 
			callback: function(results, status){
				if (status !== 'OK') return; 
				var latlng = results[0].geometry.location
				self.setState({
					currentAddress: results[0].formatted_address, 
					mapCoordinates: {
						lat: latlng.lat(), 
						lng: latlng.lng()
					}
				}); 
			}
		}); 
	}, 

	render(){

		return (
		<div>
			<h1>Your favorite locations</h1>
			<Search onSearch={this.searchForAddress}/>
			<Map lat={this.state.mapCoordinates.lat} lng={this.state.mapCoordinates.lng}/>
			<CurrentLocation 
				address={this.state.currentAddress} 
				favorite={this.isAddressInFavorites(this.state.currentAddress)}
				onFavoriteToggle={this.toggleFavorites}/>
			<LocationList 
				locations={this.state.favorites} 
				activeLocationAddress={this.state.currentAddress}
					onClick={this.searchForAddress}/>
		</div>

		)
	}

});  

module.exports = App;



























import React from 'react';
import './App.css';

import Mapcontainer from './test'

class App extends React.Component {
    state = {
      places: [],
      selectedPlace: {}
    };

    componentDidMount(){
    	this.setState({
    		places
    	});
      }

     handlePlaceClick = place => {
     	this.setState({
     		selectedPlace: place
     	});
     }

     handleFilter = query =>{
     	if (query !==""){
     		let newPlaces = places.filter(place =>{
               return place.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
     		});
     		this.setState({
     			places: newPlaces
     		});
     	}else{
     	 this.setState({
     	 	places
     	 });	
     	}
     };



  render() {
  	const {places, selectedPlace} = this.state;
    return (
      <div className="App">
        <Mapcontainer 
          places={places}
          selectedPlace={selectedPlace}  
        />
      </div>
    );
  }
}



export default App;

import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



export class Mapcontainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: null,
      map: null,
      url: {};
    };
  }

  //第三方API数据获取
     ComponentDidMount(){
      var url = 'https://free-api.heweather.com/s6/weather/now?location=Kunming&key=HE1808121129211714'
      fetch(url)
      .then(res => res.json())
      .then(data => {console.log(data)})
   }

  //更新markers
  componentWillReceiveProps(nextProps){
    if (nextProps.selectedPlace !== this.props.selectedPlace){
      const markers = this.refs;
      const marker = markers[nextProps.selectedPlace.name].marker;
      this.animateMarker(marker,this.state.map);
      this.setState({
        showingInfoWindow: true,
        selectedPlace: nextProps.selectedPlace,
        activeMarker:marker
      })
    }
  }
  //显示被点击的marker
  handleMarkerClick = (props, marker, e) =>{
    this.animateMarker(marker,props.map);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
  
  //隐藏marker
  handleMapClick = props => {
   if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
     });
   }
  };
  //动态marker
  animateMarker = (marker, map) =>{
    map.setCenter(marker.position);
    marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
    setTimeout(function(){
      marker.setAnimation(null);
    }, 2000);
  };

  mapReady = (props, map) => {
    this.setState({
      map
    })
  };

  render(){
  const {place, google} = this.props;
  const {activeMarker, showingInfoWindow, selectedPlace} = this.state;
  const initialCenter = {
    lat: 40.7180628, 
    lng: -73.9961237
  };
  const zoom = 13; 

  return(
    <Map
      google = {google}
      initialCenter = {initialCenter}
      zoom = {zoom}
      onClick = {this.handleMapClick}
      onReady = {this.mapReady}  
    >
      {place.map(place =>(
        <Marker
          key = {place.name}
          onClick = {this.handleMarkerClick}
          name = {place.name}
          position = {place.location}
          ref = {place.name} 
        />
      ))}

      <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
        <h1>{selectedPlace ? selectedPlace.name : ""}</h1>
        <p>{this.state.url}</p>
      </InfoWindow>
    </Map>
    );
 }


}


export default GoogleApiWrapper({
  apiKey: ('AIzaSyAk9YfxQvymNc0YRvG7JXhrBDfUyL4UZSo')
})(Mapcontainer)
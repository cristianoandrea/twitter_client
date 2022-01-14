import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { render } from 'react-dom';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
  useMap,
} from 'react-leaflet';
//import './style.css';
//import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';


interface MapCentreProps {
  mapCentre: LatLng;
}

function UpdateMapCentre(props: MapCentreProps) {
  const map = useMap();
  map.flyTo(props.mapCentre, 12);
  return null;
}


function App() {

    const [places, setPlaces] = useState([])

    const [luogo, setLuogo]= useState('serino')

    

    useEffect(()=>{
        
        const url_pt1 = "https://nominatim.openstreetmap.org/search?q="
        const url_pt2 = "&format=geojson"
        const url_request = url_pt1 + luogo + url_pt2;
        const tmp = [];

        //impostazioni per il fetch
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(url_request, requestOptions)
            .then(response => {
                //qui ritorna una promessa
                return response.json();
            })
            .then(data => {
                //qui si elabora il json ottenuto
                for (const i in data.features) {
                    tmp.push({
                        id: i,
                        name: data.features[i].properties.display_name,
                        lat: data.features[i].geometry.coordinates[1],
                        long: data.features[i].geometry.coordinates[0]
                    })
                    console.log(tmp[i].name)
                }
                //a fine ciclo ho in tmp tutti i luoghi ritornati dall'api
                setPlaces(tmp);
                
            })
            .catch(error => console.log('error', error));
    },[luogo])



  const [initialCoords, setInitialCoords] = useState({
    latitude: 42.4938203,
    longitude: 11.3426327,
  });

  const [changedCoords, setChangedCoords] = useState({
    lat: 42.9561825,
    lng: 12.703334,
  });
  
  const [placesClicked, setPlacesClicked] = useState(false);
  
  const locatePlaces = (id) => {
    setPlacesClicked(true);
    const findLocation = places.find((exercise) => {
      return exercise.id === id;
    });

    console.log(findLocation);

    setChangedCoords({
      lat: findLocation.lat,
      lng: findLocation.long,
    });
  };

  const {register, handleSubmit} = useForm();

  return (
      
    <React.Fragment>

        <form onSubmit={handleSubmit((data) =>{
          console.log(data)
          setLuogo(data.luogo)
          console.log(luogo)
        })}>
            <Input 
                type='text' 
                {...register("luogo")}
                placeholder="Scrivi un luogo"
                //onChange={e=>setLuogo(e.target.value)} 
                />
              
            <Button variant="contained" type='submit' >Search</Button>
        </form>
        

        
      <MapContainer
        center={[initialCoords.latitude, initialCoords.longitude]}
        zoom={12}
        scrollWheelZoom={false}
        style={{ width: '100vw', height: '50vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <UpdateMapCentre mapCentre={changedCoords} />
        <Marker position={changedCoords}></Marker>
      </MapContainer>
      
      <h6>Roba mia</h6>
      
        {places.map(place=>{
            return(
                <div key={place.id}>
                    <div 
                        className="places-click"
                        onClick={()=>locatePlaces(place.id)}>
                        <p>{place.id}) Nome: {place.name}</p>
                    </div>
                    
                </div>
            )
          
      })}  
      
      
      

    )
      
      
    </React.Fragment>
  );
}

export default App


/*
def search_by_geotag(lat: int, long: int, radius: int, amount: int = MAX_TWEETS) :
    
    lat_str=str(lat)
    long_str=str(long)
    rad_str=str(radius)

    geocode=lat_str + "," + long_str + "," + rad_str
    query = f'from:{username} -filter:retweets'
    found_tweets = api.search_tweets(
        query, geocode, tweet_mode='extended', count=amount)
    return listify_tweets(found_tweets)

*/
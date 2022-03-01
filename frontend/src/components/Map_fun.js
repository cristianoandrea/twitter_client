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
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


interface MapCentreProps {
  mapCentre: LatLng;
}

function UpdateMapCentre(props: MapCentreProps) {
  const map = useMap();
  map.flyTo(props.mapCentre, 12);
  return null;
}




function createMarker (lat, long) {
  return [lat, long]
}

function App(props) {

    const [places, setPlaces] = useState([])

    const [luogo, setLuogo]= useState([])

    const tweets_const = [
      {
        user: {
          screen_name: 'peppecaccia9',
          profile_image_url_https: '/Users/andreacristiano/Desktop/unnamed-2.png'
        },
        retweeted_status: {},
        full_text: 'CENTRO',
        place:{
          lat:41.8933203,
          long:12.4829321
        }
      },
      {
        user: {
          screen_name: 'alessandro_ciurnelli',
          profile_image_url_https: '/Users/andreacristiano/Desktop/unnamed-2.png'
        },
        retweeted_status: {},
        full_text: 'pefforz',
        place:{
          lat:44.48903475,
          long:11.330855699999999
        }
      },
      {
        user: {
          screen_name: 'giulio_barboni',
          profile_image_url_https: '/Users/andreacristiano/Desktop/unnamed-2.png'
        },
        retweeted_status: {},
        full_text: 'cocci....',
        place:{
          lat:44.48913475,
          long:11.331955699999998
        }
      },
      {
        user: {
          screen_name: 'el_nardo',
          profile_image_url_https: '/Users/andreacristiano/Desktop/unnamed-2.png'
        },
        retweeted_status: {},
        full_text: 'el nardo',
        place:{
          lat:44.48783475,
          long:11.3320557
        }
      }
    ]

    const [tweets, setTweets] = useState([])


    useEffect(()=>{

        setTweets(props.tweets)

    },[])



  const [initialCoords, setInitialCoords] = useState({
    latitude: 44.498955,
    longitude: 11.327591,
  });

  const [changedCoords, setChangedCoords] = useState({
    lat: 44.498955,
    lng: 11.327591,
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

  const locateTweets = (t_long, t_lat) => {
    setPlacesClicked(true);

    //console.log(findLocation);

    setChangedCoords({
      lat: t_lat,
      lng: t_long,
    });
  };

  const {register, handleSubmit} = useForm();

  return (

    <React.Fragment>

      <MapContainer
        center={[initialCoords.latitude, initialCoords.longitude]}
        zoom={8}
        scrollWheelZoom={true}
        style={{ width: '80vw', height: '55vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {
           //locateTweets(first.place.lat,first.place.long);
          tweets.map(tweet=>{
            return(
              <div>
              <UpdateMapCentre mapCentre={

                 createMarker(tweets[0].place.lat, tweets[0].place.long)
                } />
              <Marker position={
                createMarker(tweet.place.lat,tweet.place.long)}>
                <Popup>
                  {tweet.full_text}
                </Popup>
              </Marker>
              </div>
            )
          })
        }


      </MapContainer>

    </React.Fragment>
  );
}

export default App


/*

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




        {places.map(place=>{
            return(
                <div key={place.id}>
                    <div
                        className="places-click"
                        onClick={()=>locatePlaces(place.id)}>

                          <Card center={{ maxWidth: 300 }}>
                            <CardContent>

                              <Typography sx={{ fontSize: 14 }} variant="h5" component="div">
                              {place.id}) Nome: {place.name}
                              </Typography>

                            </CardContent>

                          </Card>


                    </div>

                </div>
            )

      })}

*/

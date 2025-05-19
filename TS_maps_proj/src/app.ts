import axios from 'axios';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const APIkey = 'AIzaSyAlEwXPEZg5ZuR4C-gUjukIv-8rzaBVYSg';

type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; lng: number } } }[];
  status: 'OK' | 'ZERO_RESULTS';
};

// declare var google: any;

function searchAddressHendler(event: Event) {
  event?.preventDefault();
  const enteredAddress = addressInput.value;
  const KEY = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${APIkey}`;

  axios
    .get<GoogleGeocodingResponse>(KEY)
    .then(response => {
      // console.log(response);

      if (response.data.status != 'OK') {
        throw new Error('Location not found');
      }
      const coordinates = response.data.results[0].geometry.location;

      const map = new google.maps.Map(document.getElementById("map")! as HTMLElement, {
        center: coordinates,
        zoom: 16,
      });
      new google.maps.Marker({
        map: map,
        position: coordinates
      });
    })
    .catch(err => {
      console.log(err);
      alert(err.message);
    });
}

form.addEventListener('submit', searchAddressHendler);
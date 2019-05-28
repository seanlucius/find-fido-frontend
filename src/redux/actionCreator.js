import {
  FETCHED_LOST_PETS,
  POST_LOST_PET,
  POST_LOADING,
  FETCHED_MAP_CENTER,
  FAILED_FETCH,
  RESET_FAIL,
  FETCHED_SIGHTINGS
} from "./actionType";

const URL = "http://localhost:3000/lost_pets";

function fetchingLostPets() {
  return dispatch => {
    dispatch(loadingPetSubmit());
    fetch(URL)
      .then(resp => resp.json())
      .then(lostPetsArray => {
        dispatch(fetchedLostPets(lostPetsArray));
      });
  };
}

function fetchedLostPets(lostPetsArray) {
  return { type: FETCHED_LOST_PETS, payload: lostPetsArray };
}

function submittedLostPet(petObj) {
  return { type: POST_LOST_PET, payload: petObj };
}

function loadingPetSubmit() {
  return { type: POST_LOADING };
}

function gettingLostPetPosition(petObj) {
  let splitAddress = petObj.street.split(" ");
  let streetNum = splitAddress.shift();
  let exceptStreetNum = splitAddress.map(m => "%20" + m).join("");
  let streetQuery = streetNum + exceptStreetNum;

  return dispatch => {
    dispatch(loadingPetSubmit());
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${streetQuery}%2C${
        petObj.city
      }%2C${
        petObj.state
      }.json?country=us&limit=1&access_token=pk.eyJ1Ijoic2Vhbmx1Y2l1cyIsImEiOiJjanZudmVhZmQwZ3FqNDlxa2RvbDBtajRhIn0.vqWuEx7nomi_EhmWt948ZA&types=address`
    )
      .then(resp => resp.json())
      .then(d => {
        d.features.length === 0
          ? dispatch(didNotFetch())
          : dispatch(submittingLostPetForm(petObj, d.features[0].center));
      });
  };
}

function submittingLostPetForm(petObj, coord) {
  let lat = coord[1];
  let long = coord[0];
  let newPetObj = {
    ...petObj,
    latitude: lat,
    longitude: long
  };
  return dispatch => {
    dispatch(loadingPetSubmit());
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newPetObj)
    })
      .then(resp => resp.json())
      .then(postedPet => {
        dispatch(submittedLostPet(postedPet));
      });
  };
}

function gettingSearchCenter(zip) {
  return dispatch => {
    dispatch(loadingPetSubmit());
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${zip}.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&country=us&types=postcode&limit=1`
    )
      .then(resp => resp.json())
      .then(c => {
        c.features.length === 0
          ? dispatch(didNotFetch())
          : dispatch(fetchedSearchCenter(c.features[0].center.reverse()));
      });
  };
}

function fetchedSearchCenter(coord) {
  return { type: FETCHED_MAP_CENTER, payload: coord };
}

function didNotFetch() {
  return { type: FAILED_FETCH };
}

function resetFail() {
  return { type: RESET_FAIL };
}

// SIGHTINGS ACTION CREATORS

function gettingSightingPosition(sightingObj) {
  let splitAddress = sightingObj.street.split(" ");
  let streetNum = splitAddress.shift();
  let exceptStreetNum = splitAddress.map(m => "%20" + m).join("");
  let streetQuery = streetNum + exceptStreetNum;

  return dispatch => {
    dispatch(loadingPetSubmit());
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${streetQuery}%2C${
        sightingObj.city
      }%2C${
        sightingObj.state
      }.json?country=us&limit=1&access_token=pk.eyJ1Ijoic2Vhbmx1Y2l1cyIsImEiOiJjanZudmVhZmQwZ3FqNDlxa2RvbDBtajRhIn0.vqWuEx7nomi_EhmWt948ZA&types=address`
    )
      .then(resp => resp.json())
      .then(d => {
        d.features.length === 0
          ? dispatch(didNotFetch())
          : dispatch(submittingSightingForm(sightingObj, d.features[0].center));
      });
  };
}

function submittingSightingForm(sightingObj, coord) {
  let lat = coord[1];
  let long = coord[0];
  let newSightingObj = {
    ...sightingObj,
    latitude: lat,
    longitude: long
  };
  return dispatch => {
    dispatch(loadingPetSubmit());
    fetch("http://localhost:3000/sightings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newSightingObj)
    })
      .then(resp => resp.json())
      .then(postedSighting => console.log(postedSighting));
  };
}

function fetchingSightings() {
  return dispatch => {
    dispatch(loadingPetSubmit());
    fetch("http://localhost:3000/sightings")
      .then(resp => resp.json())
      .then(sightingsArray => {
        dispatch(fetchedSightings(sightingsArray));
      });
  };
}

function fetchedSightings(sightingsArray) {
  return { type: FETCHED_SIGHTINGS, payload: sightingsArray };
}

export {
  fetchingLostPets,
  submittedLostPet,
  gettingLostPetPosition,
  gettingSearchCenter,
  resetFail,
  gettingSightingPosition,
  fetchingSightings
};

import {
  FETCHED_LOST_PETS,
  POST_LOST_PET,
  POST_LOADING,
  FETCHED_MAP_CENTER,
  FAILED_FETCH,
  RESET_FAIL,
  FETCHED_SIGHTINGS,
  POSTED_SIGHTING,
  LOGGED_IN,
  LOGGED_OUT,
  MOVE_TO_LOCATION
} from "./actionType";

const URL = "http://localhost:3000/lost_pets";
const MAPBOX_KEY = `${process.env.REACT_APP_MAPBOX_KEY}`;

// FETCHING LOST PETS FROM BACKEND
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

// MAKING FETCH CALL TO MAPBOX GEOCODER API FOR COORDINATES
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
      }.json?country=us&limit=1&access_token=${MAPBOX_KEY}&types=address`
    )
      .then(resp => resp.json())
      .then(d => {
        d.features.length === 0
          ? dispatch(didNotFetch())
          : dispatch(submittingLostPetForm(petObj, d.features[0].center));
      });
  };
}

// VALID ADDRESS COORDINATES HAVE BEEN RETURNED FROM MAPBOX
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

// ZIP CODE SUBMITTED TO MAPBOX GEOCODING API FOR SEARCH COORDINATES
function gettingSearchCenter(zip) {
  return dispatch => {
    dispatch(loadingPetSubmit());
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${zip}.json?access_token=${MAPBOX_KEY}&country=us&types=postcode&limit=1`
    )
      .then(resp => resp.json())
      .then(c => {
        c.features.length === 0
          ? dispatch(didNotFetch())
          : dispatch(fetchedSearchCenter(c.features[0].center.reverse()));
      });
  };
}

// VALID U.S. ZIP CODE COORDINATES RECEIVED FROM MAPBOX API, PAYLOARD IS NEW MAP CENTER
function fetchedSearchCenter(coord) {
  return { type: FETCHED_MAP_CENTER, payload: coord };
}

// ACCOUNTS FOR INVALID ZIP/ADDRESS
function didNotFetch() {
  return { type: FAILED_FETCH };
}

// ALLOWS FOR STORE STATE TO BE RESET AFTER INVALID FORM SUBMISSION
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
      }.json?country=us&limit=1&access_token=${MAPBOX_KEY}&types=address`
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
      .then(postedSighting => {
        dispatch(submittedSighting(postedSighting));
      });
  };
}

function submittedSighting(sightingObj) {
  return { type: POSTED_SIGHTING, payload: sightingObj };
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

// USER LOGIN/LOGOUT ACTION CREATORS

function userLogIn(user) {
  return { type: LOGGED_IN, payload: user };
}

function userLogOut() {
  return { type: LOGGED_OUT };
}

// MOVE TO MAP POSITION
function moveToLocation(pet) {
  return { type: MOVE_TO_LOCATION, payload: pet };
}

export {
  fetchingLostPets,
  submittedLostPet,
  gettingLostPetPosition,
  gettingSearchCenter,
  resetFail,
  gettingSightingPosition,
  fetchingSightings,
  userLogIn,
  userLogOut,
  moveToLocation
};

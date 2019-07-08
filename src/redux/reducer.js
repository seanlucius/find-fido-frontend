import { combineReducers } from "redux";
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

const loadingReducer = (oldState = false, action) => {
  switch (action.type) {
    case POST_LOADING:
      return true;
    case FETCHED_LOST_PETS:
      return false;
    case FETCHED_MAP_CENTER:
      return false;
    case RESET_FAIL:
      return false;
    case POST_LOST_PET:
      return false;
    case FETCHED_SIGHTINGS:
      return false;
    case POSTED_SIGHTING:
      return false;
    default:
      return oldState;
  }
};

const lostPetsReducer = (oldState = [], action) => {
  switch (action.type) {
    case FETCHED_LOST_PETS:
      return action.payload;
    case POST_LOST_PET:
      return [...oldState, action.payload];
    default:
      return oldState;
  }
};

const mapCenterReducer = (oldState = [38.90293, -77.037898], action) => {
  switch (action.type) {
    case FETCHED_MAP_CENTER:
      return action.payload;
    case POST_LOST_PET:
      return [action.payload.latitude, action.payload.longitude];
    case POSTED_SIGHTING:
      return [action.payload.latitude, action.payload.longitude];
    case MOVE_TO_LOCATION:
      return [action.payload.latitude, action.payload.longitude];
    default:
      return oldState;
  }
};

// REDUCER ACCOUNTS FOR FORM SUBMISSION FAILURES/RESETTING FORMS AFTER INVALID SUBMISSIONS
const failedReducer = (oldState = false, action) => {
  switch (action.type) {
    case FAILED_FETCH:
      return true;
    case RESET_FAIL:
      return false;
    default:
      return oldState;
  }
};

const sightingsReducer = (oldState = [], action) => {
  switch (action.type) {
    case FETCHED_SIGHTINGS:
      return action.payload;
    case POSTED_SIGHTING:
      return [...oldState, action.payload];
    default:
      return oldState;
  }
};

const currentUserReducer = (oldState = null, action) => {
  switch (action.type) {
    case LOGGED_IN:
      return action.payload;
    case LOGGED_OUT:
      return null;
    default:
      return oldState;
  }
};

const rootReducer = combineReducers({
  lostPets: lostPetsReducer,
  loading: loadingReducer,
  mapCenter: mapCenterReducer,
  failed: failedReducer,
  sightings: sightingsReducer,
  currentUser: currentUserReducer
});

export default rootReducer;

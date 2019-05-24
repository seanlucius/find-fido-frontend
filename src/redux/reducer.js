import { combineReducers } from "redux";
import {
  FETCHED_LOST_PETS,
  POST_LOST_PET,
  POST_LOADING,
  FETCHED_MAP_CENTER,
  FAILED_FETCH,
  RESET_FAIL
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

const mapCenterReducer = (oldState = [39.023805, -77.094242], action) => {
  switch (action.type) {
    case FETCHED_MAP_CENTER:
      return action.payload;
    case POST_LOST_PET:
      return [action.payload.latitude, action.payload.longitude];
    default:
      return oldState;
  }
};

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

const rootReducer = combineReducers({
  lostPets: lostPetsReducer,
  loading: loadingReducer,
  mapCenter: mapCenterReducer,
  failed: failedReducer
});

export default rootReducer;

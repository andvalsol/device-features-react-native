import {ADD_PLACE} from "../actions/places"
import Place from "../../models/Place"

const initialState = {
    places: []
}

export default (state = initialState,  action) => {
    switch (action.type) {
        case ADD_PLACE:
            const place = new Place (new Date().toString(), action.data.title, action.data.imageUri)

            return {
                places: state.places.concat(place)
            }
        default:
            return state
    }
}
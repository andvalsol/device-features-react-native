import {ADD_PLACE, SET_PLACES} from "../actions/places"
import Place from "../../models/Place"

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const place =
                new Place(
                    action.data.id.toString(),
                    action.data.title,
                    action.data.imageUri,
                    action.data.address,
                    action.data.coordinates.latitude,
                    action.data.coordinates.longitude
                )

            return {
                places: state.places.concat(place)
            }
        case SET_PLACES:
            return {
                places: action.places.map((place) =>
                    new Place(
                        place.id.toString(),
                        place.title,
                        place.imageUri
                    )
                )
            }
        default:
            return state
    }
}
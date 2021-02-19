import * as FileSystem from "expo-file-system"
import {insertPlace, fetchPlaces} from "../../helpers/DB"

export const ADD_PLACE = "ADD_PLACE"
export const SET_PLACES = "SET_PLACE"

export const addPlace = (title, selectedImage, selectedLocation) => {
    return async (dispatch) => {
        const googleGeocodingAddress = "someurl" // This can be retrieved via the Google Geocoding API

        const imagePathName = selectedImage.split("/").pop() // Get the last element, which is the file name

        const newPath = FileSystem.documentDirectory + imagePathName

        try {
            await FileSystem.moveAsync({
                from: selectedImage,
                to: newPath
            })

            const result = await insertPlace(title, newPath, googleGeocodingAddress, selectedLocation.latitude, selectedLocation.longitude)

            dispatch({
                type: ADD_PLACE,
                data: {
                    title: title,
                    imageUri: selectedImage,
                    id: result.insertId,
                    address: googleGeocodingAddress,
                    coordinates: {
                        latitude: selectedLocation.latitude,
                        longitude: selectedLocation.longitude
                    }
                }
            })
        } catch (e) {
            // TODO do something useful
        }
    }
}

export const loadPlaces = () => {
    return async (dispatch) => {
        const places = await fetchPlaces()

        dispatch({
            type: SET_PLACES,
            places: places
        })
    }
}

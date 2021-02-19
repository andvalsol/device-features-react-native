export const ADD_PLACE = "ADD_PLACE"

export const addPlace = (title, selectedImage) => {
    return {
        type: ADD_PLACE,
        data: {
            title: title,
            imageUri: selectedImage
        }
    }
}

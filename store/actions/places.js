import * as FileSystem from "expo-file-system"


export const ADD_PLACE = "ADD_PLACE"

export const addPlace = (title, selectedImage) => {
    return async (dispatch) => {
        const imagePathName = selectedImage.split("/").pop() // Get the last element, which is the file name

        const newPath = FileSystem.documentDirectory + imagePathName

        try {
            await FileSystem.moveAsync({
                from: selectedImage,
                to: newPath
            })

            dispatch({
                type: ADD_PLACE,
                data: {
                    title: title,
                    imageUri: selectedImage
                }
            })
        } catch (e) {
            // TODO do something useful
        }
    }
}

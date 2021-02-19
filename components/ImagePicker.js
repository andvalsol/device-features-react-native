import React, {useState} from "react"
import {View, Button, Text, StyleSheet, Image, Alert} from "react-native"
import Colors from "../constants/Colors"
import * as ImgPicker from "expo-image-picker"
import * as Permissions from "expo-permissions"
import {launchCameraAsync} from "expo-image-picker";


const ImagePicker = (props) => {
    const [pickedImageUri, setPickedImageUri] = useState()

    const pickImageHandler = async () => {
        // Before launching the camera we should ask for permissions at runtime
        const verifyPermissions = async () => {
            const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY)

            if (result.status !== "granted") {
                Alert.alert("Camera permission not given", [{text: "Ok"}])

                return false
            }

            return true
        }

        const isPermissionGranted = await verifyPermissions()
        // launchCamaraAsync will launch the camera and returns a promise, because is not known when the user will come back to the application
        if (isPermissionGranted) {
            const pickedImage = await ImgPicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.7
            })

            setPickedImageUri(pickedImage.uri)
            props.onImageTaken(pickedImage.uri)
        }
    }

    return (
        <View style={styles.imagePicker}>
            <View syle={styles.imagePreview}>
                <Text>No image picked yet</Text>
                {!pickedImageUri ?
                    (<Text>No picked image yet</Text>) :
                    <Image
                        style={styles.image}
                        source={{uri: pickedImageUri}}/>}
            </View>
            <Button
                title="Pick image"
                color={Colors.primary}
                onPress={pickImageHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {},
    imagePreview: {
        width: "100%",
        height: "200",
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#cccccc",
        borderWidth: 1
    },
    image: {
        width: "100%",
        height: "100%"
    }
})

export default ImagePicker
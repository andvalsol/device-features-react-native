import React from "react"
import {View, Image, StyleSheet} from "react-native"
import VARIABLES from "../env"


const MapPreview = (props) => {
    const imagePreviewUrl = "urlForGoogleMap" + VARIABLES.googleAPIKey

    return (
        <View>
            {props.location ?
                <Image
                    style={styles.mapImage}
                    source={{uri: imagePreviewUrl}}/> :
                props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    mapImage: {
        height: "100%",
        width: "100%"
    }
})

export default MapPreview
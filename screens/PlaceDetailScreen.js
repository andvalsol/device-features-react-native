import React from "react"
import {View, Image, StyleSheet, ScrollView, Text} from "react-native"
import MapPreview from "../components/MapPreview"
import {useSelector} from "react-redux"


const PlaceDetailScreen = (props) => {
    const placeID = props.navigation.getParam("placeId")

    const place = useSelector((state) => state.places.places.find((place) => place.id === placeID))

    const selectedLocation = {
        latitude: place.latitude,
        longitude: place.longitude
    }

    const showMapHandler = () => {
        props.navigation.navigate("MapScreen", {
            readOnly: true,
            initialLocation: selectedLocation
        })
    }

    return (
        <ScrollView>
            <Image
                source={{uri: place.imageUri}}/>
            <View>
                <Text>{place.address}</Text>
                <MapPreview
                    onPress={showMapHandler}
                    location={selectedLocation}/>
            </View>
        </ScrollView>
    )
}

PlaceDetailScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: navigationData.navigation.getParam("placeTitle")
    }
}

const styles = StyleSheet.create({

})

export default PlaceDetailScreen
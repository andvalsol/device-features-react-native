import React, {useState, useEffect, useCallback} from "react"
import {Text, StyleSheet, TouchableOpacity, Platform} from "react-native"
import MapView, {Marker} from "react-native-maps"
import Colors from "../constants/Colors"


const MapScreen = (props) => {
    const initialLocation = props.navigation.getParam("initialLocation")
    const readOnly = props.navigation.getParam("readOnly")

    const [selectedLocation, setSelectedLocation] = useState(initialLocation)

    const mapRegion = {
        latitude: (initialLocation) ? initialLocation.latitude : 0,
        longitude: (initialLocation) ? initialLocation.longitude : 0,
        latitudeDelta: 1,
        longitudeDelta: 1
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation)
            return // TODO show an alert to the user

        props.navigation.navigate("NewPlaceScreen", {
            selectedLocation: selectedLocation
        })
    }, [selectedLocation])

    useEffect(() => {
        props.navigation.setParams({
            saveLocation: savePickedLocationHandler()
        })
    })

    useState(() => {
        props.navigation.setParams({
            saveLocation: selectedLocation
        })
    }, [selectedLocation])

    const selectLocationHandler = (event) => {
        if (!readOnly)
            setSelectedLocation({
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude
            })
    }

    let markerCoordinates

    if (selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude
        }
    }

    return (
        <MapView
            style={styles.map}
            region={mapRegion}
            onPress={selectLocationHandler}>
            {markerCoordinates &&
            <Marker
                title="Picked location"
                coordinate={markerCoordinates}/>}
        </MapView>
    )
}

MapScreen.navigationOptions = (navigationData) => {
    const saveFunction = navigationData.navigate.getParam("saveLocation")
    const readOnly = navigationData.navigate.getParam("readOnly")

    if (!readOnly)
        return {
            headerRight: (
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={saveFunction}>
                    <Text style={styles.headerText}>Save</Text>
                </TouchableOpacity>
            )
        }
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    headerButton: {
        marginHorizontal: 20
    },
    headerText: {
        fontSize: 16,
        color: (Platform.OS === "android" ? "#FFFFFF" : Colors.primary)
    }
})

export default MapScreen
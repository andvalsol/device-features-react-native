import React, {useState, useEffect} from "react"
import {View, Button, StyleSheet, Text, ActivityIndicator, Alert, TouchableOpacity} from "react-native"
import Colors from "../constants/Colors"
import * as Location from "expo-location"
import * as Permissions from "expo-permissions"
import MapPreview from "./MapPreview"


const LocationPicker = (props) => {
    const [isLoading, setIsLoading] = useState(false)

    const [userLocation, setUserLocation] = useState()

    const selectedLocation = props.navigation.getParam("selectedLocation")

    const {selectedLoc} = props

    useEffect(() => {
        if (selectedLocation) {
            setUserLocation(selectedLocation)
            selectedLoc(selectedLocation)
        }

    }, [selectedLocation, selectedLoc])

    const pickOnMapHandler = () => {
        props.navigation.navigate("MapsScreen")
    }

    const locationPickerHandler = async () => {
        // Before launching the camera we should ask for permissions at runtime
        const verifyPermissions = async () => {
            const result = await Permissions.askAsync(Permissions.LOCATION)

            if (result.status !== "granted") {
                Alert.alert("Location  permission not given", [{text: "Ok"}])

                return false
            }

            return true
        }

        const isPermissionGranted = await verifyPermissions()

        if (isPermissionGranted) {
            try {
                setIsLoading(true)

                const getUserLocation = await Location.getCurrentPositionAsync()

                setIsLoading(false)

                setUserLocation(getUserLocation)

            } catch (e) {
                setIsLoading(false)

                Alert.alert("Error while getting your location", [{text: "Ok"}])
            }
        }
    }

    return (
        <View style={styles.locationPicker}>
            <TouchableOpacity
                onPress={props.onPress}>
                <MapPreview
                    location={userLocation}
                    onPress={pickOnMapHandler}>
                    <View style={styles.mapPreview}>
                        {isLoading ?
                            <ActivityIndicator
                                size="large"
                                color={Colors.primary}/> :
                            <Text>No location chosen yet</Text>}
                    </View>
                </MapPreview>
            </TouchableOpacity>
            <View style={styles.actions}>
                <Button
                    title="Get user location"
                    color={Colors.primary}
                    onPress={locationPickerHandler}/>
                <Button
                    title="Pick on map"
                    onPress={pickOnMapHandler}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },
    mapPreview: {
        marginBottom: 10,
        width: "100%",
        height: 150,
        borderColor: "#cccccc",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default LocationPicker
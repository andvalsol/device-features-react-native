import React from "react"
import {View, Text, StyleSheet} from "react-native"

const PlaceDetailScreen = (props) => {
    return (
        <View>
            <Text>Place detail screen</Text>
        </View>
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
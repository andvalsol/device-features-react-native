import React from "react"
import {View, Text, Image, StyleSheet, TouchableOpacity} from "react-native"

import Colors from "../constants/Colors"


const PlaceItem = (props) => {
    return (
        <TouchableOpacity
            onPress={props.onSelect}
            style={styles.placeItem}>
            <Image style={styles.image}
                   source={{uri: props.imageUri}}/>
            <View style={styles.informationContainer}>
                <Text style={styles.address}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    placeItem: {
        flexDirection: "row",
        alignItem: "center",
        borderBottomColor: "#cccccc",
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "blue",
        borderColor: Colors.primary,
        borderWidth: 1
    },
    informationContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: "center",
        alignItems: "flex-start"
    },
    title: {
        color: "#666666",
        fontSize: 18,
        marginBottom: 5
    },
    address: {
        color: "#666666",
        fontSize: 16
    }
})

export default PlaceItem
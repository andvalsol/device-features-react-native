import React, {useEffect}from "react"
import {StyleSheet, FlatList} from "react-native"
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import * as CustomHeaderButton from "../components/HeaderButton"
import {Platform} from "react-native-web"
import {useSelector, useDispatch} from "react-redux"
import PlaceItem from "../components/PlaceItem"
import * as Places from "../store/actions/places"


const PlacesListScreen = (props) => {
    const places = useSelector((state) => state.places.places) // Because the root reducer uses places and the initial state is called places

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(Places.loadPlaces())
    }, [dispatch])

    const selectPlaceItemHandler = (itemData) => {
        props.navigation.navigate("PlaceDetailScreen", {
            placeTitle: itemData.item.title,
            placeId: itemData.item.id
        })
    }

    return (
        <FlatList
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={(itemData) => {
                return (
                    <PlaceItem
                        onSelect={selectPlaceItemHandler.bind(this, itemData)}
                        title={itemData.item.title}
                        imageUri={itemData.item.imageUri}
                        address={itemData.item.address}/>
                )
            }}/>
    )
}

PlacesListScreen.navigationOptions = (navigationData) => {
    return {
        headerTitle: "All places",
        headerRight: (
            <HeaderButtons
                HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Add place"
                    iconName={
                        Platform.OS === "android" ? "md-add" : "ios-add"
                    }
                    onPress={() => {
                        navigationData.navigate("NewPlaceScreen")
                    }}/>
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    container: {}
})

export default PlacesListScreen
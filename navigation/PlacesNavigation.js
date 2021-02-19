import {Platform} from "react-native"

import {createStackNavigator, createAppContainer} from "react-navigation"
import PlacesListScreen from "../screens/PlacesListScreen"
import PlaceDetailScreen from "../screens/PlaceDetailScreen"
import NewPlaceScreen from "../screens/NewPlaceScreen"
import MapScreen from "../screens/MapScreen"
import Colors from "../constants/Colors"

const PlacesNavigator = createStackNavigator({
    PlacesScreen: PlacesListScreen,
    PlaceDetailScreen: PlaceDetailScreen,
    NewPlaceScreen: NewPlaceScreen,
    MapScreen: MapScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : ""
        },
        headerTintColor: Platform.OS === "android" ? "#FFFFFF" : Colors.primary
    }
})

export default createAppContainer(PlacesNavigator)
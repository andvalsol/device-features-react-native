import React, {useState} from "react"
import {View, Text, StyleSheet, Button, TextInput, ScrollView} from "react-native"
import Colors from "../constants/Colors"
import {useDispatch} from "react-redux"
import * as placesActions from "../store/actions/places"
import ImagePicker from "../components/ImagePicker"


const NewPlaceScreen = (props) => {
    const [title, setTitle] = useState("")
    const [selectedImage, setSelectedImage] = useState()

    const dispatch = useDispatch()

    const titleHandler = (text) => {
        // TODO add validation
        setTitle(text)
    }

    const imageTakenHandler = (imageUri) => {
        setSelectedImage(imageUri)
    }

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(title, selectedImage))

        // Go back to the place list screen
        props.navigation.goBack()
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={titleHandler}
                    value={title}/>
                <ImagePicker onImageTaken={imageTakenHandler}/>
                <Button
                    title="Save place"
                    color={Colors.primary}
                    onPress={savePlaceHandler}/>
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: "App Place"
}

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: "#cccccc",
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

export default NewPlaceScreen
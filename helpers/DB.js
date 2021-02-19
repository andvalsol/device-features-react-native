import {SQLite} from "expo-sqlite"

const DB = SQLite.openDatabase("places.db")

export const initialize = () => {
    const promise = new Promise((resolve, reject) => {
        // We need to create a table that will store the references
        DB.transaction((transaction => {
            transaction.executeSql(
                "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);",
                [],
                (_, success) => {
                    resolve()
                },
                (_, error) => {
                    reject(error)
                }
            )
        }))
    })

    return promise
}
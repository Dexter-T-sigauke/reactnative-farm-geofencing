import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import React, { useLayoutEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { useDispatch } from "react-redux";
import { logo_img } from "../assets";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { SET_USER } from "../context/actions/userActions";

const SplashScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        checkLoggedUser();
    }, [])

    const checkLoggedUser = async() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if(userCred?.uid){
                getDoc(doc(firestoreDB, "users", userCred?.uid)).then(
                    (docSnap) => {
                        if (docSnap.exists()) {
                            console.log("User Data : ", docSnap.data());
                            dispatch(SET_USER(docSnap.data()));
                        }
                    }
                ).then(() => {
                    setTimeout(() => {
                        navigation.replace("HomeScreen");
                    }, 2000);
                });
            } else {
                navigation.replace("LoginScreen")
            }
        })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <Image source={logo_img} style={{ width: 100, height: 100, marginBottom: 24 }} resizeMode="contain" />
            <ActivityIndicator size={"large"} color={"#43C651"} />
        </View>
    );
};

export default SplashScreen;

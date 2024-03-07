import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from "react-redux";
import { ImageBg, logo_img } from "../assets";
import UserTextInput from "../components/UserTextInput";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { SET_USER } from "../context/actions/userActions";

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const [getEmailValidationStatus, setGetEmailValidationStatus] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("Error");
    const dispatch = useDispatch();

    const screenWidth = Math. round(Dimensions.get("window").width);

    

    const handleLogin = async () => {
        if (getEmailValidationStatus && email !== "") {
            await signInWithEmailAndPassword(firebaseAuth, email, password)
                .then((userCred) => {
                if (userCred) {
                    console. log("User Id:", userCred ?.user.uid);
                    getDoc(doc(firestoreDB, "users", userCred ?.user.uid)).then(
                        (docSnap) => {
                            if (docSnap.exists()) {
                                console.log("User Data : ", docSnap.data() );
                                dispatch(SET_USER(docSnap.data()));
                            }
                        }
                    );
                }
            })
            .catch((err) => {
                console.log("Error : ", err.message);
                if (err.message.includes("wrong-password")) {
                    setAlert(true);
                    setAlertMessage("Password Mismatch");
                } else if (err.message.includes("user-not-found")) {
                    setAlert(true);
                    setAlertMessage("User Not Found");
                } else {
                    setAlert(true);
                    setAlertMessage("Invalid Email Address");
                }
                setInterval(() => {
                    setAlert(false);
                }, 5000);
            });
        }
    };

    


    return (
        <View className="flex-1 items-center justify-start">
            <Image
            source={ImageBg}
            resizeMode="cover"
            className="h-96"
            style={{ width: screenWidth }}
            />

            {/* Main View */}

            <View className="w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6 space-y-6">
                <Image source={logo_img} className="w-20 h-20" resizeMode="contain" />

                <Text className="py-2 text-primaryText text-xl font-semibold">Welcome Back !</Text>

                <View className = "w-full flex items-center justify-center">
                    {/* alert */}
                    {alert && <Text className="text-base text-red-600">{alertMessage}</Text>}
                    <UserTextInput
                        placeholder="Email"
                        isPass={false}
                        setStatValue={setEmail}
                        setGetEmailValidationStatus = {setGetEmailValidationStatus}
                    />
                    <UserTextInput
                        placeholder="Password"
                        isPass={true}
                        setStatValue={setPassword}
                    />
                </View>

                

                <TouchableOpacity  onPress={handleLogin} className="w-full px-4 py-2 rounded-xl bg-primary my-3 flex
                items-center justify-center">
                    <Text className="py-2 text-white text-xl font-semibold">
                        Sign In
                    </Text>
                </TouchableOpacity>
                <View className="w-full py-4 flex-row items-center justify-center space-x-2">
                    <Text className="text-base text-primaryText">
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("SignUpScreen")}>
                        <Text className="text-base font-semibold text-primaryBold">
                            Create Here
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        );
    };

export default LoginScreen;
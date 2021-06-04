import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import flyingChat from '../image/flyingchat.jpg';
import { useState } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useEffect } from 'react';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
   const unsubscribe=auth.onAuthStateChanged((authUser)=>{
       console.log(authUser);

            if(authUser)
            {
                navigation.replace('Home');
            }
        });
        return unsubscribe;
    },[]);
    
    const signIn = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error));

    };
    return (
        <KeyboardAvoidingView behavior='padding' enabled style={styles.container}>
            <StatusBar style="light" />
            <Image source={flyingChat} style={{ width: 200, height: 200 }} />
            <View style={styles.inputContainer}>
                <Input placeholder="Email"
                    autoFocus
                    type='email'
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input placeholder="Password"
                    autoFocus type='password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title='Login' />
            <Button onPress={()=>navigation.navigate('Register')} containerStyle={styles.button} type="outline" title='Register' />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor:'white',

    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    },
});

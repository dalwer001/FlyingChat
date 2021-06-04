import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Input } from 'react-native-elements/dist/input/Input';
import { useState, useLayoutEffect } from 'react';
import { Button } from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageURL, setImageURL] = useState('');

    useLayoutEffect(() => {

        navigation.setOptions({
            headerBackTitle: 'Back to Login',
        });
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageURL || 'https://i.pinimg.com/736x/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg'
                })
            }).catch((error) => alert(error.message))
    };


    return (
        <KeyboardAvoidingView behavior='padding' enabled style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal account
            </Text>
            <View style={styles.inputContainer}>
                <Input placeholder='Full Name'
                    autoFocus
                    type='text'
                    value={name}
                    onChangeText={(text) => setName(text)} />
                <Input placeholder='Email'
                    autoFocus
                    type='email'
                    value={email}
                    onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Password'
                    autoFocus
                    type='password'
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)} />

                <Input placeholder="Profile picture URL (optional)"
                    autoFocus
                    type='text'
                    value={imageURL}
                    onChangeText={(text) => setImageURL(text)}
                    onSubmitEditing={register} />
            </View>
            <Button
                containerStyle={styles.button}
                raised onPress={register} title='Register' />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignments: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
    },

})

import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';


import CustomListItem from '../components/CustomListItem';
import { auth, db } from '../firebase';

const HomeScreen = ({ navigation}) => {
const [chats, setChats] = useState([]);


    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    };

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) => 
            setChats(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),

            }))
            )
        );
        return unsubscribe;
    }, []);

     useLayoutEffect (() => {
        navigation.setOptions({
            title: "Flying",
            headerStyle: {backgroundColor: "green"},
            headerTitleStyle: {color: "black"},
            headerTitleColor: "black",
            headerLeft: () => (
            <View style={{ marginLeft: 20}}>
                <TouchableOpacity onPress={signOutUser}s activeOpacity={0.5}>
                <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}/>
</TouchableOpacity>
            </View>
            ),
            headerRight: () => (
                <View style={{ 
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight:20,

                }}>
                    <TouchableOpacity  activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>

                    
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                        <SimpleLineIcons name='pencil' size={24} color="black" />
                    </TouchableOpacity>
                    </View>
        ),

        });
        
    }, [navigation]);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {chats.map(({id,data: { chatName}}) =>(
                    <CustomListItem key={id} id={id} chatName={chatName}/>

                )
                )}
                <CustomListItem/>
            </ScrollView>
            </SafeAreaView>
    );
};

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:"100%",
    }
})

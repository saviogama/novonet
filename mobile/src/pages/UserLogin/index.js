import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import styles from './styles';

export default function UserLogin() {
    const [codigo, setCodigo] = useState('Digite seu código');

    const navigation = useNavigation();

    function navigateToUserHome(){
        navigation.navigate('UserHome');
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/loginLogo.png')}
            />
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setCodigo(text)}
                    value={codigo}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={navigateToUserHome}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <Image
                style={styles.footer}
                source={require('../../assets/loginFooter.png')}
            />
        </View>
    )
}

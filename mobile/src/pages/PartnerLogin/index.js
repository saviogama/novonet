import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './styles';

export default function PartnerLogin() {
    const [email, setEmail] = useState('Email');
    const [senha, setSenha] = useState('Senha');

    const navigation = useNavigation();

    function navigateToUserLogin(){
        navigation.navigate('UserLogin');
    }

    function navigateToPartnerHome(){
        navigation.navigate('PartnerHome');
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../assets/logo.png')}
            />
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setSenha(text)}
                    value={senha}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={navigateToPartnerHome}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={navigateToUserLogin}>
                <View style={styles.link}>
                    <Text style={styles.textLink}>Sou Cliente</Text>
                    <Feather name="log-in" size={22} color="#00524A" />
                </View>
            </TouchableOpacity>
            <Image
                style={styles.footer}
                source={require('../../assets/loginFooter.png')}
            />
        </View>
    )
}

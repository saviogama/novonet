import React, { useState, useContext } from 'react';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AuthContext from '../../contexts/auth';
import styles from './styles';

export default function PartnerLogin() {
    const [email, setEmail] = useState('');
    const [password_entry, setPassword_Entry] = useState('');
    const { setToken } = useContext(AuthContext);
    const navigation = useNavigation();

    function navigateToUserLogin() {
        navigation.navigate('UserLogin');
    }

    async function handleLogin(e) {

        e.preventDefault();

        const data = {
            email,
            password_entry
        };

        try {
            const response = await api.post('partners-session', data);
            if (response.data) {
                setToken(response.data.token);
            }
        } catch (err) {
            Alert.alert('Login', `Email ou senha inválidos.`);
        }
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
                    onChangeText={text => setEmail(text)}
                    value={email}
                    placeholder="Email"
                    placeholderTextColor="#00524A99"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setPassword_Entry(text)}
                    value={password_entry}
                    placeholder="Senha"
                    placeholderTextColor="#00524A99"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
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

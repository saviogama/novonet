import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import api from '../../services/api';
import AuthContext from '../../contexts/auth';
import styles from './styles';

export default function UserLogin() {
    const [code, setCode] = useState('3d491234d8ba44b39bacba0089c7f5aa');
    const { setToken } = useContext(AuthContext);

    async function handleLogin(e) {

        e.preventDefault();

        const data = {
            code
        };

        try {
            const response = await api.post('clients-session', data);
            if (response.data) {
                setToken(response.data.token);
            }
        } catch (err) {
            Alert.alert('Login', `Código inválido.`);
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
                    onChangeText={text => setCode(text)}
                    value={code}
                    placeholder="Digite seu código"
                    placeholderTextColor="#00524A99"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
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

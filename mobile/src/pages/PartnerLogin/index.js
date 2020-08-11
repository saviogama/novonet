import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import styles from './styles';

export default function PartnerLogin() {
    const [email, setEmail] = useState('Email');
    const [senha, setSenha] = useState('Senha');

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../../assets/logo.png')}
            />
            <View style={styles.field}>
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
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <TouchableHighlight>
                <View style={styles.link}>
                    <Text style={styles.textLink}>Sou Cliente</Text>
                </View>
            </TouchableHighlight>
            <Image
                style={styles.logo}
                source={require('../../../assets/enfeite.png')}
            />
        </View>
    )
}

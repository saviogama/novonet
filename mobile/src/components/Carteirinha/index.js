import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';

export default function Carteirinha() {

    return (
        <View style={styles.carteira}>
            <Image style={styles.border} source={require('../../assets/border.png')} />
            <Image style={styles.borderHorizontal} source={require('../../assets/borderHorizontal.png')} />
            <Text style={styles.nome}>Nome</Text>
            <Text style={styles.sobrenome}>Sobrenome</Text>
            <Text style={styles.codigo}>Cod: 001122</Text>
            <Text style={styles.status}>Status: Ativo</Text>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
        </View>
    )
}

import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';

export default function Carteirinha(props) {

    return (
        <View style={styles.carteira}>
            <Image style={styles.border} source={require('../../assets/border.png')} />
            <Image style={styles.borderHorizontal} source={require('../../assets/borderHorizontal.png')} />
            <Text style={styles.nome}>{props.name}</Text>
            <Text style={styles.sobrenome}>{props.lastname}</Text>
            <Text style={styles.codigo}>Cod: {props.code}</Text>
            <Text style={styles.status}>Status: {props.status}</Text>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
        </View>
    )
}

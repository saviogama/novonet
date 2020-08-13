import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Carteirinha from '../../components/Carteirinha';
import styles from './styles';

export default function UserHome() {

    const navigation = useNavigation();

    function navigateToLogin() {
        navigation.navigate('PartnerLogin');
    }

    return (
        <View style={styles.view}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../assets/headerLogo.png')} />
                    <TouchableOpacity style={styles.icon} onPress={navigateToLogin}>
                        <Text style={styles.headerText}>Sair</Text>
                        <Feather name="log-out" size={14} color="#737380" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Olá, Cliente</Text>
                <Text style={styles.description}>Seu status é: Ativo</Text>
                <Carteirinha />
                <Text style={styles.observation}>
                    Observação: É obrigatório a apresentação de um documento com foto comprovando a titularidade.
                </Text>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Exibir QR Code</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <TouchableOpacity>
                        <Entypo style={styles.footerIcon} name="instagram-with-circle" size={36} color="#00524A" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo style={styles.footerIcon} name="facebook-with-circle" size={36} color="#00524A" />
                    </TouchableOpacity>
                </View>
            </View>
            <Image style={styles.footerColor} source={require('../../assets/footer.png')} />
        </View>
    )
}

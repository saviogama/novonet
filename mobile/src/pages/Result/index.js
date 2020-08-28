import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/auth';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import api from '../../services/api';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Carteirinha from '../../components/Carteirinha';
import styles from './styles';

export default function Result({ route, navigation }) {
    const [client, setClient] = useState('');
    const [active, setActive] = useState('');
    const { code } = route.params;
    const { user, signOut } = useContext(AuthContext);

    function navigateToLogin() {
        signOut();
    }

    function navigateToPartnerHome() {
        navigation.navigate('PartnerHome');
    }

    const data = {
        code
    }
    console.log(data.code)

    useEffect(() => {
        (async () => {
            await api.post('clients/data', data, {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            }).then(response => {
                setClient(response.data);
                if (response.data.status === true) {
                    setActive('Ativo');
                } else {
                    setActive('Inativo');
                }
            }).catch(function (error) {
                console.log(error);
            });
        })();
    }, [setClient]);

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
                <View style={styles.result}>
                    <Carteirinha name={client.firstname} lastname={client.lastname} code={client.code} status={active} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={navigateToPartnerHome}
                    >
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://www.instagram.com/novonetoficial/') }}>
                        <Entypo style={styles.footerIcon} name="instagram-with-circle" size={36} color="#00524A" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Linking.openURL('https://www.facebook.com/novonetbandalarga') }}>
                        <Entypo style={styles.footerIcon} name="facebook-with-circle" size={36} color="#00524A" />
                    </TouchableOpacity>
                </View>
            </View>
            <Image style={styles.footerColor} source={require('../../assets/footer.png')} />
        </View>
    )
}

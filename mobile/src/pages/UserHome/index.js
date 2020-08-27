import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/auth';
import jwt_decode from 'jwt-decode';
import api from '../../services/api';
import { View, Image, Text, TouchableOpacity, Modal, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Carteirinha from '../../components/Carteirinha';
import styles from './styles';

export default function UserHome() {
    const [modalVisible, setModalVisible] = useState(false);
    const [client, setClient] = useState('');
    const [active, setActive] = useState('');
    const [image, setImage] = useState(null);
    const { user, signOut } = useContext(AuthContext);

    var decoded = jwt_decode(user);

    function navigateToLogin() {
        signOut();
    }

    useEffect(() => {
        (async () => {
            await api.get(`clients/${decoded.id}`, {
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
            });
        })();
    }, [setClient]);

    
    useEffect(() => {
        (async () => {
            await api.get(`clients/${decoded.id}/card`, {
                headers: {
                    Authorization: `Bearer ${user}`
                }
            }).then(response => {
                setImage(response.data);
            });
        })();
    }, [setImage]);

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
                <Text style={styles.title}>Olá, {client.firstname}</Text>
                <Text style={styles.description}>Seu status é: {active}</Text>
                <Carteirinha name={client.firstname} lastname={client.lastname} code={client.code} status={active} />
                <Text style={styles.observation}>
                    Observação: É obrigatório a apresentação de um documento com foto comprovando a titularidade.
                </Text>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => { setModalVisible(!modalVisible) }}
                            >
                                <Text style={styles.buttonText}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { setModalVisible(true) }}
                >
                    <Text style={styles.buttonText} >Exibir QR Code</Text>
                </TouchableOpacity>
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

import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import jwt_decode from 'jwt-decode';
import api from '../../services/api';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

export default function PartnerHome() {
    const [partner, setPartner] = useState('');
    const [codigo, setCodigo] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { user, signOut } = useContext(AuthContext);
    const navigation = useNavigation();

    var decoded = jwt_decode(user);

    function navigateToLogin() {
        signOut();
    }

    function navigateToResult() {
        navigation.navigate('Result');
    }

    useEffect(() => {
        api.get(`partners/${decoded.id}`, {
            headers: {
                Authorization: `Bearer ${user}`
            }
        }).then(response => {
            setPartner(response.data);
        });
    }, [setPartner]);

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
                <Text style={styles.title}>Olá, {partner.company_name}</Text>
                <Text style={styles.description}>Como deseja consultar o cliente?</Text>
                <View style={styles.options}>
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setCodigo(text)}
                                    value={codigo}
                                    placeholder="Digite o código do cliente"
                                    placeholderTextColor="#00524A99"
                                />
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity
                                        style={styles.searchButton}
                                        onPress={() => { setModalVisible(!modalVisible), navigateToResult() }}
                                    >
                                        <Text style={styles.searchButtonText}>Pesquisar</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.searchButton}
                                        onPress={() => { setModalVisible(!modalVisible) }}
                                    >
                                        <Text style={styles.searchButtonText}>Voltar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <TouchableOpacity style={styles.optionsButton} onPress={() => { setModalVisible(true) }}>
                        <Entypo name="keyboard" size={50} color="#E4FF23" />
                        <Text style={styles.optionsText}>DIGITAR</Text>
                        <Text style={styles.optionsText}>CÓDIGO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionsButton}>
                        <AntDesign name="qrcode" size={50} color="#E4FF23" />
                        <Text style={styles.optionsText}>LER</Text>
                        <Text style={styles.optionsText}>QR CODE</Text>
                    </TouchableOpacity>
                </View>
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

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

export default function PartnerHome() {
    const [codigo, setCodigo] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    function navigateToLogin() {
        navigation.navigate('PartnerLogin');
    }

    function navigateToResult() {
        navigation.navigate('Result');
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
                <Text style={styles.title}>Olá, Empresa</Text>
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

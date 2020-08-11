import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: "#F0F0F0",
        flex: 1,
        paddingHorizontal: 24,
    },
    logo: {
        resizeMode: 'contain',
        width: "100%",
        height: "30%",
    },
    input: {
        height: 30,
        borderColor: "#00524A",
        borderBottomWidth: 2,
        margin: 5
    },
    buttonText: {
        color: "#FFFFFF"
    },
    button: {
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: "#00524A",
        padding: 10,
        margin: 25
    },
    textLink: {
        color: "#00524A",
        fontSize: 25
    },
    link: {
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        margin: 20
    }
});
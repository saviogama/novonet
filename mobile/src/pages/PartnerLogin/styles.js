import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        backgroundColor: "#F0F0F0",
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "space-between"
    },
    logo: {
        resizeMode: "contain",
        width: "100%",
        height: "20%",
        marginTop: Constants.statusBarHeight + 24
    },
    footer: {
        resizeMode: "contain",
        width: "100%",
        height: "30%",
    },
    input: {
        fontSize: 14,
        color: "#00524A",
        height: 30,
        borderColor: "#00524A",
        borderBottomWidth: 2,
        margin: 5
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16
    },
    button: {
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: "#00524A",
        padding: 15,
        margin: 25
    },
    textLink: {
        color: "#00524A",
        fontSize: 20,
        marginRight: 5
    },
    link: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F0F0F0",
        margin: 20
    }
});
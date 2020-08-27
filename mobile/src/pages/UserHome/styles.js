import { Platform, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    view: {
        flex: 1
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    icon: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerText: {
        fontSize: 14,
        marginRight: 5,
        color: "#737380",
    },
    title: {
        fontSize: 30,
        marginBottom: 5,
        marginTop: 48,
        color: "#13131a",
        fontWeight: "bold"
    },
    description: {
        fontSize: 14,
        lineHeight: 24,
        marginLeft: 30,
        color: "#737380"
    },
    observation: {
        fontSize: 14,
        marginBottom: 5,
        marginTop: 5,
        color: "#13131A",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: "90%",
        backgroundColor: "#F0F0F0",
        borderRadius: 20,
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    qrcode: {
        width: 10,
        height: 10
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
        marginVertical: 25,
        marginHorizontal: 55,
    },
    footer: {
        flexDirection: "row",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        margin: 10,
        justifyContent: "center"
    },
    footerIcon: {
        marginLeft: 10,
        marginRight: 10
    },
    footerColor: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        zIndex: -1
    }
});

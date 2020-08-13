import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
    carteira: {
        backgroundColor: "#00524A",
        padding: 10,
        marginVertical: 20
    },
    border: {
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0
    },
    borderHorizontal: {
        width: "30%",
        position: "absolute",
        right: 0,
        top: "40%"
    },
    nome: {
        fontSize: 20,
        marginHorizontal: 10,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: "#E4FF23"
    },
    sobrenome: {
        fontSize: 20,
        marginHorizontal: 10,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: Platform.OS === 'ios' ? "#00524A" : "#E4FF23",
        textDecorationLine: Platform.OS === 'ios' ? "line-through" : "none",
        textDecorationColor: Platform.OS === 'ios' ? "#E4FF23" : "#00524A",
    },
    codigo: {
        position: "absolute",
        right: 10,
        top: "55%",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: Platform.OS === 'ios' ? "#00524A" : "#FFF",
        textDecorationLine: Platform.OS === 'ios' ? "line-through" : "none",
        textDecorationColor: Platform.OS === 'ios' ? "#FFF" : "#00524A",
    },
    status: {
        position: "absolute",
        right: 10,
        top: "75%",
        fontSize: 16,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: Platform.OS === 'ios' ? "#00524A" : "#FFF",
        textDecorationLine: Platform.OS === 'ios' ? "line-through" : "none",
        textDecorationColor: Platform.OS === 'ios' ? "#FFF" : "#00524A",
    },
    logo: {
        marginTop: 50,
        marginBottom: 5,
        marginHorizontal: 10,
    }
});

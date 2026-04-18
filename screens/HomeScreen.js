import React from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    SafeAreaView, Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const MENU = [
    { label: '🐱 Las Letras', screen: 'Letras', bg: '#C084FC' },
    { label: '🐾 Los Números', screen: 'Numeros', bg: '#F472B6' },
    { label: '✨ Sumas y Restas', screen: 'Sumas', bg: '#E879F9' },
];

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>¡Hola! 🐱</Text>
            <Text style={styles.subtitle}>¿Qué quieres aprender hoy?</Text>
            {MENU.map((item) => (
                <TouchableOpacity
                    key={item.screen}
                    style={[styles.btn, { backgroundColor: item.bg }]}
                    onPress={() => navigation.navigate(item.screen)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.btnText}>{item.label}</Text>
                </TouchableOpacity>
            ))}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAE8FF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 52,
        fontWeight: 'bold',
        color: '#7E22CE',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 22,
        color: '#A855F7',
        marginBottom: 40,
    },
    btn: {
        width: width * 0.8,
        paddingVertical: 22,
        borderRadius: 32,
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#7E22CE',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    btnText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
});
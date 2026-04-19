import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SUBMENU = [
    { label: '⭐ Vocales', filtro: 'vocales', bg: '#C084FC' },
    { label: '🐱 Consonantes', filtro: 'consonantes', bg: '#F472B6' },
    { label: '📖 Abecedario completo', filtro: 'todas', bg: '#E879F9' },
];

export default function LetrasScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🐱 Las Letras</Text>
            <Text style={styles.subtitle}>¿Qué quieres practicar?</Text>
            {SUBMENU.map((item) => (
                <TouchableOpacity
                    key={item.filtro}
                    style={[styles.btn, { backgroundColor: item.bg }]}
                    onPress={() => navigation.navigate('LetrasDetalle', { filtro: item.filtro })}
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
        flex: 1, backgroundColor: '#FAE8FF',
        alignItems: 'center', justifyContent: 'center', padding: 24,
    },
    back: { position: 'absolute', top: 48, left: 16 },
    backText: { fontSize: 18, fontFamily: 'Nunito_700Bold', color: '#7E22CE' },
    title: { fontSize: 40, fontFamily: 'Nunito_800ExtraBold', color: '#7E22CE', marginBottom: 8 },
    subtitle: { fontSize: 20, fontFamily: 'Nunito_400Regular', color: '#A855F7', marginBottom: 40 },
    btn: {
        width: width * 0.8, paddingVertical: 22, borderRadius: 32,
        alignItems: 'center', marginBottom: 20,
        shadowColor: '#7E22CE', shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3, shadowRadius: 8, elevation: 8,
    },
    btnText: { fontSize: 24, fontFamily: 'Nunito_700Bold', color: '#fff' },
});
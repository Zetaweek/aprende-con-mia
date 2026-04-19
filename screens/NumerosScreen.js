import React, { useState, useRef } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    SafeAreaView, FlatList, Dimensions, Animated
} from 'react-native';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');

const NUMEROS = Array.from({ length: 20 }, (_, i) => i + 1);
const EMOJI = ['🐱', '🌸', '⭐', '🦋', '🍦', '🐾', '🌙', '🎀', '🍭', '🐣',
    '🌺', '🦄', '🍩', '🎈', '🐻', '🌈', '🍓', '🎠', '🐝', '🌻'];
const COLORES = ['#C084FC', '#F472B6', '#E879F9', '#A855F7', '#EC4899'];

export default function NumerosScreen({ navigation }) {
    const [seleccionado, setSeleccionado] = useState(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const tocar = (num) => {
        setSeleccionado(num);
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
        Speech.speak(String(num), { language: 'es-ES', pitch: 1.3, rate: 0.8 });
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🐾 Los Números</Text>

            {seleccionado && (
                <Animated.View style={[styles.detalle, { transform: [{ scale: scaleAnim }] }]}>
                    <Text style={styles.numGrande}>{seleccionado}</Text>
                    <Text style={styles.emojis}>{EMOJI.slice(0, seleccionado).join(' ')}</Text>
                    <TouchableOpacity
                        style={styles.btnSonido}
                        onPress={() => Speech.speak(String(seleccionado), { language: 'es-ES', pitch: 1.3, rate: 0.8 })}
                    >
                        <Text style={styles.btnSonidoTxt}>🔊 Escuchar</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

            <FlatList
                data={NUMEROS}
                keyExtractor={(item) => String(item)}
                numColumns={4}
                contentContainerStyle={styles.grid}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[
                            styles.card,
                            { backgroundColor: COLORES[index % COLORES.length] },
                            seleccionado === item && styles.cardActiva,
                        ]}
                        onPress={() => tocar(item)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.numCard}>{item}</Text>
                        <Text style={styles.emojiCard}>{EMOJI[index]}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAE8FF', paddingTop: 16 },
    back: { marginLeft: 16, marginBottom: 8 },
    backText: { fontSize: 18, fontFamily: 'Nunito_700Bold', color: '#7E22CE' },
    title: { fontSize: 28, fontFamily: 'Nunito_800ExtraBold', color: '#7E22CE', textAlign: 'center', marginBottom: 12 },
    detalle: {
        backgroundColor: '#fff', marginHorizontal: 24, borderRadius: 24,
        paddingVertical: 16, paddingHorizontal: 12, marginBottom: 12,
        alignItems: 'center', elevation: 6,
    },
    numGrande: { fontSize: 72, fontFamily: 'Nunito_800ExtraBold', color: '#A855F7' },
    emojis: { fontSize: 22, textAlign: 'center', marginTop: 8, lineHeight: 36 },
    btnSonido: {
        marginTop: 10, backgroundColor: '#C084FC',
        paddingHorizontal: 24, paddingVertical: 8, borderRadius: 20,
    },
    btnSonidoTxt: { fontSize: 18, fontFamily: 'Nunito_700Bold', color: '#fff' },
    grid: { paddingHorizontal: 12, paddingBottom: 24 },
    card: {
        margin: 8,
        width: (width - 96) / 4,
        aspectRatio: 0.85,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    cardActiva: { borderWidth: 4, borderColor: '#fff' },
    numCard: { fontSize: 26, fontFamily: 'Nunito_800ExtraBold', color: '#fff' },
    emojiCard: { fontSize: 18, marginTop: 2 },
});
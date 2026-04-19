import React, { useState, useRef } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    SafeAreaView, FlatList, Dimensions, Animated
} from 'react-native';
import * as Speech from 'expo-speech';

const { width } = Dimensions.get('window');

const TODAS = [
    { letra: 'A', emoji: '🕷️', ejemplo: 'Araña' },
    { letra: 'B', emoji: '🫧', ejemplo: 'Burbuja' },
    { letra: 'C', emoji: '🏠', ejemplo: 'Casa' },
    { letra: 'D', emoji: '🦷', ejemplo: 'Diente' },
    { letra: 'E', emoji: '⭐', ejemplo: 'Estrella' },
    { letra: 'F', emoji: '🌸', ejemplo: 'Flor' },
    { letra: 'G', emoji: '🐱', ejemplo: 'Gatito' },
    { letra: 'H', emoji: '🍦', ejemplo: 'Helado' },
    { letra: 'I', emoji: '🦎', ejemplo: 'Iguana' },
    { letra: 'J', emoji: '🍮', ejemplo: 'Jalea' },
    { letra: 'K', emoji: '🥝', ejemplo: 'Kiwi' },
    { letra: 'L', emoji: '🌙', ejemplo: 'Luna' },
    { letra: 'M', emoji: '🦋', ejemplo: 'Mariposa' },
    { letra: 'N', emoji: '☁️', ejemplo: 'Nube' },
    { letra: 'Ñ', emoji: '🐦', ejemplo: 'Ñandú' },
    { letra: 'O', emoji: '🐑', ejemplo: 'Oveja' },
    { letra: 'P', emoji: '🐟', ejemplo: 'Pez' },
    { letra: 'Q', emoji: '🧀', ejemplo: 'Queso' },
    { letra: 'R', emoji: '🐸', ejemplo: 'Rana' },
    { letra: 'S', emoji: '☀️', ejemplo: 'Sol' },
    { letra: 'T', emoji: '🐢', ejemplo: 'Tortuga' },
    { letra: 'U', emoji: '🍇', ejemplo: 'Uva' },
    { letra: 'V', emoji: '🐄', ejemplo: 'Vaca' },
    { letra: 'W', ejemplo: 'Waffle', emoji: '🧇' },
    { letra: 'X', emoji: '🎷', ejemplo: 'Xilófono' },
    { letra: 'Y', emoji: '🥛', ejemplo: 'Yogur' },
    { letra: 'Z', emoji: '🦓', ejemplo: 'Zebra' },
];

const VOCALES = ['A', 'E', 'I', 'O', 'U'];

const COLORES = ['#C084FC', '#F472B6', '#E879F9', '#A855F7', '#EC4899'];

export default function LetrasDetalleScreen({ navigation, route }) {
    const { filtro } = route.params;
    const [seleccionada, setSeleccionada] = useState(null);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    let data = TODAS;
    if (filtro === 'vocales') data = TODAS.filter(l => VOCALES.includes(l.letra));
    if (filtro === 'consonantes') data = TODAS.filter(l => !VOCALES.includes(l.letra));

    const titulo = filtro === 'vocales' ? '⭐ Vocales'
        : filtro === 'consonantes' ? '🐱 Consonantes'
            : '📖 Abecedario';

    const tocar = (item) => {
        setSeleccionada(item.letra);
        // Animación pop
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 1.15, duration: 100, useNativeDriver: true }),
            Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
        // Pronunciar letra
        Speech.speak(item.letra, { language: 'es-ES', pitch: 1.3, rate: 0.8 });
    };

    const letraActual = TODAS.find(l => l.letra === seleccionada);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>

            <Text style={styles.title}>{titulo}</Text>

            {seleccionada && letraActual && (
                <Animated.View style={[styles.detalle, { transform: [{ scale: scaleAnim }] }]}>
                    <Text style={styles.letraGrande}>{seleccionada}</Text>
                    <Text style={styles.emojiDetalle}>{letraActual.emoji}</Text>
                    <Text style={styles.ejemplo}>{letraActual.ejemplo}</Text>
                    <TouchableOpacity
                        style={styles.btnSonido}
                        onPress={() => Speech.speak(seleccionada, { language: 'es-ES', pitch: 1.3, rate: 0.8 })}
                    >
                        <Text style={styles.btnSonidoTxt}>🔊 Escuchar</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

            <FlatList
                data={data}
                keyExtractor={(item) => item.letra}
                numColumns={4}
                contentContainerStyle={styles.grid}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[
                            styles.card,
                            { backgroundColor: COLORES[index % COLORES.length] },
                            seleccionada === item.letra && styles.cardActiva,
                        ]}
                        onPress={() => tocar(item)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.letraCard}>{item.letra}</Text>
                        <Text style={styles.emojiCard}>{item.emoji}</Text>
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
        alignItems: 'center', backgroundColor: '#fff',
        marginHorizontal: 24, borderRadius: 24,
        paddingVertical: 16, marginBottom: 12, elevation: 6,
    },
    letraGrande: { fontSize: 64, fontFamily: 'Nunito_800ExtraBold', color: '#A855F7' },
    emojiDetalle: { fontSize: 40, marginVertical: 4 },
    ejemplo: { fontSize: 22, fontFamily: 'Nunito_700Bold', color: '#EC4899', marginTop: 4 },
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
    letraCard: { fontSize: 26, fontFamily: 'Nunito_800ExtraBold', color: '#fff' },
    emojiCard: { fontSize: 18, marginTop: 2 },
});
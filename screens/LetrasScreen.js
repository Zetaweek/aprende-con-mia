import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    SafeAreaView, FlatList, Dimensions, Animated
} from 'react-native';

const { width } = Dimensions.get('window');

const LETRAS = [
    { letra: 'A', ejemplo: '🍎 Araña' },
    { letra: 'B', ejemplo: '🫧 Burbuja' },
    { letra: 'C', ejemplo: '🐱 Gato' },
    { letra: 'D', ejemplo: '🦷 Diente' },
    { letra: 'E', ejemplo: '⭐ Estrella' },
    { letra: 'F', ejemplo: '🌸 Flor' },
    { letra: 'G', ejemplo: '🐱 Gatito' },
    { letra: 'H', ejemplo: '🍦 Helado' },
    { letra: 'I', ejemplo: '🦎 Iguana' },
    { letra: 'J', ejemplo: '🫙 Jarrón' },
    { letra: 'K', ejemplo: '🥝 Kiwi' },
    { letra: 'L', ejemplo: '🌙 Luna' },
    { letra: 'M', ejemplo: '🦋 Mariposa' },
    { letra: 'N', ejemplo: '☁️ Nube' },
    { letra: 'Ñ', ejemplo: '🍠 Ñame' },
    { letra: 'O', ejemplo: '🐑 Oveja' },
    { letra: 'P', ejemplo: '🐟 Pez' },
    { letra: 'Q', ejemplo: '🧀 Queso' },
    { letra: 'R', ejemplo: '🐸 Rana' },
    { letra: 'S', ejemplo: '☀️ Sol' },
    { letra: 'T', ejemplo: '🐢 Tortuga' },
    { letra: 'U', ejemplo: '🍇 Uva' },
    { letra: 'V', ejemplo: '🐄 Vaca' },
    { letra: 'W', ejemplo: '🎮 Wii' },
    { letra: 'X', ejemplo: '🎷 Xilófono' },
    { letra: 'Y', ejemplo: '🌿 Yerba' },
    { letra: 'Z', ejemplo: '🦓 Zebra' },
];

const COLORES = ['#C084FC', '#F472B6', '#E879F9', '#A855F7', '#EC4899'];

export default function LetrasScreen({ navigation }) {
    const [seleccionada, setSeleccionada] = useState(null);

    const tocar = (item) => {
        setSeleccionada(item.letra);
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🐱 El Abecedario</Text>

            {seleccionada && (
                <View style={styles.detalle}>
                    <Text style={styles.letraGrande}>{seleccionada}</Text>
                    <Text style={styles.ejemplo}>
                        {LETRAS.find(l => l.letra === seleccionada)?.ejemplo}
                    </Text>
                </View>
            )}

            <FlatList
                data={LETRAS}
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
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAE8FF', paddingTop: 16 },
    back: { marginLeft: 16, marginBottom: 8 },
    backText: { fontSize: 18, color: '#7E22CE', fontWeight: 'bold' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#7E22CE', textAlign: 'center', marginBottom: 12 },
    detalle: {
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 24,
        borderRadius: 24,
        paddingVertical: 16,
        marginBottom: 12,
        elevation: 6,
    },
    letraGrande: { fontSize: 72, fontWeight: 'bold', color: '#A855F7' },
    ejemplo: { fontSize: 22, color: '#EC4899', marginTop: 4 },
    grid: { paddingHorizontal: 12, paddingBottom: 24 },
    card: {
        margin: 8,
        width: (width - 96) / 4,
        aspectRatio: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    cardActiva: { borderWidth: 4, borderColor: '#fff' },
    letraCard: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
});
import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    SafeAreaView, FlatList, Dimensions
} from 'react-native';

const { width } = Dimensions.get('window');

const NUMEROS = Array.from({ length: 20 }, (_, i) => i + 1);
const EMOJI = ['🐱', '🌸', '⭐', '🦋', '🍦', '🐾', '🌙', '🎀', '🍭', '🐣',
    '🌺', '🦄', '🍩', '🎈', '🐻', '🌈', '🍓', '🎠', '🐝', '🌻'];
const COLORES = ['#C084FC', '#F472B6', '#E879F9', '#A855F7', '#EC4899'];

export default function NumerosScreen({ navigation }) {
    const [seleccionado, setSeleccionado] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🐾 Los Números</Text>

            {seleccionado && (
                <View style={styles.detalle}>
                    <Text style={styles.numGrande}>{seleccionado}</Text>
                    <Text style={styles.emojis}>
                        {EMOJI.slice(0, seleccionado).join(' ')}
                    </Text>
                </View>
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
                        onPress={() => setSeleccionado(item)}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.numCard}>{item}</Text>
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
        backgroundColor: '#fff',
        marginHorizontal: 24,
        borderRadius: 24,
        paddingVertical: 16,
        paddingHorizontal: 12,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 6,
    },
    numGrande: { fontSize: 72, fontWeight: 'bold', color: '#A855F7' },
    emojis: { fontSize: 22, textAlign: 'center', marginTop: 8, lineHeight: 36 },
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
    numCard: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
});
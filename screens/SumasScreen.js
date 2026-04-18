import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    SafeAreaView, TextInput, Dimensions, Animated
} from 'react-native';

const { width } = Dimensions.get('window');
const EMOJI_KIT = ['🐱', '🌸', '⭐', '🦋', '🍦', '🐾', '🌙', '🎀', '🍭', '🐣'];

function generarEjercicio(tipo) {
    if (tipo === 'suma') {
        const a = Math.floor(Math.random() * 9) + 1;
        const b = Math.floor(Math.random() * 9) + 1;
        return { a, b, op: '+', resultado: a + b };
    } else {
        const a = Math.floor(Math.random() * 9) + 2;
        const b = Math.floor(Math.random() * (a - 1)) + 1;
        return { a, b, op: '-', resultado: a - b };
    }
}

export default function SumasScreen({ navigation }) {
    const [tipo, setTipo] = useState('suma');
    const [ejercicio, setEjercicio] = useState(generarEjercicio('suma'));
    const [respuesta, setRespuesta] = useState('');
    const [feedback, setFeedback] = useState(null); // 'bien' | 'mal'
    const [aciertos, setAciertos] = useState(0);
    const shake = new Animated.Value(0);

    useEffect(() => {
        setEjercicio(generarEjercicio(tipo));
        setRespuesta('');
        setFeedback(null);
    }, [tipo]);

    const verificar = () => {
        if (respuesta === '') return;
        const correcto = parseInt(respuesta) === ejercicio.resultado;
        setFeedback(correcto ? 'bien' : 'mal');
        if (correcto) {
            setAciertos(a => a + 1);
            setTimeout(() => {
                setEjercicio(generarEjercicio(tipo));
                setRespuesta('');
                setFeedback(null);
            }, 1200);
        } else {
            Animated.sequence([
                Animated.timing(shake, { toValue: 10, duration: 60, useNativeDriver: true }),
                Animated.timing(shake, { toValue: -10, duration: 60, useNativeDriver: true }),
                Animated.timing(shake, { toValue: 6, duration: 60, useNativeDriver: true }),
                Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
            ]).start();
        }
    };

    const emojiA = EMOJI_KIT.slice(0, ejercicio.a).join('');
    const emojiB = EMOJI_KIT.slice(0, ejercicio.b).join('');

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>

            <Text style={styles.title}>✨ Sumas y Restas</Text>
            <Text style={styles.aciertos}>⭐ Aciertos: {aciertos}</Text>

            {/* Selector tipo */}
            <View style={styles.selector}>
                {['suma', 'resta'].map(t => (
                    <TouchableOpacity
                        key={t}
                        style={[styles.selectorBtn, tipo === t && styles.selectorActivo]}
                        onPress={() => setTipo(t)}
                    >
                        <Text style={styles.selectorTxt}>
                            {t === 'suma' ? '➕ Sumas' : '➖ Restas'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Visual emoji */}
            <View style={styles.emojiBox}>
                <Text style={styles.emojiRow}>{emojiA}</Text>
                {tipo === 'suma'
                    ? <Text style={styles.opSymbol}>➕</Text>
                    : <Text style={styles.opSymbol}>➖</Text>
                }
                <Text style={styles.emojiRow}>{emojiB}</Text>
            </View>

            {/* Ejercicio */}
            <Animated.View style={[styles.ejercicioBox, { transform: [{ translateX: shake }] }]}>
                <Text style={styles.ejercicioTxt}>
                    {ejercicio.a} {ejercicio.op} {ejercicio.b} = ?
                </Text>
            </Animated.View>

            {/* Input numérico */}
            <TextInput
                style={styles.input}
                keyboardType="number-pad"
                value={respuesta}
                onChangeText={setRespuesta}
                maxLength={2}
                placeholder="?"
                placeholderTextColor="#C084FC"
            />

            <TouchableOpacity style={styles.btnVerificar} onPress={verificar} activeOpacity={0.8}>
                <Text style={styles.btnTxt}>¡Listo! 🐾</Text>
            </TouchableOpacity>

            {feedback === 'bien' && (
                <Text style={styles.feedbackBien}>🎉 ¡Muy bien! ¡Eres increíble! 🐱</Text>
            )}
            {feedback === 'mal' && (
                <Text style={styles.feedbackMal}>😺 ¡Casi! Intenta de nuevo...</Text>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAE8FF', alignItems: 'center', paddingTop: 16 },
    back: { alignSelf: 'flex-start', marginLeft: 16, marginBottom: 8 },
    backText: { fontSize: 18, color: '#7E22CE', fontWeight: 'bold' },
    title: { fontSize: 28, fontWeight: 'bold', color: '#7E22CE', marginBottom: 4 },
    aciertos: { fontSize: 18, color: '#A855F7', marginBottom: 12 },
    selector: { flexDirection: 'row', marginBottom: 16, gap: 12 },
    selectorBtn: {
        paddingHorizontal: 20, paddingVertical: 10,
        borderRadius: 20, backgroundColor: '#E9D5FF',
    },
    selectorActivo: { backgroundColor: '#A855F7' },
    selectorTxt: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
    emojiBox: { alignItems: 'center', marginBottom: 16 },
    emojiRow: { fontSize: 28, textAlign: 'center', flexWrap: 'wrap', maxWidth: width * 0.85 },
    opSymbol: { fontSize: 32, marginVertical: 4 },
    ejercicioBox: {
        backgroundColor: '#fff',
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 28,
        elevation: 6,
        marginBottom: 20,
    },
    ejercicioTxt: { fontSize: 48, fontWeight: 'bold', color: '#7E22CE' },
    input: {
        backgroundColor: '#fff',
        width: 120,
        height: 80,
        borderRadius: 20,
        textAlign: 'center',
        fontSize: 48,
        fontWeight: 'bold',
        color: '#7E22CE',
        elevation: 4,
        marginBottom: 20,
    },
    btnVerificar: {
        backgroundColor: '#C084FC',
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: 32,
        elevation: 6,
    },
    btnTxt: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
    feedbackBien: { fontSize: 24, color: '#16A34A', fontWeight: 'bold', marginTop: 16 },
    feedbackMal: { fontSize: 22, color: '#DC2626', fontWeight: 'bold', marginTop: 16 },
});
import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet,
    SafeAreaView, TextInput, Dimensions, Animated
} from 'react-native';
import * as Speech from 'expo-speech';

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
    const [feedback, setFeedback] = useState(null);
    const [aciertos, setAciertos] = useState(0);
    const shake = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        setEjercicio(generarEjercicio(tipo));
        setRespuesta('');
        setFeedback(null);
    }, [tipo]);

    const verificar = () => {
        if (respuesta === '' || feedback !== null) return; // 👈 fix validación
        const correcto = parseInt(respuesta) === ejercicio.resultado;
        setFeedback(correcto ? 'bien' : 'mal');

        if (correcto) {
            setAciertos(a => a + 1);
            Speech.speak('¡Muy bien! ¡Eres increíble!', { language: 'es-ES', pitch: 1.4, rate: 0.9 });
            Animated.sequence([
                Animated.timing(scaleAnim, { toValue: 1.2, duration: 150, useNativeDriver: true }),
                Animated.timing(scaleAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
            ]).start();
            setTimeout(() => {
                setEjercicio(generarEjercicio(tipo));
                setRespuesta('');
                setFeedback(null);
            }, 1500);
        } else {
            Speech.speak('¡Casi! Intenta de nuevo', { language: 'es-ES', pitch: 1.2, rate: 0.9 });
            Animated.sequence([
                Animated.timing(shake, { toValue: 10, duration: 60, useNativeDriver: true }),
                Animated.timing(shake, { toValue: -10, duration: 60, useNativeDriver: true }),
                Animated.timing(shake, { toValue: 6, duration: 60, useNativeDriver: true }),
                Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
            ]).start();
            setTimeout(() => {  // 👈 fix limpieza tras error
                setRespuesta('');
                setFeedback(null);
            }, 1500);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
                <Text style={styles.backText}>← Volver</Text>
            </TouchableOpacity>

            <Text style={styles.title}>✨ Sumas y Restas</Text>
            <Text style={styles.aciertos}>⭐ Aciertos: {aciertos}</Text>

            <View style={styles.selector}>
                {['suma', 'resta'].map(t => (
                    <TouchableOpacity
                        key={t}
                        style={[styles.selectorBtn, tipo === t && styles.selectorActivo]}
                        onPress={() => setTipo(t)}
                    >
                        <Text style={[styles.selectorTxt, tipo === t && styles.selectorTxtActivo]}>
                            {t === 'suma' ? '➕ Sumas' : '➖ Restas'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.emojiBox}>
                <Text style={styles.emojiRow}>{EMOJI_KIT.slice(0, ejercicio.a).join('')}</Text>
                <Text style={styles.opSymbol}>{tipo === 'suma' ? '➕' : '➖'}</Text>
                <Text style={styles.emojiRow}>{EMOJI_KIT.slice(0, ejercicio.b).join('')}</Text>
            </View>

            <Animated.View style={[styles.ejercicioBox, {
                transform: [{ translateX: shake }, { scale: scaleAnim }]
            }]}>
                <Text style={styles.ejercicioTxt}>
                    {ejercicio.a} {ejercicio.op} {ejercicio.b} = ?
                </Text>
            </Animated.View>

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

            {feedback === 'bien' && <Text style={styles.feedbackBien}>🎉 ¡Muy bien! ¡Eres increíble! 🐱</Text>}
            {feedback === 'mal' && <Text style={styles.feedbackMal}>😺 ¡Casi! Intenta de nuevo...</Text>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAE8FF', alignItems: 'center', paddingTop: 16 },
    back: { alignSelf: 'flex-start', marginLeft: 16, marginBottom: 8 },
    backText: { fontSize: 18, fontFamily: 'Nunito_700Bold', color: '#7E22CE' },
    title: { fontSize: 28, fontFamily: 'Nunito_800ExtraBold', color: '#7E22CE', marginBottom: 4 },
    aciertos: { fontSize: 18, fontFamily: 'Nunito_700Bold', color: '#A855F7', marginBottom: 12 },
    selector: { flexDirection: 'row', marginBottom: 16, gap: 12 },
    selectorBtn: {
        paddingHorizontal: 20, paddingVertical: 10,
        borderRadius: 20, backgroundColor: '#E9D5FF',
    },
    selectorActivo: { backgroundColor: '#A855F7' },
    selectorTxt: { fontSize: 18, fontFamily: 'Nunito_700Bold', color: '#A855F7' },
    selectorTxtActivo: { color: '#fff' },
    emojiBox: { alignItems: 'center', marginBottom: 16 },
    emojiRow: { fontSize: 28, textAlign: 'center', flexWrap: 'wrap', maxWidth: width * 0.85 },
    opSymbol: { fontSize: 32, marginVertical: 4 },
    ejercicioBox: {
        backgroundColor: '#fff', paddingVertical: 18, paddingHorizontal: 40,
        borderRadius: 28, elevation: 6, marginBottom: 20,
    },
    ejercicioTxt: { fontSize: 48, fontFamily: 'Nunito_800ExtraBold', color: '#7E22CE' },
    input: {
        backgroundColor: '#fff', width: 120, height: 80, borderRadius: 20,
        textAlign: 'center', fontSize: 48, fontFamily: 'Nunito_800ExtraBold',
        color: '#7E22CE', elevation: 4, marginBottom: 20,
    },
    btnVerificar: {
        backgroundColor: '#C084FC', paddingVertical: 16,
        paddingHorizontal: 48, borderRadius: 32, elevation: 6,
    },
    btnTxt: { fontSize: 24, fontFamily: 'Nunito_700Bold', color: '#fff' },
    feedbackBien: { fontSize: 24, fontFamily: 'Nunito_700Bold', color: '#16A34A', marginTop: 16 },
    feedbackMal: { fontSize: 22, fontFamily: 'Nunito_700Bold', color: '#DC2626', marginTop: 16 },
});
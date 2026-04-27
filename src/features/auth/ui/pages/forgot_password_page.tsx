import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { GravitasOne_400Regular } from "@expo-google-fonts/gravitas-one";
import { MaidenOrange_400Regular } from "@expo-google-fonts/maiden-orange";
import { AlfaSlabOne_400Regular } from "@expo-google-fonts/alfa-slab-one";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "../../../../core/navigation/app_navigator";

type ForgotPasswordErrors = {
  email?: string;
};

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [fontsLoaded] = useFonts({
    GravitasOne_400Regular,
    MaidenOrange_400Regular,
    AlfaSlabOne_400Regular,
  });

  const validateForm = (currentEmail: string): ForgotPasswordErrors => {
    const newErrors: ForgotPasswordErrors = {};
    const cleanEmail = currentEmail.trim();

    if (!cleanEmail) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(cleanEmail)) {
        newErrors.email = "Ingresa un correo electrónico válido";
      }
    }

    return newErrors;
  };

  const handleEmailChange = (value: string) => {
    const cleanValue = value.replace(/\s/g, "").toLowerCase();
    setEmail(cleanValue);

    if (hasSubmitted) {
      setErrors(validateForm(cleanValue));
    }
  };

  const handleSendCode = () => {
    setHasSubmitted(true);

    const validationErrors = validateForm(email);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    navigation.navigate("VerificationCode", {
      email,
      flow: "forgotPassword",
    });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.logoHeader}>
              <View style={styles.logoContainer}>
                <Text style={styles.logoGreen}>Bana</Text>
                <Text style={styles.logoYellow}>Eye</Text>
              </View>
            </View>

            <Image
              source={require("../../../../../assets/images/fondo.png")}
              style={styles.headerImage}
              resizeMode="cover"
            />

            <View style={styles.card}>
              <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>

              <Text style={styles.subtitle}>
                Ingresa tu correo electrónico y te enviaremos un código para que
                puedas recuperar tu cuenta.
              </Text>

              <View style={styles.form}>
                <View
                  style={[
                    styles.inputContainer,
                    errors.email ? styles.inputError : null,
                  ]}
                >
                  <Ionicons name="mail" size={18} color={COLORS.green} />

                  <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor={COLORS.gray}
                    value={email}
                    onChangeText={handleEmailChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={80}
                  />
                </View>

                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}

                <TouchableOpacity
                  style={styles.sendButton}
                  activeOpacity={0.8}
                  onPress={handleSendCode}
                >
                  <Ionicons
                    name="log-in-outline"
                    size={15}
                    color={COLORS.background}
                  />
                  <Text style={styles.sendButtonText}>Enviar código</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text style={styles.dividerText}>o</Text>
                  <View style={styles.divider} />
                </View>

                <TouchableOpacity
                  style={styles.backButton}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Login")}
                >
                  <Text style={styles.backButtonText}>
                    Volver al inicio de sesión
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const COLORS = {
  green: "#5D7B3D",
  background: "#FFFFF1",
  gray: "#959595",
  black: "#000000",
  pink: "#E4568B",
  yellow: "#F6C94D",
  darkBackground: "#202020",
  error: "#C94C4C",
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.darkBackground,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 24,
  },
  container: {
    width: "88%",
    maxWidth: 440,
    minHeight: 760,
    backgroundColor: COLORS.background,
    overflow: "hidden",
  },
  logoHeader: {
    height: 75,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoGreen: {
    fontFamily: "GravitasOne_400Regular",
    fontSize: 30,
    lineHeight: 38,
    color: COLORS.green,
    letterSpacing: -0.5,
  },
  logoYellow: {
    fontFamily: "GravitasOne_400Regular",
    fontSize: 30,
    lineHeight: 38,
    color: COLORS.yellow,
    letterSpacing: -0.5,
  },
  headerImage: {
    width: "100%",
    height: 115,
  },
  card: {
    marginTop: -28,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 44,
    paddingTop: 56,
    paddingBottom: 50,
    alignItems: "center",
    minHeight: 570,
  },
  title: {
    fontFamily: "MaidenOrange_400Regular",
    fontSize: 38,
    lineHeight: 42,
    color: COLORS.green,
    textAlign: "center",
    marginBottom: 22,
  },
  subtitle: {
    fontFamily: "MaidenOrange_400Regular",
    fontSize: 16,
    lineHeight: 19,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 44,
  },
  form: {
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%",
    height: 52,
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(149, 149, 149, 0.12)",
    marginBottom: 8,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: COLORS.black,
    fontFamily: "MaidenOrange_400Regular",
    fontSize: 17,
    lineHeight: 21,
  },
  errorText: {
    alignSelf: "flex-start",
    fontFamily: "MaidenOrange_400Regular",
    color: COLORS.error,
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 16,
    marginLeft: 4,
  },
  sendButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.pink,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 22,
    marginTop: 20,
    marginBottom: 42,
  },
  sendButtonText: {
    fontFamily: "AlfaSlabOne_400Regular",
    color: COLORS.background,
    fontSize: 13,
    lineHeight: 18,
    marginLeft: 6,
  },
  dividerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 42,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.green,
    opacity: 0.8,
  },
  dividerText: {
    fontFamily: "MaidenOrange_400Regular",
    color: COLORS.gray,
    fontSize: 14,
    marginHorizontal: 22,
  },
  backButton: {
    borderWidth: 1.5,
    borderColor: COLORS.pink,
    paddingHorizontal: 22,
    paddingVertical: 9,
    borderRadius: 22,
  },
  backButtonText: {
    fontFamily: "AlfaSlabOne_400Regular",
    color: COLORS.pink,
    fontSize: 12,
    lineHeight: 17,
  },
});
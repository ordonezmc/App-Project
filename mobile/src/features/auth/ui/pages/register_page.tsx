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

type RegisterErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [fontsLoaded] = useFonts({
    GravitasOne_400Regular,
    MaidenOrange_400Regular,
    AlfaSlabOne_400Regular,
  });

  const validateForm = (
    currentFullName: string,
    currentEmail: string,
    currentPassword: string,
    currentConfirmPassword: string
  ): RegisterErrors => {
    const newErrors: RegisterErrors = {};

    const cleanFullName = currentFullName.trim();
    const cleanEmail = currentEmail.trim();

    if (!cleanFullName) {
      newErrors.fullName = "El nombre completo es obligatorio";
    } else if (cleanFullName.length < 3) {
      newErrors.fullName = "El nombre debe tener mínimo 3 caracteres";
    }

    if (!cleanEmail) {
      newErrors.email = "El correo electrónico es obligatorio";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(cleanEmail)) {
        newErrors.email = "Ingresa un correo electrónico válido";
      }
    }

    if (!currentPassword.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (currentPassword.length < 6) {
      newErrors.password = "La contraseña debe tener mínimo 6 caracteres";
    }

    if (!currentConfirmPassword.trim()) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (currentConfirmPassword !== currentPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    return newErrors;
  };

  const handleFullNameChange = (value: string) => {
    const cleanValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    setFullName(cleanValue);

    if (hasSubmitted) {
      setErrors(validateForm(cleanValue, email, password, confirmPassword));
    }
  };

  const handleEmailChange = (value: string) => {
    const cleanValue = value.replace(/\s/g, "").toLowerCase();
    setEmail(cleanValue);

    if (hasSubmitted) {
      setErrors(validateForm(fullName, cleanValue, password, confirmPassword));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (hasSubmitted) {
      setErrors(validateForm(fullName, email, value, confirmPassword));
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);

    if (hasSubmitted) {
      setErrors(validateForm(fullName, email, password, value));
    }
  };

  const handleRegister = () => {
    setHasSubmitted(true);

    const validationErrors = validateForm(
      fullName,
      email,
      password,
      confirmPassword
    );

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    navigation.navigate("VerificationCode", {
      email,
      flow: "register",
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
            <Image
              source={require("../../../../../assets/images/fondo.png")}
              style={styles.headerImage}
              resizeMode="cover"
            />

            <View style={styles.card}>
              <Text style={styles.title}>Regístrate</Text>

              <Text style={styles.subtitle}>
                Crea una cuenta para comenzar{"\n"}y monitorear tus cultivos
              </Text>

              <View style={styles.form}>
                <View
                  style={[
                    styles.inputContainer,
                    errors.fullName ? styles.inputError : null,
                  ]}
                >
                  <Ionicons name="person" size={18} color={COLORS.green} />

                  <TextInput
                    style={styles.input}
                    placeholder="Nombre completo"
                    placeholderTextColor={COLORS.gray}
                    value={fullName}
                    onChangeText={handleFullNameChange}
                    autoCapitalize="words"
                    maxLength={60}
                  />
                </View>

                {errors.fullName ? (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                ) : null}

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

                <View
                  style={[
                    styles.inputContainer,
                    errors.password ? styles.inputError : null,
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color={COLORS.green}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={COLORS.gray}
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    maxLength={30}
                  />

                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={18}
                      color={COLORS.green}
                    />
                  </TouchableOpacity>
                </View>

                {errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}

                <View
                  style={[
                    styles.inputContainer,
                    errors.confirmPassword ? styles.inputError : null,
                  ]}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color={COLORS.green}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Confirmar contraseña"
                    placeholderTextColor={COLORS.gray}
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    secureTextEntry={!showConfirmPassword}
                    maxLength={30}
                  />

                  <TouchableOpacity
                    onPress={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword
                          ? "eye-outline"
                          : "eye-off-outline"
                      }
                      size={18}
                      color={COLORS.green}
                    />
                  </TouchableOpacity>
                </View>

                {errors.confirmPassword ? (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                ) : null}

                <TouchableOpacity
                  style={styles.registerButton}
                  activeOpacity={0.8}
                  onPress={handleRegister}
                >
                  <Text style={styles.registerButtonText}>Crear cuenta</Text>
                </TouchableOpacity>

                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={styles.loginLink}>Inicia sesión</Text>
                  </TouchableOpacity>
                </View>
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
    backgroundColor: COLORS.background,
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: 245,
  },
  card: {
    marginTop: -42,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 34,
    borderTopRightRadius: 34,
    paddingHorizontal: 46,
    paddingTop: 50,
    paddingBottom: 44,
    alignItems: "center",
    minHeight: 620,
  },
  title: {
    fontFamily: "MaidenOrange_400Regular",
    fontSize: 40,
    lineHeight: 42,
    color: COLORS.green,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: "MaidenOrange_400Regular",
    fontSize: 15,
    lineHeight: 17,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 42,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    height: 49,
    backgroundColor: COLORS.background,
    borderRadius: 9,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "rgba(149, 149, 149, 0.12)",
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
    fontFamily: "MaidenOrange_400Regular",
    color: COLORS.error,
    fontSize: 13,
    lineHeight: 16,
    marginBottom: 12,
    marginLeft: 4,
  },
  registerButton: {
    alignSelf: "center",
    backgroundColor: COLORS.green,
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 22,
    marginTop: 18,
    marginBottom: 20,
  },
  registerButtonText: {
    fontFamily: "AlfaSlabOne_400Regular",
    color: COLORS.background,
    fontSize: 13,
    lineHeight: 18,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontFamily: "MaidenOrange_400Regular",
    color: COLORS.gray,
    fontSize: 13,
    lineHeight: 18,
  },
  loginLink: {
    fontFamily: "MaidenOrange_400Regular",
    color: COLORS.green,
    fontSize: 13,
    lineHeight: 18,
  },
});
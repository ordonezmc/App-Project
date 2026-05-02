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

type ResetPasswordErrors = {
  password?: string;
  confirmPassword?: string;
};

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [fontsLoaded] = useFonts({
    GravitasOne_400Regular,
    MaidenOrange_400Regular,
    AlfaSlabOne_400Regular,
  });

  const validateForm = (
    currentPassword: string,
    currentConfirmPassword: string
  ): ResetPasswordErrors => {
    const newErrors: ResetPasswordErrors = {};

    if (!currentPassword.trim()) {
      newErrors.password = "La nueva contraseña es obligatoria";
    } else if (currentPassword.length < 6) {
      newErrors.password = "La contraseña debe tener mínimo 6 caracteres";
    }

    if (!currentConfirmPassword.trim()) {
      newErrors.confirmPassword = "Confirma tu nueva contraseña";
    } else if (currentConfirmPassword !== currentPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    return newErrors;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (hasSubmitted) {
      setErrors(validateForm(value, confirmPassword));
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);

    if (hasSubmitted) {
      setErrors(validateForm(password, value));
    }
  };

  const handleSavePassword = () => {
    setHasSubmitted(true);

    const validationErrors = validateForm(password, confirmPassword);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
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
              source={require("../../../../../assets/images/fondo2.png")}
              style={styles.headerImage}
              resizeMode="cover"
            />

            <View style={styles.card}>
              <Text style={styles.title}>Nueva contraseña</Text>

              <Text style={styles.subtitle}>
                Crea una nueva contraseña para recuperar el acceso a tu cuenta.
              </Text>

              <View style={styles.form}>
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
                    placeholder="Nueva contraseña"
                    placeholderTextColor={COLORS.gray}
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    maxLength={30}
                  />

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShowPassword(!showPassword)}
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
                    activeOpacity={0.7}
                    onPress={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
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
                  style={styles.saveButton}
                  activeOpacity={0.8}
                  onPress={handleSavePassword}
                >
                  <Text style={styles.saveButtonText}>Guardar contraseña</Text>
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
    paddingTop: 58,
    paddingBottom: 50,
    alignItems: "center",
    minHeight: 570,
  },
  title: {
    fontFamily: "MaidenOrange_400Regular",
    fontSize: 40,
    lineHeight: 43,
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
    marginBottom: 14,
    marginLeft: 4,
  },
  saveButton: {
    backgroundColor: COLORS.pink,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 22,
    marginTop: 28,
  },
  saveButtonText: {
    fontFamily: "AlfaSlabOne_400Regular",
    color: COLORS.background,
    fontSize: 13,
    lineHeight: 18,
  },
});
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginPage } from "../../features/auth/ui/pages/login_page";
import { RegisterPage } from "../../features/auth/ui/pages/register_page";
import { ForgotPasswordPage } from "../../features/auth/ui/pages/forgot_password_page";
import { VerificationCodePage } from "../../features/auth/ui/pages/verification_code_page";
import { ResetPasswordPage } from "../../features/auth/ui/pages/reset_password_page";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  VerificationCode: {
    email: string;
    flow: "register" | "forgotPassword";
  };
  ResetPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordPage} />
        <Stack.Screen name="VerificationCode" component={VerificationCodePage} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
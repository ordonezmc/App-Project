import 'react-native-get-random-values';
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { AppNavigator } from "./src/core/navigation/app_navigator";
import { runMigrations } from "./src/core/database/migrations";
import NetInfo from "@react-native-community/netinfo";
import { syncPendingData } from "./src/core/network/sync.service";

export default function App() {

  useEffect(() => {
    initializeApp();

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        console.log("Internet conectado");

        syncPendingData();
      } else {
        console.log("Sin internet");
      }
    });

    return () => unsubscribe();
  }, []);

  async function initializeApp() {
    try {
      await runMigrations();

      console.log("App inicializada");
    } catch (error) {
      console.error("Error inicializando app:", error);
    }
  }

  return (
    <>
      <StatusBar style="light" />

      <AppNavigator />
    </>
  );
}
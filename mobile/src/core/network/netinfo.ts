import NetInfo from "@react-native-community/netinfo";

export async function isConnected() {
  const state = await NetInfo.fetch();

  return state.isConnected;
}

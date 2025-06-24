// src/app/(tabs)/account/index.tsx
import { useFirebaseContext } from "../../../context/FirebaseAuthProvider";
import AccountScreen from "../../../screens/AccountScreen";
import { ActivityIndicator, View } from "react-native";

const AccountIndex = () => {
  const { user, loading } = useFirebaseContext();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!user) {
    return null;
  }

  return <AccountScreen />;
};

export default AccountIndex;

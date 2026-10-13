import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function profile() {
  return (
    <SafeAreaView className="bg-danger p-4">
      <View>
        <Text className="bg-primary">profile</Text>
      </View>
    </SafeAreaView>
  );
}

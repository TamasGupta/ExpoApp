import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function _layout() {
  return (
    <NativeTabs
      backgroundColor="#0B0E14"
      tintColor="#4A9EFF"
      iconColor={{ default: "#5C5F68", selected: "#4A9EFF " }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="assisstantpage">
        <NativeTabs.Trigger.Icon md={"personal_bag"} />
        <NativeTabs.Trigger.Label>Assisstant</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="transactions">
        <NativeTabs.Trigger.Icon md={"page_menu_ios"} />
        <NativeTabs.Trigger.Label>Trasactions</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="add-transaction">
        <NativeTabs.Trigger.Icon md={"add_notes"} />
        <NativeTabs.Trigger.Label>Add</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon sf="person.fill" md="person" />
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

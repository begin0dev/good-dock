import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IcClose } from "../../assets/svgs";
import { themeColors } from "../../styles/colors";

function CloseButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={navigation.goBack}>
      <IcClose color={themeColors.TEXT_0} />
    </TouchableOpacity>
  );
}

export default CloseButton;

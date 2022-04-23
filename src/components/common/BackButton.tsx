import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IcBack } from "../../assets/svgs";
import { themeColors } from "../../styles/colors";

function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={navigation.goBack}>
      <IcBack color={themeColors.TEXT_0} />
    </TouchableOpacity>
  );
}

export default BackButton;

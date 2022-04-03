import { TouchableOpacity } from "react-native";

import { IcClose } from "../../assets/svgs";
import { themeColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <IcClose color={themeColors.TEXT_0} />
    </TouchableOpacity>
  );
}

export default BackButton;

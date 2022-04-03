import { TouchableOpacity } from "react-native";

import { IcBack } from "../../assets/svgs";
import { themeColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <IcBack color={themeColors.TEXT_0} />
    </TouchableOpacity>
  );
}

export default BackButton;

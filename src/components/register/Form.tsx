import { ReactNode } from "react";
import { View } from "react-native";

import CustomText from "../common/CustomText";
import { styles } from "./styles";

interface Props {
  label: string;
  children: ReactNode;
}

function Form({ label, children }: Props) {
  return (
    <View style={styles.formWrapper}>
      <CustomText fontSize={14} style={styles.formLabel}>
        {label}
      </CustomText>
      <View style={styles.formController}>{children}</View>
    </View>
  );
}

export default Form;

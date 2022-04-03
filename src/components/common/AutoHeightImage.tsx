import { useState } from "react";
import FastImage, { FastImageProps, ImageStyle } from "react-native-fast-image";

interface Props extends FastImageProps {
  width: number;
  style?: ImageStyle;
}

function AutoHeightImage({ width, style = {}, source, ...restProps }: Props) {
  const [height, setHeight] = useState<number>(0);

  return (
    <FastImage
      {...restProps}
      style={[style, { width, height }]}
      source={source}
      resizeMode={FastImage.resizeMode.contain}
      onLoad={({ nativeEvent }) => {
        setHeight((nativeEvent.height / nativeEvent.width) * width);
      }}
    />
  );
}

export default AutoHeightImage;

import React from "react";
import { Text, TextProps, TextStyle, TextInputProps, ViewStyle } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
interface commonTextProps extends TextStyle {
  color: string;
  type:
    | "title1_B"
    | "title2_B"
    | "title3_B"
    | "body1_B"
    | "body2_R"
    | "body3_B"
    | "body4_R"
    | "caption1_R"
    | "caption2_B"
    | "caption3_R";
  text: string;
  numberOfLines: number;
  style: ViewStyle;
}

const CommonText = ({
  text,
  color,
  type,
  textAlign,
  numberOfLines,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
  textDecorationLine,
  style,
  ...props
}: commonTextProps) => {
  return (
    <Text
      style={[
        {
          ...fonts[type],
          color,
          textAlign,
          includeFontPadding: false,
          marginTop,
          marginBottom,
          marginLeft,
          marginRight,
          marginHorizontal,
          marginVertical,
          textDecorationLine,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      {...props}
    >
      {text}
    </Text>
  );
};

CommonText.defaultProps = {
  text: "",
  color: colors.gray.White,
  type: "body1_B",
  textAlign: "left",
  numberOfLines: 0,
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  marginHorizontal: 0,
  marginVertical: 0,
  textDecorationLine: "none",
  style: {},
};

export default CommonText;

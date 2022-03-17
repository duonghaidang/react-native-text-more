import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TextProps, TextStyle, View } from "react-native";
export interface TextMoreProps extends TextProps {
  children: string;
  numberOfLines?: number;
  titleMore?: string;
  titleLess?: string;
  renderMore?: (onPress: () => void) => React.ReactNode;
  renderLess?: (onPress: () => void) => React.ReactNode;
  styleTextMore?: TextStyle;
  styleTextLess?: TextStyle;
}

const INFINITY_NUMBER = Number.MAX_SAFE_INTEGER;

const TextMore = (props: TextMoreProps) => {
  const {
    children,
    numberOfLines,
    renderMore,
    renderLess,
    titleMore,
    titleLess,
    styleTextMore,
    styleTextLess,
    ...rest
  } = props;

  const refText = useRef<Text>(null);

  const [showMore, setShowMore] = useState<boolean>(false);
  const [showLess, setShowLess] = useState<boolean>(false);

  const setLimitHeight = useCallback(() => {
    if (refText.current && numberOfLines) {
      refText?.current?.setNativeProps({
        numberOfLines: numberOfLines,
      });
    }
  }, [numberOfLines]);
  const setFullHeight = useCallback(() => {
    if (refText.current) {
      refText?.current?.setNativeProps({
        numberOfLines: INFINITY_NUMBER,
      });
    }
  }, []);

  const checkHeight = useCallback(async () => {
    let heightFull: number = 0;
    if (refText.current) {
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve(true);
        });
      });
      setFullHeight();
      refText.current.measure((_x, _y, _width, height) => {
        heightFull = height;
      });
      setLimitHeight();
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve(true);
        });
      });
      refText.current.measure((_x, _y, _width, heightLimit) => {
        if (heightFull > heightLimit) {
          setShowMore(true);
        }
      });
    }
  }, [setFullHeight, setLimitHeight]);

  const renderSeeMore = useCallback(() => {
    if (!showMore || showLess) return;
    const onPress = () => {
      setFullHeight();
      setShowLess(true);
    };
    if (renderMore) return renderMore(onPress);
    return (
      <Text onPress={onPress} style={styleTextMore || styles.text}>
        {titleMore || "See more"}
      </Text>
    );
  }, [renderMore, setFullHeight, showLess, showMore, titleMore, styleTextMore]);

  const renderSeeLess = useCallback(() => {
    if (!showLess) return;
    const onPress = () => {
      setLimitHeight();
      setShowLess(false);
    };
    if (renderLess) return renderLess(onPress);
    return (
      <Text onPress={onPress} style={styleTextLess || styles.text}>
        {titleLess || "See less"}
      </Text>
    );
  }, [renderLess, setLimitHeight, showLess, titleLess, styleTextLess]);

  useEffect(() => {
    typeof numberOfLines === "number" && numberOfLines > 0 && checkHeight();
  }, [checkHeight, numberOfLines]);

  return (
    <View>
      <Text ref={refText} {...rest}>
        {children}
      </Text>
      {renderSeeMore()}
      {renderSeeLess()}
    </View>
  );
};

export default TextMore;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    marginTop: 2,
    color: "#5F94F3",
  },
});

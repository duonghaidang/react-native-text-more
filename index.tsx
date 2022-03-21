import React, { memo, useCallback, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  View,
} from "react-native";
export interface TextMoreProps extends TextProps {
  children: string;
  numberOfLines?: number;
  titleMore?: string;
  titleLess?: string;
  renderMore?: (onPress: () => void) => React.ReactNode;
  renderLess?: (onPress: () => void) => React.ReactNode;
  styleTextMore?: StyleProp<TextStyle>;
  styleTextLess?: StyleProp<TextStyle>;
  style?: StyleProp<TextStyle>;
}

const TextMore = memo((props: TextMoreProps) => {
  const {
    numberOfLines,
    renderMore,
    renderLess,
    titleMore,
    titleLess,
    style,
    ...rest
  } = props;

  let heightFull: number = 0;
  let heightLimit: number = 0;

  const refText = useRef<Text>(null);

  const [showMore, setShowMore] = useState<boolean>(false);
  const [showLess, setShowLess] = useState<boolean>(false);
  const [onReady, setOnReady] = useState<boolean>(false);

  //! Set numberOfLines of text
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
        numberOfLines: null,
      });
    }
  }, []);

  //! Check show more or none
  const checkHeight = useCallback(async () => {
    if (heightFull && heightLimit) {
      setOnReady(true);
      setShowMore(heightLimit < heightFull);
    }
  }, [heightFull, heightLimit]);

  //! Render component
  const renderSeeMore = useCallback(() => {
    if (!showMore || showLess) return;
    const onPress = () => {
      setFullHeight();
      setShowLess(true);
    };
    if (renderMore) return renderMore(onPress);
    return (
      <Text onPress={onPress} style={styles.text}>
        {titleMore || "See more"}
      </Text>
    );
  }, [renderMore, setFullHeight, showLess, showMore, titleMore]);
  const renderSeeLess = useCallback(() => {
    if (!showLess) return;
    const onPress = () => {
      setLimitHeight();
      setShowLess(false);
    };
    if (renderLess) return renderLess(onPress);
    return (
      <Text onPress={onPress} style={styles.text}>
        {titleLess || "See less"}
      </Text>
    );
  }, [renderLess, setLimitHeight, showLess, titleLess]);

  //! Get height of text
  const onLayoutLimit = useCallback((e: LayoutChangeEvent) => {
    heightLimit = e.nativeEvent?.layout?.height;
    checkHeight();
  }, []);
  const onLayoutFull = useCallback((e: LayoutChangeEvent) => {
    heightFull = e.nativeEvent?.layout?.height;
    checkHeight();
  }, []);

  const renderFullText = useCallback(() => {
    if (onReady) return null;
    return (
      <Text onLayout={onLayoutFull} style={[style, styles.fullText]}>
        {rest?.children}
      </Text>
    );
  }, [onLayoutFull, onReady, rest?.children, style]);

  return (
    <View>
      <Text
        ref={refText}
        numberOfLines={numberOfLines}
        {...rest}
        style={style}
        onLayout={onLayoutLimit}
      >
        {rest?.children}
      </Text>
      {renderFullText()}
      {renderSeeMore()}
      {renderSeeLess()}
    </View>
  );
});

export default TextMore;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    marginTop: 2,
    color: "#5F94F3",
  },
  fullText: {
    position: "absolute",
    opacity: 0,
  },
});

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

const INFINITY_NUMBER = Number.MAX_SAFE_INTEGER;

const TextMore = memo((props: TextMoreProps) => {
  const {
    children,
    numberOfLines,
    renderMore,
    renderLess,
    titleMore,
    titleLess,
    style,
    ...rest
  } = props;

  let heightFull: number = 0;

  const refText = useRef<Text>(null);

  const [ready, setReady] = useState<boolean>(false);
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
    if (refText.current) {
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve(true);
        });
      });
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve(true);
        });
      });
      setLimitHeight();
    }
  }, [setLimitHeight]);

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

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const currentHeight: number = e.nativeEvent?.layout?.height;

    if (!heightFull) {
      heightFull = currentHeight;
    } else {
      if (heightFull > currentHeight) {
        setShowMore(true);
      }
      setReady(true);
    }
  }, []);

  const renderFakeText = useCallback(() => {
    if (!numberOfLines || (numberOfLines && numberOfLines <= 0) || ready)
      return null;
    return (
      <View style={{ backgroundColor: "red" }}>
        <Text {...rest} numberOfLines={numberOfLines}>
          {children}
        </Text>
      </View>
    );
  }, [children, numberOfLines, ready, rest]);

  const textStyle: StyleProp<TextStyle> = useMemo(
    () =>
      !numberOfLines || (numberOfLines && numberOfLines <= 0) || ready
        ? style
        : { opacity: 0, position: "absolute" },
    [numberOfLines, ready, style]
  );

  useEffect(() => {
    numberOfLines && numberOfLines > 0 && checkHeight();
  }, [checkHeight, numberOfLines, children]);

  return (
    <View>
      <Text ref={refText} {...rest} style={textStyle} onLayout={onLayout}>
        {children}
      </Text>
      {renderFakeText()}
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
});

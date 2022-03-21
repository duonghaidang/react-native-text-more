## @duonghaidang/react-native-text-more

### Installation

```
npm i @duonghaidang/react-native-text-more --save
```

or with yarn

```
yarn add @duonghaidang/react-native-text-more
```

### Usage

```javascript
import React from "react";
import { StyleSheet, View } from "react-native";
import TextMore from "@duonghaidang/react-native-text-more";

const Home = () => {
  return (
    <View style={styles.container}>
      <TextMore style={styles.text} numberOfLines={5}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </TextMore>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
});
```

## Props

| Prop            | Type              | Required | Note                                            |
| --------------- | ----------------- | -------- | ----------------------------------------------- |
| `titleMore`     | `string`          | no       | string that will replace the `See more` label   |
| `titleLess`     | `string`          | no       | string that will replace the `See less` label   |
| `children`      | `string`          | yes      | string to render on `See more` component        |
| `renderMore`    | `function`        | no       | function that will replace the `See more` label |
| `renderLess`    | `function`        | no       | function that will replace the `See less` label |
| `styleTextMore` | `object or array` | no       | text style for `See more` label                 |
| `styleTextLess` | `object or array` | no       | text style for `See less` label                 |

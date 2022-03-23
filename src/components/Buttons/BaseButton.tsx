import * as React from 'react';
import styled from 'styled-components/native';

// import {SolidButton} from './ButtonVariants';
import {Tappable} from '../Library/Tappable';
import {theme} from '../../theme/theme';
import {StyleSheet, Text, View} from 'react-native';
import {BaseFont} from '../Font/BaseFont';

// interface Props {
//   children: React.ReactNode;
//   color?: ButtonColorVariants;
//   variant?: ButtonSizeVariants;
//   width?: string;
//   onPress: () => void;
// }

// type ButtonSizeVariants = 'title' | 'small-caps' | 'paragraph';

// type ButtonColorVariants =
//   | 'primary'
//   | 'secondary'
//   | 'highlight'
//   | 'error'
//   | 'dead'
//   | 'warning';

// export const BaseButton: React.FC<Props> = ({
//   children,
//   color = theme.COLORS.white,
//   variant = 'title',
//   onPress,
// }) => {
//   return (
//     <SolidButton>
//       <BaseFont>{children}</BaseFont>
//     </SolidButton>
//     // <Tappable onPress={onPress}>
//     //   {variant === 'title' && <SolidButton>{children}</SolidButton>}
//     //   {variant === 'small-caps' && <SolidButton>{children}</SolidButton>}
//     // </Tappable>
//   );
// };

// export const SolidButton = styled.View`
//   overflow: hidden;
//   border-radius: 50px;
//   width: 300px;
//   height: 50px;
//   margin-bottom: 10px;
//   margin-top: 10px;
//   background-color: 'red';
// `;

// const Solids = styled.View`
//   height: 100px;
//   width: 100px;
//   background-color: ${theme.COLORS.green};
// `;

export const BaseButton: React.FC = () => {
  return (
    <View style={styles.button}>
      <BaseFont>Something here</BaseFont>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 100,
    width: 300,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import {themes} from '../styles/Theme';
import {StyleProp, ViewStyle} from 'react-native';
import {Category, Transaction} from '../db/schemas';
import {StackNavigationProp} from '@react-navigation/stack';

type NavigationProps = {
  navigation: StackNavigationProp<any, any>;
};

type AnimatedButtonProps = {
  style?: StyleProp<ViewStyle>;
  visible?: boolean;
  animateFrom?: string;
  label?: string;
  isExtended: boolean;
  onPress?: () => void;
  icon: string;
  color: string;
  right?: number;
  bottom?: number;
  opacity?: number;
  disabled?: boolean;
};

type StyledViewProps = {
  children: React.ReactNode;
  onScroll?: (event: {nativeEvent: {contentOffset: {y: number}}}) => void;
  onScrollEnd?: () => void;
};

type SettingsButtonProps = {
  title: string;
  subTitle?: string;
  iconName?: string;
  amount?: number;
  type?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  backgroundColor?: string;
};

type ThemeType = {
  theme: typeof themes.light;
  currentThemeName: 'light' | 'dark' | 'blue' | 'green';
  storageTheme: (
    themeName: 'light' | 'dark' | 'blue' | 'green',
  ) => Promise<void>;
};

type AddCategoryProps = {
  newCategory: {name: string; icon: string};
  setNewCategory: React.Dispatch<
    React.SetStateAction<{name: string; icon: string}>
  >;
};

type CategoriesContextType = {
  categories: Category[];
  addCategory: (name: string, icon: string) => void;
  deleteCategory: (id: Realm.BSON.ObjectId) => void;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (newTransaction: any) => void;
  updateTransaction: (
    id: Realm.Object[],
    updates: {},
  ) => Promise<Transaction | null>;
  deleteTransaction: (transactionSelected: Realm.Object[]) => Promise<void>;
};

// Define your stack param list type here or import it from your navigation types file
type SettingsStackParamList = {
  ThemesOption: undefined;
  CategoriesOption: undefined;
  // Add other screens here if needed
};

type StyledTextInputProps = {
  label: string;
  value: any;
  mode?: 'outlined' | 'flat';
  style?: StyleProp<ViewStyle>;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  onChangeText: (text: string) => void;
};

type StyledDropDownProps = {
  data: Array<{label: string; value: string | number}>;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  placeholder?: string;
  value?: any;
  width?: number;
  onChange: (item: {label: string; value: string}) => void;
};

export type {
  NavigationProps,
  AnimatedButtonProps,
  StyledViewProps,
  SettingsButtonProps,
  ThemeType,
  AddCategoryProps,
  CategoriesContextType,
  TransactionContextType,
  SettingsStackParamList,
  StyledTextInputProps,
  StyledDropDownProps,
};

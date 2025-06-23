import {Realm} from 'realm';
import {themes} from '../styles/Theme';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Category, Transaction} from '../db/schemas';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {TextProps} from 'react-native-paper';

type NavigationProps = {
  navigation: StackNavigationProp<any, any>;
  route?: RouteProp<any, any>;
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
  horizontal?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
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
  date?: string;
};

type ThemeType = {
  theme: typeof themes.light;
  currentThemeName: 'light' | 'dark' | 'blue' | 'green';
  storageTheme: (
    themeName: 'light' | 'dark' | 'blue' | 'green',
  ) => Promise<void>;
};

type StyledTextProps = {
  text?: string;
  variant?: TextProps<any>['variant'];
  bold?: any; // 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
  label?: boolean;
  style?: StyleProp<TextStyle>;
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
  getCategoryById: (id: Realm.BSON.ObjectId) => void;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (newTransaction: any) => Promise<void>;
  updateTransaction: (
    id: Realm.BSON.ObjectId,
    transaction: any,
  ) => Promise<void>;
  getTransactionByID: (id: Realm.Object[]) => Promise<Transaction | null>;
  deleteTransaction: (transactionSelected: Realm.Object[]) => Promise<void>;
};

type MetricsContextType = {
  transactionsByCategories: {};
  transactionsByType: {};
  transactionsByDate: {};
  groupByCategories: () => void;
  groupByType: () => void;
  groupByDate: () => void;
  totalCredit: number;
  totalDebit: number;
  totalBalance: number;
};

type GroupTotal = {
  name: string;
  totalAmount: number;
};

// Interfaz para un grupo de fecha (ej. "2024", "Jun-2024", "23-Jun-2024")
type DateGroup = {
  name: string; // La fecha formateada (ej. "2024", "Jun-2024", "23-Jun-2024")
  transactions: Transaction[]; // Array de transacciones para esa fecha
};

// Interfaz para el acumulador del reduce
type DateGroupsAccumulator = {
  [key: string]: DateGroup;
};

type GroupedTransactions = {
  [key: string]: GroupTotal;
};

// Interfaz para el resultado final de la función
type GroupedTransactionsByDate = {
  byYear: DateGroup[];
  byMonthYear: DateGroup[];
  byDayMonthYear: DateGroup[];
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
  data: Array<{
    label: string;
    value: string | number;
    id?: Realm.BSON.ObjectId;
  }>;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  placeholder?: string;
  value?: any;
  width?: number;
  onChange: (item: {label: string; value: string}) => void;
};

type ChartBarProps = {
  height: number;
  text: string;
  maxValue: number;
};

type StyledSurfaceProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  width?: any;
  height?: any;
};

type ChartProps = {
  data: Array<{name: string; amount: number}>;
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
  MetricsContextType,
  GroupedTransactions,
  SettingsStackParamList,
  StyledTextInputProps,
  StyledDropDownProps,
  ChartBarProps,
  StyledSurfaceProps,
  ChartProps,
  StyledTextProps,
  DateGroupsAccumulator,
  GroupedTransactionsByDate,
};

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
  getTransactions: () => void;
};

type ReportsContextType = {
  transactionsByCategories: {};
  transactionsByType: {};
  transactionsByDate: GroupedTransactionsByDate;
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

interface CategorySummary {
  name: string; // Nombre de la categoría
  totalCredit: number;
  totalDebit: number;
}

// La interfaz principal para cada grupo de fecha
interface DateGroup {
  name: string; // El nombre legible del grupo (ej. "26 jun. 2025", "jun. 2025", "2025")
  sortKey: string; // Una clave para la ordenación cronológica (ej. "2025-06-26", "2025-06", "2025")
  transactions: Transaction[]; // Array de transacciones individuales en este grupo
  totalAmount: number; // Saldo (Credito - Debito)
  totalCredit: number; // Suma de todos los créditos
  totalDebit: number; // Suma de todos los débitos
  byCategories: CategorySummary[]; // Resumen de créditos/débitos por categoría dentro de este grupo
}

interface DateGroupsAccumulator {
  [key: string]: DateGroup;
}

// Interfaz para el resultado final de la función
interface GroupedTransactionsByDate {
  byDayMonthYear: DateGroup[];
  byDayMonth: DateGroup[]; // Nueva agrupación
  byMonthYear: DateGroup[];
  byYear: DateGroup[];
}

type GroupedTransactions = {
  [key: string]: GroupTotal;
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
  maxHeight: number;
};

type StyledSurfaceProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  width?: any;
  height?: any;
};

type ChartProps = {
  data: Array<{name: string; amount: number}> | DateGroup[] | any;
  maxHeight: number;
  maxValue: number;
  height?: number;
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
  ReportsContextType,
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

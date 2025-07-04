import {BSON} from 'realm';
import {themes} from '../styles/Theme';
import {Category} from '../db/schemas';
import {TextProps} from 'react-native-paper';
import {RouteProp} from '@react-navigation/native';
import {DimensionValue, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

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

type ExportContextType = {
  exportFormat: string;
  setExportFormat: React.Dispatch<React.SetStateAction<string>>;
  exportToCSV: () => void;
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
  children?: React.ReactNode;
  disabled?: boolean;
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
  deleteCategory: (id: BSON.ObjectId) => void;
  getCategoryById: (id: BSON.ObjectId) => void;
};

type PlainTransaction = {
  _id: BSON.ObjectId;
  concept: string;
  amount: number;
  category: BSON.ObjectId;
  cDate: string;
  type: 'credito' | 'debito';
  file?: string;
};

type TransactionContextType = {
  transactions: PlainTransaction[];
  addTransaction: (newTransaction: any) => Promise<void>;
  updateTransaction: (id: BSON.ObjectId, transaction: any) => Promise<void>;
  getTransactionByID: (id: BSON.ObjectId) => Promise<PlainTransaction | null>;
  deleteTransaction: (transactionSelected: BSON.ObjectId[]) => Promise<void>;
  getTransactions: () => void;
  transactionSelected: any[];
  setTransactionSelected: React.Dispatch<React.SetStateAction<any[]>>;
  currency: '';
  currencySetter: (value: string) => void;
  wipeData: () => void;
};

type ReportsContextType = {
  transactionsByDate: GroupedTransactionsByDate;
  groupByDate: () => void;
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  globalTransactions: DateGroup;
  setGlobalTransactions: React.Dispatch<any>;
  periodOptions: {label: string; value: string}[];
  selectedTransactionValue: string | null;
  setSelectedTransactionValue: React.Dispatch<
    React.SetStateAction<string | null>
  >;
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
  transactions: PlainTransaction[]; // Array de transacciones individuales en este grupo
  totalAmount: number; // Saldo (Credito - Debito)
  totalCredit: number; // Suma de todos los créditos
  totalDebit: number; // Suma de todos los débitos
  byCategories: CategorySummary[]; // Resumen de créditos/débitos por categoría dentro de este grupo
}

interface DateGroupsAccumulator {
  [key: string]: DateGroup;
}

type ThemeSafeAreaProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

// Interfaz para el resultado final de la función
interface GroupedTransactionsByDate {
  byDayMonthYear: DateGroup[];
  byDayMonth: DateGroup[]; // Nueva agrupación
  byMonthYear: DateGroup[];
  byYear: DateGroup[];
  [key: string]: any;
}

type GroupedTransactions = {
  [key: string]: GroupTotal;
};

// Define your stack param list type here or import it from your navigation types file
type SettingsStackParamList = {
  ThemesOption: undefined;
  CategoriesOption: undefined;
  ExportOption: undefined;
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
  data: any;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  placeholder?: string;
  value?: any;
  width?: any;
  margin?: number;
  onChange: (item: {[x: string]: any; label: string; value: string}) => void;
};

type ChartBarProps = {
  cHeight: number;
  dHeight: number;
  text: string;
  debit: number;
  credit: number;
  tAmount: number;
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
  height?: number;
};

type HeaderFilterButtonProps = {
  onPress?: () => void;
  name: string;
};

type ReportsHeaderProps = {
  title: string;
  titleButton: string;
  goTo: string;
  navigationaParams: any;
};

type NavigableTransaction = {
  _id: string;
  concept: string;
  amount: number;
  category: string;
  cDate: string;
  type: string;
  file?: string;
};

type NavigableGroupedTransactions = {
  name: string;
  transactions: NavigableTransaction[];
};

type TransactionsGroupedProps = {
  route: RouteProp<Record<string, {transactions: any}[] | undefined>, string>;
};

type RootStackParamList = {
  Main: undefined;
  ThemesOption: undefined;
  AddTransaction: undefined;
  CategoriesOption: undefined;
  TransactionsGrouped: undefined;
  BiometryScreen: undefined;
  Overview: undefined;
  ExportOption: undefined;
};

type SectionProps = {
  title: string;
  color?: string; // Optional prop for text color
  paddingVertical?: number; // Optional prop for horizontal padding
};

type ModalWindowProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  component?: React.ReactNode; // Component to render inside the modal
  width?: DimensionValue; // Width can be a number or a percentage string
  height?: DimensionValue; // Height can be a number or a percentage string
};

type BiometryContextProps = {
  isBiometryActive: boolean;
  enableBiometry: () => Promise<void>;
  authenticate: () => Promise<void>;
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
  HeaderFilterButtonProps,
  DateGroup,
  PlainTransaction,
  ReportsHeaderProps,
  NavigableTransaction,
  NavigableGroupedTransactions,
  TransactionsGroupedProps,
  RootStackParamList,
  ThemeSafeAreaProps,
  SectionProps,
  ModalWindowProps,
  ExportContextType,
  BiometryContextProps,
};

import {themes} from '../styles/Theme';
import React, {useContext, useEffect} from 'react';
import {ThemesContext} from '../context/ThemesContext';
import StyledView from '../components/custom/StyledView';
import StyledText from '../components/custom/StyledText';
import {ReportsContext} from '../context/ReportsContext';
import AnimatedButton from '../components/AnimatedButton';
import {BackHandler, StyleSheet, View} from 'react-native';
import StyledButton from '../components/custom/StyledButton';
import {CategoriesContext} from '../context/CategoriesContext';
import {TransactionContext} from '../context/TransactionContext';
import {NavigationProps, ReportsContextType, ThemeType} from '../types/Types';

const Transaction = ({navigation}: NavigationProps) => {
  const {
    transactions,
    deleteTransaction,
    getTransactionByID,
    transactionSelected,
    setTransactionSelected,
  } = useContext(TransactionContext);
  const {getCategoryById} = useContext(CategoriesContext);
  const {globalTransactions} = useContext(ReportsContext) as ReportsContextType;

  const [isExtended, setIsExtended] = React.useState(true);
  const [isVisible, setIsVisible] = React.useState(false);

  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];

  const onScrollEnd = () => setIsExtended(true);
  const onScrollStart = () => setIsExtended(false);

  useEffect(() => {
    // Actualizar la visibilidad de los botones basado en si hay selecciones
    setIsVisible(transactionSelected.length > 0);

    // Filtrar transactionSelected para remover IDs que ya no existen en la lista principal de transactions
    // Esto puede ocurrir si las transacciones fueron eliminadas
    const currentTransactionIds = new Set(
      transactions.map(t => t._id.toString()),
    );
    const validSelected = transactionSelected.filter(id =>
      currentTransactionIds.has(id.toString()),
    );

    if (validSelected.length !== transactionSelected.length) {
      setTransactionSelected(validSelected);
    }

    const backAction = () => {
      if (transactionSelected.length > 0) {
        setTransactionSelected([]);
        return true; // Consume el evento, evita que la navegación hacia atrás o la salida se ejecuten
      }
      return false; // Permite el comportamiento predeterminado (navegar hacia atrás o salir)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Limpia el event listener al desmontar el componente
  }, [isVisible, setTransactionSelected, transactionSelected, transactions]); // Dependencia: el efecto se re-evalúa si transactionSelected cambia

  return (
    <View style={styles.container}>
      <StyledView onScroll={onScrollStart} onScrollEnd={onScrollEnd}>
        {!(globalTransactions.transactions.length > 0) ? (
          <StyledView contentContainerStyle={styles.noTransactionView}>
            <StyledText
              variant="titleLarge"
              text="Aún no tienes transacciones 😐"
            />
            <StyledText
              variant="titleMedium"
              text='Pulsa "+ Nueva Transacción" para agregar alguna.'
            />
          </StyledView>
        ) : (
          globalTransactions.transactions.map((value: any, index: any) => {
            const {_id, concept, amount, category, cDate, type} = value;

            const categoryIcon = (
              getCategoryById(category) as unknown as {icon?: string}
            )?.icon;

            const categoryName = (
              getCategoryById(category) as unknown as {name?: string}
            )?.name;

            const fDate = new Date(cDate).toLocaleString('es-DO', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            });

            return (
              <StyledButton
                backgroundColor={
                  transactionSelected.some(
                    elem => elem.toString() === _id.toString(),
                  )
                    ? theme.iconBackground
                    : undefined
                }
                key={index}
                title={concept}
                iconName={categoryIcon}
                subTitle={categoryName}
                amount={amount}
                type={type}
                date={fDate}
                onPress={() => {
                  // Evalua si la transaccion esta seleccionada
                  transactionSelected.some(
                    elem => elem.toString() === _id.toString(),
                  )
                    ? // Si está la elimina
                      setTransactionSelected(prev =>
                        prev.filter(id => id.toString() !== _id.toString()),
                      )
                    : // Si no está la agrega
                      setTransactionSelected(prev => [...prev, _id]);
                }}
              />
            );
          })
        )}
      </StyledView>
      <AnimatedButton
        icon="plus"
        color={theme.text}
        visible={!isVisible}
        isExtended={isExtended}
        label="Nueva transacción"
        // onPress={() => navigation.navigate('AddTransaction')}
        onPress={() => console.log(globalTransactions)}
      />
      <AnimatedButton
        icon="pencil"
        color={theme.text}
        visible={isVisible}
        isExtended={false}
        onPress={() =>
          getTransactionByID(transactionSelected[0]).then(
            transactionToUpdate => {
              if (transactionToUpdate) {
                navigation.navigate('AddTransaction', {
                  transactionId: transactionToUpdate?._id.toHexString(),
                  concept: transactionToUpdate?.concept,
                  amount: transactionToUpdate?.amount,
                  category: transactionToUpdate?.category.toHexString(),
                  cDate: transactionToUpdate?.cDate,
                  file: transactionToUpdate?.file,
                  type: transactionToUpdate?.type,
                });
              } else {
                console.warn('No se encontró la transacción para actualizar.');
              }
            },
          )
        }
        opacity={
          transactionSelected && transactionSelected.length > 1 ? 0.7 : 1
        }
        disabled={
          transactionSelected && transactionSelected.length > 1 ? true : false
        }
      />
      <AnimatedButton
        right={100}
        icon="close"
        color={theme.text}
        visible={isVisible}
        isExtended={false}
        onPress={async () => {
          try {
            await deleteTransaction(transactionSelected);
            // La promesa se resolvió, lo que significa que la eliminación fue exitosa (no cancelada)
            // y getTransactions() ya fue llamado en el contexto.
            setTransactionSelected([]);
          } catch (error) {
            // Esto atrapará la new Error('Eliminación cancelada') o cualquier error de Realm.
            console.log(
              'Eliminación cancelada o fallida:',
              (error as Error).message,
            );
            // No es necesario cambiar transactionSelected aquí si fue cancelado o falló,
            // ya que las transacciones no se eliminaron.
          }
        }}
      />
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noTransactionView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

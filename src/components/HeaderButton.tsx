import {themes} from '../styles/Theme';
import StyledText from './custom/StyledText';
import StyledDropDown from './custom/StyledDropDown';
import {ThemesContext} from '../context/ThemesContext';
import React, {useContext, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {HeaderButtonProps, ThemeType} from '../types/Types';
import {StyleSheet, TouchableOpacity, View, Animated} from 'react-native';
import {ReportsContext} from '../context/ReportsContext';

// Aunque ahora usaremos una renderización condicional, MAX_CONTENT_HEIGHT
// sigue siendo crucial para la animación de la altura.
// Asegúrate de que este valor sea lo suficientemente grande para contener
// todo el contenido de tu menú desplegable cuando esté completamente expandido.
const MAX_CONTENT_HEIGHT = 250; // Por ejemplo, para múltiples elementos StyledText y un botón

const HeaderButton: React.FC<HeaderButtonProps> = () => {
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const {
    setSelectedPeriod,
    transactionsByDate,
    selectedPeriod,
    globalTransactions,
    setGlobalTransactions,
  } = useContext(ReportsContext);
  const theme = themes[currentThemeName.currentThemeName];

  // `animatedProgress` controlará la altura de la animación (de 0 a MAX_CONTENT_HEIGHT)
  const animatedProgress = useRef(new Animated.Value(0)).current;

  // `expanded` ahora solo se usa para la renderización condicional
  const [expanded, setExpanded] = useState(false);

  // Interpolación de altura: de 0 (colapsado) a MAX_CONTENT_HEIGHT (expandido)
  const interpolatedHeight = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, MAX_CONTENT_HEIGHT],
  });

  // Interpolación de opacidad (opcional, pero ayuda a la suavidad visual)
  // Aunque el componente se desmonte, la opacidad puede ayudar durante la transición.
  const interpolatedOpacity = animatedProgress.interpolate({
    inputRange: [0, 0.5, 1], // Animación de opacidad más suave
    outputRange: [0, 0.5, 1],
  });

  // Función para manejar la animación y el estado de `expanded`
  const toggleAnimation = () => {
    if (!expanded) {
      // Expandir: Primero cambia el estado a `expanded = true` para montar el `Animated.View`
      // Luego comienza la animación.
      setExpanded(true);
      Animated.timing(animatedProgress, {
        toValue: 1, // Animar a 1 (expandido)
        duration: 300, // Duración de la animación en ms
        useNativeDriver: false, // `height` no se puede animar con native driver
      }).start();
    } else {
      // Contraer: Primero anima a `0` (colapsado)
      // Una vez que la animación termina, cambia el estado a `expanded = false` para desmontar.
      Animated.timing(animatedProgress, {
        toValue: 0, // Animar a 0 (colapsado)
        duration: 300, // Duración de la animación en ms
        useNativeDriver: false,
      }).start(() => {
        setExpanded(false); // Desmonta el contenido cuando la animación ha terminado
      });
    }
  };

  const period = [
    {label: 'Dia', value: 'byDayMonthYear'},
    {label: 'Mes', value: 'byMonthYear'},
    {label: 'Año', value: 'byYear'},
  ];

  return (
    <View style={styles.mainContainer}>
      {/* Botón principal (icono) que activa el menú */}
      <TouchableOpacity
        onPress={toggleAnimation}
        style={styles.buttonContainer}>
        <Icon name="filter" size={20} color={theme.text} />
      </TouchableOpacity>

      {/* Renderización condicional: el menú solo se monta si `expanded` es true */}
      {expanded && (
        <Animated.View
          style={[
            styles.dropdownContainer,
            {
              backgroundColor: theme.iconBackground,
              height: interpolatedHeight, // Altura animada
              opacity: interpolatedOpacity, // Opacidad animada
            },
          ]}>
          {/* Contenido de tu menú desplegable */}
          <View>
            <StyledDropDown
              margin={0}
              width={'100%'}
              data={period}
              value={selectedPeriod}
              onChange={elem => setSelectedPeriod(elem.value)}
            />
            <StyledDropDown
              margin={0}
              width={'100%'}
              data={transactionsByDate[selectedPeriod]?.map((tx: any) => ({
                label: tx.name,
                value: tx.id,
                ...tx,
              }))}
              value={null}
              onChange={elem => setGlobalTransactions(elem)}
            />
          </View>
          <TouchableOpacity
            onPress={() => console.log(globalTransactions)}
            style={[
              styles.addButton,
              {
                backgroundColor: theme.background,
              },
            ]}>
            <StyledText
              bold="bold"
              variant="titleMedium"
              text="Agregar categoría"
            />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1000,
    position: 'relative', // Necesario para que el dropdownContainer se posicione absolutamente
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  dropdownContainer: {
    position: 'absolute', // Posiciona el menú absolutamente
    top: '95%', // Ajustado para que el borde superior del menú esté ligeramente debajo del botón
    right: 10, // Alineado a la derecha (ajusta según necesites)
    width: 200, // Ancho fijo para el menú desplegable
    padding: 10, // Relleno dentro del menú
    elevation: 10, // Sombra para Android
    borderRadius: 8,
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: {width: 0, height: 4}, // Desplazamiento de la sombra
    shadowOpacity: 0.3, // Opacidad de la sombra
    shadowRadius: 5, // Radio de desenfoque de la sombra
    justifyContent: 'flex-start', // Cambiado a flex-start para que el contenido empiece desde arriba
    overflow: 'hidden', // Crucial para que el contenido se recorte durante la animación
  },
  addButton: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import {themes} from '../../styles/Theme';
import StyledText from '../custom/StyledText';
import StyledButton from '../custom/StyledButton';
import React, {useContext, useState, useRef} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ThemesContext, ThemeType} from '../../context/ThemesContext';
import {
  View,
  Animated,
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  CategoriesContext,
  CategoriesContextType,
} from '../../context/CategoriesContext';
import {FAB} from 'react-native-paper';
import AddCategory from '../../views/AddCategory';

const CategoriesOption = () => {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    icon: '',
  });
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const {categories, deleteCategory, addCategory} = useContext(
    CategoriesContext,
  ) as CategoriesContextType;

  const theme = themes[currentThemeName.currentThemeName];

  // Animaciones
  const slideAnim = useRef(new Animated.Value(0)).current; // empieza oculto (0 altura)
  const buttonWidth = useRef(new Animated.Value(1)).current; // escala inicial normal

  const toggleSlide = () => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0, // ocultar
        duration: 600,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    } else {
      setVisible(true); // mostrar primero, luego animar
      Animated.timing(slideAnim, {
        toValue: -150, // ajusta la altura negativa según necesites
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          styles.container,
          {
            paddingBottom: insets.bottom,
            backgroundColor: theme.background,
          },
        ]}>
        <FlatList
          data={categories}
          keyExtractor={value => value._id.toString()}
          renderItem={(value: any) => {
            const {name, icon, _id} = value.item;
            return (
              <StyledButton
                title={name}
                iconName={icon}
                onLongPress={() => deleteCategory(_id)}
              />
            );
          }}
        />
        <View style={styles.parentButtonContainer}>
          {!visible ? (
            <Animated.View
              style={{
                width: buttonWidth.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              }}>
              <TouchableOpacity
                onPress={() => {
                  Animated.timing(buttonWidth, {
                    toValue: 0.8, // lo haces más pequeño
                    duration: 400,
                    useNativeDriver: false,
                  }).start(() => {
                    toggleSlide(); // muestra la vista expandida
                    buttonWidth.setValue(1); // restauras el tamaño para la próxima vez
                  });
                }}
                style={[
                  styles.addButton,
                  {
                    backgroundColor: theme.iconBackground,
                  },
                ]}>
                <StyledText
                  bold="bold"
                  variant="titleLarge"
                  text="Agregar categoría"
                />
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <Animated.View
              style={{
                transform: [{translateY: slideAnim}],
                backgroundColor: theme.background,
              }}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  disabled={
                    !newCategory.name.trim() || !newCategory.icon.trim()
                  }
                  onPress={() => {
                    if (visible) {
                      const {name, icon} = newCategory;
                      if (!name.trim() || !icon.trim()) {
                        return;
                      }
                      addCategory(name.trim(), icon.trim());
                      setNewCategory({name: '', icon: ''});
                      toggleSlide();
                    }
                  }}
                  style={[
                    styles.addButton,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      width: '80%',
                      backgroundColor: theme.iconBackground,
                      opacity:
                        !newCategory.name.trim() || !newCategory.icon.trim()
                          ? 0.4
                          : 1,
                    },
                  ]}>
                  <StyledText
                    bold="bold"
                    variant="titleLarge"
                    text="Agregar categoría"
                  />
                </TouchableOpacity>
                <FAB
                  icon="close"
                  style={[styles.fab, {backgroundColor: theme.iconBackground}]}
                  color={theme.text}
                  onPress={() => {
                    toggleSlide();
                    setNewCategory({name: '', icon: ''});
                  }}
                />
              </View>
              <AddCategory
                newCategory={newCategory}
                setNewCategory={setNewCategory}
              />
            </Animated.View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CategoriesOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parentButtonContainer: {
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    padding: 15,
    borderRadius: 50,
    marginVertical: 10,
    alignItems: 'center',
  },
  fab: {
    borderRadius: 50,
    backgroundColor: 'red',
  },
});

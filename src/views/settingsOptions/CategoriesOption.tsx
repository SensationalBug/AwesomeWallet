import {themes} from '../../styles/Theme';
import StyledText from '../../components/custom/StyledText';
import StyledButton from '../../components/custom/StyledButton';
import React, {useContext, useState, useRef} from 'react';
import {ThemesContext} from '../../context/ThemesContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  View,
  Animated,
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {FAB} from 'react-native-paper';
import AddCategory from '../AddCategory';
import {CategoriesContext} from '../../context/CategoriesContext';
import {CategoriesContextType, ThemeType} from '../../types/Types';

const CategoriesOption = () => {
  const insets = useSafeAreaInsets();

  const slideAnim = useRef(new Animated.Value(0)).current; // empieza oculto (0 altura)
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [expanded, setExpanded] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    icon: '',
  });

  const {categories, deleteCategory, addCategory} = useContext(
    CategoriesContext,
  ) as CategoriesContextType;

  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];

  const interpolatedWidth = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['100%', '80%'],
  });

  const animate = () => {
    if (!expanded) {
      // CONTRAE → primero contraer, luego mostrar el botón
      Animated.timing(slideAnim, {
        toValue: -200, // ocultar
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(animatedWidth, {
          toValue: expanded ? 0 : 1,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(opacity, {
            toValue: expanded ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setExpanded(!expanded);
          });
        });
      });
    } else {
      // EXPANDE → primero ocultar el botón, luego expandir
      Animated.timing(slideAnim, {
        toValue: 0, // ocultar
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(opacity, {
          toValue: expanded ? 0 : 1,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(animatedWidth, {
            toValue: expanded ? 0 : 1,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setExpanded(!expanded);
          });
        });
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
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
        <Animated.View
          style={{
            transform: [{translateY: slideAnim}],
          }}>
          <View
            style={[
              styles.buttonContainer,
              {backgroundColor: theme.background},
            ]}>
            <Animated.View style={{width: interpolatedWidth}}>
              <TouchableOpacity
                disabled={
                  expanded &&
                  (!newCategory.name.trim() || !newCategory.icon.trim())
                }
                onPress={() => {
                  const {name, icon} = newCategory;
                  if (!expanded) {
                    animate();
                  } else {
                    addCategory(name, icon);
                    setNewCategory({name: '', icon: ''});
                    Keyboard.dismiss();
                    animate();
                  }
                }}
                style={[
                  styles.addButton,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    backgroundColor: theme.iconBackground,
                    opacity:
                      expanded &&
                      (!newCategory.name.trim() || !newCategory.icon.trim())
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
            </Animated.View>
            <Animated.View style={{opacity}}>
              <FAB
                icon="close"
                color={theme.text}
                style={[styles.fab, {backgroundColor: theme.iconBackground}]}
                onPress={() => {
                  animate();
                  Keyboard.dismiss();
                  setNewCategory({name: '', icon: ''});
                }}
              />
            </Animated.View>
          </View>
          <Animated.View style={{opacity}}>
            <AddCategory
              newCategory={newCategory}
              setNewCategory={setNewCategory}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CategoriesOption;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  },
});

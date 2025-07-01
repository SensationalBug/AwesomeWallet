import {themes} from '../styles/Theme';
import React, {useContext} from 'react';
import {ThemeType} from '../types/Types';
import {StyleSheet, View} from 'react-native';
import {ThemesContext} from '../context/ThemesContext';
import StyledView from '../components/custom/StyledView';
import StyledText from '../components/custom/StyledText';
import StyledButton from '../components/custom/StyledButton';
import {CategoriesContext} from '../context/CategoriesContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TransactionsGrouped = ({route}: any) => {
  const {getCategoryById} = useContext(CategoriesContext);
  const currentThemeName = useContext(ThemesContext) as ThemeType;
  const theme = themes[currentThemeName.currentThemeName];
  const {params = []} = route;
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <StyledView>
        {Array.isArray(params) &&
          params.map((transaction: any, index: number) => {
            const {name, transactions} = transaction;
            return (
              <View key={index}>
                <StyledText
                  text={name}
                  variant="headlineMedium"
                  style={styles.styledText}
                />
                {transactions.map((elem: any, inx: number) => {
                  const {category, concept, amount, type, cDate} = elem;
                  const categoryIcon = (
                    getCategoryById(category) as unknown as {icon?: string}
                  )?.icon;
                  const categoryName = (
                    getCategoryById(category) as unknown as {name?: string}
                  )?.name;
                  return (
                    <StyledButton
                      key={inx}
                      backgroundColor={theme.iconBackground}
                      title={concept}
                      iconName={categoryIcon}
                      subTitle={categoryName}
                      amount={amount}
                      type={type}
                      date={cDate.split('T')[0]}
                    />
                  );
                })}
              </View>
            );
          })}
      </StyledView>
    </View>
  );
};

export default TransactionsGrouped;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styledText: {
    padding: 10,
  },
});

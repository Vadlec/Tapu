import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainBottomTabParamList} from '../../routes/mainBottomTabParams';

import {Button, Card, RowBox} from '../../components';
import {StyleSheet, View} from 'react-native';
import DisplayText from '../../components/DisplayText';
import {Overlay} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';
import {ListItem} from '../../types';
import {UserContext} from '../../context';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {addItem} from '../../context/AuthReducer';
type ListScreenProps = BottomTabNavigationProp<MainBottomTabParamList, 'List'>;
const houseImages = [
  require('../../assets/houses/ev1.png'),
  require('../../assets/houses/ev2.png'),
  require('../../assets/houses/ev3.png'),
  require('../../assets/houses/ev4.png'),
  require('../../assets/houses/ev5.png'),
  require('../../assets/houses/ev6.png'),
  require('../../assets/houses/ev7.png'),
  require('../../assets/houses/ev8.png'),
  require('../../assets/houses/ev9.png'),
  require('../../assets/houses/ev10.png'),
  require('../../assets/houses/ev11.png'),
];
const ListScreen: React.FC = () => {
  const navigation = useNavigation<ListScreenProps>();
  const {state, dispatch} = useContext(UserContext);
  const [listItems, setListItems] = useState<ListItem[] | null>(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  useEffect(() => {
    getItems().then(response => setListItems(response));
  }, []);
  async function getItems(): Promise<ListItem[]> {
    return new Promise((res, err) => {
      fetch('https://618718f2cd8530001765ac68.mockapi.io/tapu/api/houses')
        .then(res => res.json())
        .then((response: ListItem[]) => {
          let newItems: ListItem[] = [];
          response.forEach(element => {
            newItems.push({
              ...element,
              distance: (Math.random() * 100).toFixed(1),
              rating: (Math.random() * 5).toFixed(1),
              imageURL:
                houseImages[Math.floor(Math.random() * houseImages.length)],
            });
          });
          res(newItems);
        })
        .catch(e => err(e));
    });
  }

  const _renderItem = ({item}: any) => {
    return <Card item={item} addToBasket={() => addToBasket(item)}></Card>;
  };
  const addToBasket = (item: ListItem) => {
    if (state.user == null) {
      setOverlayVisible(true);
    } else {
      dispatch(addItem(item));
    }
  };
  return (
    <View style={{backgroundColor: '#FEFEFE', width: '100%'}}>
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={() => setOverlayVisible(false)}
        overlayStyle={styles.overlayStyle}>
        <FontAwesomeIcon name="exclamation-triangle" size={30} color="orange" />
        <DisplayText>You have to log in to add items to basket.</DisplayText>
        <RowBox justCont="space-around" marginTop={15}>
          <Button
            text="Login"
            width={'40%'}
            onpress={() => {
              setOverlayVisible(false);
              navigation.navigate('AccountStack', {screen: 'Login'});
            }}
          />
          <Button
            text="Cancel"
            primary={false}
            width={'40%'}
            onpress={() => setOverlayVisible(false)}
          />
        </RowBox>
      </Overlay>

      <FlatList
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        horizontal={false}
        data={listItems}
        keyExtractor={item => item.id}
        renderItem={item => _renderItem(item)}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: '#BBC3CF',
              opacity: 0.5,
            }}></View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  overlayStyle: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ListScreen;

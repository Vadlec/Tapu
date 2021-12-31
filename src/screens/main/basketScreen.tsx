import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, ScrollView} from 'react-native';
import {Container, Card, RowBox, DisplayText, Button} from '../../components';
import {UserContext} from '../../context';
import {clearBasket, removeItem} from '../../context/AuthReducer';
import {ListItem} from '../../types';
import EntypoIcons from 'react-native-vector-icons/Entypo';

function BasketScreen() {
  const {state, dispatch} = useContext(UserContext);
  const [groupedObjects, setGroupedObjects] = useState();
  const _renderItem = ({item}: any) => {
    return <Card item={item} removeItem={() => dispatch(removeItem(item))} />;
  };
  const [basketItems, setBasketItems] = useState<ListItem[]>([]);
  useEffect(() => {
    if (basketItems) groupById(basketItems);
  }, [state.user?.items]);

  const groupById = (basketItems: ListItem[] = state.user?.items!) => {
    let result = [];
    let groupedObjectsList = basketItems.reduce(function (r, a) {
      r[a.id] = r[a.id] || 0;
      r[a.id] += 1;

      return r;
    }, Object.create(null));
    setGroupedObjects(groupedObjectsList);
    //setGroupedObjects(groupedObject);
  }; /**     <FlatList
  showsHorizontalScrollIndicator={false}
  keyboardShouldPersistTaps="handled"
  horizontal={false}
  data={state.user?.items}                                                                                                                                               
  keyExtractor={(item, i) => i.toString()}
  renderItem={item => _renderItem(item)}
  ItemSeparatorComponent={() => (
    <View
      style={{
        height: 1,
        backgroundColor: '#BBC3CF',
        opacity: 0.5,
      }}></View>
  )}
/> */

  return (
    <View style={{width: '100%', flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          horizontal={false}
          data={state.user?.items}
          keyExtractor={(item, i) => i.toString()}
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
      <View
        style={{
          flex: 0.3,
        }}>
        <View style={{backgroundColor: '#BBC3CF', height: 1}}></View>
        <Container>
          <RowBox marginTop={-15} justCont={'flex-start'}>
            <View style={{width: '100%'}}>
              <DisplayText>
                Price:
                {numberWithCommas(
                  (state.user?.currentItemPrice! * 0.92).toFixed(2),
                )}
                ,000 $
              </DisplayText>

              <DisplayText>
                Taxes:{' '}
                {numberWithCommas(
                  (state.user?.currentItemPrice! * 0.08).toFixed(2),
                )}
                ,000 $
              </DisplayText>
              <DisplayText>
                Grand total: {numberWithCommas(state.user?.currentItemPrice)}
                ,000 $
              </DisplayText>
            </View>
          </RowBox>
          <Button text="clear basket" onpress={() => dispatch(clearBasket())} />
        </Container>
      </View>
    </View>
  );
}
export default BasketScreen;
function numberWithCommas(x: any) {
  //https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

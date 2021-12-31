import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {RowBox} from '.';
import {ListItem} from '../types';
import DisplayText from './DisplayText';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcons from 'react-native-vector-icons/Ionicons';

type CardProps = {
  item: ListItem;
  addToBasket?: (item: ListItem) => void;
  removeItem?: (item: ListItem) => void;
};

const Styled_Container = styled.View`
  display: flex;
  width: 100%;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const ShadowedView = styled.View`
  elevation: 8;
  backgroundcolor: brown;
  width: 120px;
  height: 80px;
  border-radius: 10px;
  shadowcolor: black;
  overflow: hidden;
`;
function camelize(str: string) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

const Card: React.FC<CardProps> = ({
  children,
  item,
  addToBasket,
  removeItem,
}) => {
  return (
    <Styled_Container>
      <RowBox justCont="space-around" marginTop={0}>
        <ShadowedView>
          <Image
            source={item.imageURL}
            //source={{uri: 'https://picsum.photos/720/480'}}
            style={{width: '100%', height: '100%'}}
          />
        </ShadowedView>
        <View
          style={{
            width: '50%',
            alignItems: 'center',
          }}>
          <DisplayText>
            {item['city-prefix']} {camelize(item.name)} {item['city-suffix']}
          </DisplayText>
          <Text>{parseFloat(item.price)},000 $</Text>
          <RowBox justCont={'space-evenly'}>
            <View style={styles.rowItem}>
              <FontAwesomeIcon name="star" color="#ECD03F" size={20} />
              <Text>
                {'  '}
                {item.rating}
              </Text>
            </View>
            <View style={styles.rowItem}>
              <IonIcons name="ios-location" color="#0DAFC0" size={20} />
              <Text>
                {'  '}
                {item.distance} km
              </Text>
            </View>
          </RowBox>
        </View>
      </RowBox>
      {addToBasket && (
        <TouchableOpacity onPress={() => addToBasket(item)}>
          <RowBox justCont="center" marginTop={15}>
            <IonIcons name="add-circle" color="#E82223" size={20} />
            <Text style={{color: '#E82223', fontWeight: 'bold'}}>
              ADD TO BASKET
            </Text>
          </RowBox>
        </TouchableOpacity>
      )}
      {removeItem && (
        <TouchableOpacity onPress={() => removeItem(item)}>
          <RowBox justCont="center" marginTop={15}>
            <IonIcons name="remove-circle" color="#E82223" size={20} />
            <Text style={{color: '#E82223', fontWeight: 'bold'}}>
              REMOVE FROM BASKET
            </Text>
          </RowBox>
        </TouchableOpacity>
      )}
    </Styled_Container>
  );
};
export default Card;

const styles = StyleSheet.create({
  rowItem: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

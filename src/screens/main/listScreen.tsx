import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {MainBottomTabParamList} from '../../routes/mainBottomTabParams';

import {Title, Container, Button} from '../../components';

type ListScreenProps = BottomTabNavigationProp<MainBottomTabParamList, 'List'>;

function ListScreen() {
  const navigation = useNavigation<ListScreenProps>();
  return (
    <Container>
      <Title>List incoming</Title>
      <Button
        primary={true}
        text="Account"
        onpress={() => navigation.navigate('AccountStack')}
      />
    </Container>
  );
}

export default ListScreen;

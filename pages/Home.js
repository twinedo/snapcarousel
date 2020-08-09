/* eslint-disable react-native/no-inline-styles */
import Axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const {width, height} = Dimensions.get('window');

const Home = () => {
  const [listPhoto, setListPhoto] = useState([]);

  const [state, setstate] = useState('');

  let carouselRef = useRef(null);

  useEffect(() => {
    Axios.get('https://picsum.photos/v2/list?page=2&limit=10')
      .then((res) => {
        console.log(res);
        setListPhoto(res.data);
        setstate(res.data[0].author);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getItem = (idx) => {
    console.log('index', idx);
    console.log('current item', listPhoto[idx].author);
    setstate(listPhoto[idx].author);
  };

  return (
    <>
      <View
        style={{
          width: '100%',
          backgroundColor: 'blue',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', color: 'white'}}>Album Foto</Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'yellow',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{state}</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          height: '30%',
          width: '100%',
        }}>
        <Carousel
          ref={(c) => {
            carouselRef = c;
          }}
          data={listPhoto}
          sliderWidth={width}
          sliderHeight={height}
          itemWidth={200}
          itemHeight={200}
          useScrollView={true}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
          }}
          onViewableItemsChanged={({viewableItems, changed}) => {
            console.log('Visible items are', viewableItems);
            console.log('Changed in this iteration', changed);
          }}
          onLayout={(e) => console.log(e.nativeEvent)}
          onSnapToItem={(index) => {
            getItem(index);
          }}
          renderItem={({item, index}) => {
            return (
              <>
                <Image
                  style={{
                    height: 125,
                    width: 200,
                    resizeMode: 'cover',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                  source={{uri: item.download_url}}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    height: 30,
                    backgroundColor: 'white',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}>
                  {item.author}
                </Text>
              </>
            );
          }}
        />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});

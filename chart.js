import React from 'react';
import {View, Dimensions, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {LineChart} from 'react-native-chart-kit';

const chart = ({data}) => {
  return (
    <View>
      <LineChart
        data={{
          labels: data.keys,
          datasets: [
            {
              data: data.values,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#5555ff',
          backgroundGradientFrom: '#5555ff',
          backgroundGradientTo: '#9999ff',
          decimalPlaces: 0, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#fff',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default chart;

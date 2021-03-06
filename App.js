import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {to} from 'nh-utils';
import firebase from './firebase';
import utils from './utils';
import Chart from './chart';

const countsRef = firebase.database().ref('counts');

const App = () => {
  const [counts, setCounts] = React.useState([]);
  const [state, setState] = React.useState(0);

  React.useEffect(async () => {
    const [_, res] = await to(countsRef.once('value'));

    const responseObj = JSON.parse(JSON.stringify(res));

    const countsArray = Object.keys(responseObj).map(key => responseObj[key]);
    setCounts(countsArray);
  }, []);

  const lastCount = counts[counts.length - 1];

  const graphData = utils.getGraphData(counts);

  forceRemount = () => {
    setState(state + 1);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <SafeAreaView>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Última Limpeza</Text>
              <Text style={styles.sectionDescription}>
                {lastCount && `${utils.formatDate(lastCount.date)}.`}
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Recomendação</Text>
              <Text style={styles.sectionDescription}>
                {lastCount &&
                  `É recomendado que realize a próxima limpeza as ${utils.getRecomendationDate(
                    lastCount.date,
                  )}.`}
              </Text>
            </View>
            <View style={styles.sectionChart}>
              <Text style={styles.sectionChartTitle}>Uso por dia</Text>
              {!graphData ? (
                <Text>Carregando...</Text>
              ) : (
                <Chart data={graphData} />
              )}
            </View>
            <View style={styles.sectionContainer}>
              <Button
                onPress={forceRemount}
                title="Atualizar"
                color="#5555ff"
                accessibilityLabel="Atualizar Dados" />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionChart: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionChartTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

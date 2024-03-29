/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert
} from 'react-native';

import { Applanga } from 'applanga-react-native';
import en from './strings/en.json';
import de from './strings/de.json';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const [localisedMap, setLocalisedMap] = useState({});
  const [language, setLanguage] = useState("en");
  const [isScreenshotMenuOpen, setIsScreenshotMenuOpen] = useState(false);

  useEffect(async () => {
    
    const applangaInit = async () => {

      let newLocalisedMap;
      
      try{
          await Applanga.update()
          newLocalisedMap = await Applanga.localizeMap(
            {
                "en": en,
                "de": de
            })
            console.log("Localise map complete")
            console.log(newLocalisedMap)
            setLocalisedMap(newLocalisedMap)
        } catch (e) {
          console.error(e);
        }
    } 

    await applangaInit()

    ///////////
    // console.log(await Applanga.getString('test_key', ''))
  }, [])

  const OnButtonClick = () => {
    console.log('button clicked');
    // Applanga.showDraftModeDialog()
    if (!isScreenshotMenuOpen) {
      Applanga.showScreenShotMenu()
      setIsScreenshotMenuOpen(true)
    } else {
      Applanga.hideScreenShotMenu()
      setIsScreenshotMenuOpen(false)
    }
  }

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            This is an edited text!
          </Section>
          {
            localisedMap[language] && (
              <Section>
              {localisedMap[language].localized_string}
              </Section>
            )
          }
          <Button onPress={() => OnButtonClick()} title="Click me"/>
          <Button onPress={() => console.log(localisedMap)} title="log map"/>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

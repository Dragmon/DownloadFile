/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

    onPressDownload(){
        const dirs = RNFetchBlob.fs.dirs;
        let urldownload = 'https://www.dropbox.com/s/35kr6i0m45kabzg/iBook%20TV%20de%20paga.ibooks?dl=1';
        //let urldownload = 'https://apihavas.televisaventas.tv/global//uploads/catalogos-android-networks/parrillas_enero_pdf_pdf.pdf';
        let namefile = 'TV-paga';
        let extencion = '.ibooks';
        //let extencion = '.pdf';
        let dirfile = dirs.DocumentDir + '/' + namefile + extencion;
    /*
        RNFetchBlob.fs.exists(dirfile)
            .then((exist) => {
                console.log(`file ${exist ? '' : 'not'} exists`)
            })

        alert("Comenzo la descarga");
        RNFetchBlob
            .config({
                // add this option that makes response data to be stored as a file,
                // this is much more performant.
                fileCache : true,
                //appendExt : 'ibooks',
                path: dirfile
            })
            .fetch('GET', 'https://www.dropbox.com/s/35kr6i0m45kabzg/iBook%20TV%20de%20paga.ibooks?dl=1', {
                //some headers ..
            })
            // listen to download progress event
            .progress((received, total) => {
                console.log('progress', received / total * 100)
            })
            .then((res) => {
                // the temp file path
                console.log('The file saved to ', res.path())
            })
            .catch((err) => {
                console.log("error ", err)
            })
    */

    /* Descarga del archivo si no existe*/


        RNFetchBlob.fs.exists(dirfile)
            .then((exist) => {
                if (!exist){
                    alert("Comenzo la descarga");
                    RNFetchBlob
                        .config({
                            // add this option that makes response data to be stored as a file,
                            // this is much more performant.
                            fileCache : true,
                            //appendExt : 'ibooks',
                            path: dirfile
                        })
                        .fetch('GET', urldownload, {
                            //some headers ..
                        })
                        // listen to download progress event
                        .progress((received, total) => {
                            console.log('progress', received / total * 100)
                        })
                        .then((res) => {
                            // the temp file path
                            RNFetchBlob.ios.previewDocument(dirs.DocumentDir + '/' + namefile + extencion)
                                .catch((err) => {
                                    console.log("error ", err)
                                })
                            console.log('The file saved to ', res.path())
                        })
                        .catch((err) => {
                            console.log("error ", err)
                        })

                }  else {
                    RNFetchBlob.ios.previewDocument(dirs.DocumentDir + '/' + namefile + extencion)
                        .catch((err) => {
                            console.log("error ", err)
                        })

                    console.log("el archivo ya existe")
                    console.log("ruta del archivo", dirfile)
                }
            })
    };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button
            onPress={this.onPressDownload}
            title="Download File"
            color="#ea7f32"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

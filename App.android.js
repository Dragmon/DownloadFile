/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import RNFetchBlob from 'react-native-fetch-blob';
import {deleteFiles} from './deletefile';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';


type Props = {};
export default class AppIos extends Component<Props> {

    componentWillMount(){
        deleteFiles();
    }

    onPressDownload(){
        const android = RNFetchBlob.android
        const dirs = RNFetchBlob.fs.dirs;
        //let urldownload = 'https://www.dropbox.com/s/35kr6i0m45kabzg/iBook%20TV%20de%20paga.ibooks?dl=1';
        let urldownload = 'http://player.vimeo.com/external/301054861.sd.mp4?s=324054bcae97cd2eed2e7a5f70a0ca3580a8ec4d&profile_id=165&oauth2_token_id=925325063';
        //let urldownload = 'https://www.adminconnect.televisaventas.tv/global/uploads/plancomercial-android/p_ibookpc2019_pptx.pptx';
        //let urldownload = 'https://www.adminconnect.televisaventas.tv/global/uploads/presentaciones/gr_final_pdf.pdf';
        //let urldownload = 'https://apihavas.televisaventas.tv/global//uploads/catalogos-android-networks/parrillas_enero_pdf_pdf.pdf';
        //let namefile = 'TV-paga';
        //let namefile = 'presentacion';
        let namefile = 'video-android-download';
        let extencion = '.mp4';
        //let extencion = '.ibooks';
        //let extencion = '.pptx';
        //let extencion = '.pdf';
        //let extencion = '.pdf';
        //let dirfile = dirs.DocumentDir + '/' + namefile + extencion;
        let dirfile = dirs.DCIMDir + '/connect/' + namefile + extencion;
        let filedownload = namefile + extencion;

        console.log("dirs :", dirs);
        console.log("dirfile :", dirfile);

    /* Descarga del archivo si no existe*/


        RNFetchBlob.fs.exists(dirfile)
            .then((exist) => {
                if (!exist){
                    RNFetchBlob
                        .config({
                            // add this option that makes response data to be stored as a file,
                            // this is much more performant.
                            fileCache : true,
                            //appendExt : 'ibooks',
                            path: dirfile,
                            addAndroidDownloads:{
                              useDownloadManager: false, // se usa true cunado quieras que android manipule la descarga
                              notification: true,
                              title: filedownload,
                              description: 'An file.',                              
                              mediaScannable: true,
                            }
                        })

                        .fetch('GET', urldownload, {
                            //some headers ..
                        })
                        // listen to download progress event
                        .progress((received, total) => {
                            console.log('progress', received / total * 100)
                        })
                        .then((res) => {
                            console.log('The file saved to ', res.path())
                            android.actionViewIntent(res.path())                            
                        })
                        .catch((err) => {
                            console.log("error ", err)
                        })

                }  else {                
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
            color="#c71717"
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

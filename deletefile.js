import RNFetchBlob from "react-native-fetch-blob";

export function deleteFiles() {

    console.log("entra a la funcion delete");

    const dirs = RNFetchBlob.fs.dirs;

    var dirfile = dirs.DCIMDir + '/connect';

    console.log("dirfile : " , dirfile);

    /* Borrado de archivos */

    RNFetchBlob.fs.exists(dirfile)
        .then((exist) => {
            if(exist){
                console.log("existe ruta");

                RNFetchBlob
                    .config({
                        // you can also set session beforehand
                        fileCache : true,
                        path: dirfile
                    })

                // remove file by specifying a path
                RNFetchBlob.fs.unlink(dirfile).then(() => {
                    console.log("archivo removido")
                })
            }
        })
};
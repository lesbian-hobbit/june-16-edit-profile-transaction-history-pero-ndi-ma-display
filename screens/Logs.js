import { View, Text, FlatList,ActivityIndicator, StyleSheet,Alert, Pressable, TextInput, Button, Touchable, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import React ,{useState, useEffect} from 'react';
import { auth, firebase } from '../firebase';
import {collection, setDoc, doc, getDoc, querySnapshot, documentSnapshot, getDocs, snapshotEqual, onSnapshot} from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth';
import { onAuthStateChanged, signOut } from "firebase/auth";

const Logs = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [email, setEmail] = useState();
    const [uids, setUid] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [fullname, setName] = useState();

    const [logInfo, setLogs] = useState([]);  
    
const todoRef = firebase.firestore().collection("users").doc("LlsVwIQz9hMMDtHgQLlT").collection("Logs")
    

    useEffect(async() => {
        todoRef.onSnapshot(
            querySnapshot => {
                const logInfo = []
                querySnapshot.forEach((doc)=> {
                    const {ReceiverUid, Timestamp, transactions} = doc.data()
                    logInfo.push({
                        id: doc.id,
                        ReceiverUid,
                        Timestamp,
                        transactions
                        
                    })
                    console.log(logInfo)
                }) 
setLogs()
                
                
            }
        )
        }, [])
        // unsub();
       
    //         // User is signed in, see docs for a list of available properties
    //         // https://firebase.google.com/docs/reference/js/auth.user
    //         const uid = user.uid;
    //         setUid(uid);
    //         setEmail(user.email);
      
    //         const getWallet = async() => {
    //           const docRef = collection(db, "users", "LlsVwIQz9hMMDtHgQLlT", "Logs");
    //           const docSnap = await getDoc(docRef);
    //           if (docSnap.exists()) {
    //             console.log("Document data:", docSnap.data());
    //             const data = docSnap.data();
    //             setUserInfo(data);
    //           } else {
    //             // docSnap.data() will be undefined in this case
    //             console.log("No such document!");
    //           }
    //         }
    //         getWallet();

            
       
        
      
    
    //   }, []);

// useEffect(() => {
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/auth.user
//     const uid = user.uid;
//     setUid(uid);
//     setEmail(user.email);

//       const saveProfile = async () => {
//         const uid  = user.uid;
//         setDoc(doc(db, "users", uid ),{

//           fullname:fullname
//         })
//         .then(() => {
//           // Data saved successfully!
//         })
//         .catch((error) => {
//           // The write failed...
//         });

//       }
//       saveProfile();
//     }    
//   })  },
//       [])
      // if (isLoading) {
      //   return <ActivityIndicator size="large" />;
      // }



    return(
        <View>
        {logInfo && logInfo.map((item, index) => (
          <Text key={index}>{item.transactions}</Text>
          
        ))}
      </View>

        
        // <View style={styles.container}>
        //      <View style={styles.userInfo}>
        //     <Text style={styles.userId }>
        //         id: {uids}
        //     </Text>
        //     <View style={styles.userInfo}>
        //     <Text style={styles.userId }>
        //         Time stamp: {userInfo.Timestamp}
        //     </Text>
        //     <Text style={styles.balance}>
        //     Sent: {userInfo.transactions}
        //     </Text>
            
        //     <Text style={styles.balance}>Receiver: 
        //     {userInfo.ReceiverUid}
            
            

      
            
        //     </Text>
        // </View>
        // </View>

       
        
    )

    
}   
export default Logs

const styles = StyleSheet.create({
    
container:{
backgroundColor:'#e5e5e5',
padding:15,
borderRadius:15,
margin:5,
marginHorizontal:10,
},

innerContainer:{
alignItems:'center',
flexDirection:'column',

},
itemHeading:{
fontWeight:'bold',

},
itemText:{
fontWeight:'300'
},

    userInfo: {
        marginBottom: 20,
      },
      userId: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
      },
      balance: {
        fontSize: 18,
        textAlign: 'center',
        color: "black",
      },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F3F6',
      }
})
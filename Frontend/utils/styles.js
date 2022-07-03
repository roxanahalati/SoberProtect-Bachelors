import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonText:{
      color: `#ffffff`,
      textAlign: 'center',
      fontSize: 16,
    },
    button: {
      backgroundColor: `#5C3A92`,
      textAlign: 'center',
      borderRadius: 8,
      margin: 12,
      height: 40,
      justifyContent: 'center',
    },
    Therapy: {
      color: `#191970`,
      textAlign: 'center',
      fontSize: 16,
      opacity: 0.6,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        borderColor: '#DCDCDC',
      },
    titleInput: {
      height: 70,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      borderColor: '#DCDCDC',
      backgroundColor: '#ffffff',
      textAlignVertical: 'top',
      fontSize: 18
    },
    bodyInput: {
      height: 120,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      borderColor: '#DCDCDC',
      backgroundColor: '#ffffff',
      textAlignVertical: 'top',
      fontSize: 16
    },
    sendButton :{
        backgroundColor: `#5C3A92`,
        textAlign: 'right',
        height: 50,
        width: 50,
        borderRadius: 50/2,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginRight: 20,
    },
    content: {
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor: '#fffff',
    },
    longTextInput: {
      fontSize: 18,
      margin:8,
      height: 100,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#5C3A92',
      textAlign: 'left',
      textAlignVertical: "top"
    },
    importantTitle: {
      fontSize: 30,
      color: `#5C3A92`,
      margin: 8,
    },
    importantTitleSmall:{
      fontSize: 24,
      color: `#5C3A92`,
      marginLeft: 8,
      marginTop:8
    },
    generalText: {
      fontSize: 16,
      color: '#36454F',
      marginLeft: 8,
      marginRight:8
    },
    generalTextColored:{
      fontSize: 16,
      color: '#5C3A92',
      marginLeft: 8,
      marginRight:8
    },
    generalTextBigger:{
      fontSize: 18,
      color: '#36454F',
      paddingLeft: 8,
      paddingRight:8
    },
    generalTextBiggerColored:{
      fontSize: 18,
      color: '#5C3A92',
      paddingLeft: 8,
      paddingRight:8
    },
    generalText2: {
      fontSize: 20,
      color: '#5C3A92',
      marginLeft: 8,
      marginRight: 8,
    },
    generalText3: {
      fontSize: 16,
      color: '#36454F',
      marginLeft: 8,
      marginRight: 8,
    },
    highlightedText: {
      fontSize: 20,
      color: '#36454F',
      marginLeft: 12,
      marginRight: 12,
    },
    accomFeature: {
      marginLeft: 12,
      marginRight: 12,
      height: 100,
      backgroundColor: '#3ACADF',
      opacity: 0.7,
      borderWidth: 2,
      borderColor: '#DCDCDC',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    accomFeatureText:{
      color: `#ffffff`,
      fontSize: 24,
    },
    therapyFeature: {
      marginLeft: 12,
      marginRight: 12,
      height: 100,
      backgroundColor: '#729EFD',
      opacity: 0.7,
      borderWidth: 2,
      borderColor: '#DCDCDC',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    featureText:{
      color: `#ffffff`,
      fontSize: 24,
    }
    ,
    triggeredFeature: {
      marginLeft: 12,
      marginRight: 12,
      height: 100,
      backgroundColor: '#8A64D6',
      opacity: 0.7,
      borderWidth: 2,
      borderColor: '#DCDCDC',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    forumFeature: {
      marginLeft: 12,
      marginRight: 12,
      height: 100,
      backgroundColor: '#5C3A92',
      opacity: 0.7,
      borderWidth: 2,
      borderColor: '#DCDCDC',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    centerElement: {
      marginTop: 10,
      marginBottom: 0,
      alignSelf: 'center',
    },
    bodyText:{
      borderColor: '#DCDCDC',
      borderRadius: 10,
      borderWidth: 2,
      backgroundColor: '#ffffff',
      margin: 6
    },
    topicContainer: {
      flexDirection: "column",
      backgroundColor: '#ffffff', 
      margin: 2,
      marginTop: 4,
      alignSelf: 'stretch',
    },
    homeworkContainer: {
      flexDirection: "column",
      backgroundColor: '#ffffff', 
      margin: 2,
      marginTop: 4,
      padding:4,
      alignSelf: 'stretch',
      borderWidth:2,
      borderColor: "#DCDCDC"
    },
    clientContainer:{
      flexDirection: "column",
      backgroundColor: '#ffffff', 
      margin: 2,
      marginTop: 4,
      borderColor: "#DCDCDC",
      borderRadius: 10,
      borderWidth: 2,
      padding:4,
    },
    titleStyle:{
      fontSize: 24,
      color: `#5C3A92`,
      padding:6,
    },
    titleStyleSmall:{
      fontSize: 20,
      color: `#5C3A92`,
      padding:6,
    },
    complementaryGrey:{
      color: "#646464",
      paddingTop:6,
      paddingBottom:6,
      paddingLeft: 6
    },
    complementaryDarkGrey:{
      color: "#000000",
      paddingTop:6,
      paddingBottom:6,
      paddingLeft: 6
    },
    buttonWithIcon:{
      flexDirection: 'row',
      backgroundColor: '#ffffff', 
      margin: 2,
      alignSelf: 'stretch',
      height: 40,
      alignItems: 'center',
      padding: 6
    },
    blankButtonWithIcon:{
      flexDirection: 'row',
      alignSelf: 'stretch',
      height: 40,
      alignItems: 'center',
      padding: 6,
      borderWidth:2,
      borderColor: "#DCDCDC",
    },
    blankButtonText:{
      color: `#5C3A92`,
      fontSize: 18,
      paddingLeft: 6
    },
    arrange: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '50%'
    },
    threadTitle: {
      fontSize: 30,
      color: `#5C3A92`,
      padding: 8
    },
    threadBody: {
      fontSize: 18,
      padding: 8,
      color: "#414141"
    },
    smallAnnouncement: {
      color: '#3a4e92',
      padding: 10
    },
    inputWithIcon: {
      flexDirection: 'row',
      borderRadius: 10,
      borderWidth:2,
      borderColor: '#DCDCDC',
      backgroundColor: '#ffffff',
      textAlignVertical:'top',
      height: 50,
      margin:6,
      alignItems: 'center',
      alignSelf: 'flex-end'
    },
    alignBottom:{
      flex: 1,
      justifyContent: 'flex-end',
      paddingBottom: 20
    },
    commentContainer:{
      borderRadius:10,
      borderWidth: 2,
      borderColor: "#DCDCDC",
      backgroundColor: "#ffffff",
      margin: 8,
      padding: 8,
      color: '#414141',
      fontSize: 16,
    },
    headerText:{
      fontSize:20, 
      color: '#5C3A92',
      padding:8
    },
    circle:{
      backgroundColor: `#5C3A92`,
      height: 40,
      width: 40,
      borderRadius: 40/2,
      marginLeft: 8,
      marginBottom:8,
      justifyContent: 'center',
      alignItems:'center',
      alignSelf:'center'
    },
    myMessage:{
      borderRadius: 20,
      margin: 8,
      padding:8,
      backgroundColor: `#5C3A92`,
      justifyContent:'center',
      alignItems:'center'
    },
    yourMessage:{
      margin: 8,
      padding:12,
      borderRadius: 20,
      backgroundColor: `#8A64D6`,
      justifyContent:'center',
      alignItems:'center'
    },
    clock:{
      backgroundColor: '#5C3A92',
      textAlign: 'center',
      borderRadius: 8,
      marginBottom: 12,
      marginLeft: 12,
      marginRight:12,
      justifyContent: 'center',
      padding:8,
      marginBottom:4,
    },
    clockText:{
      fontSize: 20,
      color: '#ffffff'
    },
	  cardGame: {
      marginTop: 20,
      flex: 1, 
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    featureText:{
      fontSize: 24,
      color: "#ffffff"
    }
    

    });

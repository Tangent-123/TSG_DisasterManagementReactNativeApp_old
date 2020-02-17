import { StyleSheet, Platform } from 'react-native';

export default MoreStyle = StyleSheet.create({


    HeaderBackground: {
        flexDirection: 'row',
        alignItems: 'center',
      //  marginTop: 4,
      //elevation:10,
        backgroundColor:'#3386FF',
        padding: 14,
        height: 50
    },

    headerItem1: {
        fontSize: 19,
        color: '#001630',
        marginLeft: 18,
        //   marginTop: 20,
        fontFamily: "Gilroy-SemiBold",


    },
    headerItem: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily: "Gilroy-Bold",
        fontWeight: '400',
    },
    HeaderText: {
        textAlign: 'left',
        alignItems: 'flex-start',
        color: '#001630',
        padding: 10,
        fontFamily: "Gilroy-SemiBold",
        fontSize: 15,
    },
    HeaderText1: {
        textAlign: 'left',
        alignItems: 'flex-start',
        color: '#001630',
        fontFamily: "Gilroy-SemiBold",
        fontSize: 14,
    },
    TextOneStylefont: {
        color: '#001630',
        fontFamily: "Gilroy-SemiBold",
        fontSize: 15,
    },
    TextOneStyle: {
        color: '#001630',
        fontFamily: "Gilroy-SemiBold",
        fontSize: 18,
    },

    TextSecondStyle: {
        color: '#969EA2',
        fontFamily: "Gilroy-Medium",
        fontSize: 14,
    },
    LevelText1: {
        width: '90%',
        fontSize: 16,
        marginLeft: 8,
        color: '#4E5764',
        fontFamily: "Gilroy-Medium",
    },
    FirstView: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        // height:156,
        borderRadius: 10,
        margin: 12,
    },
    SecondView: {
        flex: 1,
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopEndRadius: 30,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        backgroundColor: '#FFFFFF',
    },
    HeaderKeyItem: {
        fontSize: 18,
        color: '#001630',
        marginTop: 10,
        fontFamily: "Gilroy-SemiBold",
    },
    HeaderName: {
        fontSize: 12,
        color: '#001630',
        marginTop: 10,
        fontFamily: "Gilroy-SemiBold",
    },
    HeaderKeySecondItem: {
        fontSize: 14,
        color: Colors.tabbackground,
        marginTop: 16,
        fontFamily: "Gilroy-Regular",
    },
    TextInputStyle: {
        width: '88%',
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 8,
        fontFamily: "Gilroy-Regular",
    },
    TextInputStyle1: {

        //  height: 40,
        margin: 8,
        color: '#001630',
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "Gilroy-Regular",
    },
    button: {
        width: '75%',
        height: 50,
        padding: 10,
        backgroundColor: '#4E5764',
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,

    },
    spinnerTextStyle: {
        color: '#FFF',
        fontFamily: 'Gilroy-SemiBold',
    },
    TextStyleheadersecond: {
        color: '#000',

        alignItems: 'center',
        fontFamily: 'Gilroy-Bold',
        padding: 4,
        fontSize: 12,
    },

    headerItemSecond: {
        fontSize: 22,
        color: '#F25D45',

        fontFamily: "Gilroy-Bold",
        marginLeft: 4,
    },

    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
    },

    TextInputStyle:
    {

        width: '86%',
        height: 40,
        margin: 4,
        fontSize: 14,
        backgroundColor: '#fff',
        marginBottom: 8,
        padding: 8,

    },


    button: {
        width: '75%',
        height: 40,
        padding: 10,
        backgroundColor: Colors.Appcolor,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,

    },

    TextStylebutton: {
        textAlign: 'center',
        color: Colors.ButtonTextcolor,
        fontFamily: "Gilroy-Bold",
        fontSize: 14,
    },
    MainContent: {
        flex: 1,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    },
    MainContent1: {
        flex: 1,
        justifyContent: 'center',
    },
    TextStyle1: {
        textAlign: 'center',
        color: '#6A6A6A',
        fontSize: 14,
        fontFamily: "Gilroy-Regular",
    },

    TextStyle: {
        textAlign: 'center',
        color: '#F5FCFF',
        fontSize: 14,
        fontFamily: "Gilroy-SemiBold",
    },
    TextRadioText: {
        color: '#001630',
        fontFamily: "Gilroy-Regular",
        fontSize: 14,
        marginRight: 4,
    },
    text: {
        color: '#001630',
        fontSize: 14,
        fontFamily: "Gilroy-SemiBold",
    },
    TextStyleHeader: {
        marginLeft: 10,
        padding: 8,
        marginTop: 4,
        alignItems: 'center',
        fontFamily: "Gilroy-Bold",
        color: '#000',
        fontSize: 16,
    },


    TextOneStylePossitive: {
        width: '84%',
        marginLeft: 10,
        color: '#000',
        alignItems: 'flex-start',
        fontFamily: "Gilroy-Bold",
        margin: 2,
        fontSize: 12,
    },
    TextOneStyleNagitive: {
        width: '84%',
        marginLeft: 10,
        color: '#F2573E',
        alignItems: 'flex-start',
        fontFamily: "Gilroy-Bold",
        margin: 2,
        fontSize: 12,
    },

    AddToCardBtn: {
        width: '86%',
        height: 50,
        padding: 10,
        backgroundColor: '#4E5764',
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,

    },
    TextInputStyle: {
        width: '90%',
        height: 40,
        margin: 4,
        backgroundColor: '#fff',
        marginBottom: 8,
        padding: 8,
        fontFamily: "Gilroy-SemiBold",
    },
    mainContent1: {
        flex: 1,
        justifyContent: 'center',
        padding: 4
    },
    HeaderTextStyle: {
        color: '#001630',
        padding: 4,
        fontFamily: "Gilroy-SemiBold",
        fontSize: 11,
    },


    mainContent: {
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    },

    PickerView: {
        padding: 4,
        borderWidth: 1,
        marginLeft: 8,
        marginRight: 16,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    button: {
        width: '40%',
        height: 42,
        padding: 10,
        borderColor: Colors.Appcolor,
        alignItems: 'center',
        backgroundColor: '#74B2AA',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
    },
    button1: {
        width: '40%',
        height: 42,
        padding: 10,
        borderColor: Colors.Appcolor,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 20,
    },
    TextInputStyle: {
        width: '86%',
        height: 40,
        margin: 8,
        backgroundColor: '#fff',
        marginBottom: 8,
        padding: 8,
        fontFamily: "Gilroy-SemiBold",
    },
    mainContent1: {
        flex: 1,
        justifyContent: 'center',
        padding: 4
    },

    TextStyleheader11: {
        color: '#000',

        alignItems: 'flex-start',
        padding: 4,
        fontFamily: "Gilroy-Bold",
        fontSize: 12,
    },


    TextStylecancle: {
        textAlign: 'center',

        color: 'red',

        width: 20,
        height: 30,
        fontFamily: "Gilroy-Bold",
        fontSize: 18,
    },
    header: {
        fontSize: 21,
        color: '#001630',
        marginRight: 4,
        fontFamily: "Gilroy-SemiBold",

    },

    DateTextValue1: {
        color: '#4E5764',
        alignItems: 'flex-start',
        fontFamily: "Gilroy-Medium",
        fontSize: 14,
    },
    DateTextValue: {
        color: '#303031',
        alignItems: 'flex-start',
        fontFamily: "Gilroy-Regular",
        fontSize: 14,
    },
    LevelValue: {
        color: '#000000',
        alignItems: 'flex-start',
        fontFamily: "Gilroy-Regular",
        fontSize: 13,
    },
    DateTextValuebold: {
        color: '#000000',
        alignItems: 'flex-start',
        fontFamily: "Gilroy-Medium",
        fontSize: 13,
        marginLeft: 4,
    },
    TextStyleheadersecond: {
        color: Colors.TextColorone,

        alignItems: 'center',
        fontFamily: "Gilroy-SemiBold",
        padding: 4,
        fontSize: 16,
    },
    SecondView: {
        flex: 1,
        justifyContent: 'center',
        borderTopLeftRadius: 30,
        borderTopEndRadius: 30,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        backgroundColor: "white",
    },
    MainContainer: {
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    },



    MainContainerview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    LevelText: {
        fontSize: 14,
        color: Colors.tabbackground,
        marginTop: 10,
        paddingLeft: 23,
        fontFamily: "Gilroy-Bold",

    },
    textViewContainernews: {
        alignItems: 'flex-start',
        fontSize: 12,
        color: '#000',
        fontFamily: "Gilroy-Bold",

        marginLeft: 12,

    },
    TextInputStyle: {
        width: '86%',
        height: 40,
        margin: 8,
        backgroundColor: '#fff',
        marginBottom: 8,
        padding: 8,
        fontFamily: "Gilroy-SemiBold",
    },
    TextFoget: {

        fontSize: 16,
        color: '#008800',
        margin: 4,
    },
    titletext: {
        alignItems: 'flex-start',
        fontSize: 14,
        color: '#000',
        fontFamily: "Gilroy-Bold",

    },
    TextLight: {
        alignItems: 'flex-start',
        fontSize: 12,
        color: '#000',
        fontFamily: "Gilroy-Light",

    },


    MainContainer1: {
        flex: 1,
        backgroundColor: '#fff',
    },

    TextStyleheader1: {
        color: '#000',
        fontFamily: "Gilroy-SemiBold",
        marginRight: 10,
        fontSize: 13,
    },

    MainContainerview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    textViewContainernews: {
        alignItems: 'flex-start',
        fontSize: 12,
        color: '#000',
        fontFamily: "Gilroy-Bold",

        marginLeft: 12,

    },
    TextInputStyle: {
        width: '86%',
        height: 40,
        margin: 8,
        backgroundColor: '#fff',
        marginBottom: 8,
        padding: 8,
        fontFamily: "Gilroy-SemiBold",
    },
    TextFoget: {

        fontSize: 16,
        color: '#008800',
        margin: 4,
    },
    titletext: {
        alignItems: 'flex-start',
        fontSize: 14,
        color: '#000',
        fontFamily: "Gilroy-Bold",

    },
    TextLight: {
        alignItems: 'flex-start',
        fontSize: 12,
        color: '#000',
        fontFamily: "Gilroy-Light",

    },
    TextStyleheader: {
        color: '#001630',
        alignItems: 'center',
        fontFamily: "Gilroy-SemiBold",
        fontSize: 16,
    },
    TextField: {
        color: '#4E5764',
        alignItems: 'center',
        fontFamily: "Gilroy-Medium",
        fontSize: 12,
    },
    MainContainerview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    TextValue: {
        alignItems: 'center',
        fontSize: 14,
        color: '#fff',
        fontFamily: "Gilroy-Medium",
    },

    BackgroundValue: {
        height: 37,
        flexDirection: 'row',
        borderRadius: 4,
        marginTop: 4,
        marginLeft: 8,
        padding: 10,
        backgroundColor: '#70AFA7',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    TextSecondLevel: {
        textAlign: 'left',
        alignItems: 'flex-start',
        color: '#000',
        padding: 4,

        fontFamily: "Gilroy-Light",
        fontSize: 14,
    },
    TextSecondValue: {
        textAlign: 'left',
        alignItems: 'flex-start',
        color: '#000',
        padding: 6,

        fontFamily: "Gilroy-Light",
        fontSize: 14,
    },

    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 22,
        color: '#000',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 16,
    },

    header2: {
        fontSize: 22,
        color: '#F25D45',

        marginLeft: 4,
        marginTop: 10,
    },
    button: {
        width: '75%',
        height: 40,
        padding: 10,
        backgroundColor: '#9095A0',
        borderRadius: 10,
        marginTop: 20,

    },
    button1: {
        width: '75%',
        height: 40,
        padding: 10,
        backgroundColor: '#A09B90',
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 20,

    },
    TextStylesecond: {
        textAlign: 'center',
        color: '#fff',

        padding: 10,
        fontSize: 14,
    },


    textViewContainernews: {
        alignItems: 'flex-start',
        fontSize: 12,
        color: '#000',
        fontFamily: "Gilroy-Bold",

        marginLeft: 12,
    },
    TextInputStyle:
    {
        borderWidth: 2,
        borderColor: '#009688',
        width: '45%',
        height: 40,
        margin: 8,
        borderRadius: 10,
        marginBottom: 8,
    },
    TextFoget: {
        fontSize: 16,
        color: '#008800',
        margin: 4,
    },
    titletext: {
        alignItems: 'flex-start',
        fontSize: 14,
        color: '#000',
        fontFamily: "Gilroy-Bold",

    },
    TextLight: {
        alignItems: 'flex-start',
        fontSize: 12,
        color: '#000',
        fontFamily: "Gilroy-Regular",

    },


});

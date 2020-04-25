import { StyleSheet, Platform } from 'react-native';
export default BuyStyle = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        backgroundColor: '#F5FCFF',
    },

    iconStyle: {

        width: 20,
        height: 20,
        marginEnd:10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        tintColor: '#3386FF'

    },
     TextStyle: {
        color: '#FFFFFF',
        fontSize: 15,
        alignSelf: 'center',
        fontFamily: "Gilroy-SemiBold",
    },
 AddToCardBtn: {
        width: '90%',
        height: 50,
        padding: 10,
        backgroundColor: '#3386FF',
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,

    },
    sub_Category_Text: {
        fontSize: 18,
        color: '#F5F5F5',
        padding: 10
    },

    category_Text: {
        textAlign: 'left',
        color: '#3386FF',
        fontSize: 18,
        padding: 10
    },

    category_View: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    },

    Btn: {
        padding: 10,
        backgroundColor: '#FF6F00'
    }
});
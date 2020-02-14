import { StyleSheet,Platform } from 'react-native';
import colors from '../../util/Color_Value';

export default LoginStyle = StyleSheet.create({
    ViewContain: {
        flex:1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
      
    },
    spinnerTextStyle: {
        color: '#fff'
    },
    headerItem: {
        fontSize: 29,
        color: '#001630',
        fontFamily: "Gilroy-Bold",
    
    },
    HeaderBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        padding:14,
        paddingTop: 20,
        height: 80
    },
    headerItem1: {
        fontSize: 30,
        color: '#000',
        fontFamily: "Gilroy-Bold",
        fontWeight: '300',
        paddingLeft: 22,
    },
    headerItemSecond: {
        fontSize: 29,
        color: colors.AllbtnBackColor,
        fontFamily: "arlrdbd",
        padding: 4,
    },
    containersecond: {
        flex: 1,
       padding:20,
       margin:10,
        backgroundColor: '#fff',
    },

    header: {
        fontSize: 22,
        color: '#000',
        marginRight: 4,
        fontWeight: 'bold'

    },
    header2: {
        fontSize: 22,
        color: '#F25D45',
        marginLeft: 4,
        fontWeight: 'bold'

    },
    TextInputStyle:
    {
        borderWidth: 2,
        borderColor: '#009688',
        width: '90%',
        height: 40,
        marginTop: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    AddToCardBtn: {
        width: '99%',
        height: 50,
        padding: 10,
        backgroundColor: '#3386FF',
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,

    },
    TextFoget: {
        fontSize: 16,
        color: '#4E5764',
        marginBottom: 12,
        marginTop:12,
        fontFamily: "Gilroy-Medium",
    },
    TextStyle: {
        color: '#FFFFFF',
        fontSize: 15,
        alignSelf: 'center',
        fontFamily: "Gilroy-SemiBold",
    },
});

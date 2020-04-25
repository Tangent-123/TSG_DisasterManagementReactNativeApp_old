import { StyleSheet, Platform } from 'react-native';
export default CommanStyle = StyleSheet.create({
 
    Responcelevel:{
        alignItems: 'center',
        borderRadius:10,
        padding: 14,
        height: 40

    },
    HeaderBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3386FF',
        padding: 14,
        height: 50
    },

    headerItem: {
        fontSize: 17,
        color: '#FFFFFF',
        padding:4,
        marginLeft:10
    },
    MainView: {
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    },


});

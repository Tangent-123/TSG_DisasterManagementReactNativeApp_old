import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import Axios from 'axios';
import { Text, Picker, Linking, Alert, TextInput, View, FlatList, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import StoreHeader from '../../Header';
import StatusBar from '../../Assets/StatusBar';
import LevelStore from '../../Componenet/ReactString';
import BaseUrl from '../../Util/ApiCollection';
import CommanStyle from '../../Util/Header';
import Constants from '../../Util/Config/Constants';
import Api from '../../Util/Api';
//import Constants from '../../Util/ApiCollection';
var folio_number = [];
export default class ViewNoticeBoardScreen extends React.Component {
    static navigationOptions = { header: null };
    constructor(props, ctx) {
        super(props, ctx);
        this.state = {
            Schemefoliolist: [],
            selectedFruits: [],
            CommentList:[],
            arn_no: [],
            urlvalue: '',
            ResponseCode: '',
            Comment: '',
            FIRST_NAME: '',
            CommentList:[],
            AccessToken:'',
            USER_ID:'',
            spinner:true
        }
        // this.loaddata();
    }

    componentDidMount() {
        AsyncStorage.getItem(Constants.access_token)
            .then(access_token => {
                AsyncStorage.getItem(Constants.user_id)
                    .then(USER_ID => {
                        AsyncStorage.getItem(Constants.responseCode)
                            .then(ResponseCode => {
                                AsyncStorage.getItem(Constants.firstname)
                                    .then(FIRST_NAME => {
                                        this.setState({
                                            AccessToken: access_token,
                                            USER_ID: USER_ID,
                                            ResponseCode: ResponseCode,
                                            FIRST_NAME: FIRST_NAME,
                                        });

                                        this.getNoticeList();
                                    })
                            })
                    })
            })

    }
getNoticeList() {
        this.setState({ spinner: true })
        Axios.get("http://Devapi.tatadisasterresponse.com/api/view-notice-board?response_code=" + this.state.ResponseCode, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit jain aa hghghh' + response.data);
            console.log('rohit jain aa' + response.data.status);
            if (response.data.status == 'true') {
                console.log('rohit jain aaxadhghghghghh' + JSON.stringify(response.data.response));
                this.setState({
                    ViewNoticeboard: response.data.response,
                    spinner: false,
                })

            } else {
                this.setState({
                    spinner: false
                })
            }
        })
    }

    getback = () => {
        this.props.navigation.navigate('DashboardScreen');
    }
    AddNoticeData(value) {
        this.props.navigation.navigate('AddNoticeScreen', {
            DataType: value,
        });
    }
    DeleteNotice(item) {
        this.setState({ spinner: true })
        const data = JSON.stringify({
            NOTICE_SYS_ID: item.NOTICE_SYS_ID,
            MODIFIED_BY: this.state.userId,
        });
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'bearer ' + this.state.AccessToken
        };
        Axios.post(BaseUrl.DeleteNoticeBoard,
            data,
            { headers }
        ).then(p => {
            console.log('riohrigh' + JSON.stringify(p.data))
            if (p.data.status == 'true') {
                Toast.show(p.data.response);
                this.getNoticeList();
                //this.props.navigation.navigate('Dashboard');
                this.setState({
                    spinner: false,
                });

            } else {
                Toast.show(p.data.response);
                 this.getNoticeList();
                this.setState({
                    spinner: false,
                });
            }

        }).catch()

    }

    getUpdate(Value) {
        this.props.navigation.navigate('AddNoticeScreen', {
            DataDetails: Value,
            DataType: 'Update',
        });
    }
    Comment(Value) {
        this.props.navigation.navigate('AddNoticeScreen', {
            DataDetails: Value,
            DataType: 'Comment',
        });
    }
    AddComment(item) {
        this.setState({ spinner: true })
        //  [{"NOTICE_SYS_ID":"1","DESCRIPTION":"hjsdfh","CREATED_BY":1}]
        const data = JSON.stringify({
            NOTICE_SYS_ID: item.NOTICE_SYS_ID,
            DESCRIPTION: this.state.Comment,
            CREATED_BY: this.state.USER_ID,
        });
        const headers = {
            'content-type': 'application/json',
            'Authorization': 'bearer ' + this.state.AccessToken
        };
        console.log('kapil ksnk' + data)
        Axios.post(BaseUrl.AddNoticeComment,
            data,
            { headers }
        ).then(p => {
            console.log('riohrigh' + JSON.stringify(p.data))
            if (p.data.status == 'true') {
                Toast.show(p.data.response);
                this.getNoticeList();
                //this.getcommentlist(item);

                //this.props.navigation.navigate('Dashboard');
                this.setState({
                    spinner: false,
                    Comment:''
                });

            } else {
                Toast.show(p.data.response);
                this.setState({
                    spinner: false,
                });
            }

        }).catch()



    }
//  Renderlist = (itemValue) => {
//       this.state.ViewNoticeboard.map((item,i) => {
//          if(item.NOTICE_SYS_ID == itemValue.NOTICE_SYS_ID){
       
    
      
//  }else{
//      this.setState({
//                     CommentList: '',
//                     spinner: false,
//                 })
//  }
//     })

   
// }
    getcommentlist(itemValue){ 
       this.state.ViewNoticeboard.map((item,i) => {
         if(item.NOTICE_SYS_ID == itemValue.NOTICE_SYS_ID){
      this.setState({ spinner: true })
        Axios.get(BaseUrl.getNoticCommentView +item.NOTICE_SYS_ID, {
            headers: {
                'Authorization': 'bearer ' + this.state.AccessToken
            }
        }).then((response) => {
            console.log('rohit' + response.data);
            console.log('rohit jain aa' + response.data.status);
            if (response.data.status == 'true') {
                console.log('rohit jain aaxad jwkjhdjhd' + JSON.stringify(response.data.response));
                this.setState({
                    CommentList: response.data.response,
                    spinner: false,
                })

            } else {
                this.setState({
                    spinner: false
                })
            }
        
        })
      
 }else{
     this.setState({
                    CommentList: '',
                    spinner: false,
                })
 }
    })
       
}


    render() {
        return (
            <View style={CommanStyle.MainView}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={{ color: '#fff' }}
                />

                <StoreHeader title='Notice Screen' onPress={this.getback} />
                <View style={{ flex: 1, }}>
                    <FlatList
                        data={this.state.ViewNoticeboard}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View style={{ elevation: 10, margin: 10, padding: 10, backgroundColor: '#FAFAFA', borderRadius: 8, }}>
                                <View style={{ flexDirection: 'column',marginTop:10, justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                    <View style={{ flexDirection: 'row',}}>
                                    <View style={{alignItems:'center',justifyContent:'center',width:60,height:60,  fontSize: 24,borderRadius:100,borderWidth:2, borderColor:'#000'}}>
                                        <Text style={{ fontSize: 24,marginLeft:42,marginTop:22, width:60,height:60, color: '#000',alignItems:'center', fontWeight: 'bold'}}>{item.POSTED_BY.charAt(0).toUpperCase()}</Text>
</View>
<View style={{alignItems:'center',justifyContent:'center',width:'80%'}}>
<Text style={{ fontSize: 15, color: '#000', fontWeight: 'bold', width: '90%' }}>{item.POSTED_BY} </Text>
<Text style={{ fontSize: 14, color: '#000', width: '90%' }}>{item.DESCRIPTION}</Text>
</View>
                                    </View>
                                   
                       
                                    <View style={{ flexDirection: 'row', marginTop: 10, width: '98%',alignItems: 'center', }}>
                                        <View style={{justifyContent:'flex-start',flexDirection:'row',width:'49%'}}>
<Text style={{ fontSize: 12, color: '#000', fontWeight: '200',marginRight:10}}>{item.CREATED_DATE} </Text>
 <TouchableOpacity
                                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                onPress={() => this.getcommentlist(item)}>
<Text style={{ fontSize: 12, color: '#000', }}>{item.COMMENT_COUNT} comment</Text>
</TouchableOpacity>
</View>
 <View style={{ flexDirection: 'row', marginTop: 10, width: '49%',alignItems: 'center',justifyContent:'flex-end' }}>
                                       
                                        <View style={{ padding: 2, }}>
                                            <TouchableOpacity
                                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                onPress={() => this.getUpdate(item)}>
                                                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                     <Image style={{ alignItems: 'center', width: 24, height: 24 }} resizeMode={'stretch'} source={require('../../images/edit.png')} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ padding: 2 }}>
                                            <TouchableOpacity
                                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                onPress={() => this.Comment(item)}>
                                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end',padding:4 }}>
                                                    <Image style={{ alignItems: 'center', width: 26, height: 26 }} resizeMode={'stretch'} source={require('../../images/comment.png')} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ padding: 2 }}>
                                            <TouchableOpacity
                                                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                onPress={() => this.DeleteNotice(item)}>
                                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end',padding:4 }}>
                                                    <Image style={{ alignItems: 'center', width: 20, height: 20 }} resizeMode={'stretch'} source={require('../../images/delete.png')} />
                                           </View>
                                            </TouchableOpacity>
                                        </View>

</View>
                                     
                                    </View>
                                </View>
                                <View style={{ width: '99%',flexDirection:'row',alignItems:'center' }}>
                                <View style={{width:'80%'}}>
                                                <TextInput
                                                    style={{ fontSize: 14, fontFamily: 'Gilroy-SemiBold' }}
                                                    placeholder={'Write Comment..'}

                                                    onChangeText={(Comment) => this.setState({ Comment: Comment })}
                                                    value={this.state.Comment}
                                                />
                                            </View>
                                            <View style={{ width: '20%' }}>
                                                <TouchableOpacity
                                                    hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                                                    onPress={() => this.AddComment(item)}>
                                                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                        <Text style={{ backgroundColor: '#3386FF', fontSize: 10, color: '#fff', justifyContent: 'center', padding: 8, alignItems: 'center', borderRadius: 8 }}>
                                                            Comment  </Text>
                                                    </View>

                                                </TouchableOpacity>

                                            </View>
                                            </View>
                                            
         <FlatList
                        data={this.state.CommentList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View style={{ elevation: 4, margin: 2, padding: 4, backgroundColor: '#FAFAFA', borderRadius: 8, }}>
                                <View style={{ flexDirection: 'column',marginTop:2, justifyContent: 'space-between', marginLeft: 6, marginRight: 8 }}>
                                    <View style={{ flexDirection: 'row',}}>
                                    <View style={{alignItems:'center',justifyContent:'center',width:50,height:50,  fontSize: 24,borderRadius:100,borderWidth:2, borderColor:'#000'}}>
                                        <Text style={{ fontSize: 18,marginLeft:36,marginTop:28, width:50,height:50, color: '#000',alignItems:'center', fontWeight: 'bold'}}>{item.POSTED_BY.charAt(0).toUpperCase()}</Text>
</View>
<View style={{alignItems:'center',justifyContent:'center',width:'80%'}}>
<Text style={{ fontSize: 14, color: '#000', fontWeight: 'bold', width: '90%' }}>{item.POSTED_BY} </Text>
<Text style={{ fontSize: 12, color: '#000', width: '90%' }}>{item.COMMENTS}</Text>
<Text style={{ fontSize: 12, color: '#000', width:'90%'}}>{item.CREATED_DATE} </Text>

</View>
                                    </View>
                                    </View>
                                    </View>
                        }>
                        </FlatList>
                        </View>

    
                        }>

                    </FlatList>
                </View>

                <View>
                    <TouchableOpacity
                        hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
                        onPress={() => this.AddNoticeData('Add')}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', marginEnd: 10, padding: 10 }}>
                            <Text style={{ backgroundColor: '#008800', fontSize: 14, color: '#fff', justifyContent: 'center', marginLeft: 40, padding: 10, alignItems: 'center', borderRadius: 10 }}>
                                Add
                       </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <StatusBar />
            </View >

        );
    }
}

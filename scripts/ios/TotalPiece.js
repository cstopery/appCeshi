import React, { Component } from 'react';
import{
    View,
    AppRegistry,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    ScrollView,
    AsyncStorage,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import Util from '../util/util';
import $codes_data from '../util/code';

export default class TotalPiece extends Component{
    static navigationOptions = ({ navigation }) => ({
        headerTitle:'派件汇总',
        headerRight:null,
    });

    constructor(props){
        super(props);
        this.state = {
            items:[
                // {code:'1',title:'现金',icon:'ios-stats',count:11,goicon:'ios-arrow-forward',cash:'5252'},
                // {code:'2',title:'上门刷卡',icon:'ios-card',count:18,goicon:'ios-arrow-forward',cash:'5252'},
            ],
        };
    }
    componentWillMount(){
        const { params } = this.props.navigation.state;
        var userId = params.userId;
        this.getTotalPiece(userId)
    }
    getTotalPiece(userId){
        console.log('用户'+userId);
        Util.fetch("mobile/homePage/disInfo", userId, (result) =>{
            if(result.code == "200" && result.data){
                for(var i=0;i<result.data.length;i++){
                    result.data[i].payment= $codes_data.t[result.data[i].payment];
                }
                this.setState({
                    items:result.data,
                })
            }
        })
    }



    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                <View>
                    {(()=>{
                        return this.state.items.map(item=>{
                            return(
                                <View style={styles.listTrBox} key={item.payment}>
                                    <TouchableHighlight>
                                        <View style={styles.listTrBoxView}>
                                            <View style={{flex:2,alignItems:'center'}}><Ionicons style={{marginTop:12}} name='ios-done-all' size={24} color="#979595" /></View>
                                            {/*<View style={{flex:2,alignItems:'center'}}><Ionicons style={{marginTop:12}} name={item.icon} size={24} color="#979595" /></View>*/}
                                            <View style={{flex:10,justifyContent: 'center',height:45}}><Text style={{fontSize:16}}>{item.payment}</Text></View>
                                            <View style={{flex:4,justifyContent: 'center',height:45}}><Text style={styles.listTrBoxViewRight}>{item.total}件</Text></View>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            )
                        })
                    })()}
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    logoBox:{
        width:130,
        height:130,
        borderRadius:65,
        borderWidth:5,
        borderColor:'#108ee9',
        alignItems:'center',
        justifyContent:'center'
    },
    mineTop:{
        paddingTop:20,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
    },
    listTrBox:{
        backgroundColor:'#fff',
        paddingLeft:10,
        paddingRight:10
    },
    listTrBoxView:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#ddd',
        justifyContent: 'center',
    },
    listTrBoxViewRight:{
        textAlign:'right',
        color:'#838586'
    },
});
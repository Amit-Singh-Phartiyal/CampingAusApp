import React from "react";
import { connect } from "react-redux";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
} from "react-native";
import * as AppAction from "../../actions";
import { emailReg } from '../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RF from "react-native-responsive-fontsize"
import { scale, verticalScale, moderateScale, ScaledSheet } from 'react-native-size-matters';
import {  Form, Item, Input} from 'native-base';
import {back_arrow,underline,next_arrow,eye} from '../../assets/'

class EnterPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show:true,
            'password':'',
            'visible':false
        };
        this.welcome = this.welcome.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this)
        this.password = this.password.bind(this)
    }
   
    welcome() {
        this.props.pop(this.props.componentId);
    }
    
    forgotPassword(){
        this.props.pushTParticulatScreen(this.props.componentId,'ForgotPassword')
    }

    password(){
        let body = {
            'phone':this.props.phone,
            'password':this.state.password
        }
        if(this.state.password){
            this.props.passwordMatch(body)
        }
        else{
            this.setState({'visible':true})
        }
    }
    render() {
        return (

            <KeyboardAwareScrollView contentContainerStyle={styles.container}>

                <View style={{ flex: 0.05 }} />
                <View style={{ flex: 0.05, flexDirection: "row" }}>
                    <View style={{ flex: 0.02 }} />
                    <TouchableOpacity style={{ flex: 0.2 }} onPress={() => this.welcome()}>
                        <Image source={back_arrow} style={{ flex: 1 }} resizeMode="contain" />
                    </TouchableOpacity>

                </View>

                <View style={{ flex: 0.05 }} />

                <View style={{ flex: 0.04, flexDirection: "row" }}>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 0.8 }}>
                        <Text style={{ fontSize: 18, fontWeight: '500', color: "#ffffff", fontFamily: "OpenSans" }}>Enter Password</Text>
                    </View>

                    <View style={{ flex: 0.1 }} />
                </View>
                <View style={{ flex: 0.05, flexDirection: "row" }}>
                    <View style={{ flex: 0.11 }} />
                    <Image source={underline} style={{ flex: 0.2 }} resizeMode="contain" />
                </View>
                <View style={{ flex: 0.05 }} />
                <View style={{ flex: 0.13, flexDirection: "row" }}>

                    <View style={{ flex: 0.05 }} />
                    <View style={{ flex: 0.85 }}>
                        <Form>
                            <Item underline={false} style={{ borderBottomColor: "#3C5275",backgroundColor:"#3C5275" }}>
                                <Input placeholder="Password" secureTextEntry={this.state.show} placeholderTextColor="#687C9E" style={{ backgroundColor: "#3C5275", height: 60, borderBottomColor: "#3C5275", borderBottomWidth: 0, fontFamily: "OpenSans-SemiBold",paddingLeft:RF(5),color:"#FFFFFF" }} onChangeText={(password)=>this.setState({'password':password})}/>
                                <TouchableOpacity onPress={()=>this.setState({'show':false})}>
                                <Image source={eye} style={{alignSelf:"center",backgroundColor:"#3C5275",marginRight:RF(2)}}/>
                                </TouchableOpacity>
                            </Item>
                            {this.state.visible?<Text style={{fontSize:14,fontFamily: "OpenSans-SemiBold",color:"#ff3333",marginLeft:RF(2)}}>Please Enter Password</Text>:null}
                        </Form>
                    </View>

                </View>

                <View style={{ flex: 0.1, flexDirection: "row" }}>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 0.8, flexDirection: "column" }}>
                        <Text style={{ alignSelf: "center", alignItems: "center", fontSize: 14, fontWeight: '600', color: "#5580A0", fontFamily: "OpenSans-SemiBold" }}>Please enter your password.</Text>

                    </View>
                    <View style={{ flex: 0.1 }} />
                </View>

                <View style={{ flex: 0.06, flexDirection: "row" }}>
                    <View style={{ flex: 0.2 }} />
                    <TouchableOpacity style={{ flex: 0.6, backgroundColor: "#293954", justifyContent: "center", alignItems: "center" }} onPress={()=>this.forgotPassword()}>
                        <Text style={{ alignSelf: "center", fontWeight: '600', fontSize: 16, color: "#FFA654", fontFamily: "OpenSans-SemiBold" }}>Forgot Password</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 0.2 }} />
                </View>
                <View style={{ flex: 0.05 }} />
                <View style={{ flex: 0.12, flexDirection: "row" }}>
                    <View style={{ flex: 0.8 }}>
                    </View>

                    {this.props.loading?<View style={{flex:0.2,justifyContent:"center",alignItems:"center"}}><ActivityIndicator/></View>:<TouchableOpacity style={{ flex: 0.1 }} onPress={()=>this.password()}>
                        <Image source={next_arrow} style={{ flex: 0.7,alignSelf:"center" }} resizeMode="contain" />
                    </TouchableOpacity>}
                </View>

               

            </KeyboardAwareScrollView>

        );
    }
}

const mapStateToProps = ({  user,login }) => {
         return {
              "loading":login.Profileloading,
              "phone": user.userData?user.userData.data.phone:''
         }
        };
const mapDispatchToProps = dispatch => ({
    passwordMatch: (data)   => dispatch(passwordMatch(data)),
    pop: (componentId)      =>  dispatch(AppAction.pop(componentId)),
    pushTParticulatScreen: (componentId, name) =>  dispatch(AppAction.pushTParticulatScreen(componentId, name)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnterPassword);

const styles = ScaledSheet.create({
    input: {
        width: scale(300),
        fontSize: RF(2.5),
        fontWeight: "500",
        height: '65@ms',
        backgroundColor: "#42A5F5",
        margin: 10,
        color: "white",
        padding: 8,
        borderRadius: moderateScale(30)
    },
    errorTexts: {
        margin: moderateScale(1),
        padding: moderateScale(10),
        fontSize: RF(1.5),
        color: '#ec4011'
    },
    resendLink: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        height: verticalScale(40),
        width: scale(120),
        borderRadius: moderateScale(30)
    },
    container: {
        flex: 1,
        backgroundColor: "#32435F"
    },
    resentText: {
        fontSize: RF(2),
        textAlign: "center",
        fontWeight: "bold",
        color: "#5cc174"
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

import React, { Component } from "react";
import { View, Text, Modal, ActivityIndicator, Image } from "react-native";
import Styles from "./style";
const defaultText = "数据加载中，请稍后...";

export let RNLoading = null ;

export class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      text: props.text || defaultText
    };
  }
  
  componentDidMount() {
    RNLoading =  this ;
  }

  /**
   * @param config modal 框配置参数
   * @param time 自动关闭时间 为0 则不自动关闭
   */
  show = (text = defaultText) => {
    this.setState({ text, visible: true });
  };
  /**
   * 隐藏loading框
   * @param config
   */
  hide = (config = {},immediatelyClose) => {
    if(immediatelyClose){
      this.setState({ ...config, visible: false });
    }else{
      setTimeout(()=>{ // ios要延迟操作才能关闭loading框
        this.setState({ ...config, visible: false });
      },700)
    }
  };
  render() {
    let { loadingProps={  },modalProps={} } = this.props;
    return (
      <Modal
        transparent={true}
        onRequestClose={this.hide}
        visible={this.state.visible}
        {...modalProps}
      >
        <View style={Styles.loadingContainerStyle}>
          <View style={Styles.loadingContentStyle}>
            {
              loadingProps.renderLoading?loadingProps.renderLoading():(
                  <ActivityIndicator size={"small"} style={Styles.loadingIndicatorStyle} { ...loadingProps } />
              )
            }
            <Text style={Styles.loadingTextStyle}>
              {this.state.text}
            </Text>
          </View>
        </View>
      </Modal>
    );
  }
}
export default Loading ;

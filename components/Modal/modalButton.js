import { Modal, Button } from 'antd/lib/index';
import React from "react"


//父组件需要传入OK方法用于处理点击确认后的处理事件,show对象用于展示对话框内容
class ModalButton extends React.Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.props.Ok()
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Open Modal
                </Button>
                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>{this.props.show}</p>
                </Modal>
            </div>
        );
    }
}
export default ModalButton;
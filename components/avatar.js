import { Upload, Icon, message } from 'antd';
import Crop from "./Cropper"
import React from "react"


function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

//handleChange中传入修改父组件图片的函数
class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showCrop:false,
            imageUrl:'',
        };
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.setState({imageUrl:info.file.originFileObj},()=>{
                this.setState({showCrop:true})}
            )
        }};

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <>
                {this.state.showCrop
                    ?<Crop uploadedImageFile={imageUrl}
                           submitImg={v=>{this.setState({imageUrl:v});this.props.setImg(v)}}
                           closeComponent={()=>this.setState({showCrop:false})}
                           style={{position:'fixed'}}/>
                    :null}
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width:200,height:110 }} /> : uploadButton}
                </Upload>
            </>
        );
    }
}
export default Avatar;
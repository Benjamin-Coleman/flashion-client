// currently not in use. kept in case of switch to AWS S3 for image storage

import React from 'react'
import { connect } from 'react-redux'
import { setImageToUpload } from '../actions/image'
import ReactS3Uploader from 'react-s3-uploader'


class ImageUploaderTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {fileData: '',
                imagePreviewUrl: '',
                fileReader: null};
  }


  setImage() {

   let myHeaders = new Headers()
   myHeaders.append('Content-Type', 'application/json')
   myHeaders.append('Accept', 'application/json')


   let myBody =
   {"image": {
                 "image_file_name": this.state.fileData.name,
                 "image_content_type": this.state.fileData.type,
                 "image_file_size": this.state.fileData.size
               },
    "file_data": this.state.fileReader.result
   }

   this.props.setImageToUpload(myHeaders, myBody)

 }

  _handleImageChange(e) {
   e.preventDefault();
   let reader = new FileReader();
   let file = e.target.files[0];

   reader.onloadend = () => {
     this.setState({
       fileData: file,
       imagePreviewUrl: reader.result,
       fileReader: reader,
       product_id: 1
     }, this.setImage);
   }

   reader.readAsDataURL(file)
 }


 render() {
   let {imagePreviewUrl} = this.state;
   let $imagePreview = null;
   if (imagePreviewUrl) {
     $imagePreview = (<img width="200px" height="auto" src={imagePreviewUrl} alt='uploaded preview' />);
   } else {
     $imagePreview = (<div className="previewText"></div>);
   }
   console.log(this.state)
   return (
     <div className="previewComponent">
         <input className="fileInput"
           type="file"
           onChange={(e)=>this._handleImageChange(e)} />

       <div className="imgPreview">
         {$imagePreview}
       </div>


     </div>

   )


 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImageToUpload: (headers, body) => {
      dispatch(setImageToUpload(headers, body))
    }
  }
}

export default connect(null, mapDispatchToProps)(ImageUploaderTest)

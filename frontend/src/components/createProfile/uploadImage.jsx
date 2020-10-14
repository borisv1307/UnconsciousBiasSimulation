import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

 
class uploadImage extends Component {
    state={
        profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
      }
    

      imageHandler = (e) => {
        const preview = document.querySelector('img');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
        var fileImageTypes = ["image/png", "image/jpeg"];
        
        reader.addEventListener("load", function() {
            preview.src = reader.result;
        }, false);
 
        if(file){
            if(fileImageTypes.includes(file.type)){
                reader.readAsDataURL(file);
                console.log(file.type)
            }
            else{
                console.log("Invalid file type uploaded")
            }
        }
    }

    render() {
        const { profileImg} = this.state
            return (
                <div className="page">
                    <div className="container">
                        <h2 className="heading">Add your Image</h2>
                        <div className="img-holder">
                            <img src={profileImg} width="200" alt="" id="profileImage" className="img" />
                        </div>
                        <input type="file" accept="image/*" name="image-upload" id="UploadImageInput" onChange={this.imageHandler} />
                        <div className="label">
              </div>
                    </div>
                </div>
            );
        }
    }
    
    export default uploadImage;
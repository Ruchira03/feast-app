import React from "react";
import axios from "axios";
import { isauth } from "../core/authcheck";
import { Redirect } from "react-router-dom";
import logo from "../images/logo.jpg";

export class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imagePreviewUrl: "",
      doredirection: false,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  redirection() {
    if (this.state.doredirection) {
      if (isauth()) {
        return <Redirect to="/ownerhomepage" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    return;
  }

  onFormSubmit(e) {
    e.preventDefault();
    const val = localStorage.getItem("jwt");
    const formData = new FormData();
    formData.append("image", this.state.file);
    const config = {
      headers: {
        "x-access-token": val,
        "content-type": "multipart/form-data",
      },
    };
    axios
      .put("http://localhost:8000/api/addrestaurantimage", formData, config)
      .then((response) => {
        console.log(response);
        alert(response.data);
        this.setState({
          doredirection: true,
        });
      })
      .catch((error) => {});
  }
  onChange(e) {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <img src={imagePreviewUrl} alt="" />;
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "1000px",
          height: "1000px",
          padding: "0",
          margin: "0",
        }}
      >
        <div>
          <form onSubmit={this.onFormSubmit}>
            <h1>ADD RESTAURANT'S PHOTO </h1>
            <br></br>
            <br></br>
            <br></br>
            <input type="file" onChange={this.onChange} />
            <button type="submit">Upload</button>
          </form>
          {$imagePreview}
          {this.redirection()}
        </div>

        <div
          style={{
            width: "10000px",
            height: "10000px",
          }}
        >
          <img src={logo} alt="" />
        </div>
      </div>
    );
  }
}

//export default ImageUpload;

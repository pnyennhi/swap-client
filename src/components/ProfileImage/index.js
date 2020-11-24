import React from "react";
import { CameraOutlined } from "@ant-design/icons";

const ProfileImage = ({
  coverImage,
  avatarImage,
  isLoading,
  editable,
  onChange,
}) => {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-12 position-relative">
        <img src={coverImage} className="cover-image user" alt={coverImage} />
        {editable && (
          <>
            {isLoading.coverImage && <div className="layer-upload-image"></div>}

            <label htmlFor="coverImage" className="label-upload-cover">
              <CameraOutlined /> Upload picture
            </label>
            <input
              type="file"
              name="coverImage"
              id="coverImage"
              accept="image/*"
              onChange={(e) => onChange(e.target.name, e.target.files[0])}
              hidden
              className="upload-image-input"
            />
          </>
        )}
      </div>

      <div className="col-12">
        <div className="position-relative avatar-wrapper">
          <img
            src={avatarImage}
            className="preview-image user"
            alt={avatarImage}
          />
          {editable && (
            <>
              {isLoading.avatarImage && (
                <div className="layer-upload-image"></div>
              )}
              <label htmlFor="avatarImage" className="label-upload-avatar">
                <CameraOutlined style={{ fontSize: "22px", color: "#fff" }} />
              </label>
              <input
                type="file"
                name="avatarImage"
                id="avatarImage"
                accept="image/*"
                onChange={(e) => onChange(e.target.name, e.target.files[0])}
                hidden
                className="upload-image-input"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileImage;

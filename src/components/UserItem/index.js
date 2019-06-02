/* eslint-disable camelcase */
import React from 'react';

const Comp = ({ profile_pic_url, username, full_name }) => {
  return (
    <div className="user">
      <div className="photo" style={{ backgroundImage: `url(${profile_pic_url})` }} />
      <div className="content">
        <div className="title">{username}</div>
        <div className="subtitle">{full_name}</div>
      </div>
      <style jsx>
        {`
          .user {
            height: 60px;
          }

          .photo {
            float: left;
            width: 44px;
            height: 44px;
            background-size: cover;
            background-position: 50%;
            border-radius: 44px;
          }

          .content {
            float: left;
            padding-left: 24px;
          }

          .subtitle {
            color: #999;
            font-weight: 300;
            line-height: 22px;
          }
        `}
      </style>
    </div>
  );
};

export default Comp;

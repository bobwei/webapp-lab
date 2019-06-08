/* eslint-disable camelcase */
import React from 'react';
import { Button } from 'reactstrap';

const Comp = ({ profile_pic_url, username, full_name, withCheckButton }) => {
  return (
    <div className="user">
      <div className="photo" style={{ backgroundImage: `url(${profile_pic_url})` }} />
      <div className="content">
        {withCheckButton && (
          <div className="btn-wrapper">
            <Button color="primary" size="sm">
              Check
            </Button>
          </div>
        )}
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
            overflow: visible;
            margin: 0;
            padding-left: 55px;
          }

          .subtitle {
            color: #999;
            font-weight: 300;
            line-height: 22px;
          }

          .btn-wrapper {
            float: right;
          }
        `}
      </style>
    </div>
  );
};

Comp.defaultProps = {
  withCheckButton: false,
};

export default Comp;

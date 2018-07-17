import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import * as FontAwesome from 'react-icons/lib/fa'
  function status(props) {
    return (
        <Icon >
            <FontAwesome.FaCircle {...props}/>
        </Icon>
       
    );
  }
  export default status;
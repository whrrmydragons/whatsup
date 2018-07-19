import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';
import * as FontAwesome from 'react-icons/lib/fa'
  function status(props) {
    return (
        <SvgIcon>
            <FontAwesome.FaCircle {...props}/>
        </SvgIcon>
       
    );
  }
  export default status;
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import SvgIcon from '@material-ui/core/SvgIcon';

const styles = theme => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    icon: {
      margin: theme.spacing.unit * 2,
    },
    iconHover: {
      margin: theme.spacing.unit * 2,
      '&:hover': {
        color: red[800],
      },
    },
  });



  function Circle(props) {
    return (
        <CheckCircle {...props}/>
    );
  }



function SvgIcons(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <Circle className={classes.icon} />
        <Circle className={classes.icon} color="primary" />
        <Circle className={classes.icon} color="secondary" />
        <Circle className={classes.icon} color="action" />
        <Circle className={classes.iconHover} color="error" style={{ fontSize: 30 }} />
        <Circle color="disabled" className={classes.icon} style={{ fontSize: 36 }} />
        <Circle
          className={classes.icon}
          color="primary"
          style={{ fontSize: 36 }}
          component={svgProps => (
            <svg {...svgProps}>
              <defs>
                <linearGradient id="gradient1">
                  <stop offset="30%" stopColor={blue[400]} />
                  <stop offset="70%" stopColor={red[400]} />
                </linearGradient>
              </defs>
              {React.cloneElement(svgProps.children[0], { fill: 'url(#gradient1)' })}
            </svg>
          )}
        />
      </div>
    );
  }
  
  SvgIcons.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(SvgIcons);
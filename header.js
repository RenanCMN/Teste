import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import Sidelist from './sidelist'
import Logout from './logout'
import { isAuthenticated } from '../configs/auth';

const useStyle = {
  list: {
    width: 250,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 3,
  },
  title: {
    flexGrow: 1,
  },
  linklog: {
    textDecorationLine: 'none',
    color: '#fff'
  },
  linkloglist: {
    textDecoration: 'none',
    color: '#000'
  }

}

class Header extends Component {
  constructor(props) {
    super(props)
    var islog = false
    this.state = {
      left: false,
      open: null,
      isAuth: null
    }

    this.opennull = this.opennull.bind(this)
    this.opentrue = this.opentrue.bind(this)
  }
  
  opennull() {
    this.setState({ open: null })
  }

  opentrue() {
    this.setState({ open: true })
  }
  
  componentDidMount(){
     if(isAuthenticated()){
       this.setState({isAuth: true});
     }else{
       this.setState({isAuth: false});
     }
  }
  
  setAuth(){
    this.setState({isAuth: !this.state.isAuth})
  }
  
  render() {
    const { classes } = this.props;
    var {isAuth} = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.opentrue} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Drawer open={this.state.open ? true : false} onClose={this.opennull}  >
              <Sidelist opennull={this.opennull} />
            </Drawer>
            <Typography variant="h6" className={classes.title}>
              <Link to="/" className={classes.linklog}>Site.com </Link>
            </Typography>
            {
              isAuth != null ?
                <Link to='/login' className={classes.linklog} ><Button color="inherit" onPress={() => this.setAuth()}>{ isAuth ? 'Register':'Login'}</Button></Link>
                :
                null
            }           
          </Toolbar>
        </AppBar>
      </div>
    )

  }

}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(useStyle)(Header)



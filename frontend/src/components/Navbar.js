import { Component } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Map from './Map.js'
import App from './Map_fun.js'



class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.drawerWidth = 240;
    this.siteSections = ['Twitter', 'Trivia', 'Contest letterario', 'Stream'];
    this.sectionsUrl = ['/twitter', '/trivia', '/contest', '/stream'];
  }

  openDrawer() {
    this.setState({open: true});
  }

  closeDrawer() {
    this.setState({open: false});
  }

  navigateTo(section) {
    if (typeof(section) == 'number')
      window.location.href = this.sectionsUrl[section];
    else {
      for (var i in this.siteSections) {
        if (section == this.siteSections[i]) {
          window.location.href = this.sectionsUrl[i];
          break;
        }
      }
    }
  }

  

  render() {
    const DrawerHeader = styled('div')(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    }));


    return (
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" open={this.state.open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.openDrawer.bind(this)}
              edge="start"
              sx={{ mr: 2, ...(this.state.open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>

        {/*aggiunta solo per evitare che la pagina venga nascosta
          dalla navbar, le magie delle tecnologie webs*/}
        <Toolbar />

        <Drawer
          sx={{
            width: this.drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: this.drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={this.state.open}
        >
          <DrawerHeader>
            <IconButton
              onClick={this.closeDrawer.bind(this)}
              sx={{

              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {this.siteSections.map((text, index) => (
              <ListItem button key={text} onClick={() => this.navigateTo(index).bind(this)}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>

        </Drawer>

          
        
      </Box>

               
      
    );
  }
}


export default Navbar;

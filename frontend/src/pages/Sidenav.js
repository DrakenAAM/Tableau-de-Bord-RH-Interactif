import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BadgeIcon from '@mui/icons-material/Badge';
import Dashboard from './Dashboard';
import Employes from './Employes';
import Embauches from './Embauches';
import Debauches from './Debauches';
import PageImport from './PageImport';
import Historique from './Historique'
import logo from '../icons/orange.png';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HistoryIcon from '@mui/icons-material/History';
import { Avatar, MenuItem, Menu, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
//import { Link} from 'react-router-dom';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Sidenav() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [menudata, setMenuData] = useState("Dashboard");
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(null)

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) =>{
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setLogoutDialogOpen(false);
  };

  const confirmLogout = () => {
    setLogoutDialogOpen(false);
    window.location.href = '/';
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ backgroundColor: "rgb(0,0,0)", color:"rgb(255,121,0)"}}>
      <Toolbar>
  <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={() => setOpen(!open)}
    edge="start"
  >
    <MenuIcon />
  </IconButton>
  <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1 }}>
    <img src={logo} alt="logo" style={{ width: '24px', height: '24px' }} /> Tableau de Bord RH
  </Typography>
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <IconButton color="inherit" aria-label="profile" onClick={handleProfileMenuOpen}>
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
    </IconButton>
  </Box>
  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
    <MenuItem onClick={handleProfileMenuClose}>Profil</MenuItem>
    <MenuItem onClick={handleLogoutClick}>
      <ExitToAppIcon sx={{ mr: 1 }} /> Déconnexion
    </MenuItem>
  </Menu>
</Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} sx={{ "& .MuiDrawer-paper": {backgroundColor: "rgb(89,89,89)", color:"rgb(255,121,0)"},}}>
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Divider />
        <List >
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={[
            { minHeight: 48, px: 2.5 },
            open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
            menudata === "Dashboard" ? { backgroundColor: "rgb(143,143,143)", color: "rgb(255,121,0)", fontWeight: 'bold' } : null,
            ]}
            onClick={() => setMenuData("Dashboard")}
          >
            <ListItemIcon
              sx={[
              { minWidth: 0, justifyContent: 'center' },
              open ? { mr: 3 } : { mr: 'auto' },
              menudata === "Dashboard" ? { color: "rgb(255,121,0)" } : null,
              ]}
            >
              <DashboardIcon sx={{ color:"rgb(255,121,0)"}}/>
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              sx={[open ? { opacity: 1, fontWeight: 'bold' } : { opacity: 0, fontWeight: 'bold' }]}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={[
            { minHeight: 48, px: 2.5 },
            open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
            menudata === "Employes" ? { backgroundColor: "rgb(143,143,143)", color: "rgb(255,121,0)", fontWeight: 'bold' } : null,
            ]}
            onClick={() => setMenuData("Employes")}
          >
            <ListItemIcon
              sx={[
              { minWidth: 0, justifyContent: 'center' },
              open ? { mr: 3 } : { mr: 'auto' },
              menudata === "Employes" ? { color: "rgb(255,121,0)" } : null,
              ]}
            >
              <PersonIcon sx={{ color:"rgb(255,121,0)"}}/>
            </ListItemIcon>
            <ListItemText
              primary="Employés"
              sx={[open ? { opacity: 1, fontWeight: 'bold' } : { opacity: 0, fontWeight: 'bold' }]}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={[
            { minHeight: 48, px: 2.5 },
            open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
            menudata === "Embauches" ? { backgroundColor: "rgb(143,143,143)", color: "rgb(255,121,0)", fontWeight: 'bold' } : null,
            ]}
            onClick={() => setMenuData("Embauches")}
          >
            <ListItemIcon
              sx={[
              { minWidth: 0, justifyContent: 'center' },
              open ? { mr: 3 } : { mr: 'auto' },
              menudata === "Embauches" ? { color: "rgb(255,121,0)" } : null,
              ]}
            >
              <BadgeIcon sx={{ color:"rgb(255,121,0)"}}/>
            </ListItemIcon>
            <ListItemText
              primary="Embauches"
              sx={[open ? { opacity: 1, fontWeight: 'bold' } : { opacity: 0, fontWeight: 'bold' }]}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={[
            { minHeight: 48, px: 2.5 },
            open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
            menudata === "Debauches" ? { backgroundColor: "rgb(143,143,143)", color: "rgb(255,121,0)", fontWeight: 'bold' } : null,
            ]}
            onClick={() => setMenuData("Debauches")}
          >
            <ListItemIcon
              sx={[
              { minWidth: 0, justifyContent: 'center' },
              open ? { mr: 3 } : { mr: 'auto' },
              menudata === "Debauches" ? { color: "rgb(255,121,0)" } : null,
              ]}
            >
              <ExitToAppIcon sx={{ color:"rgb(255,121,0)"}}/>
            </ListItemIcon>
            <ListItemText
              primary="Debauches"
              sx={[open ? { opacity: 1, fontWeight: 'bold' } : { opacity: 0, fontWeight: 'bold' }]}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={[
            { minHeight: 48, px: 2.5 },
            open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
            menudata === "PageImport" ? { backgroundColor: "rgb(143,143,143)", color: "rgb(255,121,0)", fontWeight: 'bold' } : null,
            ]}
            onClick={() => setMenuData("PageImport")}
          >
            <ListItemIcon
              sx={[
              { minWidth: 0, justifyContent: 'center' },
              open ? { mr: 3 } : { mr: 'auto' },
              menudata === "PageImport" ? { color: "rgb(255,121,0)" } : null,
              ]}
            >
              <CloudUploadIcon sx={{ color:"rgb(255,121,0)"}}/>
            </ListItemIcon>
            <ListItemText
              primary="Importées les données"
              sx={[open ? { opacity: 1, fontWeight: 'bold' } : { opacity: 0, fontWeight: 'bold' }]}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            sx={[
            { minHeight: 48, px: 2.5 },
            open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
            menudata === "Historique" ? { backgroundColor: "rgb(143,143,143)", color: "rgb(255,121,0)", fontWeight: 'bold' } : null,
            ]}
            onClick={() => setMenuData("Historique")}
          >
            <ListItemIcon
              sx={[
              { minWidth: 0, justifyContent: 'center' },
              open ? { mr: 3 } : { mr: 'auto' },
              menudata === "Historique" ? { color: "rgb(255,121,0)" } : null,
              ]}
            >
              <HistoryIcon sx={{ color:"rgb(255,121,0)"}}/>
            </ListItemIcon>
            <ListItemText
              primary="Historiques"
              sx={[open ? { opacity: 1, fontWeight: 'bold' } : { opacity: 0, fontWeight: 'bold' }]}
            />
          </ListItemButton>
        </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            {menudata === "Dashboard" && <Dashboard />}
            {menudata === "Employes" && <Employes />}
            {menudata === "Embauches" && <Embauches/>}
            {menudata === "Debauches" && <Debauches/>}
            {menudata === "PageImport" && <PageImport/>}
            {menudata === "Historique" && <Historique/>}
      </Box>
      <Dialog
        open={logoutDialogOpen}
        onClose={closeLogoutDialog}
        aria-labelledby='logout-dialog-title'
        arial-describedly='logout-dialog-description'
        >
          <DialogTitle id= 'logout-dialog-title'>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez vous deconnecter
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeLogoutDialog} color='primary'>
                Annuler
            </Button>
            <Button onClick={confirmLogout} color='error' autoFocus>
                Deconnexion
            </Button>
          </DialogActions>
      </Dialog>
    </Box>
    </>
  );
}


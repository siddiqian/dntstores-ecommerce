import React from 'react';
// import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
// import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaLink } from 'react-icons/fa';
// import sidebarBg from './assets/bg1.jpg';

const SideBarMenu = ({ image, collapsed, rtl, toggled, handleToggleSidebar, showComp, setShowComp }) => {
  const sidebarBg=null
  // const intl = useIntl();
  return (
    <ProSidebar
      image={image ? sidebarBg : false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          className="d-flex justify-content-center mr-2"
        >
          Side Menu
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            onClick={_=>setShowComp({
              ...showComp, customer: {profile: true}
            })}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={_=>setShowComp({
              ...showComp, customer: {orders: true}
            })}
          >
            Orders
          </MenuItem>
         </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            {/* <FaGithub /> */}
            <span>viewSource</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SideBarMenu;

import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import SideBarMenuCustomer from "../components/main components/SideBarMenuCustomer";
import SideBarMenuAdmin from '../components/main components/SideBarMenuAdmin'
import '../styles/App.scss'
import Profile from '../components/secondary components/account components/Profile';
import OrdersCustomers from '../components/secondary components/account components/OrdersCustomers';
import OrdersAdmin from '../components/secondary components/account components/OrdersAdmin';
import AddNewProduct from '../components/secondary components/account components/AddNewProduct';
import ViewProducts from '../components/secondary components/account components/ViewProducts';




function AccountScreen(props) {

    const user = useSelector(state => state.user)

    const { login: { verifying, verifiedUser, error } }  = user;

    console.log(verifiedUser)

    console.log('profile')

    const [showComp, setShowComp] = useState({
      admin: {
        profile: true,
        orders: false,
        products: {
          addNewProduct: false,
          viewProducts: false
        }
      },
      customer: {
        profile: true,
        orders: false
      }
    })

      const [rtl, setRtl] = useState(false);
      const [collapsed, setCollapsed] = useState(false);
      const [image, setImage] = useState(true);
      const [toggled, setToggled] = useState(false);
      const [showSecondTab, setShowSecondTab] = useState(false)

      useEffect(() => {
        setToggled(false)
        return () => {
          // cleanup
        }
      }, [showComp])
    
      const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
      };
    
      const handleRtlChange = (checked) => {
        setRtl(checked);
      };
      const handleImageChange = (checked) => {
        setImage(checked);
      };
    
      const handleToggleSidebar = (value) => {
        setToggled(value);
      };
    
      return (
        <div className={`app custom-app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
          {
            verifiedUser && verifiedUser.isAdmin
            ?
            <>
              <SideBarMenuAdmin
                image={image}
                collapsed={collapsed}
                rtl={rtl}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                showComp={showComp}
                setShowComp={setShowComp}                              
              />
              {
                showComp.admin.profile
                &&
                <Profile handleToggleSidebar={handleToggleSidebar} />
              }
              {
                showComp.admin.orders
                &&
                <OrdersAdmin handleToggleSidebar={handleToggleSidebar} />
              }
              {
                showComp.admin.products.addNewProduct
                &&
                <AddNewProduct handleToggleSidebar={handleToggleSidebar} />
              }
              {
                showComp.admin.products.viewProducts
                &&
                <ViewProducts handleToggleSidebar={handleToggleSidebar} />
              }
            </>
            :
            <>
              <SideBarMenuCustomer 
                image={image}
                collapsed={collapsed}
                rtl={rtl}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
                showComp={showComp}
                setShowComp={setShowComp}
              />
              {    
                showComp.customer.profile && <Profile handleToggleSidebar={handleToggleSidebar} />
              }
              {
                showComp.customer.orders && <OrdersCustomers handleToggleSidebar={handleToggleSidebar} />
              }
            </>
            
          }
          
          
          {/* <main> */}
         
         
        

         {/* </main> */}
        </div> 
      );
    

    // return (
    //     <div className="profile-screen">
    //         <div className="profile-screen-container">
    //             {verifiedUser && verifiedUser.isAdmin
    //             ?
    //             <AdminAccount/>:
    //             <CustomerAccount/>
    //             }
    //         </div>
    //     </div>
    // )

      }
export default AccountScreen
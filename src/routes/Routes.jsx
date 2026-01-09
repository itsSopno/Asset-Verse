import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PlantDetails from '../pages/PlantDetails/PlantDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import AddPlant from '../pages/Dashboard/Seller/AddPlant'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyInventory from '../pages/Dashboard/Seller/MyInventory'
import ManageOrders from '../pages/Dashboard/Seller/ManageOrders'
import MyOrders from '../pages/Dashboard/Customer/MyOrders'
import { createBrowserRouter } from 'react-router'
import PaymentSuccess from '../pages/Payment/PaymentSuccess'
import SellerRequests from '../pages/Dashboard/Admin/SellerRequests'
import EmployeRoute from './EmployeRoute'
import AdminRoute from './AdminRoute'
import PlansPage from '../components/Plans/Plans'
import Plants from '../components/Home/Plants'
import JOINEmployee from '../components/FROM1/JOINEmployee'
import HRForm from '../components/FROM2/hr'
import AssetTable from '../components/Dashboard/TableRows/AssetTable'
import Plantsi from '../components/Plant/Plants'
import EmployeeDashboard from '../components/my employee/myEmploye'
import HRDashboardCharts from '../components/HRDashboardCharts/HRDashboardCharts'
import Myteam from '../components/MY TEAM/myteam'
import MyInventorysuper from '../components/MY TEAM/myteam'
import MyTeamInventoryHistory from '../components/MyTeamInventoryHistory/MyTeamInventoryHistory'
import MyTeam from '../components/MY TEan/MyTeam'
import AssetVerseLegal from '../components/AssetVerseLegal/AssetVerseLegal'
import TestimonialsStats from '../components/Testimonila/Testimonial'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/plant/:id',
        element: <PlantDetails />,
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />,
      },
      {
path: '/join',
element :<JOINEmployee></JOINEmployee>
      },
      {
        path: '/hr',
        element: <HRForm></HRForm>
      },
       {
        path: '/legal',
        element: <AssetVerseLegal></AssetVerseLegal>
      },
      {
        path:"/testimonial",
        element:<TestimonialsStats></TestimonialsStats>
      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
         <PrivateRoute><Plantsi></Plantsi></PrivateRoute>
        ),
      },
      {
        path:"Static",
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      { path:"assets-table",
         element:(<PrivateRoute>
            <AdminRoute><AssetTable /></AdminRoute></PrivateRoute>)},
      {
        path: 'add-asset',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddPlant />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
       {
        path: 'hr-charts',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <HRDashboardCharts></HRDashboardCharts>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
     
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
       {
        path: 'all-package',
        element: (
          <PrivateRoute>
            <AdminRoute>
          <PlansPage/>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'all-Requests',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SellerRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: (
          <PrivateRoute>
            <EmployeRoute>
              <ManageOrders />
            </EmployeRoute>
          </PrivateRoute>
        ),
      },
       {
        path: 'MY-inventory',
        element: (
          <PrivateRoute>
            <EmployeRoute>
              <MyInventorysuper></MyInventorysuper>
            </EmployeRoute>
          </PrivateRoute>
        ),
      },
        {
        path: 'MYTEAM',
        element: (
          <PrivateRoute>
            <EmployeRoute>
              <MyTeamInventoryHistory></MyTeamInventoryHistory>
            </EmployeRoute>
          </PrivateRoute>
        ),
      },
        {
        path: 'MY-TEAM',
        element: (
          <PrivateRoute>
            <EmployeRoute>
              <MyTeam></MyTeam>
            </EmployeRoute>
          </PrivateRoute>
        ),
      },
      {
        path : 'plants',
        element:(<PrivateRoute><AdminRoute><Plants></Plants></AdminRoute></PrivateRoute>)
      },
            {
        path : 'plantsi',
        element:(<PrivateRoute><Plantsi></Plantsi></PrivateRoute>)
      },
          {
        path : 'my-em',
        element:(<PrivateRoute><AdminRoute><EmployeeDashboard></EmployeeDashboard></AdminRoute></PrivateRoute>)
      },
    ],
  },
])

import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import AssetTable from '../Dashboard/TableRows/AssetTable';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { AuthContext } from '../../providers/AuthContext';

const Plants = () => {
  const {user} = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); // ✅ hook call করা হলো

  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetRes, empRes] = await Promise.all([
          axiosSecure.get('/plants'),
          axiosSecure.get('/employees'),
        ]);
        console.log('Assets:', assetRes.data);
        console.log('Employees:', empRes.data);

        setAssets(assetRes.data);
        setEmployees(empRes.data);
      } catch (err) {
        console.error('Fetch error:', err.response || err);
      } finally {
        setLoading(false);
      }
    };

    if(user?.email) fetchData();
  }, [user, axiosSecure]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4">All Assets</h1>
      <AssetTable
        assets={assets}
        employees={employees}
        hrEmail={user.email}
        companyName={user.companyName}
      />
    </div>
  );
};

export default Plants;

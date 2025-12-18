import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAffiliation from '../SpecialHooks/useAffiliation';

const AssignAssetModal = ({ asset, employees, hrEmail, companyName, onClose, onSuccess }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();
  const { checkAffiliation, createAffiliation } = useAffiliation();

  const handleAssign = async () => {
    if (!selectedEmployee) return alert('Select an employee');

    if (!asset.availableQuantity || asset.availableQuantity <= 0) {
      return alert('This asset is not available for assignment');
    }

    setLoading(true);
    try {
      // Check affiliation
      const affiliated = await checkAffiliation({ employeeEmail: selectedEmployee.email, hrEmail });

      if (!affiliated) {
        await createAffiliation({ employee: selectedEmployee, hrEmail, companyName });
      }

      // Assign asset
      await axiosSecure.post('/assign-asset', {
        assetId: asset._id,
        employeeEmail: selectedEmployee.email,
      });

      alert('Asset assigned successfully!');
      onSuccess();
      onClose();
    } catch (err) {
      console.error('Assign Error:', err);
      alert(err.response?.data?.message || 'Failed to assign asset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
        {/* Header */}
        <h3 className="text-2xl font-bold text-white mb-2">Assign Asset</h3>
        <p className="text-sm text-slate-300 mb-4">
          {asset.productName}{' '}
          <span className="font-semibold">({asset.availableQuantity} available)</span>
        </p>

        {/* Employee Select */}
        <select
          className="w-full p-3 rounded-xl bg-black text-white border border-white/20 focus:ring-2 focus:ring-indigo-400 outline-none mb-4"
          onChange={(e) =>
            setSelectedEmployee(employees.find(emp => emp.email === e.target.value))
          }
          value={selectedEmployee?.email || ''}
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.email} value={emp.email}>
              {emp.name} ({emp.email})
            </option>
          ))}
        </select>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded-xl text-white font-semibold 
              ${loading ? 'bg-indigo-500/40 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'} 
              transition`}
            onClick={handleAssign}
            disabled={loading}
          >
            {loading ? 'Assigning...' : 'Confirm Assign'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignAssetModal;

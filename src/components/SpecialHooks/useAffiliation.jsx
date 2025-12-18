
import useAxiosSecure from '../../hooks/useAxiosSecure';

const useAffiliation = () => {
  const axiosSecure = useAxiosSecure(); 

  const checkAffiliation = async ({ employeeEmail, hrEmail }) => {
    const res = await axiosSecure.get('/employee-affiliations/check', {
      params: { employeeEmail, hrEmail },
    });
    return res.data.affiliated;
  };

  const createAffiliation = async ({ employee, hrEmail, companyName }) => {
    const payload = {
      employeeEmail: employee.email,
      employeeName: employee.name,
      hrEmail,
      companyName,
    };
    return axiosSecure.post('/employee-affiliations', payload);
  };

  return { checkAffiliation, createAffiliation };
};

export default useAffiliation;

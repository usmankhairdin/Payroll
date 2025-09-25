import React, { useContext } from 'react';
import { AuthContext } from '../App';

interface ClickableEmployeeNameProps {
  employeeId: number;
  employeeName: string;
  className?: string;
  children?: React.ReactNode;
}

const ClickableEmployeeName: React.FC<ClickableEmployeeNameProps> = ({ 
  employeeId, 
  employeeName, 
  className = "", 
  children 
}) => {
  const { showEmployeeProfile } = useContext(AuthContext);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showEmployeeProfile(employeeId);
  };

  return (
    <button
      onClick={handleClick}
      className={`text-left hover:text-blue-600 hover:underline transition-colors duration-200 cursor-pointer ${className}`}
      title={`View ${employeeName}'s profile`}
    >
      {children || employeeName}
    </button>
  );
};

export default ClickableEmployeeName;

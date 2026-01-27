import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const Message = ({ variant = 'info', children }) => {
  const baseStyles = 'p-4 rounded-lg border flex items-start gap-3 mb-4';
  
  const variants = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    danger: 'bg-red-50 border-red-200 text-red-800',
  };

  const icons = {
    info: <FaInfoCircle className="mt-0.5 flex-shrink-0" />,
    success: <FaCheckCircle className="mt-0.5 flex-shrink-0" />,
    warning: <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />,
    danger: <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />,
  };

  return (
    <div className={`${baseStyles} ${variants[variant]}`}>
      {icons[variant]}
      <div>{children}</div>
    </div>
  );
};

export default Message;

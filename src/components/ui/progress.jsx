export const Progress = ({ value, className }) => {
    return (
      <div className={`w-full bg-gray-300 rounded-full ${className}`}>
        <div
          className="bg-[#2ECC71] h-full rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  };
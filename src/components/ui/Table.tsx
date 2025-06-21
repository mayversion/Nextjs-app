import React from 'react';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        {children}
      </table>
    </div>
  );
};

interface TableHeaderProps {
  children: React.ReactNode;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return (
    <thead className="bg-gray-50">
      <tr>{children}</tr>
    </thead>
  );
};

interface TableBodyProps {
  children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
};

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TableCell: React.FC<TableCellProps> = ({ 
  children, 
  className = '', 
  onClick 
}) => {
  return (
    <td 
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
        onClick ? 'cursor-pointer hover:bg-gray-50' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </td>
  );
}; 
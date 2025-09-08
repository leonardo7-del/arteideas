import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon, 
  description,
  currency = false 
}) => {
  const formatValue = (val) => {
    if (currency) {
      return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 0
      }).format(val);
    }
    return val?.toLocaleString();
  };

  const changeColor = changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  const changeBg = changeType === 'positive' ? 'bg-green-50' : 'bg-red-50';
  const TrendIcon = changeType === 'positive' ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
          </div>
        </div>
        {change && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${changeBg}`}>
            <TrendIcon className={`w-3 h-3 ${changeColor}`} />
            <span className={`text-xs font-medium ${changeColor}`}>
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </div>

      <div className="mb-2">
        <h3 className="text-2xl font-bold text-gray-900">
          {formatValue(value)}
        </h3>
      </div>

      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default StatsCard;
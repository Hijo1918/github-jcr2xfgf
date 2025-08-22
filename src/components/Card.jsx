import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, title }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Title always resolves */}
      {title ? (
        <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      ) : (
        <h2 className="text-xl font-semibold text-gray-500 mb-4">Untitled</h2>
      )}

      {/* Children always resolve */}
      <div className="text-gray-700">
        {children ?? <p>No content available.</p>}
      </div>
    </div>
  );
};

// Add runtime prop checking
Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Card;

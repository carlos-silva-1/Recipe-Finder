import React from 'react';

interface ErrorProps {
  error: string;
}

const ErrorComponent: React.FC<ErrorProps> = ({ error }: { error: string }) => {
	return(
		<div className="text-stone-800 flex flex-col items-center py-5" style={{ color: 'red' }}>
      <h1 className="text-4xl font-bold">
        {error}
      </h1>
    </div>
	)
}

export default ErrorComponent;

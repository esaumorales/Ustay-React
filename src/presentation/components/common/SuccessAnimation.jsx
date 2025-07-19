import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';

const SuccessAnimation = ({ message }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50">
            <div className="bg-green-500 rounded-full p-4 mb-4 animate-bounce">
                <AiOutlineCheckCircle className="text-white w-12 h-12" />
            </div>
            <p className="text-gray-600 text-lg">{message}</p>
        </div>
    );
};

SuccessAnimation.propTypes = {
    message: PropTypes.string.isRequired
};

export default SuccessAnimation;

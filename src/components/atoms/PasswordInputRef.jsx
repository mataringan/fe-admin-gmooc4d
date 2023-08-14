'use client';

//core
import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

//third party
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordInputRef = forwardRef(function PasswordInputRef(
    {
        id,
        placeholder = 'Your placeholder',
        className = 'bg-neutral-6  border-net-2 px-6 py-[17px] text-body-2 font-normal focus:border-primary-1 ',
        ...props
    },
    ref,
) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <div className='relative w-full'>
            <input
                {...props}
                ref={ref}
                id={id}
                placeholder={placeholder}
                type={showPassword ? 'text' : 'password'}
                className={`${className} font-poppins w-full appearance-none  border-2 outline-none`}
            />
            {showPassword ? (
                <FiEye
                    onClick={togglePassword}
                    className='absolute right-1 top-[50%] mr-3 h-5 w-5 translate-y-[-50%] cursor-pointer text-primary-1'
                />
            ) : (
                <FiEyeOff
                    onClick={togglePassword}
                    className='absolute right-1 top-[50%] mr-3 h-5 w-5 translate-y-[-50%] cursor-pointer text-neutral-3'
                />
            )}
        </div>
    );
});

PasswordInputRef.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
};

export default PasswordInputRef;

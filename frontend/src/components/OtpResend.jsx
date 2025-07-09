import { useState, useEffect } from 'react';

const OtpResend = ({ handleOtpSending, isSendingOtp }) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval = null;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleResendClick = () => {
        if (timer === 0) {
            handleOtpSending();
            setTimer(180); // 3 minutes in seconds
        }
    };

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <p className="text-s text-gray-500 mt-1">
            Didn't receive OTP?{' '}
            <button
                onClick={handleResendClick}
                type="button"
                disabled={isSendingOtp || timer > 0}
                className="link link-primary text-s"
            >
                {isSendingOtp ? (
                    <span className="loading loading-spinner loading-sm"></span>
                ) : timer > 0 ? (
                    `Resend in ${formatTime(timer)}`
                ) : (
                    'Resend'
                )}
            </button>
        </p>
    );
};

export default OtpResend;

import { verifyOtp } from "src/services/api/Authentication";
import { useLocation, useNavigate } from "react-router-dom";
import VerifyOtpForm from "../components/VerifyOtpForm";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const email = location.state.email

  const handleVerifyOtp = async (otp: string) => {
    try {
      console.log("Sending to backend:", { email, otp });
      await verifyOtp(email, otp);
      navigate("/login");
    } catch (error) {
      console.error("Verify OTP failed", error);
    }
  };

  return <VerifyOtpForm onSubmit={handleVerifyOtp} />;
};

export default VerifyOtp;

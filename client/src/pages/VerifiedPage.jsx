// pages/VerifiedPage.jsx
const VerifiedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">OTP Verified!</h2>
        <p className="text-gray-700">You have successfully reset your password.</p>
      </div>
    </div>
  );
};

export default VerifiedPage;

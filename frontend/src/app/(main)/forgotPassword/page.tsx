"use client";

const ForgotPassword = () => {
  return (
    <div className="max-w-screen-xl m-auto">
      <div className="w-[334px] m-auto mt-[100px] flex flex-col items-center">
        <h1 className="text-[24px] text-[#09090B] font-semibold mb-[32px]">
          Нууц үг сэргээх
        </h1>
        <input
          className="rounded-full pl-2 w-full border border-[#E4E4E7] shadow-sm py-1 px-3 mb-4
        "
          placeholder="Имэйл хаяг оруулах"
          name="password"
          //   onChange={(e) => {
          //     setPassword(e.target.value);
          //   }}
        />
        <button
          className="px-4 py-2 border w-full text-white bg-[#2563EB] rounded-full"
          //   onClick={() => login(email, password)}
        >
          Илгээх
        </button>
      </div>
    </div>
  );
};
export default ForgotPassword;

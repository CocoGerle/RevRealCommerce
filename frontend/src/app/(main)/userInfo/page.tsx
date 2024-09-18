const UserInfo = () => {
  return (
    <div className="bg-[#f7f7f7] min-h-[66vh]">
      <div className="flex gap-5 max-w-screen-lg m-auto pt-[104px]">
        <div className="w-[244px]">
          <div>Хэрэглэгчийн хэсэг</div>
          <div>Захиалгын түүх</div>
        </div>
        <div>
          <div className="w-[620px]">
            <h1 className="text-[#09090B] text-[18px] font-bold border-b-2 border-[#E4E4E7] pb-5">
              Хэрэглэгчийн хэсэг
            </h1>
            <div className="flex flex-col gap-4">
              <div className="mt-5">
                <p>Овог:</p>
                <input className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]" />
              </div>
              <div>
                <p>Нэр:</p>
                <input className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]" />
              </div>
              <div>
                <p>Утасны дугаар:</p>
                <input className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]" />
              </div>
              <div>
                <p>Имэйл хаяг:</p>
                <input className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]" />
              </div>
              <div>
                <p>Хаяг</p>
                <input className="rounded-2xl w-[100%] py-1 px-3 text-[#71717A] shadow-sm border border-[#E4E4E7]" />
              </div>
            </div>
            <div className="">Мэдээлэл шинэчлэх</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;

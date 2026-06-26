const UploadBox = ({ title, onChange }) => {

    return (

        <div className="mb-5">

            <p className="text-[15px] mb-2 font-medium">
                {title}
                <span className="text-red-500">*</span>
            </p>

            <label className="border border-dashed border-gray-400 rounded-2xl h-[130px] flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50 transition overflow-hidden">

                <input
                    type="file"
                    className="hidden"
                    onChange={onChange}
                />

                <p className="text-[13px] text-center">
                    Upload Photo
                </p>
  <p className="text-[11px] text-center mt-1 text-gray-600">
                    clear face centered,max 5MB
                </p>

            </label>

        </div>

    );

};
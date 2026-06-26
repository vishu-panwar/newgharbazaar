import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SecurityCard from "../components/SecurityCard";
import KYCContainer from "../components/KYCContainer";

import logo from "../assets/logo.png";

const KYCStep1 = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        contactNumber: "",
        currentAddress: ""
    });
 const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const nextStep = () => {

        localStorage.setItem(
            "step1",
            JSON.stringify(formData)
        );

        navigate("/step2");

    };

     return (

        <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center relative px-5">

            <img
                src={logo}
                alt="logo"
                className="absolute left-16 top-20 w-[180px]"
            />

            <KYCContainer>

                <h1 className="text-center text-[62px] font-light leading-none">
                    Step 1/3
                </h1>

                <p className="text-center text-[28px] font-light mt-1 mb-10">
                    Fill your personal Details
                </p>

                                <div className="mb-4">

                    <label className="text-[14px] font-medium">
                        Full Name (as per Aadhar)
                        <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your name"
                        className="w-full border border-gray-400 rounded-full p-3 mt-2 outline-none bg-transparent"
                        onChange={handleChange}
                    />

                </div>

                 <div className="mb-4">

                    <label className="text-[14px] font-medium">
                        Contact Number
                        <span className="text-red-500">*</span>
                    </label>

                    <input
                        type="text"
                        name="contactNumber"
                        placeholder="10-digit mobile number"
                        className="w-full border border-gray-400 rounded-full p-3 mt-2 outline-none bg-transparent"
                        onChange={handleChange}
                    />

                </div>

                  <div>

                    <label className="text-[14px] font-medium">
                        Current Address
                        <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        rows={4}
                        name="currentAddress"
                        placeholder="Enter complete permanent address"
                        className="w-full border border-gray-400 rounded-3xl p-4 mt-2 outline-none bg-transparent resize-none"
                        onChange={handleChange}
                    />

                </div>


  <button
                    onClick={nextStep}
                    className="w-full bg-[#034A1F] text-white py-4 rounded-full mt-8 text-[18px] hover:opacity-90 transition"
                >
                    Next Step →
                </button>

                <SecurityCard />

            </KYCContainer>

        </div>

    );

};

export default KYCStep1;
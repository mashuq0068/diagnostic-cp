import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
// import { TbUserPlus } from "react-icons/tb";

const ViewProfilePage = () => {
  return (
    <div className="mb-8 container">
      {/* Doctor Profile Section */}
      <div className="my-8 flex justify-center">
        <div className="profile-image-wrapper">
          <img
            src="https://i.pinimg.com/736x/c8/ff/88/c8ff88ba5d7c2844bfbeaaa0837d1de5.jpg"
            alt=""
            className=""
          />
        </div>
      </div>

      <div className="mt-6 flex justify-self-center lg:justify-self-end">
        <Link to='/edit-profile' type="submit" className="btn-primary text-[16px]">
          <CiEdit className="mr-2 text-lg" />
          Edit Profile
        </Link>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 mt-5 lg:grid-cols-2 gap-8">
        {/* Personal Information Card */}
        <div className="wrapper">
          <div className="w-full mb-6">
            <h2 className="text-base font-medium mb-2">Personal Information</h2>
            <div className={`h-[2px] bg-gray-200`}>
              <div className={`h-[2px] bg-primary w-[210px]`}></div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-medium">Phone:</span> +1234567890
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Assistant:</span> Jane Doe
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Assistant Phone:</span> +0987654321
            </p>
            <p className="text-gray-600">
              <span className="font-medium">District:</span> Dhaka
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Upazila:</span> Mirpur
            </p>
          </div>
        </div>

        {/* Professional Information Card */}
        <div className="wrapper">
          <div className="w-full  mb-6">
            <h2 className="text-base font-medium mb-2">
              Professional Information
            </h2>
            <div className={`h-[2px] bg-gray-200`}>
              <div className={`h-[2px] bg-primary w-[210px]`}></div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-medium">Years of Experience:</span> 10
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Rate of Visit:</span> $100
            </p>
            <p className="text-gray-600">
              <span className="font-medium">BMDC Number:</span> BMD123456
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Bank Account:</span>{" "}
              1234567890123456
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Bkash Account:</span> 1234567890
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Nagad Account:</span> 9876543210
            </p>
          </div>
        </div>

        {/* Financial Information Card */}
        <div className="wrapper">
          <div className="w-full mt-6 mb-6">
            <h2 className="text-base font-medium mb-2">
              Financial Information
            </h2>
            <div className={`h-[2px] bg-gray-200`}>
              <div className={`h-[2px] bg-primary w-[210px]`}></div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Initial Balance:</span> $5000
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Commission Percentage:</span> 10%
            </p>
          </div>
        </div>

        {/* Account Status Card */}
        <div className="wrapper">
          <div className="w-full mt-6 mb-6">
            <h2 className="text-base font-medium mb-2">Account Status</h2>
            <div className={`h-[2px] bg-gray-200`}>
              <div className={`h-[2px] bg-primary w-[210px]`}></div>
            </div>
          </div>
          <p className="text-gray-600">
            <span className="font-medium">Account Active:</span> Yes
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;

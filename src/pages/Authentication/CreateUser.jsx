import { TbUserPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate()
    const handleCreateUser = (e) => {
      e.preventDefault()
       navigate('/')
    }
  return (
    <div className="bg-[#F1F8FF]">
      <div className="container min-h-[100vh]">
        <div className="flex">
          <h2 className="text-xl mb-8 mt-12 flex items-center gap-2 font-medium text-gray-700">
            Create New User
          </h2>
        </div>

        <form>
          <div className="wrapper">
            <form onSubmit={handleCreateUser}>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Username */}
                <div>
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    className="form-input"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Phone"
                    className="form-input"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    className="form-input"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="form-label">Role</label>
                  <select name="role" className="form-input form-select">
                    <option value="" disabled selected>
                      Choose Role
                    </option>
                    <option value="Admin" className="text-black">
                      Admin
                    </option>
                    <option value="User" className="text-black">
                      User
                    </option>
                    <option value="Moderator" className="text-black">
                      Moderator
                    </option>
                  </select>
                </div>
              </div>
            </form>

            {/* Submit Button */}
            <div className="mt-6">
              <button  type="submit" className="btn-primary">
                <TbUserPlus className="mr-2 text-lg" />
                Create New User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;

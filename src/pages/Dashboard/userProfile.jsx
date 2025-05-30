import React, { useState, useEffect, useContext } from "react";
import { FaUserEdit, FaLock, FaSave, FaTimes, FaCamera, FaDollarSign, FaCalendarAlt, FaClock, FaTachometerAlt, FaPiggyBank } from "react-icons/fa";
import { Card, CardContent, Button, Input, Label, Switch } from "../../components/ui";
import { AuthContext } from "../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    darkMode: false,
    profilePic: "",
  });
  
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://campus-coin-backend.onrender.com/api/user/${user._id}`);
        const data = response.data;
        
        setUserData(data);
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        
        console.log("Fetched user data:", data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setSaveError("Failed to load user profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user._id) {
      fetchUserData();
    }
  }, [user]);

  // Handle profile picture selection
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePicFile(file);

    // Preview image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserData({ ...userData, profilePic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  // Save updated user info to backend
  const handleSave = async () => {
    try {
      setSaveSuccess(false);
      setSaveError("");
      setIsLoading(true);
      
      let profilePicUrl = userData.profilePic;

      // Upload profile picture if a new file is selected
      if (profilePicFile) {
        const formData = new FormData();
        formData.append("profilePic", profilePicFile);
        const uploadResponse = await axios.post("https://campus-coin-backend.onrender.com/api/upload", formData);
        profilePicUrl = uploadResponse.data.imageUrl;
      }

      // Prepare updated user data
      const updatedUserData = {
        name: name || userData.name,
        email: email || userData.email,
        phone: phone || userData.phone,
        darkMode: userData.darkMode,
        profilePic: profilePicUrl
      };
      
      // Only include password if it was changed
      if (password) {
        updatedUserData.password = password;
      }

      // Update user details
      await axios.put(`https://campus-coin-backend.onrender.com/api/user/${user._id}`, updatedUserData);
      
      // Update local state
      setUserData({...userData, ...updatedUserData});
      setSaveSuccess(true);
      
      // Clear password field after successful update
      setPassword("");
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setSaveError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    // Reset form fields to current user data
    setName(userData.name || "");
    setEmail(userData.email || "");
    setPhone(userData.phone || "");
    setPassword("");
    setSaveSuccess(false);
    setSaveError("");
  };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-4 md:p-6 flex flex-col md:flex-row">
      {/* Side Navigation */}
      <nav className="w-full md:w-64 bg-[#1F2A3A] md:fixed md:inset-y-0 md:left-0 py-6 md:h-full z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-white">User Profile</h2>
        </div>
        {/* <ul className="space-y-4 flex md:flex-col flex-wrap justify-center md:justify-start">
          <li>
            <Button onClick={() => navigate("/dashboard")} className="text-white flex items-center gap-2 w-full justify-center md:justify-start">
              <FaTachometerAlt /> Dashboard
            </Button>
          </li>
          <li>
            <Button onClick={() => navigate("/savingsGoal")} className="text-white flex items-center gap-2 w-full justify-center md:justify-start">
              <FaPiggyBank /> Savings Goal
            </Button>
          </li>
          <li>
            <Button onClick={() => navigate("/savingsLock")} className="text-white flex items-center gap-2 w-full justify-center md:justify-start">
              <FaLock /> Savings Lock
            </Button>
          </li>
        </ul> */}
      </nav>
  
      {/* Main Content */}
      <div className="md:ml-64 w-full flex justify-center mt-6 md:mt-0 px-2">
        <Card className="w-full max-w-3xl p-4 sm:p-6 bg-[#1F2A3A] rounded-2xl shadow-lg">
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading profile information...</div>
            ) : (
              <>
                {/* Profile Section */}
                <div className="text-2xl font-semibold mb-4">Profile Information</div>
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-6 mb-6">
                  <div className="flex justify-center mb-4 sm:mb-0">
                    <label htmlFor="profile-pic" className="relative cursor-pointer">
                      <FaCamera className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full text-white text-xl" />
                      <img
                        src={userData.profilePic || "https://via.placeholder.com/120"}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-gray-700"
                      />
                    </label>
                    <input type="file" id="profile-pic" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
                  </div>
  
                  <div className="text-center sm:text-left">
                    <div className="font-bold text-lg">{userData.name || "User Name"}</div>
                    <div>{userData.email || "email@example.com"}</div>
                    <div>{userData.phone || "Phone Number"}</div>
                  </div>
                </div>
  
                {/* Alerts */}
                {saveSuccess && (
                  <div className="bg-green-500 bg-opacity-20 border border-green-500 text-green-300 p-3 rounded mb-4">
                    Profile updated successfully!
                  </div>
                )}
                {saveError && (
                  <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 p-3 rounded mb-4">
                    {saveError}
                  </div>
                )}
  
                {/* Form */}
                <div className="mt-6">
                  <div className="text-xl font-semibold mb-4">Manage Your Personal Information</div>
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} className="w-full" placeholder={userData.name || "Enter your name"} />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" placeholder={userData.email || "Enter your email"} />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full" placeholder={userData.phone || "Enter your phone"} />
                    </div>
                    <div>
                      <Label>Change Password</Label>
                      <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" placeholder="Leave blank to keep current password" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Dark Mode</Label>
                      <Switch checked={userData.darkMode} onCheckedChange={(checked) => setUserData({ ...userData, darkMode: checked })} />
                    </div>
                  </div>
  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-between mt-6">
                    <Button className="bg-[#FF5733] w-full sm:w-auto" onClick={handleSave} disabled={isLoading}>
                      <FaSave className="mr-2" /> Save Changes
                    </Button>
                    <Button className="bg-gray-500 w-full sm:w-auto" onClick={handleCancel} disabled={isLoading}>
                      <FaTimes className="mr-2" /> Cancel
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
};

export default UserProfile;
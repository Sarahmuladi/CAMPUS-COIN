import React, { useState, useEffect, useContext } from "react";
import { FaUserEdit, FaLock, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import { Card, CardContent, Button, Input, Label, Switch } from "../../components/ui";
import { AuthContext } from "../../components/Context/AuthContext";
import axios from "axios";

const UserProfile = () => {
  const { user } = useContext(AuthContext);
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
  const [phone, setPhone] = useState();
  const [profilePicFile, setProfilePicFile] = useState(null);

  // Fetch user data from backend
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/${user.id}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [user.id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

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
      let profilePicUrl = userData.profilePic;

      // Upload profile picture if a new file is selected
      if (profilePicFile) {
        const formData = new FormData();
        formData.append("profilePic", profilePicFile);
        const uploadResponse = await axios.post("http://localhost:5000/api/upload", formData);
        profilePicUrl = uploadResponse.data.imageUrl;
      }

      // Update user details
      await axios.put(`http://localhost:5000/api/user/${user.id}`, {
        ...userData,
        profilePic: profilePicUrl,
        password: password || undefined, // Only send password if changed
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6 flex justify-center">
      <Card className="w-full max-w-lg p-6 bg-gray-900 rounded-2xl shadow-lg">
        <CardContent>
          {/* Profile Section */}
          <div className="text-2xl font-semibold mb-4">Profile Information</div>
          <div className="flex items-center mb-6">
            <div className="flex justify-center mb-6">
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

            <div className="p-6 text-left">
              <div className="font-bold">{userData.name}</div>
              <div>{userData.email}</div>
              <div>{userData.phone}</div>
            </div>
          </div>

          {/* Edit User Info */}
          <div className="mt-6">
            <div className="text-xl font-semibold mb-4">Manage Your Personal Information</div>

            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input name="name"  onChange={(e) => setName(e.target.value)} className="w-full" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" name="email"  onChange={(e) => setEmail(e.target.value)} className="w-full" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input type="tel" name="phone"  onChange={(e) => setPhone(e.target.value)} className="w-full" />
              </div>
              <div>
                <Label>Change Password</Label>
                <Input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Dark Mode</Label>
                <Switch checked={userData.darkMode} onCheckedChange={(checked) => setUserData({ ...userData, darkMode: checked })} />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <Button className="bg-green-500" onClick={handleSave}>
                <FaSave className="mr-2" /> Save Changes
              </Button>
              <Button className="bg-red-500">
                <FaTimes className="mr-2" /> Cancel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;


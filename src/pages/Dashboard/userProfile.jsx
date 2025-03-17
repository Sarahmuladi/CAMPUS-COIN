import React, { useState } from "react";
import { FaUserEdit, FaLock, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import { Card, CardContent, Button, Input, Label, Switch } from "../../components/ui";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Sarah Doe",
    email: "sarah@example.com",
    phone: "255-123-456-789",
    darkMode: false,
  });
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6 flex justify-center">
      <Card className="w-full max-w-lg p-6 bg-gray-900 rounded-2xl shadow-lg">
        <CardContent>
          {/* Profile Section (Current Info) */}
          <div className="text-2xl font-semibold mb-4">Profile Information</div>
          <div className="flex  items-center mb-6">
            
            <div className="flex justify-center mb-6">

              <label htmlFor="profile-pic" className="relative cursor-pointer">
                <FaCamera className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full text-white text-xl" />
                <img
                  src={profilePic || "https://via.placeholder.com/120"}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-gray-700"
                />
              </label>
              <input type="file" id="profile-pic" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
            </div>

            <div className="p-6  text-left">
              <div className="font-bold">{user.name}</div>
              <div>{user.email}</div>
              <div>{user.phone}</div>
            </div>
          </div>

          {/* Manage Personal Information Section (Editable) */}
          <div className="mt-6">
            <div className="text-xl font-semibold mb-4">Manage Your Personal Information</div>


            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input name="name" value={user.name} onChange={handleChange} className="w-full" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" name="email" value={user.email} onChange={handleChange} className="w-full" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input type="tel" name="phone" value={user.phone} onChange={handleChange} className="w-full" />
              </div>
              <div>
                <Label>Change Password</Label>
                <Input type="password" value={password} onChange={handlePasswordChange} className="w-full" />
              </div>
              <div className="flex items-center justify-between">
                <Label>Dark Mode</Label>
                <Switch checked={user.darkMode} onCheckedChange={(checked) => setUser({ ...user, darkMode: checked })} />
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

import React, { useState, useEffect, useContext } from "react";
import { FaUser, FaLock, FaBell, FaPalette, FaTrash } from "react-icons/fa";
import { Card, CardContent, Button, Switch, Input, Label } from "../../components/ui";
import { AuthContext } from "../../components/Context/AuthContext";
import axios from "axios";

const Settings = () => {
  const { user } = useContext(AuthContext);
  
  // State for user settings
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    password: "",
    twoFactorAuth: false,
    pin: "",
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    language: "English",
  });

  // Fetch user settings from backend
  useEffect(() => {
    axios.get(`http://localhost:5000/api/settings/${user.id}`)
      .then(response => setSettings(response.data))
      .catch(error => console.error("Error fetching settings:", error));
  }, [user._id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  // Handle switch toggles
  const handleToggle = (name) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Save updated settings to backend
  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/settings/${user.id}`, settings);
      alert("Settings updated successfully!");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action is irreversible.")) {
      try {
        await axios.delete(`http://localhost:5000/api/user/${user.id}`);
        alert("Account deleted successfully.");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold flex items-center gap-2"><FaUser /> Profile Settings</h2>
            <Label>Name</Label>
            <Input name="name"  onChange={handleChange} className="mt-2" />
            <Label className="mt-4">Email</Label>
            <Input type="email" name="email"  onChange={handleChange} className="mt-2" />
            <Label className="mt-4">Password</Label>
            <Input type="password" name="password" placeholder="Enter new password" onChange={handleChange} className="mt-2" />
            <Button className="bg-[#2ECC71] mt-4" onClick={handleSave}>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold flex items-center gap-2"><FaLock /> Security</h2>
            <Label>Enable Two-Factor Authentication</Label>
            <Switch checked={settings.twoFactorAuth} onCheckedChange={() => handleToggle("twoFactorAuth")} className="mt-2" />
            <Label className="mt-4">Change PIN</Label>
            <Input type="password" name="pin" value={settings.pin} onChange={handleChange} className="mt-2" />
            <Button className="bg-[#FF5733] mt-4" onClick={handleSave}>Update Security</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Notifications */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold flex items-center gap-2"><FaBell /> Notifications</h2>
            <Label>Email Notifications</Label>
            <Switch checked={settings.emailNotifications} onCheckedChange={() => handleToggle("emailNotifications")} className="mt-2" />
            <Label className="mt-4">SMS Notifications</Label>
            <Switch checked={settings.smsNotifications} onCheckedChange={() => handleToggle("smsNotifications")} className="mt-2" />
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold flex items-center gap-2"><FaPalette /> Preferences</h2>
            <Label>Dark Mode</Label>
            <Switch checked={settings.darkMode} onCheckedChange={() => handleToggle("darkMode")} className="mt-2" />
            <Label className="mt-4">Language</Label>
            <select name="language" value={settings.language} onChange={handleChange} className="mt-2 p-2 bg-gray-800 rounded">
              <option>English</option>
              <option>Swahili</option>
            </select>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        {/* Account Management */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold flex items-center gap-2 text-red-400"><FaTrash /> Account Management</h2>
            <p className="text-sm text-gray-300">Permanently delete or deactivate your account.</p>
            <Button className="bg-red-500 mt-4" onClick={handleDeleteAccount}>Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;

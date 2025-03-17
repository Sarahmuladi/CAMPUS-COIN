import React, { useState } from "react";
import { FaUser, FaLock, FaBell, FaPalette, FaTrash, FaGlobe } from "react-icons/fa";
import { Card, CardContent, Button, Switch, Input, Label } from "../../components/ui";



const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6">
      {/* Settings Header */}
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold flex items-center gap-2"><FaUser /> Profile Settings</h2>
            <Label>Name</Label>
            <Input type="text" placeholder="Enter your name" className="mt-2" />
            <Label className="mt-4">Email</Label>
            <Input type="email" placeholder="Enter your email" className="mt-2" />
            <Label className="mt-4">Password</Label>
            <Input type="password" placeholder="Enter new password" className="mt-2" />
            <Button className="bg-[#2ECC71] mt-4">Save Changes</Button>
          </CardContent>
        </Card>
        
        {/* Security Settings */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold flex items-center gap-2"><FaLock /> Security</h2>
            <Label>Enable Two-Factor Authentication</Label>
            <Switch checked={false} className="mt-2" />
            <Label className="mt-4">Change PIN</Label>
            <Input type="password" placeholder="Enter new PIN" className="mt-2" />
            <Button className="bg-[#FF5733] mt-4">Update Security</Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Notifications */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold flex items-center gap-2"><FaBell /> Notifications</h2>
            <Label>Email Notifications</Label>
            <Switch checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} className="mt-2" />
            <Label className="mt-4">SMS Notifications</Label>
            <Switch checked={smsNotifications} onChange={() => setSmsNotifications(!smsNotifications)} className="mt-2" />
          </CardContent>
        </Card>
        
        {/* App Preferences */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold flex items-center gap-2"><FaPalette /> Preferences</h2>
            <Label>Dark Mode</Label>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="mt-2" />
            <Label className="mt-4">Language</Label>
            <select className="mt-2 p-2 bg-gray-800 rounded">
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
            <Button className="bg-red-500 mt-4">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
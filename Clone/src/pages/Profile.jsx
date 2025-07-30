import React, { useState, useRef } from 'react';
import {
  Avatar,
  IconButton,
  Button,
  Snackbar,
  Alert,
  Modal,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SideBar from '../widgets/SideBar';

const Profile = () => {
  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [name, setName] = useState('Pavi✨');
  const [tempName, setTempName] = useState(name);
  const [about, setAbout] = useState('Hey there! I am using WhatsApp.');
  const [tempAbout, setTempAbout] = useState(about);
  const [profilePic, setProfilePic] = useState('https://i.imgur.com/1X1WvYr.png');
  const [tempProfilePic, setTempProfilePic] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const fileInputRef = useRef(null);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfilePic(reader.result);
        setOpenModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfilePic = () => {
    setProfilePic(tempProfilePic);
    setTempProfilePic(null);
    setOpenModal(false);
    setSnackbar({ open: true, message: 'Profile picture updated!', severity: 'success' });
  };

  const cancelProfilePic = () => {
    setTempProfilePic(null);
    setOpenModal(false);
  };

  const saveName = () => {
    if (tempName.trim() === '') {
      setSnackbar({ open: true, message: 'Name cannot be empty!', severity: 'error' });
      return;
    }
    setName(tempName);
    setEditName(false);
    setSnackbar({ open: true, message: 'Name updated!', severity: 'success' });
  };

  const cancelName = () => {
    setTempName(name);
    setEditName(false);
  };

  const saveAbout = () => {
    setAbout(tempAbout);
    setEditAbout(false);
    setSnackbar({ open: true, message: 'About updated!', severity: 'success' });
  };

  const cancelAbout = () => {
    setTempAbout(about);
    setEditAbout(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="min-h-screen bg-[#1f2225] text-white flex font-sans">
      {/* Sidebar */}
      <SideBar />

      {/* Main Section: Left editor + Right profile box */}
      <div className="flex flex-1">
        {/* Left Side */}
        <div className="w-3/8 p-10 space-y-6">
          <h2 className="text-2xl font-semibold text-white">Profile</h2>

          {/* Avatar */}
          <div className="flex flex-col items-center relative space-y-4">
            <Avatar
              src={profilePic}
              alt="Profile"
              sx={{ width: 120, height: 120, border: '2px solid #00a884' }}
            />
            <label htmlFor="profile-pic-upload">
              <IconButton
                component="span"
                className="absolute bottom-0 right-0 bg-[#00a884] text-white"
                sx={{ bgcolor: '#00a884', '&:hover': { bgcolor: '#008069' } }}
              >
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
            </label>
            <input
              id="profile-pic-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleProfilePicChange}
              ref={fileInputRef}
            />
          </div>

          {/* Name Field */}
          <div>
            <p className="text-gray-400 text-sm mb-1">Your name</p>
            <div className="flex items-center bg-[#202c33] rounded-lg px-3 py-2 w-full">
              <input
                type="text"
                className={`bg-transparent text-white flex-1 outline-none text-sm ${editName ? 'border-b-2 border-green-500' : ''}`}
                value={tempName}
                disabled={!editName}
                onChange={(e) => setTempName(e.target.value.replace(/✨/g, ''))}
              />
              {editName ? (
                <div className="flex space-x-2">
                  <IconButton size="small" onClick={saveName} className="text-white">
                    <CheckIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={cancelName} className="text-white">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              ) : (
                <IconButton size="small" className="text-white" onClick={() => setEditName(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
            </div>
            <p className="text-gray-500 text-xs mt-1">
              This is not your username or PIN. This name will be visible to your WhatsApp contacts.
            </p>
          </div>

          {/* About Field */}
          <div>
            <p className="text-gray-400 text-sm mb-1">About</p>
            <div className="flex items-center bg-[#202c33] rounded-lg px-3 py-2">
              {editAbout ? (
                <textarea
                  className="bg-transparent text-white flex-1 outline-none text-sm resize-none"
                  value={tempAbout}
                  onChange={(e) => setTempAbout(e.target.value)}
                  rows={3}
                />
              ) : (
                <span className="text-white text-sm" dangerouslySetInnerHTML={{ __html: about }} />
              )}
              {editAbout ? (
                <div className="flex space-x-2">
                  <IconButton size="small" onClick={saveAbout} className="text-white">
                    <CheckIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={cancelAbout} className="text-white">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              ) : (
                <IconButton size="small" className="text-white" onClick={() => setEditAbout(true)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
            </div>
          </div>
        </div>

        {/* Right Side Box */}
        <div className="w-1/4 flex items-center justify-center border-l border-gray-700">
          <div className=" w-48 h-48 flex items-center justify-center rounded-lg ">
            <p className="text-gray-400 text-xl font-medium">Profile</p>
          </div>
        </div>
      </div>

      {/* Profile Pic Modal */}
      <Modal open={openModal} onClose={cancelProfilePic}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '#202c33',
            p: 4,
            borderRadius: 2,
            outline: 'none',
            maxWidth: 400,
            width: '90%',
          }}
        >
          <h3 className="text-white text-lg mb-4">Preview Profile Picture</h3>
          <img src={tempProfilePic} alt="Preview" className="w-full h-auto rounded-full mb-4" />
          <div className="flex justify-end space-x-2">
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              onClick={saveProfilePic}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CloseIcon />}
              onClick={cancelProfilePic}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;

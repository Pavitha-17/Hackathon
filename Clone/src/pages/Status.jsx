import React, { useState, useRef } from 'react';
import { Avatar, IconButton, Typography, Modal, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LockIcon from '@mui/icons-material/Lock';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import SideBar from '../widgets/SideBar'

const Status = () => {
  const [myStatusPic, setMyStatusPic] = useState(''); // State for My status media
  const [recentStatuses] = useState([
    { name: 'Narmatha Akka CIVIL', time: 'Today at 9:53 am', pic: 'https://i.imgur.com/1X1WvYr.png', media: 'https://i.imgur.com/1X1WvYr.png' }, // Placeholder media
    { name: 'DD sis', time: 'Today at 2:17 am', pic: 'https://i.imgur.com/1X1WvYr.png', media: 'https://i.imgur.com/1X1WvYr.png' },
    { name: 'Dharani Sri Akka EEE', time: 'Today at 1:05 am', pic: 'https://i.imgur.com/1X1WvYr.png', media: 'https://i.imgur.com/1X1WvYr.png' },
    { name: 'Hema Akka CSE', time: 'Today at 12:15 am', pic: 'https://i.imgur.com/1X1WvYr.png', media: 'https://i.imgur.com/1X1WvYr.png' },
    { name: 'F Bharathi', time: 'Yesterday at 9:40 pm', pic: 'https://i.imgur.com/1X1WvYr.png', media: 'https://i.imgur.com/1X1WvYr.png' },
  ]);
  const [viewedStatuses] = useState([
    { name: 'Nithya Sis', time: 'Yesterday at 8:30 pm', pic: 'https://i.imgur.com/1X1WvYr.png', media: 'https://i.imgur.com/1X1WvYr.png' },
  ]);
  const [openModal, setOpenModal] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const fileInputRef = useRef(null);

  // Handle file selection for My status
  const handleAddStatus = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewMedia(reader.result);
        setOpenModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save the uploaded media as My status
  const saveStatus = () => {
    setMyStatusPic(previewMedia);
    setPreviewMedia(null);
    setOpenModal(false);
    // In a real app, send to backend here
  };

  // Cancel the upload
  const cancelStatus = () => {
    setPreviewMedia(null);
    setOpenModal(false);
  };

  // Handle status click to preview media
  const handleStatusClick = (media) => {
    setPreviewMedia(media);
    setSelectedStatus(media);
    setOpenModal(true);
  };

  return (
    <div className="flex h-screen bg-[#1f2225]  text-white font-sans scrollbar-hide">
      {/* Left Navigation Sidebar (Placeholder - Replace with your existing sidebar) */}
      <SideBar/>
     <style jsx>{`
          .scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      {/* Status Container */}
      <div className="w-80 bg-[#1f2225]  p-4 border-r border-gray-800 overflow-y-auto">
        {/* My Status */}
        <div className="mb-6">
          <Typography variant="subtitle1" className="text-gray-400 mb-3 font-medium">
            My status
          </Typography>
          <div
            className="flex items-center space-x-3 p-3  rounded-xl hover:bg-[#2a3942] transition-colors duration-200 cursor-pointer"
            onClick={() => handleStatusClick(myStatusPic)}
          >
            <Avatar
              src={myStatusPic}
              alt="My Status"
              sx={{ width: 52, height: 52, border: '3px solid #00a884' }}
            />
            <div>
              <Typography variant="body2" className="text-gray-300">
                Click to add status update
              </Typography>
              <IconButton size="small" className="text-[#00a884] hover:text-[#00c09a]" onClick={handleAddStatus}>
                <AddIcon />
              </IconButton>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*,video/*,audio/*"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Recent Updates */}
        <div className="mb-6">
          <Typography variant="subtitle1" className="text-gray-400 mb-3 font-medium">
            Recent updates
          </Typography>
          {recentStatuses.map((status, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3  rounded-xl hover:bg-[#2a3942] transition-colors duration-200 mb-2 cursor-pointer"
              onClick={() => handleStatusClick(status.media)}
            >
              <Avatar
                src={status.pic}
                alt={status.name}
                sx={{ width: 52, height: 52, border: '3px solid #00a884' }}
              />
              <div>
                <Typography variant="body2" className="text-white font-medium">
                  {status.name}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {status.time}
                </Typography>
              </div>
            </div>
          ))}
        </div>

        {/* Viewed Updates */}
        <div>
          <Typography variant="subtitle1" className="text-gray-400 mb-3 font-medium">
            Viewed updates
          </Typography>
          {viewedStatuses.map((status, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3  rounded-xl hover:bg-[#2a3942] transition-colors duration-200 mb-2 cursor-pointer"
              onClick={() => handleStatusClick(status.media)}
            >
              <Avatar
                src={status.pic}
                alt={status.name}
                sx={{ width: 52, height: 52, border: '3px solid #00a884' }}
              />
              <div>
                <Typography variant="body2" className="text-white font-medium">
                  {status.name}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {status.time}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Rectangle Container */}
      <div className="flex-1 bg-[#1f2225]  flex items-center justify-center p-6">
        <div className="text-center">
          <Typography variant="h6" className="text-gray-400 mb-3 font-medium">
            Share status updates
          </Typography>
          <Typography variant="body2" className="text-gray-500 max-w-xs">
            Share photos, videos and text that disappear after 24 hours.
          </Typography>
          <Typography
            variant="caption"
            className="text-gray-500 mt-4 flex items-center justify-center"
          >
            <LockIcon fontSize="small" className="mr-1" /> Your status updates are end-to-end encrypted
          </Typography>
        </div>
      </div>

      {/* Modal for Previewing Media */}
      <Modal open={openModal} onClose={cancelStatus}>
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
            maxWidth: 500,
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" className="text-white mb-4">Status Update</Typography>
          {previewMedia && (
            <>
              {previewMedia.match(/\.(jpg|jpeg|png|gif)$/) && (
                <img src={previewMedia} alt="Status" className="w-full h-auto rounded-lg mb-4" />
              )}
              {previewMedia.match(/\.(mp4|webm)$/) && (
                <video controls className="w-full h-auto rounded-lg mb-4">
                  <source src={previewMedia} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {previewMedia.match(/\.(mp3|wav)$/) && (
                <audio controls className="w-full mb-4">
                  <source src={previewMedia} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
            </>
          )}
          {selectedStatus && selectedStatus !== myStatusPic && (
            <Typography variant="caption" className="text-gray-500 mt-2">
              Status from {selectedStatus === recentStatuses[0].media ? recentStatuses[0].name : viewedStatuses[0].name}
            </Typography>
          )}
          <div className="flex justify-end space-x-2">
  <Button
    variant="contained"
    color="success"
    startIcon={<CheckIcon />}
    onClick={selectedStatus === myStatusPic ? saveStatus : cancelStatus}
    disabled={!previewMedia}
    sx={{
      textTransform: 'none', // Removes uppercase transformation
      padding: '6px 16px', // Custom padding for better size
      borderRadius: '8px', // Rounded corners
      fontSize: '0.875rem', // Slightly larger font
      fontWeight: 500, // Medium font weight
      backgroundColor: '#00a884', // Custom success color
      '&:hover': {
        backgroundColor: '#079e7a', // Darker shade on hover
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow on hover
      },
      '&:disabled': {
        backgroundColor: '#4caf50', // Lighter shade when disabled
        opacity: 0.6,
      },
    }}
  >
    {selectedStatus === myStatusPic ? 'Save' : 'Close'}
  </Button>
  <Button
    variant="outlined"
    color="error"
    startIcon={<CloseIcon />}
    onClick={cancelStatus}
    sx={{
      textTransform: 'none', // Removes uppercase transformation
      padding: '6px 16px', // Custom padding for better size
      borderRadius: '8px', // Rounded corners
      fontSize: '0.875rem', // Slightly larger font
      fontWeight: 500, // Medium font weight
      borderColor: '#f44336', // Custom error border color
      color: '#f44336', // Custom error text color
      '&:hover': {
        borderColor: '#d32f2f', // Darker shade on hover
        backgroundColor: 'rgba(244, 67, 54, 0.1)', // Light background on hover
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow on hover
      },
    }}
  >
    Cancel
  </Button>
</div>
        </Box>
      </Modal>
    </div>
  );
};

export default Status;
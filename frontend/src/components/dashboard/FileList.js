import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const FileList = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    file: '',
  });

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/files/`, {
        headers: {
          'Authorization': Cookies.get('Authorization'),
        }
      });
      setFiles(response.data);
    } catch (error) {
      toast.error('An error occurred', { position: toast.POSITION.TOP_CENTER });
      console.error('Error fetching files:', error);
    }
  };

  const handleViewLogClick = async (fileId) => {
    try {
      const response = await axios.get(`${backendUrl}/api/logs/by_file/${fileId}/`, {
        headers: {
          'Authorization': Cookies.get('Authorization'),
        }
      });
      if (response.data.log != "") {
        const logData = response.data.log;
        const date = new Date(response.data.timestamp);
        const formattedDate = date.toLocaleString();
        const formattedLog = logData + '\n\n' + 'Письмо отправлено: ' + formattedDate;
        openModal(formattedLog);
      };
      console.log('Log data:', response.data);
    } catch (error) {
      openModal('Лог проверки не найден - кажется, ваш файл еще не проверен')
      console.error('Error fetching log:', error);
    }
  };

  const handleEditClick = (fileId) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];

        const updatedFormData = new FormData();
        updatedFormData.append('file', file);

        const result = await axios.patch(`${backendUrl}/api/files/${fileId}/`, updatedFormData, {
          headers: {
            'Authorization': Cookies.get('Authorization'),
          }
        });
        console.log('Reloaded file:', result);
        window.location.reload();
    });

    fileInput.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const updatedFormData = new FormData();
    updatedFormData.append('file', file);
    setFormData(updatedFormData);
  };

  const handleFileDeleteClick = (fileId) => {
    try {
      const response = axios.delete(`${backendUrl}/api/files/${fileId}/`, {
        headers: {
          'Authorization': Cookies.get('Authorization'),
        }
      });
      console.log('Deleted file:', fileId);
      window.location.reload();
    }
    catch (error) {
      toast.error('An error occurred while deleting the file', { position: toast.POSITION.TOP_CENTER });
      console.error('Error deleting file', error);
    }
  };

  function openModal(fileText) {
    const modal = document.getElementById('textModal');
    const fileFrame = document.getElementById('fileFrame');
    fileFrame.srcdoc = `<pre>${fileText}</pre>`;
    
    modal.style.display = 'block';
  };

  function closeModal() {
    const modal = document.getElementById('textModal');
    const fileFrame = document.getElementById('fileFrame');
    fileFrame.src = '';
    modal.style.display = 'none';
  }
  
  window.onclick = function(event) {
    const modal = document.getElementById('textModal');
    if (event.target === modal) {
      closeModal();
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const response = await axios.post(`${backendUrl}/api/files/`, formData, {
          headers: {
            'Authorization': Cookies.get('Authorization'),
          }
        });
        console.log('Loaded file:', selectedFile);
        window.location.reload();
      }
      catch (error) {
        toast.error('An error occurred', { position: toast.POSITION.TOP_CENTER });
        console.error('Error loading file', error);
      }
    } else {
      console.log('Choose file for loading');
    }
  };

  return (
    <div className="file-list">
      <div id="textModal" class="modal">
        <div class="modal-content">
          <span class="close" onClick={() => closeModal()}>&times;</span>
          <iframe id="fileFrame" src="" frameborder="0"></iframe>
        </div>
      </div>
      <h2>File List</h2>
      {files ? (
        <ul class="file-list">
          {files.map(file => (
            <li key={file.id} class="file-item">
              <span class="file-title">{file.title}</span>
              <button class="files" onClick={() => openModal(file.text)}>View File</button>
              <button class="files" onClick={() => handleViewLogClick(file.id)}>View Log</button>
              <button class="files" onClick={() => handleEditClick(file.id)}>Reload File</button>
              <button class="files" onClick={() => handleFileDeleteClick(file.id)}>Delete File</button>
            </li>
          ))}
        </ul>
        ) : (
          <p>Loading...</p>
        )}
      <input type="file" onChange={handleFileChange}/>
      <button onClick={handleUpload}>Load file</button>
    </div>
  );
};

export default FileList;

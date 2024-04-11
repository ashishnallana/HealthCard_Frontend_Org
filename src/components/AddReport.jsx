import React, { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyDeomwHR4-O1ptle6lT3BiYbFZKOz4N_2U",
  authDomain: "healthcard-6079c.firebaseapp.com",
  projectId: "healthcard-6079c",
  storageBucket: "healthcard-6079c.appspot.com",
  messagingSenderId: "655375466160",
  appId: "1:655375466160:web:1f3f9866b8543adf6c0575",
  measurementId: "G-JWQBL8EV7J",
};

const app = initializeApp(firebaseConfig);

function AddReport({ data }) {
  const [reportAdder, setReportAdder] = useState(false);
  const [reportFiles, setReportFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [patientId, setPatientId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_API}/org/add-report`,
        {
          _id: data._id,
          pid: patientId,
          files: reportFiles,
          org_name: data.name,
        }
      );
      console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        setReportAdder(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  async function uploadImages(ev) {
    const files = Array.from(ev.target.files);
    if (files.length === 0) return;
    else {
      const storage = getStorage();
      setIsUploading(true);
      files.map((file, i) => {
        const storageRef = ref(storage, "reports/" + file.name);
        uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadUrl) => {
            console.log(downloadUrl);
            setReportFiles((fileURls) => {
              return [...fileURls, ...[downloadUrl]];
            });
          });
        });
      });
      setIsUploading(false);
    }
  }

  return (
    <div className="flex flex-col items-center  ">
      <button
        className="bg-[#1a1635] text-white px-3 py-2 rounded-md mt-5 mb-3  hover:text-slate-900 hover:bg-blue-700"
        onClick={() => setReportAdder(true)}
      >
        Add a new report
      </button>
      {reportAdder && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-3 bg-blue-600 px-12 py-8 rounded-2xl"
        >
          <input
            value={patientId}
            type="text"
            placeholder="Enter patient ID"
            className="bg-transparent outline-none placeholder:text-white text-xl py-2 border-b-2 my-2"
            onChange={(e) => setPatientId(e.target.value)}
          />
          <input
            type="file"
            onChange={uploadImages}
            className="font-sans"
            multiple
          />
          {/* {isUploading ? "Uploading..." : "Upload complete"} */}
          <button
            type="submit"
            className="bg-[#0e0b1b] px-3 py-2 rounded-md mt-5 mb-3  hover:text-slate-900 hover:bg-blue-400"
          >
            Submit Report
          </button>
        </form>
      )}
    </div>
  );
}

export default AddReport;

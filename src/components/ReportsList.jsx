import React, { useEffect, useState } from "react";
import axios from "axios";

function ReportsList({ id }) {
  const [reports, setReports] = useState([]);

  const dateFormatter = (d) => {
    const newDate = new Date(d);
    const formattedDate = newDate.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedDate;
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/org/fetch-org-reports?id=${id}`
      );
      console.log(res);
      if (res.data.success) {
        setReports(res.data.reports);
      }
      //  else {
      //   toast.error(res.data.message);
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(id);
    fetchReports();
  }, []);

  return (
    <div className="mt-3 px-3">
      <h1 className="px-3 text-2xl font-semibold">ALL REPORTS</h1>
      <div>
        <br />
        {reports.map((e, i) => (
          // <div className="flex flex-col space-y-2 m-2 bg-black text-white px-2 py-1 rounded-md text-md  hover:text-slate-900 hover:bg-blue-700">
          <div className="flex flex-col space-y-2 m-2 bg-white text-black px-5 py-3 rounded-md text-md  hover:text-white hover:bg-blue-700">
            <p className="text-md font-bold">Patient Id : {e.patient_id}</p>
            <div className="flex space-x-3">
              {e.files.map((f, j) => (
                <a
                  href={f}
                  target="_blank"
                  className="text-sm bg-black text-white px-2 py-1 rounded-md"
                >
                  file {j + 1}
                </a>
              ))}
            </div>
            <p className="text-sm flex ">{dateFormatter(e.updatedAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportsList;

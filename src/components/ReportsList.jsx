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
    <div>
      All Reports
      <div>
        {reports.map((e, i) => (
          <div className="flex flex-col space-y-2">
            <p>patient id : {e.patient_id}</p>
            {e.files.map((f, j) => (
              <a
                href={f}
                target="_blank"
                className="m-2 bg-black text-white px-2 py-1 rounded-md"
              >
                file {j + 1}
              </a>
            ))}
            <p>{dateFormatter(e.updatedAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReportsList;

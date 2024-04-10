import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";

function PatientReports() {
  const [searchParams] = useSearchParams();
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

  const fetchReports = async (q) => {
    console.log(q);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_API}/org/fetch-user-reports?${q}`
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
    fetchReports(searchParams.toString());
  }, [searchParams]);

  return (
    <div className="m-2 bg-black text-white  px-2 py-1 rounded-md ">
      <div>
        {reports.map((e, i) => (
          <div className="flex flex-col space-y-2">
            <p>patient id : {e.patient_id}</p>
            {e.files.map((f, j) => (
              <a
                href={f}
                target="_blank"
                className=""
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

export default PatientReports;

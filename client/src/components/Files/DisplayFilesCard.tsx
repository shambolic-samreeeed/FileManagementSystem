import { useEffect, useState } from "react";
import { fetchAnalyticsSummary } from "../../services/fileUploadService";
import { useNavigate } from "react-router-dom";

const DisplayFiles = () => {
  const [totalFiles, setTotalFiles] = useState('0');
  const [totalStorage, setTotalStorage] = useState('0')
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await fetchAnalyticsSummary();
        setTotalFiles(response.data.totalFiles);
        setTotalStorage(response.data.totalStorage);
        console.log(response.data.totalFiles);
      } catch (err) {
        setError("Failed to load file count");
      } finally {
        setLoading(false);
      }
    };

    loadSummary();
  }, []);
  return (
    <div className="p-6 w-full max-w-sm mt-8 bg-white shadow-sm rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400">
      <h1 className="text-2xl font-bold text-center mb-4">Your Files</h1>

      {/* input and button section */}
      <div className="flex flex-col gap-6 items-center ">
        <div className="flex flex-col justify-center items-center">

            <p>Files</p>
            <p className="text-4xl font-bold">{totalFiles}</p>


        </div>

        {/* Upload Button */}
        <button className="h-10 w-36 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-700 transition" onClick={()=>nav('/files')}>
          View Files
        </button>
      </div>
    </div>
  );
};

export default DisplayFiles;

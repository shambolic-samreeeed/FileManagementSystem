import { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { uploadFile } from "../../services/fileUploadService";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState({ loading: false, error: "", success: "" });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus({ loading: false, error: "", success: "" });
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) return setStatus({ loading: false, error: "Please select a file first", success: "" });

    setStatus({ loading: true, error: "", success: "" });
    try {
      await uploadFile(file);
      setFile(null);
      setStatus({ loading: false, error: "", success: "File uploaded successfully!" });
    } catch (e: any) {
      setStatus({ loading: false, error: "Upload failed. Please try again.", success: "" });
      console.error("Upload error:", e.response || e.message || e);
    }
  };

  return (
    <div className="p-6 w-full max-w-sm mt-8 bg-white shadow-sm rounded-lg hover:shadow-lg transition-shadow duration-300">
      <h1 className="text-2xl font-bold text-center mb-4">Upload a File</h1>
      <div className="flex flex-col gap-6 items-center">
        <label htmlFor="file-upload" className="flex items-center cursor-pointer bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition">
          <div className="rounded-full w-12 h-12 flex justify-center items-center">
            <AiOutlineFileAdd size={28} />
          </div>
          <span className="text-black font-medium ml-2">{file?.name || "Choose a file"}</span>
          <input id="file-upload" type="file" className="hidden" onChange={onFileChange} />
        </label>

        {status.error && <p className="text-red-500">{status.error}</p>}
        {status.success && <p className="text-green-600">{status.success}</p>}

        <button
          className="h-10 w-36 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          onClick={onUpload}
          disabled={status.loading}
        >
          {status.loading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default UploadForm;

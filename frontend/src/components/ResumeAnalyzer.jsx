import { useState } from "react";
import axios from "axios";

function ResumeAnalyzer() {
  const [resume, setResume] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume || !jd) {
      alert("Please upload a resume and enter a job description");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jd);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:8000/analyze",
        formData
      );
      setResult(res.data.match_percentage);
    } catch (err) {
      console.error(err);
      alert("Backend error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        AI Resume Analyzer
      </h1>

      {/* Resume Upload */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Resume (PDF)
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setResume(e.target.files[0])}
          className="block w-full text-sm text-gray-600
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
        />
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description
        </label>
        <textarea
          rows="6"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the job description here..."
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        {loading ? "Analyzing Resume..." : "Analyze Resume"}
      </button>

      {/* Result */}
      {result !== null && (
        <div className="mt-6 text-center">
          <p className="text-lg font-semibold text-gray-700">
            Match Percentage
          </p>
          <p className="text-4xl font-bold text-green-600 mt-2">
            {result}%
          </p>
        </div>
      )}
    </div>
  );
}

export default ResumeAnalyzer;

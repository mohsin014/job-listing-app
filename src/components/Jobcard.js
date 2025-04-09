import { useState } from "react";

function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false);

  const toggleDetails = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
            <p className="text-gray-600 mt-1">{job.company_name}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {job.job_type}
          </span>
        </div>

        <div className="mt-4 flex items-center text-gray-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>{job.candidate_required_location || "Remote"}</span>
        </div>

        <div className="mt-4">
          <p className="text-gray-700 line-clamp-3">
            {job.description
              ? job.description.replace(/<[^>]*>?/gm, "")
              : "No description available"}
          </p>
        </div>

        {expanded && (
          <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold mb-2">Job Details</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Salary: {job.salary || "Not specified"}</li>
              <li>Category: {job.category}</li>
              <li>
                Publication Date:{" "}
                {new Date(job.publication_date).toLocaleDateString()}
              </li>
            </ul>

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={toggleDetails}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            {expanded ? "Hide Details" : "View Details"}
            <svg
              className={`w-4 h-4 ml-1 transform ${
                expanded ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>

        <div className="mt-4 pt-4 border-t flex justify-end">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}
export default JobCard;

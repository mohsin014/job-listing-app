import { useState, useEffect } from "react";
import JobCard from "./components/Jobcard";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import "./index.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        // Using Remotive API for remote jobs
        const response = await fetch("https://remotive.com/api/remote-jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch job listings");
        }
        const data = await response.json();
        setJobs(data.jobs);
        setFilteredJobs(data.jobs);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    // Filter jobs based on search term and category
    const filtered = jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || job.job_type === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    setFilteredJobs(filtered);
  }, [searchTerm, selectedCategory, jobs]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const getUniqueCategories = () => {
    const categories = jobs.map((job) => job.job_type);
    return ["All", ...new Set(categories)];
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Job Listings</h1>
          <p className="mt-2">Find your dream remote job</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <SearchBar onSearch={handleSearch} />
          <FilterDropdown
            categories={getUniqueCategories()}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        {!isLoading && filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No jobs found matching your criteria.
            </p>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Job Listings Application</p>
          <p className="text-sm mt-2">
            Created for Starlabs Technologies Application
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

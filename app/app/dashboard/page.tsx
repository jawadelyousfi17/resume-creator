import { getAllResume } from "@/actions/resume/getAllResume";
import { getSavedJobs } from "@/actions/jobs/getSavedJobs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Briefcase, ChevronRight, Search, Wand2 } from "lucide-react";

export default async function DashboardPage() {
  const [resumes, jobs] = await Promise.all([getAllResume(), getSavedJobs()]);

  const resumeScore = 85; // This could be calculated dynamically

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-[#f7f9fc] min-h-screen">
      {/* Progress Tracker Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Step 1: Resume Building */}
        <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm flex flex-col gap-4 relative overflow-hidden group hover:border-blue-300 transition-all cursor-pointer">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-xl"></div>
          <div className="flex justify-between items-start">
            <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center text-blue-500">
              <FileText className="w-6 h-6" />
            </div>
            <div className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              {resumeScore}%
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Resume Building</h3>
            <div className="w-full bg-gray-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${resumeScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Step 2: Resume Tailoring */}
        <div className="bg-white rounded-xl p-4 border border-transparent shadow-sm flex flex-col gap-4 hover:border-blue-300 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <div className="bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center text-purple-500">
              <Search className="w-6 h-6" />
            </div>
            <div className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
              5%
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Resume Tailoring</h3>
            <div className="w-full bg-gray-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full"
                style={{ width: "5%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Step 3: Resume Distribution */}
        <div className="bg-white rounded-xl p-4 border border-transparent shadow-sm flex flex-col gap-4 hover:border-blue-300 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center text-orange-500">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
              0%
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Resume Distribution</h3>
            <div className="w-full bg-gray-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-orange-500 h-full rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Step 4: Cover Letter */}
        <div className="bg-white rounded-xl p-4 border border-transparent shadow-sm flex flex-col gap-4 hover:border-blue-300 transition-all cursor-pointer">
          <div className="flex justify-between items-start">
            <div className="bg-pink-50 w-12 h-12 rounded-lg flex items-center justify-center text-pink-500">
              <FileText className="w-6 h-6" />
            </div>
            <div className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full">
              0%
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">Cover Letter Crafting</h3>
            <div className="w-full bg-gray-100 h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-pink-500 h-full rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Resume Count */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Resumes</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {resumes ? resumes.length : 0}
              </h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/app/resumes"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center"
            >
              View all <ChevronRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>

        {/* Saved Jobs Count */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Saved Jobs</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {jobs ? jobs.length : 0}
              </h3>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg">
              <Briefcase className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/app/jobs"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center"
            >
              View saved <ChevronRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
        </div>

        {/* Tailor Resume Action */}
        <div className="bg-linear-to-br from-indigo-600 to-purple-700 p-5 rounded-xl shadow-md text-white md:col-span-2 relative overflow-hidden group cursor-pointer transition-all hover:shadow-lg">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">Tailor my Resume</h3>
                <p className="text-indigo-100 text-xs mt-1 max-w-xs">
                  Match your resume to a job description.
                </p>
              </div>
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <Link href="/app/resumes">
                <Button
                  size="sm"
                  className="bg-white text-indigo-600 hover:bg-indigo-50 border-0 font-semibold shadow-sm w-fit text-xs h-8"
                >
                  Start Tailoring
                </Button>
              </Link>
            </div>
          </div>
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-indigo-500/30 rounded-full blur-xl -ml-6 -mb-6"></div>
        </div>
      </div>
    </div>
  );
}

"use server";

import { JobSearchResponse } from "@/types/job";
import { SingleJobResponse } from "@/types/singleJob";
import axios from "axios";

export async function getSingleJobDetails(jobId: string) {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/job-details",
    params: {
      job_id: jobId,
      language: "en",
    },
    headers: {
      "x-rapidapi-key": "2a97b8c83cmsh83aa6c742f04660p14dd91jsn674d51427a4b",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const data: SingleJobResponse = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

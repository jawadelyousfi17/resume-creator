"use server";

import { JobSearchResponse } from "@/types/job";
import axios from "axios";

export async function getJobs(
  jobTtitle: string,
  page?: number,
  num_pages?: number,
  country?: string
) {
  const options = {
    method: "GET",
    url: "https://jsearch.p.rapidapi.com/search",
    params: {
      query: jobTtitle,
      page: page ? page.toString() : "1",
      num_pages: "1",
      country: country ? country : "us",
      date_posted: "all",
      language: "en",
    },
    headers: {
      "x-rapidapi-key": "2a97b8c83cmsh83aa6c742f04660p14dd91jsn674d51427a4b",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const data: JobSearchResponse = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

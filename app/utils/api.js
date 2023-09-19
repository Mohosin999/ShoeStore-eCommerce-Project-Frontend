// pages/index.js or any other relevant Next.js page
import axios from "axios";

async function fetchData(endPoint) {
  try {
    const response = await axios.get(endPoint);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

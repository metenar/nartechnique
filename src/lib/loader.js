import apiRequest from "./apiRequest";

export const reviewLoader = async ({ request, params }) => {
  const res = await apiRequest("/reviews");
  const sortedResponse = await res.data.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  return sortedResponse;
};

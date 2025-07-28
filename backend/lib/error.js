export const handleError = (res, context, error) => {
  console.log(`Error in ${context}`, error);
  return res.status(500).json({ error: "Internal server error" });
};

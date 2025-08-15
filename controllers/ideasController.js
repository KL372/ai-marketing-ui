// controllers/ideasController.js
export function getIdeas(req, res) {
  // For now, just render the page with empty options or test data
  res.render('ideas', { options: ["Example idea 1", "Example idea 2", "Example idea 3"] });
}

// controllers/observeController.js
export function getObserve(req, res) {
  // For now, just render the page with empty options or test data
  res.render('observe', { options: ["Example observation 1", "Example observation 2"] });
}

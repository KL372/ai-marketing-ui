// controllers/enhanceController.js

export function getEnhance(req, res) {
  // For now, just return dummy enhanced text
  res.render('enhance', { options: ["Enhanced version 1", "Enhanced version 2"] });
}

// controllers/channelController.js
// Purpose: Handle GET/POST /channel. On POST, forward form inputs to the
// Flask /generate endpoint and render results in channel.ejs.

import axios from 'axios';
/**
 * Render Channel page (GET) and handle generation (POST).
 *
 * Flow:
 *  - GET  /channel  -> render empty form (no API call)
 *  - POST /channel  -> forward form payload to backend /generate, then render results
 *
 * Notes:
 *  - We echo form values back to the view so the user sees what was submitted.
 *  - Consider moving the API base URL to an env var later (e.g., process.env.API_BASE_URL).
 */
export async function getChannel(req, res) {
  
  // Get form values (will be undefined for GET, filled for POST)
  // Safe destructure with defaults so GET won't crash
  const {
    stage = '',
    channel = '',
    product = '',
    target_audience = '',
    industry = '',
    marketing_objective = '',
    business_background = '',
    benefits = '',
    style = '',              // optional: finer control over structure/format
    tone = '',               // optional: voice preference
    more_instructions = ''   // optional: extra constraints (e.g., word count)
  } = req.body || {};

  try {
    // Only call backend if the form was actually submitted (i.e., we have any non-empty field).
    // This prevents a POST-less GET from triggering an API call.
    const submitted =
      stage || channel || product || target_audience ||
      industry || marketing_objective || business_background ||
      benefits || style || tone || more_instructions;
     if (submitted) {
      //  read from app/local env, with safe fallback
      const backendUrl =
        req.app?.locals?.backendUrl ||
        process.env.BACKEND_URL ||
        'http://localhost:5001';
      // ! Backend URL is hardcoded for local dev. For deployment, prefer:
      // const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5001';
      // and use `${API_BASE_URL}/generate`.
      const resp = await axios.post(`${backendUrl}/generate`, {
        stage,
        channel,
        product,
        target_audience,
        industry,
        marketing_objective,
        business_background,
        benefits,
        style,              
        tone,               
        more_instructions,
        n_options: 3 // request up to 3 variants from the backend
      });

      // Success: render the same page with options + the original inputs (sticky form UX)
      return res.render('channel', {
        options: resp.data.options,// array of {hook, body_text, call_to_action}
        error: null,
        stage,
        channel,
        product,
        target_audience,
        industry,
        marketing_objective,
        business_background,
        benefits,
        style,              
        tone,               
        more_instructions,
      });
     }
      // Initial GET (or empty POST): render empty state (no results, no error)
    return res.render('channel', {
        options: null,
        error: null,
        stage: '',
        channel: '',
        product: '',
        target_audience: '',
        industry: '',
        marketing_objective: '',
        business_background: '',
        benefits: '',
        style: '',              
        tone : '',               
        more_instructions :''
      });
    
  } catch (err) {
    // Handle network/HTTP/model errors and keep the user's inputs on the page
    return res.render('channel', {
      options: null,
      error: err.message || 'Something went wrong.',
      stage,
      channel,
      product,
      target_audience,
      industry,
      marketing_objective,
      business_background,
      benefits,
      style,              
      tone,               
      more_instructions,
    });
  }
}





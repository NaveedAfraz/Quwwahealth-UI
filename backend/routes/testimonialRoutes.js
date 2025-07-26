const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} = require('../controller/testimonialController');

// Public routes
router.get('/', getTestimonials);
router.get('/:id', getTestimonial);

// Protected routes (add authentication middleware if needed)
router.post('/', createTestimonial);
router.put('/:id', updateTestimonial);
router.delete('/:id', deleteTestimonial);

module.exports = router;

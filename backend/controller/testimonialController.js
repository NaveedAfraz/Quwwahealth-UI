const db = require('../db');

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
exports.getTestimonials = async (req, res) => {
  console.log('Fetching all testimonials');
  try {
    const [rows] = await db.query(
      `SELECT id, name, title, quote, 
              created_at as createdAt, updated_at as updatedAt 
       FROM testimonials 
       ORDER BY created_at DESC`
    );
    
    console.log(`Found ${rows.length} testimonials`);
    return res.status(200).json({
      success: true,
      count: rows.length,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching testimonials',
      error: error.message
    });
  }
};

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
exports.getTestimonial = async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching testimonial with ID: ${id}`);
  
  try {
    const [rows] = await db.query(
      `SELECT id, name, title, quote, 
              created_at as createdAt, updated_at as updatedAt 
       FROM testimonials 
       WHERE id = ?`,
      [id]
    );
    
    if (rows.length === 0) {
      console.log(`Testimonial with ID ${id} not found`);
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    console.log(`Found testimonial:`, rows[0]);
    return res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error(`Error fetching testimonial with ID ${id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching testimonial',
      error: error.message
    });
  }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
exports.createTestimonial = async (req, res) => {
  console.log('Creating new testimonial with data:', req.body);
  
  // Validate request body
  const { name, title, quote } = req.body;
  
  if (!name || !title || !quote) {
    console.log('Missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Name, title, and quote are required',
      fields: {
        name: !name ? 'Name is required' : null,
        title: !title ? 'Title is required' : null,
        quote: !quote ? 'Quote is required' : null
      }
    });
  }
  
  // Validate field lengths
  const errors = {};
  if (name.length > 255) errors.name = 'Name must be less than 255 characters';
  if (title.length > 255) errors.title = 'Title must be less than 255 characters';
  
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }
  
  try {
    // Start a transaction
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Insert the new testimonial
      const [result] = await connection.query(
        `INSERT INTO testimonials (name, title, quote) 
         VALUES (?, ?, ?)`,
        [name, title, quote]
      );
      
      // Fetch the newly created testimonial
      const [rows] = await connection.query(
        `SELECT id, name, title, quote, 
                created_at as createdAt, 
                updated_at as updatedAt 
         FROM testimonials 
         WHERE id = ?`,
        [result.insertId]
      );
      
      await connection.commit();
      
      const newTestimonial = rows[0];
      console.log('Successfully created testimonial:', newTestimonial);
      
      return res.status(201).json({
        success: true,
        data: newTestimonial
      });
      
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
    
  } catch (error) {
    console.error('Error in createTestimonial:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      sqlMessage: error.sqlMessage,
      sql: error.sql
    });
    
    // Handle specific database errors
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'A testimonial with these details already exists',
        code: 'DUPLICATE_ENTRY'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Failed to create testimonial',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      code: error.code || 'INTERNAL_SERVER_ERROR'
    });
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
exports.updateTestimonial = async (req, res) => {
  const { id } = req.params;
  const { name, title, quote } = req.body;
  
  console.log(`Updating testimonial with ID: ${id}`, req.body);
  
  if (!name || !title || !quote) {
    console.log('Missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Name, title, and quote are required'
    });
  }
  
  try {
    // Check if testimonial exists
    const [checkRows] = await db.query(
      'SELECT * FROM testimonials WHERE id = ?',
      [id]
    );
    
    if (checkRows.length === 0) {
      console.log(`Testimonial with ID ${id} not found`);
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    // Update the testimonial
    await db.query(
      `UPDATE testimonials 
       SET name = ?, title = ?, quote = ?, updated_at = NOW() 
       WHERE id = ?`,
      [name, title, quote, id]
    );
    
    // Fetch the updated testimonial
    const [rows] = await db.query(
      'SELECT * FROM testimonials WHERE id = ?',
      [id]
    );
    
    const updatedTestimonial = rows[0];
    console.log('Updated testimonial:', updatedTestimonial);
    
    return res.status(200).json({
      success: true,
      data: {
        ...updatedTestimonial,
        createdAt: updatedTestimonial.created_at,
        updatedAt: updatedTestimonial.updated_at
      }
    });
  } catch (error) {
    console.error(`Error updating testimonial with ID ${id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating testimonial',
      error: error.message
    });
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
exports.deleteTestimonial = async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting testimonial with ID: ${id}`);
  
  try {
    // Check if testimonial exists
    const [checkRows] = await db.query(
      'SELECT * FROM testimonials WHERE id = ?',
      [id]
    );
    
    if (checkRows.length === 0) {
      console.log(`Testimonial with ID ${id} not found`);
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found'
      });
    }
    
    const testimonialToDelete = checkRows[0];
    
    // Delete the testimonial
    await db.query('DELETE FROM testimonials WHERE id = ?', [id]);
    
    console.log('Deleted testimonial:', testimonialToDelete);
    
    return res.status(200).json({
      success: true,
      data: {},
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error(`Error deleting testimonial with ID ${id}:`, error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting testimonial',
      error: error.message
    });
  }
};

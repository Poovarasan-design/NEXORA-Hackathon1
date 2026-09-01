import express from 'express';
import { saveRegistration, getRegistrations } from '../config/db.js';

const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const {
      teamName,
      teamLeaderName,
      collegeName,
      departmentYear,
      phoneNumber,
      whatsappNumber,
      email,
      teamSize,
      theme,
      teamMembers = []
    } = req.body;

    // Strict validation for required core fields
    if (!teamName || !teamLeaderName || !collegeName || !departmentYear || 
        !phoneNumber || !whatsappNumber || !email || !teamSize || !theme) {
      return res.status(400).json({
        success: false,
        error: 'All core team fields are required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid Team Leader email address'
      });
    }

    const phoneRegex = /^[0-9+\-\s]{7,15}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid Team Leader phone number'
      });
    }

    if (!phoneRegex.test(whatsappNumber)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid Team Leader WhatsApp number'
      });
    }

    const numericTeamSize = parseInt(teamSize, 10);
    const expectedAdditionalMembers = numericTeamSize - 1;

    if (expectedAdditionalMembers > 0) {
      if (!Array.isArray(teamMembers) || teamMembers.length < expectedAdditionalMembers) {
        return res.status(400).json({
          success: false,
          error: `Details for all ${expectedAdditionalMembers} additional team members are required.`
        });
      }

      for (let i = 0; i < expectedAdditionalMembers; i++) {
        const member = teamMembers[i];
        if (!member || !member.name || !member.departmentYear || !member.phone || !member.whatsapp || !member.email) {
          return res.status(400).json({
            success: false,
            error: `All fields for Team Member ${i + 2} are required.`
          });
        }

        if (!emailRegex.test(member.email.trim())) {
          return res.status(400).json({
            success: false,
            error: `Invalid email address for Team Member ${i + 2}.`
          });
        }

        if (!phoneRegex.test(member.phone.trim())) {
          return res.status(400).json({
            success: false,
            error: `Invalid phone number for Team Member ${i + 2}.`
          });
        }

        if (!phoneRegex.test(member.whatsapp.trim())) {
          return res.status(400).json({
            success: false,
            error: `Invalid WhatsApp number for Team Member ${i + 2}.`
          });
        }
      }
    }

    const registration = await saveRegistration({
      teamName: teamName.trim(),
      teamLeaderName: teamLeaderName.trim(),
      collegeName: collegeName.trim(),
      departmentYear: departmentYear.trim(),
      phoneNumber: phoneNumber.trim(),
      whatsappNumber: whatsappNumber.trim(),
      email: email.trim(),
      teamSize: numericTeamSize,
      theme: theme.trim(),
      teamMembers: teamMembers.slice(0, expectedAdditionalMembers)
    });

    return res.status(201).json({
      success: true,
      message: 'REGISTRATION SUBMITTED',
      detail: 'Your team registration has been successfully submitted.',
      data: registration
    });
  } catch (error) {
    console.error('Registration processing error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing registration.'
    });
  }
});

// GET /api/registrations
router.get('/registrations', async (req, res) => {
  try {
    const list = await getRegistrations();
    return res.json({ success: true, count: list.length, registrations: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

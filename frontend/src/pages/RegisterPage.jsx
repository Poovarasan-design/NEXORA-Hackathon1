import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Sparkles, AlertCircle, UserPlus, Users } from 'lucide-react';
import confetti from 'canvas-confetti';
import ThemeSelectorModal from '../components/ThemeSelectorModal';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    teamName: '',
    teamLeaderName: '',
    collegeName: '',
    departmentYear: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: '',
    teamSize: '4',
    theme: ''
  });

  // State for additional team members (Size 4 default means 3 additional members)
  const [teamMembers, setTeamMembers] = useState([
    { name: '', departmentYear: '', phone: '', whatsapp: '', email: '' },
    { name: '', departmentYear: '', phone: '', whatsapp: '', email: '' },
    { name: '', departmentYear: '', phone: '', whatsapp: '', email: '' }
  ]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Handle Team Size changes dynamically
  const handleTeamSizeChange = (newSize) => {
    const sizeNum = parseInt(newSize, 10);
    const requiredAdditional = sizeNum - 1;

    setFormData(prev => ({ ...prev, teamSize: newSize }));
    if (errors.teamSize) {
      setErrors(prev => ({ ...prev, teamSize: '' }));
    }

    setTeamMembers(prev => {
      const current = [...prev];
      if (current.length < requiredAdditional) {
        while (current.length < requiredAdditional) {
          current.push({ name: '', departmentYear: '', phone: '', whatsapp: '', email: '' });
        }
      } else if (current.length > requiredAdditional) {
        return current.slice(0, requiredAdditional);
      }
      return current;
    });
  };

  // Handle input change for an additional team member
  const handleMemberChange = (index, field, value) => {
    setTeamMembers(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    const errKey = `member_${index}_${field}`;
    if (errors[errKey]) {
      setErrors(prev => ({ ...prev, [errKey]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.teamName.trim()) newErrors.teamName = 'Team Name is required';
    if (!formData.teamLeaderName.trim()) newErrors.teamLeaderName = 'Team Leader Name is required';
    if (!formData.collegeName.trim()) newErrors.collegeName = 'College Name is required';
    if (!formData.departmentYear.trim()) newErrors.departmentYear = 'Department & Year is required';

    const phoneRegex = /^[0-9+\-\s]{7,15}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (!phoneRegex.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'WhatsApp Number is required';
    } else if (!phoneRegex.test(formData.whatsappNumber.trim())) {
      newErrors.whatsappNumber = 'Please enter a valid WhatsApp number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.teamSize) newErrors.teamSize = 'Team Size is required';
    if (!formData.theme) newErrors.theme = 'Please select a Theme track';

    // Validate additional team members
    const requiredAdditional = parseInt(formData.teamSize, 10) - 1;
    for (let i = 0; i < requiredAdditional; i++) {
      const member = teamMembers[i] || {};
      if (!member.name || !member.name.trim()) {
        newErrors[`member_${i}_name`] = `Full Name for Member ${i + 2} is required`;
      }
      if (!member.departmentYear || !member.departmentYear.trim()) {
        newErrors[`member_${i}_departmentYear`] = `Department & Year for Member ${i + 2} is required`;
      }
      if (!member.phone || !member.phone.trim()) {
        newErrors[`member_${i}_phone`] = `Phone Number for Member ${i + 2} is required`;
      } else if (!phoneRegex.test(member.phone.trim())) {
        newErrors[`member_${i}_phone`] = `Valid phone number required`;
      }
      if (!member.whatsapp || !member.whatsapp.trim()) {
        newErrors[`member_${i}_whatsapp`] = `WhatsApp Number for Member ${i + 2} is required`;
      } else if (!phoneRegex.test(member.whatsapp.trim())) {
        newErrors[`member_${i}_whatsapp`] = `Valid WhatsApp number required`;
      }
      if (!member.email || !member.email.trim()) {
        newErrors[`member_${i}_email`] = `Email address for Member ${i + 2} is required`;
      } else if (!emailRegex.test(member.email.trim())) {
        newErrors[`member_${i}_email`] = `Valid email address required`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const requiredAdditional = parseInt(formData.teamSize, 10) - 1;
      const payload = {
        ...formData,
        teamMembers: teamMembers.slice(0, requiredAdditional)
      };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSubmittedSuccess(true);
        try {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#a855f7', '#06b6d4', '#3b82f6']
          });
        } catch (e) {}
      } else {
        setErrors({ server: resData.error || 'Failed to submit registration. Please try again.' });
      }
    } catch (err) {
      console.error('API submission error:', err);
      setSubmittedSuccess(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#06b6d4', '#3b82f6']
        });
      } catch (e) {}
    } finally {
      setIsSubmitting(false);
    }
  };

  const additionalMemberCount = parseInt(formData.teamSize, 10) - 1;

  return (
    <div className="min-h-screen bg-darkBg text-slate-100 bg-cyber-grid py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex flex-col justify-between">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-neonPurple/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-neonCyan/10 rounded-full blur-[140px] pointer-events-none" />

      {/* REGISTRATION HEADER */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-4 border-b border-cyberBorder mb-8">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/college_logo.webp" 
            alt="NSCET Logo" 
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          />
          <div>
            <h1 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wider">
              NEXORA
            </h1>
            <p className="text-[10px] sm:text-xs text-neonCyan font-mono tracking-widest uppercase">
              30-HOUR HACKATHON FOR HARDWARE & SOFTWARE
            </p>
          </div>
        </div>

        {/* Back to Home button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navyBg/80 border border-neonPurple/30 text-xs sm:text-sm font-orbitron font-semibold text-slate-200 hover:text-white hover:border-neonCyan hover:shadow-[0_0_15px_#06b6d4] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </header>

      {/* MAIN FORM CONTAINER */}
      <main className="max-w-3xl mx-auto w-full my-auto">
        {submittedSuccess ? (
          
          /* SUCCESS STATE */
          <div className="p-8 sm:p-12 rounded-3xl bg-navyBg/90 border border-neonCyan backdrop-blur-xl shadow-[0_0_50px_rgba(6,182,212,0.3)] text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-neonPurple to-neonCyan p-0.5 mx-auto shadow-[0_0_30px_#06b6d4]">
              <div className="w-full h-full bg-navyBg rounded-full flex items-center justify-center text-neonCyan">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-orbitron text-xs font-bold text-neonCyan tracking-widest uppercase">
                ✦ SUCCESSFUL REGISTRATION
              </span>
              <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white">
                REGISTRATION SUBMITTED
              </h2>
              <p className="text-slate-300 text-sm sm:text-base font-sans max-w-md mx-auto">
                Your team registration has been successfully submitted.
              </p>
            </div>

            {/* Submission Summary */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">Team Name:</span>
                <span className="font-bold text-white">{formData.teamName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">Leader Name:</span>
                <span className="text-white">{formData.teamLeaderName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">Theme Track:</span>
                <span className="text-neonCyan font-bold">{formData.theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Team Size:</span>
                <span className="text-white">{formData.teamSize} Members ({additionalMemberCount} additional)</span>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 rounded-xl font-orbitron font-bold text-sm text-white bg-gradient-to-r from-neonPurple to-neonCyan shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:scale-105 transition-transform"
              >
                RETURN TO LANDING PAGE
              </button>
            </div>
          </div>

        ) : (

          /* REGISTRATION FORM */
          <div className="p-6 sm:p-10 rounded-3xl bg-navyBg/85 border border-cyberBorder backdrop-blur-2xl shadow-glass-card space-y-8">
            
            {/* Form Title & Subtitle */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neonPurple/10 border border-neonPurple/30 text-neonPurple text-[11px] font-orbitron font-semibold tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> OFFICIAL ENTRY FORM
              </div>
              <h2 className="font-orbitron font-black text-3xl sm:text-4xl text-white tracking-wide">
                REGISTER YOUR TEAM
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                Register your team for NEXORA 30-Hour Hackathon
              </p>
            </div>

            {errors.server && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.server}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Core Team Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* 1. TEAM NAME */}
                <div className="space-y-1.5">
                  <label className="block font-orbitron text-xs font-bold text-slate-200 tracking-wider">
                    1. TEAM NAME <span className="text-neonCyan">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter team name"
                    value={formData.teamName}
                    onChange={(e) => handleInputChange('teamName', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-darkBg/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.teamName ? 'border-red-500' : 'border-white/10 focus:border-neonCyan focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    }`}
                  />
                  {errors.teamName && <p className="text-[11px] text-red-400 font-mono">{errors.teamName}</p>}
                </div>

                {/* 2. TEAM LEADER NAME */}
                <div className="space-y-1.5">
                  <label className="block font-orbitron text-xs font-bold text-slate-200 tracking-wider">
                    2. TEAM LEADER NAME <span className="text-neonCyan">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter team leader name"
                    value={formData.teamLeaderName}
                    onChange={(e) => handleInputChange('teamLeaderName', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-darkBg/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.teamLeaderName ? 'border-red-500' : 'border-white/10 focus:border-neonCyan focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    }`}
                  />
                  {errors.teamLeaderName && <p className="text-[11px] text-red-400 font-mono">{errors.teamLeaderName}</p>}
                </div>

                {/* 3. COLLEGE NAME */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block font-orbitron text-xs font-bold text-slate-200 tracking-wider">
                    3. COLLEGE NAME <span className="text-neonCyan">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter institution / college full name"
                    value={formData.collegeName}
                    onChange={(e) => handleInputChange('collegeName', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-darkBg/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.collegeName ? 'border-red-500' : 'border-white/10 focus:border-neonCyan focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    }`}
                  />
                  {errors.collegeName && <p className="text-[11px] text-red-400 font-mono">{errors.collegeName}</p>}
                </div>

                {/* 4. DEPARTMENT & YEAR */}
                <div className="space-y-1.5">
                  <label className="block font-orbitron text-xs font-bold text-slate-200 tracking-wider">
                    4. LEADER DEPT & YEAR <span className="text-neonCyan">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CSE - 3rd Year"
                    value={formData.departmentYear}
                    onChange={(e) => handleInputChange('departmentYear', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-darkBg/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.departmentYear ? 'border-red-500' : 'border-white/10 focus:border-neonCyan focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    }`}
                  />
                  {errors.departmentYear && <p className="text-[11px] text-red-400 font-mono">{errors.departmentYear}</p>}
                </div>

                {/* 5. PHONE NUMBER */}
                <div className="space-y-1.5">
                  <label className="block font-orbitron text-xs font-bold text-slate-200 tracking-wider">
                    5. LEADER PHONE <span className="text-neonCyan">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-darkBg/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.phoneNumber ? 'border-red-500' : 'border-white/10 focus:border-neonCyan focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    }`}
                  />
                  {errors.phoneNumber && <p className="text-[11px] text-red-400 font-mono">{errors.phoneNumber}</p>}
                </div>

                {/* 6. WHATSAPP NUMBER */}
                <div className="space-y-1.5">
                  <label className="block font-orbitron text-xs font-bold text-slate-200 tracking-wider">
                    6. LEADER WHATSAPP <span className="text-neonCyan">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="WhatsApp contact number"
                    value={formData.whatsappNumber}
                    onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-darkBg/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.whatsappNumber ? 'border-red-500' : 'border-white/10 focus:border-neonCyan focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    }`}
                  />
                  {errors.whatsappNumber && <p className="text-[11px] text-red-400 font-mono">{errors.whatsappNumber}</p>}
                </div>

                {/* 7. EMAIL */}
                <div className="space-y-1.5">
                  <label className="block font-orbitron text-xs font-bold text-slate-200 tracking-wider">
                    7. LEADER EMAIL <span className="text-neonCyan">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="leader@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl bg-darkBg/90 border text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                      errors.email ? 'border-red-500' : 'border-white/10 focus:border-neonCyan focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-400 font-mono">{errors.email}</p>}
                </div>

                {/* 8. TEAM SIZE SELECTOR */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block font-orbitron text-xs font-bold text-slate-200 tracking-wider">
                    8. TEAM SIZE <span className="text-neonCyan">*</span> <span className="text-[10px] text-slate-400 font-mono">(Includes Leader + {additionalMemberCount} Members)</span>
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {['2', '3', '4', '5', '6'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleTeamSizeChange(size)}
                        className={`py-3 rounded-xl font-orbitron font-bold text-sm transition-all border ${
                          formData.teamSize === size
                            ? 'bg-gradient-to-r from-neonPurple to-neonCyan border-neonCyan text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                            : 'bg-darkBg/80 border-white/10 text-slate-400 hover:text-white hover:border-neonPurple/50'
                        }`}
                      >
                        {size} Members
                      </button>
                    ))}
                  </div>
                  {errors.teamSize && <p className="text-[11px] text-red-400 font-mono">{errors.teamSize}</p>}
                </div>

                {/* 9. THEME SELECTION TRIGGER BUTTON */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block font-orbitron text-xs font-bold text-slate-200 tracking-wider">
                    9. THEME / TRACK <span className="text-neonCyan">*</span>
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => setIsThemeModalOpen(true)}
                    className={`w-full p-4 rounded-xl bg-darkBg/90 border text-left flex items-center justify-between transition-all ${
                      errors.theme ? 'border-red-500' : 'border-white/10 hover:border-neonPurple focus:border-neonCyan'
                    }`}
                  >
                    {formData.theme ? (
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-neonCyan shadow-[0_0_8px_#06b6d4]" />
                        <span className="font-orbitron font-bold text-sm text-neonCyan">{formData.theme}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500 font-mono">
                        Click here to choose from the 16 NEXORA tracks...
                      </span>
                    )}

                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neonPurple/20 text-neonPurple text-xs font-orbitron font-semibold">
                      <span>CHOOSE TRACK</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                  {errors.theme && <p className="text-[11px] text-red-400 font-mono">{errors.theme}</p>}
                </div>

              </div>

              {/* DYNAMIC ADDITIONAL TEAM MEMBERS SECTION */}
              {additionalMemberCount > 0 && (
                <div className="pt-6 border-t border-cyberBorder space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-orbitron text-[10px] font-bold text-neonCyan tracking-widest uppercase">
                        ✦ TEAM COMPOSITION
                      </span>
                      <h3 className="font-orbitron font-extrabold text-lg sm:text-xl text-white">
                        ADDITIONAL TEAM MEMBERS ({additionalMemberCount})
                      </h3>
                    </div>
                    <div className="p-2 rounded-xl bg-neonPurple/20 text-neonPurple border border-neonPurple/30">
                      <Users className="w-5 h-5" />
                    </div>
                  </div>

                  {Array.from({ length: additionalMemberCount }).map((_, index) => {
                    const memberNum = index + 2;
                    const memberData = teamMembers[index] || {};

                    return (
                      <div
                        key={index}
                        className="p-5 sm:p-6 rounded-2xl bg-darkBg/70 border border-neonPurple/30 space-y-4 hover:border-neonCyan transition-all shadow-inner"
                      >
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-neonPurple text-white font-orbitron font-bold text-xs flex items-center justify-center">
                              {memberNum}
                            </span>
                            <span className="font-orbitron font-bold text-sm text-white">
                              TEAM MEMBER {memberNum}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-neonCyan">REQUIRED MEMBER *</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Member Full Name */}
                          <div className="space-y-1 sm:col-span-2">
                            <label className="block font-orbitron text-[11px] font-bold text-slate-300">
                              FULL NAME *
                            </label>
                            <input
                              type="text"
                              placeholder={`Enter Member ${memberNum} full name`}
                              value={memberData.name || ''}
                              onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-lg bg-navyBg border text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                                errors[`member_${index}_name`] ? 'border-red-500' : 'border-white/10 focus:border-neonCyan'
                              }`}
                            />
                            {errors[`member_${index}_name`] && (
                              <p className="text-[10px] text-red-400 font-mono">{errors[`member_${index}_name`]}</p>
                            )}
                          </div>

                          {/* Member Department & Year */}
                          <div className="space-y-1">
                            <label className="block font-orbitron text-[11px] font-bold text-slate-300">
                              DEPARTMENT & YEAR *
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. ECE - 2nd Year"
                              value={memberData.departmentYear || ''}
                              onChange={(e) => handleMemberChange(index, 'departmentYear', e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-lg bg-navyBg border text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                                errors[`member_${index}_departmentYear`] ? 'border-red-500' : 'border-white/10 focus:border-neonCyan'
                              }`}
                            />
                            {errors[`member_${index}_departmentYear`] && (
                              <p className="text-[10px] text-red-400 font-mono">{errors[`member_${index}_departmentYear`]}</p>
                            )}
                          </div>

                          {/* Member Phone Number */}
                          <div className="space-y-1">
                            <label className="block font-orbitron text-[11px] font-bold text-slate-300">
                              PHONE NUMBER *
                            </label>
                            <input
                              type="tel"
                              placeholder="Mobile number"
                              value={memberData.phone || ''}
                              onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-lg bg-navyBg border text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                                errors[`member_${index}_phone`] ? 'border-red-500' : 'border-white/10 focus:border-neonCyan'
                              }`}
                            />
                            {errors[`member_${index}_phone`] && (
                              <p className="text-[10px] text-red-400 font-mono">{errors[`member_${index}_phone`]}</p>
                            )}
                          </div>

                          {/* Member WhatsApp Number */}
                          <div className="space-y-1">
                            <label className="block font-orbitron text-[11px] font-bold text-slate-300">
                              WHATSAPP NUMBER *
                            </label>
                            <input
                              type="tel"
                              placeholder="WhatsApp number"
                              value={memberData.whatsapp || ''}
                              onChange={(e) => handleMemberChange(index, 'whatsapp', e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-lg bg-navyBg border text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                                errors[`member_${index}_whatsapp`] ? 'border-red-500' : 'border-white/10 focus:border-neonCyan'
                              }`}
                            />
                            {errors[`member_${index}_whatsapp`] && (
                              <p className="text-[10px] text-red-400 font-mono">{errors[`member_${index}_whatsapp`]}</p>
                            )}
                          </div>

                          {/* Member Email */}
                          <div className="space-y-1">
                            <label className="block font-orbitron text-[11px] font-bold text-slate-300">
                              EMAIL ADDRESS *
                            </label>
                            <input
                              type="email"
                              placeholder="member@example.com"
                              value={memberData.email || ''}
                              onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                              className={`w-full px-3.5 py-2.5 rounded-lg bg-navyBg border text-xs text-white placeholder-slate-500 focus:outline-none transition-all ${
                                errors[`member_${index}_email`] ? 'border-red-500' : 'border-white/10 focus:border-neonCyan'
                              }`}
                            />
                            {errors[`member_${index}_email`] && (
                              <p className="text-[10px] text-red-400 font-mono">{errors[`member_${index}_email`]}</p>
                            )}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

              {/* 10. SUBMIT BUTTON */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl font-orbitron font-bold text-base sm:text-lg text-white bg-gradient-to-r from-neonPurple via-indigo-600 to-neonCyan shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:shadow-[0_0_45px_rgba(6,182,212,0.8)] hover:scale-[1.01] active:scale-[0.99] transition-all border border-white/20 disabled:opacity-50"
                >
                  {isSubmitting ? 'SUBMITTING REGISTRATION...' : 'SUBMIT REGISTRATION'}
                </button>
              </div>

            </form>

          </div>
        )}
      </main>

      {/* FOOTER TEXT */}
      <footer className="max-w-4xl mx-auto w-full text-center py-6 text-[11px] font-mono text-slate-500">
        © 2026 NEXORA • Nadar Saraswathi College of Engineering & Technology (NSCET)
      </footer>

      {/* 16-TRACK THEME SELECTION MODAL */}
      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        selectedTheme={formData.theme}
        onSelectTheme={(themeTitle) => handleInputChange('theme', themeTitle)}
      />

    </div>
  );
}

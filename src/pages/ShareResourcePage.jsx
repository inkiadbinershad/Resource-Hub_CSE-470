import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, Upload, FileText } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { uploadFile } from '../services/api';
import gsap from 'gsap';

const ShareResourcePage = () => {
  const [form, setForm] = useState({ title: '', description: '', category: 'Notes' });
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const { token } = useAuth();

  useEffect(() => {
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Please log in to upload a resource');
      return;
    }
    if (!file) {
      setError('Please select a file');
      return;
    }

    setError('');
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('file', file);

    try {
      await uploadFile(formData, token);
      setIsLoading(false);
      setIsSubmitted(true);
      gsap.fromTo('.success-message',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Failed to upload. Please try again.');
    }
  };

const handleReset = () => {
    setForm({ title: '', description: '', category: 'Notes' });
    setFileName('');
    setFile(null);
    setError('');
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center" style={{ background: 'transparent' }}>
        <div className="success-message bg-background-secondary rounded-2xl p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Resource Shared!</h3>
          <p className="text-slate-400 mb-6">"{form.title}" has been uploaded successfully.</p>
          <Button onClick={handleReset} variant="primary">Share Another Resource</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4" style={{ background: 'transparent' }}>
      <div ref={containerRef} className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Share a <span className="gradient-text">Resource</span>
          </h1>
          <p className="text-slate-400 text-lg">Upload notes, books, or question papers for others</p>
        </div>
<form onSubmit={handleSubmit} className="bg-background-secondary rounded-2xl p-8 space-y-6">
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <Input label="Title" name="title" placeholder="e.g. Data Structures Notes" value={form.title} onChange={handleChange} icon={FileText} required />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Briefly describe this resource..."
              rows={3}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-3 px-4 text-white placeholder-slate-500 transition-all duration-300 focus:border-accent-purple focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-xl py-3 px-4 text-white transition-all duration-300 focus:border-accent-purple focus:outline-none"
            >
              <option value="Notes">Notes</option>
              <option value="Books">Books</option>
              <option value="Question Papers">Question Papers</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">File</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-600 rounded-xl cursor-pointer hover:border-accent-purple transition-colors duration-300 bg-slate-800/20">
              <Upload className="text-slate-400 mb-2" size={28} />
              <span className="text-slate-400 text-sm">{fileName || 'Click or drag file here'}</span>
              <span className="text-slate-600 text-xs mt-1">.pdf, .doc, .docx, .pptx</span>
              <input type="file" accept=".pdf,.doc,.docx,.pptx" onChange={handleFile} className="hidden" />
            </label>
          </div>

          <Button type="submit" variant="primary" className="w-full py-4" disabled={isLoading}>
            {isLoading ? 'Uploading...' : 'Share Resource'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ShareResourcePage;

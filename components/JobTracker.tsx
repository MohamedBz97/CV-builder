
import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';
import { Job, JobApplicationStatus } from '../types';
import { DEFAULT_JOBS, JOB_STATUS_COLORS } from '../constants';
import { PlusCircleIcon, TrashIcon, PencilSquareIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

const JobTracker: React.FC = () => {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useLocalStorage<Job[]>('jobTracker', DEFAULT_JOBS, currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const openModal = (job: Job | null = null) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingJob(null);
    setIsModalOpen(false);
  };

  const handleSaveJob = (job: Job) => {
    if (editingJob) {
      setJobs(jobs.map(j => j.id === job.id ? job : j));
    } else {
      setJobs([...jobs, job]);
    }
    closeModal();
  };

  const handleDeleteJob = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      setJobs(jobs.filter(j => j.id !== id));
    }
  };
  
  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
        const dateA = a.dateApplied ? new Date(a.dateApplied).getTime() : 0;
        const dateB = b.dateApplied ? new Date(b.dateApplied).getTime() : 0;
        return dateB - dateA;
    });
  }, [jobs]);


  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-3xl font-bold text-neutral-800">Job Application Tracker</h2>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            <PlusCircleIcon className="w-5 h-5" />
            Add Application
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Company</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date Applied</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {sortedJobs.map((job) => (
                <tr key={job.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-neutral-900">{job.company}</div>
                    {job.link && <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary hover:underline">View Posting</a>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">{job.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${JOB_STATUS_COLORS[job.status]}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">{job.dateApplied || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button onClick={() => openModal(job)} className="text-secondary hover:text-blue-700 mr-3"><PencilSquareIcon className="w-5 h-5" /></button>
                    <button onClick={() => handleDeleteJob(job.id)} className="text-red-600 hover:text-red-800"><TrashIcon className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {jobs.length === 0 && <p className="text-center text-neutral-500 py-8">No applications yet. Click 'Add Application' to get started!</p>}
        </div>
      </div>
      {isModalOpen && <JobModal job={editingJob} onSave={handleSaveJob} onClose={closeModal} />}
    </div>
  );
};

const JobModal: React.FC<{ job: Job | null, onSave: (job: Job) => void, onClose: () => void }> = ({ job, onSave, onClose }) => {
  const [formData, setFormData] = useState<Job>(
    job || { id: uuidv4(), company: '', role: '', status: JobApplicationStatus.APPLIED, dateApplied: new Date().toISOString().split('T')[0], notes: '', link: '' }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const inputClass = "w-full p-2 border border-neutral-300 rounded-md shadow-sm focus:ring-primary focus:border-primary";
  const labelClass = "block text-sm font-medium text-neutral-600 mb-1";

  return (
     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-lg animate-scale-in">
        <h3 className="text-2xl font-bold mb-6">{job ? 'Edit' : 'Add'} Job Application</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className={labelClass}>Company</label><input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClass} required /></div>
            <div><label className={labelClass}>Role</label><input type="text" name="role" value={formData.role} onChange={handleChange} className={inputClass} required /></div>
            <div>
              <label className={labelClass}>Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                {Object.values(JobApplicationStatus).map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div><label className={labelClass}>Date Applied</label><input type="date" name="dateApplied" value={formData.dateApplied} onChange={handleChange} className={inputClass} /></div>
          </div>
          <div><label className={labelClass}>Job Posting Link</label><input type="url" name="link" value={formData.link} onChange={handleChange} className={inputClass} placeholder="https://..." /></div>
          <div><label className={labelClass}>Notes</label><textarea name="notes" value={formData.notes} onChange={handleChange} className={inputClass} rows={4} /></div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-neutral-200 text-neutral-800 font-semibold rounded-lg hover:bg-neutral-300">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-800">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobTracker;

import React from 'react';

const PrivacyPolicyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-neutral-800">Privacy Policy</h2>
                    <button onClick={onClose} className="text-2xl font-bold text-neutral-500 hover:text-neutral-800">&times;</button>
                </div>
                <div className="overflow-y-auto pr-4 text-neutral-600 space-y-4">
                    <p><strong>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong></p>
                    <p>AI Resume Architect ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how your personal information is handled in this application.</p>
                    
                    <div>
                        <h4 className="font-bold text-neutral-700">1. Data Storage</h4>
                        <p><strong>All data you enter into this application is stored locally on your device within your web browser's local storage.</strong> This includes your resume details, cover letters, and job application tracking information. Your data is not transmitted to, or stored on, any external servers. We do not have access to your data.</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-neutral-700">2. Data Collection</h4>
                        <p>We do not collect any personal information, cookies, or analytics data. Your use of this application is completely private and anonymous to us.</p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-neutral-700">3. Data Deletion</h4>
                        <p>You have full control over your data. You can delete your data at any time by:</p>
                        <ul className="list-disc list-inside pl-4 mt-2">
                            <li>Using the "Delete All Data for This Profile" button in the footer of the application.</li>
                            <li>Deleting individual profiles from the login screen.</li>
                            <li>Clearing your browser's cache and local storage data for this site.</li>
                        </ul>
                        <p className="mt-2">Deleting a profile or clearing data is a permanent action and cannot be undone.</p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-neutral-700">4. Third-Party Services</h4>
                        <p>This application uses the Google Gemini API to provide AI-powered content suggestions. The data sent to the API is used solely for generating responses and is subject to Google's API policies. We only send the relevant text from your resume sections to generate suggestions; we do not send your entire resume or personal identifiers not relevant to the content generation.</p>
                    </div>

                    <div>
                        <h4 className="font-bold text-neutral-700">5. GDPR Compliance</h4>
                        <p>This application is designed to be compliant with the General Data Protection Regulation (GDPR). As we do not process or store your data on our servers, you retain full ownership and control. The principles of data minimization and privacy by design are core to our architecture.</p>
                    </div>
                    
                    <div>
                        <h4 className="font-bold text-neutral-700">6. Changes to This Policy</h4>
                        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
                    </div>
                </div>
                 <div className="mt-6 text-right flex-shrink-0">
                    <button onClick={onClose} className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-blue-800">Close</button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyModal;

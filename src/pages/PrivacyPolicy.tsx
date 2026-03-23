import React from 'react';
import { Shield, User, Lock, Eye, Mail, Database, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/80 to-blue-800/80 backdrop-blur-lg border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Link
                to="/"
                className="flex items-center space-x-2 text-blue-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-8 w-px bg-blue-500/50"></div>
              <div>
                <h1 className="text-xl font-bold text-white">Privacy Policy</h1>
                <p className="text-blue-300 text-sm">Your data protection is our priority</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="h-8 w-8 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Privacy Policy</h2>
            </div>
            
            <div className="text-gray-300 space-y-4">
              <p className="text-lg">
                At <span className="text-blue-400 font-semibold">DesiPitch</span>, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and protect your data when you use our fantasy sports platform.
              </p>
              
              <p className="text-sm text-gray-400">
                <strong>Last Updated:</strong> March 21, 2024<br/>
                <strong>Effective Date:</strong> March 21, 2024
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Database className="h-8 w-8 text-green-400" />
              <h3 className="text-xl font-bold text-white">Information We Collect</h3>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Personal Information</h4>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Name and email address</li>
                  <li>Phone number (optional)</li>
                  <li>Date of birth</li>
                  <li>Address for KYC verification</li>
                  <li>Government ID details (Aadhar, PAN)</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Account Information</h4>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>Username and password</li>
                  <li>Team preferences and selections</li>
                  <li>Contest participation history</li>
                  <li>Transaction records</li>
                  <li>Winnings and rewards</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Technical Information</h4>
                <ul className="text-gray-300 space-y-2 list-disc list-inside">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages visited and time spent</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="h-8 w-8 text-purple-400" />
              <h3 className="text-xl font-bold text-white">How We Use Your Information</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-semibold">Service Provision</h4>
                  <p className="text-gray-300">To create and manage your fantasy sports account, process contest entries, and deliver our services.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-semibold">Verification & Security</h4>
                  <p className="text-gray-300">To verify your identity, prevent fraud, and ensure compliance with gaming regulations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-semibold">Communication</h4>
                  <p className="text-gray-300">To send you important updates, contest notifications, and promotional materials (with your consent).</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="text-white font-semibold">Platform Improvement</h4>
                  <p className="text-gray-300">To analyze usage patterns, improve our services, and develop new features.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="h-8 w-8 text-red-400" />
              <h3 className="text-xl font-bold text-white">Data Security Measures</h3>
            </div>
            
            <div className="text-gray-300 space-y-4">
              <p>We implement industry-standard security measures to protect your personal information:</p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Encryption:</strong> All data is encrypted using SSL/TLS protocols</li>
                <li><strong>Secure Storage:</strong> Personal information stored in secure databases</li>
                <li><strong>Access Control:</strong> Limited access to authorized personnel only</li>
                <li><strong>Regular Audits:</strong> Periodic security assessments and updates</li>
                <li><strong>Compliance:</strong> Adherence to data protection regulations</li>
              </ul>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <User className="h-8 w-8 text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Your Rights</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Access and Correction</h4>
                <p className="text-gray-300">You can access and update your personal information through your account settings.</p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Data Deletion</h4>
                <p className="text-gray-300">You can request deletion of your account and personal data, subject to legal obligations.</p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Consent Management</h4>
                <p className="text-gray-300">You can withdraw consent for marketing communications at any time.</p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Complaints</h4>
                <p className="text-gray-300">If you have concerns about our data practices, please contact our privacy officer.</p>
              </div>
            </div>
          </div>

          {/* Third-Party Sharing */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="h-8 w-8 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Third-Party Sharing</h3>
            </div>
            
            <div className="text-gray-300 space-y-4">
              <p>We may share your information with trusted third parties only in the following circumstances:</p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Payment Processors:</strong> To process contest fees and winnings</li>
                <li><strong>KYC Verification:</strong> To verify identity documents</li>
                <li><strong>Legal Requirements:</strong> When required by law or regulatory authorities</li>
                <li><strong>Service Providers:</strong> For platform maintenance and support</li>
              </ul>
              
              <p className="text-sm text-gray-400">We never sell your personal information to third parties for marketing purposes.</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="h-8 w-8 text-green-400" />
              <h3 className="text-xl font-bold text-white">Contact Us</h3>
            </div>
            
            <div className="text-gray-300 space-y-4">
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              
              <div className="bg-gray-800/50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-semibold mb-2">Email</h4>
                    <p className="text-blue-400">privacy@desipitch.com</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Support</h4>
                    <p className="text-blue-400">support@desipitch.com</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Address</h4>
                    <p className="text-gray-300">DesiPitch Pvt. Ltd.<br/>Mumbai, Maharashtra, India</p>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-semibold mb-2">Phone</h4>
                    <p className="text-blue-400">+91-XXXXX-XXXXX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8">
            <h3 className="text-xl font-bold text-white mb-4">Policy Updates</h3>
            <div className="text-gray-300 space-y-4">
              <p>We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make changes, we will:</p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li>Post the updated policy on our website</li>
                <li>Update the "Last Updated" date</li>
                <li>Notify users of significant changes via email</li>
                <li>Require continued consent for material changes</li>
              </ul>
              
              <p className="text-sm text-gray-400">Your continued use of our services after any policy changes constitutes acceptance of the updated Privacy Policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

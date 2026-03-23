import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, DollarSign, Trophy, Users, Save, X } from 'lucide-react';

interface Match {
  _id: string;
  team1: string;
  team1Short: string;
  team2: string;
  team2Short: string;
  date: string;
  venue: string;
}

export default function CreateContest() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    matchId: '',
    entryFee: '',
    prizePool: '',
    maxUsers: '',
    contestType: 'Classic',
    prizeBreakdown: [
      { rank: 1, amount: '' },
      { rank: 2, amount: '' },
      { rank: 3, amount: '' }
    ]
  });

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch('http://localhost:5000/api/admin-dashboard/matches', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (result.success) {
        setMatches(result.data);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, index, field] = name.split('.');
      const prizeBreakdown = [...formData.prizeBreakdown];
      const prizeIndex = parseInt(index);
      if (field === 'amount') {
        prizeBreakdown[prizeIndex] = {
          ...prizeBreakdown[prizeIndex],
          amount: value
        };
      }
      
      setFormData(prev => ({
        ...prev,
        prizeBreakdown
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      
      const contestData = {
        ...formData,
        entryFee: parseFloat(formData.entryFee),
        prizePool: parseFloat(formData.prizePool),
        maxUsers: parseInt(formData.maxUsers),
        prizeBreakdown: formData.prizeBreakdown.map(prize => ({
          ...prize,
          amount: parseFloat(prize.amount) || 0
        }))
      };
      
      const response = await fetch('http://localhost:5000/api/admin-dashboard/contests', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contestData),
      });

      const result = await response.json();
      
      if (result.success) {
        navigate('/admin/dashboard');
      } else {
        console.error('Error creating contest:', result.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading matches...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-red-900/80 to-red-800/80 backdrop-blur-lg border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center space-x-2 text-red-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-8 w-px bg-red-500/50"></div>
              <div>
                <h1 className="text-xl font-bold text-white">Create New Contest</h1>
                <p className="text-red-300 text-sm">Add a new fantasy contest</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Contest Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Contest Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contest Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="e.g., Mega Contest"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Select Match
                </label>
                <select
                  name="matchId"
                  value={formData.matchId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20"
                  required
                >
                  <option value="">Select a match</option>
                  {matches.map((match) => (
                    <option key={match._id} value={match._id}>
                      {match.team1Short} vs {match.team2Short} - {new Date(match.date).toLocaleDateString()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Financial Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Entry Fee (₹)
                </label>
                <input
                  type="number"
                  name="entryFee"
                  value={formData.entryFee}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                  placeholder="e.g., 100"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Trophy className="h-4 w-4 mr-2" />
                  Prize Pool (₹)
                </label>
                <input
                  type="number"
                  name="prizePool"
                  value={formData.prizePool}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                  placeholder="e.g., 10000"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Maximum Users
                </label>
                <input
                  type="number"
                  name="maxUsers"
                  value={formData.maxUsers}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
                  placeholder="e.g., 1000"
                  min="1"
                  required
                />
              </div>
            </div>

            {/* Contest Type */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contest Type
              </label>
              <select
                name="contestType"
                value={formData.contestType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20"
              >
                <option value="Classic">Classic</option>
                <option value="Head-to-Head">Head-to-Head</option>
                <option value="Winner Takes All">Winner Takes All</option>
                <option value="Multiple Winners">Multiple Winners</option>
              </select>
            </div>

            {/* Prize Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                Prize Breakdown
              </h3>
              <div className="space-y-4">
                {formData.prizeBreakdown.map((prize, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300 font-medium">Rank #{prize.rank}</span>
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        name={`prizeBreakdown.${index}.amount`}
                        value={prize.amount}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
                        placeholder="Prize amount"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
              <button
                type="button"
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-700/50 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
                <span>Cancel</span>
              </button>
              
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/50"
              >
                <Save className="h-5 w-5" />
                <span>Create Contest</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

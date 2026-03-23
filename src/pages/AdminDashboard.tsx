import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Trophy, Target, Shield, LogOut, Plus, Edit, Trash2, Eye, Settings, Calendar, DollarSign, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalMatches: number;
  totalContests: number;
  pendingKYC: number;
  activeUsers: number;
  recentActivity: {
    newUsersToday: number;
    newMatchesToday: number;
    newContestsToday: number;
  };
}

interface Match {
  _id: string;
  team1: string;
  team1Short: string;
  team2: string;
  team2Short: string;
  date: string;
  time: string;
  venue: string;
  matchType: string;
  series: string;
  status: string;
  createdBy: {
    username: string;
    email: string;
  };
}

interface Contest {
  _id: string;
  name: string;
  matchId: {
    team1: string;
    team2: string;
    venue: string;
    date: string;
  };
  entryFee: number;
  prizePool: number;
  maxUsers: number;
  currentUsers: number;
  contestType: string;
  status: string;
  createdBy: {
    username: string;
    email: string;
  };
}

interface KYCRequest {
  _id: string;
  user: {
    username: string;
    email: string;
  };
  fullName: string;
  dateOfBirth: string;
  address: string;
  aadharNumber: string;
  panNumber: string;
  documentType: string;
  documentUrl: string;
  status: string;
  rejectionReason?: string;
  createdAt: string;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [contests, setContests] = useState<Contest[]>([]);
  const [kycRequests, setKycRequests] = useState<KYCRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'matches' | 'contests' | 'users' | 'kyc'>('dashboard');
  const [showCreateMatch, setShowCreateMatch] = useState(false);
  const [showCreateContest, setShowCreateContest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch stats
      const statsResponse = await fetch('http://localhost:5000/api/admin-dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        if (statsData.success) {
          setStats(statsData.data);
        }
      } else {
        // Set dummy data if API fails
        setStats({
          totalUsers: 1250,
          totalMatches: 45,
          totalContests: 120,
          pendingKYC: 8,
          activeUsers: 340,
          recentActivity: {
            newUsersToday: 12,
            newMatchesToday: 2,
            newContestsToday: 5
          }
        });
      }

      // Fetch matches
      const matchesResponse = await fetch('http://localhost:5000/api/admin-dashboard/matches', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (matchesResponse.ok) {
        const matchesData = await matchesResponse.json();
        if (matchesData.success) {
          setMatches(matchesData.data);
        }
      } else {
        // Set dummy matches data
        setMatches([
          {
            _id: '1',
            team1: 'Mumbai Indians',
            team1Short: 'MI',
            team2: 'Chennai Super Kings',
            team2Short: 'CSK',
            date: '2024-03-25',
            time: '19:30',
            venue: 'Wankhede Stadium, Mumbai',
            matchType: 'T20',
            series: 'IPL 2024',
            status: 'Upcoming',
            createdBy: { username: 'Admin', email: 'admin@desipitch.com' }
          },
          {
            _id: '2',
            team1: 'Royal Challengers Bangalore',
            team1Short: 'RCB',
            team2: 'Kolkata Knight Riders',
            team2Short: 'KKR',
            date: '2024-03-26',
            time: '19:30',
            venue: 'M Chinnaswamy Stadium, Bangalore',
            matchType: 'T20',
            series: 'IPL 2024',
            status: 'Upcoming',
            createdBy: { username: 'Admin', email: 'admin@desipitch.com' }
          }
        ]);
      }

      // Fetch contests
      const contestsResponse = await fetch('http://localhost:5000/api/admin-dashboard/contests', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (contestsResponse.ok) {
        const contestsData = await contestsResponse.json();
        if (contestsData.success) {
          setContests(contestsData.data);
        }
      } else {
        // Set dummy contests data
        setContests([
          {
            _id: '1',
            name: 'Mega Contest',
            matchId: {
              team1: 'Mumbai Indians',
              team2: 'Chennai Super Kings',
              venue: 'Wankhede Stadium, Mumbai',
              date: '2024-03-25'
            },
            entryFee: 100,
            prizePool: 10000,
            maxUsers: 1000,
            currentUsers: 450,
            contestType: 'Classic',
            status: 'Upcoming',
            createdBy: { username: 'Admin', email: 'admin@desipitch.com' }
          },
          {
            _id: '2',
            name: 'Head-to-Head',
            matchId: {
              team1: 'Royal Challengers Bangalore',
              team2: 'Kolkata Knight Riders',
              venue: 'M Chinnaswamy Stadium, Bangalore',
              date: '2024-03-26'
            },
            entryFee: 50,
            prizePool: 100,
            maxUsers: 2,
            currentUsers: 1,
            contestType: 'Head-to-Head',
            status: 'Upcoming',
            createdBy: { username: 'Admin', email: 'admin@desipitch.com' }
          }
        ]);
      }

      // Fetch KYC requests
      const kycResponse = await fetch('http://localhost:5000/api/admin-dashboard/kyc', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (kycResponse.ok) {
        const kycData = await kycResponse.json();
        if (kycData.success) {
          setKycRequests(kycData.data);
        }
      } else {
        // Set dummy KYC data
        setKycRequests([
          {
            _id: '1',
            user: { username: 'user123', email: 'user123@example.com' },
            fullName: 'John Doe',
            dateOfBirth: '1990-01-01',
            address: '123 Main St, Mumbai, Maharashtra',
            aadharNumber: '123456789012',
            panNumber: 'ABCDE1234F',
            documentType: 'Aadhar',
            documentUrl: '/documents/aadhar_123.jpg',
            status: 'Pending',
            createdAt: '2024-03-20'
          }
        ]);
      }
    } catch (err: any) {
      setError('Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin-login');
  };

  const handleCreateMatch = () => {
    navigate('/admin/create-match');
  };

  const handleCreateContest = () => {
    navigate('/admin/create-contest');
  };

  const handleKYCAction = async (kycId: string, status: 'Approved' | 'Rejected', rejectionReason?: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:5000/api/admin-dashboard/kyc/${kycId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, rejectionReason }),
      });

      if (response.ok) {
        fetchDashboardData();
      }
    } catch (err: any) {
      setError('Failed to update KYC status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-red-900/80 to-red-800/80 backdrop-blur-lg border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <Shield className="h-8 w-8 text-red-400" />
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-red-300 text-sm">DesiPitch Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-red-300 text-sm">Logged in as</p>
                <p className="text-white font-medium">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <LogOut className="h-4 w-4 text-red-400" />
                <span className="text-red-400">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-xl p-4">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-800/50 rounded-xl p-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'matches'
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Target className="h-4 w-4" />
            <span>Matches</span>
          </button>
          <button
            onClick={() => setActiveTab('contests')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'contests'
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Trophy className="h-4 w-4" />
            <span>Contests</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'users'
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActiveTab('kyc')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === 'kyc'
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
          >
            <Shield className="h-4 w-4" />
            <span>KYC</span>
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-lg rounded-xl border border-blue-500/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
                  <p className="text-blue-400 text-xs mt-1">+{stats.recentActivity.newUsersToday} today</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/80 to-green-800/80 backdrop-blur-lg rounded-xl border border-green-500/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Total Matches</p>
                  <p className="text-3xl font-bold text-white">{stats.totalMatches}</p>
                  <p className="text-green-400 text-xs mt-1">+{stats.recentActivity.newMatchesToday} today</p>
                </div>
                <Target className="h-8 w-8 text-green-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/80 to-purple-800/80 backdrop-blur-lg rounded-xl border border-purple-500/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Total Contests</p>
                  <p className="text-3xl font-bold text-white">{stats.totalContests}</p>
                  <p className="text-purple-400 text-xs mt-1">+{stats.recentActivity.newContestsToday} today</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-400" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/80 to-yellow-800/80 backdrop-blur-lg rounded-xl border border-yellow-500/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm font-medium">Pending KYC</p>
                  <p className="text-3xl font-bold text-white">{stats.pendingKYC}</p>
                  <p className="text-yellow-400 text-xs mt-1">Need attention</p>
                </div>
                <Shield className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
          </div>
        )}

        {/* Matches Tab */}
        {activeTab === 'matches' && (
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50">
            <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-red-400" />
                Match Management
              </h2>
              <button
                onClick={handleCreateMatch}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Create Match</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left p-4 text-gray-300 font-medium">Teams</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Date</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Venue</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match) => (
                    <tr key={match._id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                      <td className="p-4 text-white">
                        {match.team1Short} vs {match.team2Short}
                      </td>
                      <td className="p-4 text-gray-300">
                        {new Date(match.date).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-gray-300">{match.venue}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          match.status === 'Live' ? 'bg-red-500/20 text-red-400' :
                          match.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {match.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-blue-400 hover:text-blue-300">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contests Tab */}
        {activeTab === 'contests' && (
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50">
            <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-red-400" />
                Contest Management
              </h2>
              <button
                onClick={handleCreateContest}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
              >
                <Plus className="h-4 w-4" />
                <span>Create Contest</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700/50">
                    <th className="text-left p-4 text-gray-300 font-medium">Name</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Entry Fee</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Prize Pool</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Users</th>
                    <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contests.map((contest) => (
                    <tr key={contest._id} className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                      <td className="p-4 text-white">{contest.name}</td>
                      <td className="p-4 text-gray-300">₹{contest.entryFee}</td>
                      <td className="p-4 text-gray-300">₹{contest.prizePool}</td>
                      <td className="p-4 text-gray-300">
                        {contest.currentUsers}/{contest.maxUsers}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          contest.status === 'Live' ? 'bg-red-500/20 text-red-400' :
                          contest.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {contest.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* KYC Tab */}
        {activeTab === 'kyc' && (
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50">
            <div className="p-6 border-b border-gray-700/50">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-400" />
                KYC Management ({kycRequests.length} pending)
              </h2>
            </div>
            
            <div className="space-y-4">
              {kycRequests.map((kyc) => (
                <div key={kyc._id} className="p-4 border border-gray-700/30 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-white font-medium">{kyc.fullName}</p>
                        <p className="text-gray-400 text-sm">{kyc.user.username} • {kyc.user.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        kyc.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        kyc.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {kyc.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>
                      <p className="text-gray-400">Aadhar: {kyc.aadharNumber}</p>
                      <p className="text-gray-400">PAN: {kyc.panNumber}</p>
                      <p className="text-gray-400">Address: {kyc.address}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {kyc.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleKYCAction(kyc._id, 'Approved')}
                            className="flex items-center space-x-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"
                          >
                            <CheckCircle className="h-3 w-3" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleKYCAction(kyc._id, 'Rejected')}
                            className="flex items-center space-x-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                          >
                            <XCircle className="h-3 w-3" />
                            <span>Reject</span>
                          </button>
                        </>
                      )}
                      {kyc.status === 'Approved' && (
                        <span className="flex items-center space-x-1 text-green-400">
                          <CheckCircle className="h-3 w-3" />
                          <span>Approved</span>
                        </span>
                      )}
                      {kyc.status === 'Rejected' && (
                        <span className="flex items-center space-x-1 text-red-400">
                          <XCircle className="h-3 w-3" />
                          <span>Rejected: {kyc.rejectionReason}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab - Simple placeholder */}
        {activeTab === 'users' && (
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6">
            <h2 className="text-xl font-bold text-white flex items-center mb-6">
              <Users className="h-5 w-5 mr-2 text-red-400" />
              User Management
            </h2>
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">User management features coming soon</p>
              <p className="text-gray-500 text-sm mt-2">Block/unblock users functionality will be available here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Calendar, TrendingUp, Eye, Edit, Trash2, Filter, Search } from 'lucide-react';

interface UserTeam {
  id: string;
  name: string;
  match: string;
  matchDate: string;
  players: Array<{
    id: string;
    name: string;
    team: string;
    role: string;
    credits: number;
  }>;
  captain: string;
  viceCaptain: string;
  totalCredits: number;
  contests: Array<{
    id: string;
    name: string;
    prize: string;
    rank?: number;
  }>;
}

const MyTeams: React.FC = () => {
  const [teams, setTeams] = useState<UserTeam[]>([
    {
      id: '1',
      name: 'Mumbai Warriors',
      match: 'MI vs CSK',
      matchDate: '2024-03-25',
      players: [
        { id: '1', name: 'Rohit Sharma', team: 'MI', role: 'Batsman', credits: 9 },
        { id: '2', name: 'Jasprit Bumrah', team: 'MI', role: 'Bowler', credits: 9 },
        { id: '3', name: 'MS Dhoni', team: 'CSK', role: 'Wicket Keeper', credits: 9 },
        { id: '4', name: 'Virat Kohli', team: 'RCB', role: 'Batsman', credits: 8.5 },
        { id: '5', name: 'Ravindra Jadeja', team: 'CSK', role: 'All Rounder', credits: 8.5 },
        { id: '6', name: 'Bhuvneshwar Kumar', team: 'RCB', role: 'Bowler', credits: 8.5 },
        { id: '7', name: 'David Warner', team: 'SRH', role: 'Batsman', credits: 9 },
        { id: '8', name: 'Rashid Khan', team: 'SRH', role: 'Bowler', credits: 9 },
        { id: '9', name: 'KL Rahul', team: 'LSG', role: 'Wicket Keeper', credits: 9 },
        { id: '10', name: 'R Ashwin', team: 'RR', role: 'All Rounder', credits: 8.5 },
        { id: '11', name: 'Jos Buttler', team: 'RR', role: 'Wicket Keeper', credits: 9 }
      ],
      captain: 'Rohit Sharma',
      viceCaptain: 'MS Dhoni',
      totalCredits: 100,
      contests: [
        { id: '1', name: 'Mega Contest', prize: '₹50,000', rank: 1 },
        { id: '2', name: 'Head-to-Head', prize: '₹10,000' }
      ]
    },
    {
      id: '2',
      name: 'Chennai Super Kings',
      match: 'RCB vs MI',
      matchDate: '2024-03-26',
      players: [
        { id: '12', name: 'Faf du Plessis', team: 'RCB', role: 'Batsman', credits: 9.5 },
        { id: '13', name: 'Mohammed Siraj', team: 'RCB', role: 'Bowler', credits: 9 },
        { id: '14', name: 'Suryakumar Yadav', team: 'MI', role: 'Wicket Keeper', credits: 9 },
        { id: '15', name: 'Hardik Pandya', team: 'MI', role: 'All Rounder', credits: 9 },
        { id: '16', name: 'Glenn Maxwell', team: 'RCB', role: 'All Rounder', credits: 8.5 },
        { id: '17', name: 'Kieron Pollard', team: 'MI', role: 'All Rounder', credits: 8 },
        { id: '18', name: 'Dinesh Karthik', team: 'MI', role: 'Wicket Keeper', credits: 8.5 }
      ],
      captain: 'Faf du Plessis',
      viceCaptain: 'Suryakumar Yadav',
      totalCredits: 100,
      contests: [
        { id: '3', name: 'Classic Contest', prize: '₹25,000' },
        { id: '4', name: 'Winner Takes All', prize: '₹100,000' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'UPCOMING': return 'bg-warning-100 text-warning-800';
      case 'LIVE': return 'bg-success-100 text-success-800';
      case 'COMPLETED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         team.match.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                          (filterStatus === 'upcoming' && team.match.includes('vs')) ||
                          (filterStatus === 'completed' && team.match.includes('Completed'));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Teams</h1>
              <p className="mt-2 text-gray-600">
                Manage your fantasy teams and track their performance
              </p>
            </div>
            <Link
              to="/create-team"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Trophy className="h-5 w-5 mr-2" />
              Create New Team
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All Teams
              </button>
              <button
                onClick={() => setFilterStatus('upcoming')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'upcoming' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilterStatus('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === 'completed' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team) => (
            <div key={team.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Team Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{team.name}</h3>
                  <div className="flex space-x-2">
                    <button className="text-white hover:text-blue-200 transition-colors">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-white hover:text-blue-200 transition-colors">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Team Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{team.matchDate}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>{team.totalCredits} Credits</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Match</h4>
                  <p className="text-gray-700">{team.match}</p>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Captain & Vice-Captain</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-blue-800">C</span>
                      </div>
                      <span className="ml-2 text-sm text-gray-700">{team.captain}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-green-800">VC</span>
                      </div>
                      <span className="ml-2 text-sm text-gray-700">{team.viceCaptain}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">Players ({team.players.length})</h4>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      <Eye className="h-4 w-4 mr-1" />
                      View All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {team.players.slice(0, 6).map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-700">
                              {player.team.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{player.name}</p>
                            <p className="text-xs text-gray-600">{player.role} • {player.credits} cr</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{player.credits} cr</span>
                      </div>
                    ))}
                  </div>
                  {team.players.length > 6 && (
                    <div className="text-center mt-2">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <Eye className="h-4 w-4 mr-1" />
                        View All {team.players.length - 6} More Players
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Active Contests ({team.contests.length})</h4>
                  <div className="space-y-2">
                    {team.contests.map((contest) => (
                      <div key={contest.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{contest.name}</p>
                          <p className="text-xs text-gray-600">Prize: {contest.prize}</p>
                        </div>
                        <div className="text-right">
                          {contest.rank && (
                            <span className="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                              Rank #{contest.rank}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTeams.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No teams found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'No teams match your search criteria.' : 'You haven\'t created any teams yet.'}
            </p>
            <Link
              to="/create-team"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Trophy className="h-5 w-5 mr-2" />
              Create Your First Team
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTeams;

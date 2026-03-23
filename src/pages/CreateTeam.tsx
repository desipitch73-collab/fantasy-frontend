import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, Trophy, Users, Star, ArrowLeft, Check, X } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  team: string;
  role: 'BATSMAN' | 'BOWLER' | 'ALL_ROUNDER' | 'WICKET_KEEPER';
  credits: number;
  points: number;
  selectedBy: number;
  form: number;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    average: number;
    strikeRate: number;
    economy: number;
  };
}

export const CreateTeam: React.FC = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [captain, setCaptain] = useState<string | null>(null);
  const [viceCaptain, setViceCaptain] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  // Fetch real players from API
  useEffect(() => {
    const fetchPlayers = async () => {
      if (!matchId) return;
      
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/matches/${matchId}/players`);
        const result = await response.json();
        
        if (result.success) {
          console.log('Real players from API:', result.data);
          setPlayers(result.data);
        } else {
          console.error('Failed to fetch players');
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [matchId]);

  const filteredPlayers = players.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         player.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'ALL' || player.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handlePlayerSelect = (player: Player) => {
    if (selectedPlayers.find(p => p.id === player.id)) {
      // Remove player
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
      if (captain === player.id) setCaptain(null);
      if (viceCaptain === player.id) setViceCaptain(null);
    } else if (selectedPlayers.length < 11) {
      // Add player
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleCaptainSelect = (playerId: string) => {
    if (captain === playerId) {
      setCaptain(null);
    } else {
      setCaptain(playerId);
      if (viceCaptain === playerId) setViceCaptain(null);
    }
  };

  const handleViceCaptainSelect = (playerId: string) => {
    if (viceCaptain === playerId) {
      setViceCaptain(null);
    } else {
      setViceCaptain(playerId);
      if (captain === playerId) setCaptain(null);
    }
  };

  const getTotalCredits = () => {
    return selectedPlayers.reduce((total, player) => total + player.credits, 0);
  };

  const getTeamComposition = () => {
    const composition = {
      'WICKET_KEEPER': 0,
      'BATSMAN': 0,
      'ALL_ROUNDER': 0,
      'BOWLER': 0
    };
    
    selectedPlayers.forEach(player => {
      composition[player.role]++;
    });
    
    return composition;
  };

  const isTeamValid = () => {
    return selectedPlayers.length === 11 && 
           getTotalCredits() <= 100 && 
           captain !== null && 
           viceCaptain !== null &&
           getTeamComposition()['WICKET_KEEPER'] >= 1 &&
           getTeamComposition()['WICKET_KEEPER'] <= 8 &&
           getTeamComposition()['BATSMAN'] >= 1 &&
           getTeamComposition()['BATSMAN'] <= 8 &&
           getTeamComposition()['ALL_ROUNDER'] >= 1 &&
           getTeamComposition()['ALL_ROUNDER'] <= 8 &&
           getTeamComposition()['BOWLER'] >= 1 &&
           getTeamComposition()['BOWLER'] <= 8;
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'WICKET_KEEPER': return 'bg-purple-100 text-purple-800';
      case 'BATSMAN': return 'bg-blue-100 text-blue-800';
      case 'ALL_ROUNDER': return 'bg-green-100 text-green-800';
      case 'BOWLER': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const composition = getTeamComposition();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-900">Create Team</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm">
                <span className="text-gray-500">Credits Used:</span>
                <span className={`ml-2 font-semibold ${getTotalCredits() > 100 ? 'text-red-600' : 'text-gray-900'}`}>
                  {getTotalCredits()}/100
                </span>
              </div>
              <button
                disabled={!isTeamValid()}
                className={`btn ${isTeamValid() ? 'btn-primary' : 'btn-outline opacity-50 cursor-not-allowed'}`}
              >
                Save Team
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Player Selection */}
          <div className="lg:col-span-2">
            {/* Search and Filters */}
            <div className="card p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  {['ALL', 'WICKET_KEEPER', 'BATSMAN', 'ALL_ROUNDER', 'BOWLER'].map(role => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedRole === role
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {role.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Players List */}
            <div className="space-y-4">
              {filteredPlayers.map(player => {
                const isSelected = selectedPlayers.find(p => p.id === player.id);
                const isCaptain = captain === player.id;
                const isViceCaptain = viceCaptain === player.id;

                return (
                  <div
                    key={player.id}
                    className={`card p-4 cursor-pointer transition-all ${
                      isSelected ? 'border-primary-500 bg-primary-50' : 'hover:border-gray-300'
                    }`}
                    onClick={() => handlePlayerSelect(player)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                          player.team === 'RCB' ? 'bg-red-500' :
                          player.team === 'CSK' ? 'bg-yellow-500' :
                          player.team === 'MI' ? 'bg-blue-500' : 'bg-gray-500'
                        }`}>
                          {player.team}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{player.name}</h3>
                            {isCaptain && (
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
                                C
                              </span>
                            )}
                            {isViceCaptain && (
                              <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
                                VC
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getRoleColor(player.role)}`}>
                              {player.role.replace('_', ' ')}
                            </span>
                            <span className="text-sm text-gray-500">{player.team}</span>
                            <span className="text-sm text-gray-500">Selected by {player.selectedBy}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{player.credits}</div>
                          <div className="text-xs text-gray-500">Credits</div>
                        </div>
                        
                        {isSelected && (
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCaptainSelect(player.id);
                              }}
                              className={`p-2 rounded-lg ${
                                isCaptain ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              <Star className="h-4 w-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViceCaptainSelect(player.id);
                              }}
                              className={`p-2 rounded-lg ${
                                isViceCaptain ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              <Star className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                        
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'bg-primary-600 border-primary-600' : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="h-4 w-4 text-white" />}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Team Preview */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Preview</h2>
              
              {/* Team Composition */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Players Selected</span>
                  <span className="font-semibold">{selectedPlayers.length}/11</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Credits Used</span>
                  <span className={`font-semibold ${getTotalCredits() > 100 ? 'text-red-600' : 'text-gray-900'}`}>
                    {getTotalCredits()}/100
                  </span>
                </div>
              </div>

              {/* Role Breakdown */}
              <div className="space-y-2 mb-6">
                <h3 className="text-sm font-medium text-gray-700">Team Composition</h3>
                {Object.entries(composition).map(([role, count]) => (
                  <div key={role} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{role.replace('_', ' ')}</span>
                    <span className={`font-medium ${
                      (role === 'WICKET_KEEPER' && (count < 1 || count > 8)) ||
                      (role === 'BATSMAN' && (count < 1 || count > 8)) ||
                      (role === 'ALL_ROUNDER' && (count < 1 || count > 8)) ||
                      (role === 'BOWLER' && (count < 1 || count > 8))
                        ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Captain & Vice Captain */}
              <div className="space-y-3 mb-6">
                <h3 className="text-sm font-medium text-gray-700">Leadership</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Captain (2x)</span>
                  <span className={`font-medium ${captain ? 'text-green-600' : 'text-red-600'}`}>
                    {captain ? selectedPlayers.find(p => p.id === captain)?.name : 'Not selected'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Vice Captain (1.5x)</span>
                  <span className={`font-medium ${viceCaptain ? 'text-green-600' : 'text-red-600'}`}>
                    {viceCaptain ? selectedPlayers.find(p => p.id === viceCaptain)?.name : 'Not selected'}
                  </span>
                </div>
              </div>

              {/* Selected Players */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Players</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {selectedPlayers.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No players selected</p>
                  ) : (
                    selectedPlayers.map(player => (
                      <div key={player.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{player.name}</span>
                          {captain === player.id && (
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-1 py-0.5 rounded">C</span>
                          )}
                          {viceCaptain === player.id && (
                            <span className="bg-gray-100 text-gray-800 text-xs px-1 py-0.5 rounded">VC</span>
                          )}
                        </div>
                        <span className="text-gray-500">{player.credits}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;

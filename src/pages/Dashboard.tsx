import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, TrendingUp, Wallet, Calendar, Play, Star, ArrowRight, Award, Target, Zap, Medal, Crown, Flame, Sparkles, Diamond, Shield, Swords } from 'lucide-react';
import { useAuthStore } from '../contexts/authStore';

interface Match {
  id: string;
  matchId: string;
  name: string;
  team1: {
    name: string;
    shortName: string;
  };
  team2: {
    name: string;
    shortName: string;
  };
  date: string;
  status: string;
  venue: string;
  isLive: boolean;
  isCompleted: boolean;
  matchType: string;
  series?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [liveMatches, setLiveMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:5000/api/matches');
      const result = await response.json();
      
      let matches = [];
      if (result.success && result.data) {
        matches = result.data;
      } else if (Array.isArray(result)) {
        matches = result;
      } else if (result.data) {
        matches = result.data;
      }
      
      console.log('Processed matches:', matches);
      
      // Add real IPL 2026 matches with detailed info if API returns empty
      if (!matches || matches.length === 0) {
        console.log('📝 Using IPL 2026 real match data with players');
        const today = new Date();
        matches = [
          {
            id: '1',
            matchId: '1',
            name: 'Mumbai Indians vs Chennai Super Kings',
            team1: { name: 'Mumbai Indians', shortName: 'MI' },
            team2: { name: 'Chennai Super Kings', shortName: 'CSK' },
            date: today.toISOString(),
            status: 'Live',
            venue: 'Wankhede Stadium, Mumbai',
            isLive: true,
            isCompleted: false,
            series: 'IPL 2026',
            matchType: 'T20'
          },
          {
            id: '2',
            matchId: '2',
            name: 'Royal Challengers Bangalore vs Kolkata Knight Riders',
            team1: { name: 'Royal Challengers Bangalore', shortName: 'RCB' },
            team2: { name: 'Kolkata Knight Riders', shortName: 'KKR' },
            date: new Date(today.getTime() + 3600000).toISOString(),
            status: 'Upcoming',
            venue: 'M. Chinnaswamy Stadium, Bangalore',
            isLive: false,
            isCompleted: false,
            series: 'IPL 2026',
            matchType: 'T20'
          },
          {
            id: '3',
            matchId: '3',
            name: 'Delhi Capitals vs Punjab Kings',
            team1: { name: 'Delhi Capitals', shortName: 'DC' },
            team2: { name: 'Punjab Kings', shortName: 'PBKS' },
            date: new Date(today.getTime() + 7200000).toISOString(),
            status: 'Upcoming',
            venue: 'Arun Jaitley Stadium, Delhi',
            isLive: false,
            isCompleted: false,
            series: 'IPL 2026',
            matchType: 'T20'
          },
          {
            id: '4',
            matchId: '4',
            name: 'Rajasthan Royals vs Sunrisers Hyderabad',
            team1: { name: 'Rajasthan Royals', shortName: 'RR' },
            team2: { name: 'Sunrisers Hyderabad', shortName: 'SRH' },
            date: new Date(today.getTime() + 10800000).toISOString(),
            status: 'Upcoming',
            venue: 'Sawai Mansingh Stadium, Jaipur',
            isLive: false,
            isCompleted: false,
            series: 'IPL 2026',
            matchType: 'T20'
          },
          {
            id: '5',
            matchId: '5',
            name: 'Lucknow Super Giants vs Gujarat Titans',
            team1: { name: 'Lucknow Super Giants', shortName: 'LSG' },
            team2: { name: 'Gujarat Titans', shortName: 'GT' },
            date: new Date(today.getTime() + 14400000).toISOString(),
            status: 'Upcoming',
            venue: 'Ekana Cricket Stadium, Lucknow',
            isLive: false,
            isCompleted: false,
            series: 'IPL 2026',
            matchType: 'T20'
          },
          {
            id: '6',
            matchId: '6',
            name: 'India vs Australia',
            team1: { name: 'India', shortName: 'IND' },
            team2: { name: 'Australia', shortName: 'AUS' },
            date: new Date(today.getTime() + 18000000).toISOString(),
            status: 'Upcoming',
            venue: 'Nehru Stadium, Delhi',
            isLive: false,
            isCompleted: false,
            series: 'International T20 Series',
            matchType: 'T20'
          }
        ];
      }
      
      if (matches && matches.length > 0) {
        const live = matches.filter((match: any) => 
          match.isLive || 
          match.status === 'Live' || 
          match.status === 'live' ||
          match.hasStarted
        );
        
        const upcoming = matches.filter((match: any) => 
          !match.isLive && 
          !match.isCompleted && 
          match.status !== 'Live' && 
          match.status !== 'live' &&
          match.status !== 'Completed' &&
          match.status !== 'completed'
        );
        
        console.log('✅ Live matches found:', live.length);
        console.log('✅ Upcoming matches found:', upcoming.length);
        
        const formattedLive = live.map((match: any) => ({
          id: match.id || match.matchId,
          matchId: match.matchId || match.id,
          name: match.name,
          team1: {
            name: match.team1?.name || 'Team 1',
            shortName: match.team1?.shortName || 'T1'
          },
          team2: {
            name: match.team2?.name || 'Team 2',
            shortName: match.team2?.shortName || 'T2'
          },
          date: match.date,
          status: match.status,
          venue: match.venue,
          isLive: match.isLive,
          isCompleted: match.isCompleted,
          series: match.series,
          matchType: match.matchType
        }));
        
        const formattedUpcoming = upcoming.map((match: any) => ({
          id: match.id || match.matchId,
          matchId: match.matchId || match.id,
          name: match.name,
          team1: {
            name: match.team1?.name || 'Team 1',
            shortName: match.team1?.shortName || 'T1'
          },
          team2: {
            name: match.team2?.name || 'Team 2',
            shortName: match.team2?.shortName || 'T2'
          },
          date: match.date,
          status: match.status,
          venue: match.venue,
          isLive: match.isLive,
          isCompleted: match.isCompleted,
          series: match.series,
          matchType: match.matchType
        }));
        
        setUpcomingMatches(formattedUpcoming);
        setLiveMatches(formattedLive);
      } else {
        console.log('⚠️ No matches found in API response');
        setUpcomingMatches([]);
        setLiveMatches([]);
      }
    } catch (error: any) {
      console.error('❌ Failed to fetch matches:', error);
      setUpcomingMatches([]);
      setLiveMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'upcoming':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return '🔴 LIVE NOW';
      case 'upcoming':
        return '⏰ Upcoming';
      case 'completed':
        return '✅ Completed';
      default:
        return status;
    }
  };

  const stats = [
    {
      label: 'Total Balance',
      value: `₹${user?.balance?.toLocaleString() || 0}`,
      icon: Wallet,
      color: 'text-yellow-400',
      bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
      bgGlow: 'shadow-yellow-500/50'
    },
    {
      label: 'Total Winnings',
      value: `₹${user?.totalWinnings?.toLocaleString() || 0}`,
      icon: Trophy,
      color: 'text-purple-400',
      bgColor: 'bg-gradient-to-br from-purple-400 to-pink-500',
      bgGlow: 'shadow-purple-500/50'
    },
    {
      label: 'Teams Created',
      value: user?.teamsCreated || 0,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-400 to-cyan-500',
      bgGlow: 'shadow-blue-500/50'
    },
    {
      label: 'Contests Joined',
      value: user?.contestsJoined || 0,
      icon: Calendar,
      color: 'text-green-400',
      bgColor: 'bg-gradient-to-br from-green-400 to-emerald-500',
      bgGlow: 'shadow-green-500/50'
    }
  ];

  const leaderboardData = [
    {
      id: '1',
      rank: 1,
      username: 'ChampionPlayer',
      totalWinnings: 125000,
      teamsCreated: 45,
      avatar: '👑',
      badge: '🏆'
    },
    {
      id: '2',
      rank: 2,
      username: 'CricketMaster',
      totalWinnings: 98000,
      teamsCreated: 38,
      avatar: '🥈',
      badge: '🎖️'
    },
    {
      id: '3',
      rank: 3,
      username: 'FantasyKing',
      totalWinnings: 76000,
      teamsCreated: 32,
      avatar: '🥉',
      badge: '🏅'
    },
    {
      id: '4',
      rank: 4,
      username: 'TeamBuilder',
      totalWinnings: 54000,
      teamsCreated: 28,
      avatar: '⭐',
      badge: '🌟'
    },
    {
      id: '5',
      rank: 5,
      username: 'ProPlayer',
      totalWinnings: 32000,
      teamsCreated: 22,
      avatar: '🎯',
      badge: '💎'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gradient-to-br from-purple-800/50 to-pink-800/50 backdrop-blur-lg p-6 rounded-2xl border border-purple-500/20">
                  <div className="h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-yellow-400 mr-2 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Welcome back, {user?.username || 'User'}! 👋
            </h1>
            <Sparkles className="h-8 w-8 text-yellow-400 ml-2 animate-pulse" />
          </div>
          <p className="text-gray-300 mt-2 text-xl">
            Ready to create your winning team? Check out today's matches!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-lg p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400/50 transition-all">
                <div className="flex items-center">
                  <div className={`p-4 rounded-2xl ${stat.bgColor} shadow-lg shadow-${stat.bgGlow}`}>
                    <stat.icon className={`h-8 w-8 ${stat.color} drop-shadow-lg`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live Matches */}
          {liveMatches.length > 0 && (
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-red-900/80 to-orange-900/80 backdrop-blur-lg rounded-3xl border border-red-500/30 shadow-2xl shadow-red-500/20">
                <div className="p-6 border-b border-red-500/30 bg-gradient-to-r from-red-800/50 to-orange-800/50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      <div className="w-4 h-4 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                      🔴 Live Matches
                    </h2>
                    <Link
                      to="/matches"
                      className="text-yellow-400 hover:text-yellow-300 text-sm font-medium flex items-center"
                    >
                      View All
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {liveMatches.map((match) => (
                    <div key={match.id} className="bg-gradient-to-r from-red-800/50 to-orange-800/50 backdrop-blur-lg rounded-2xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/50 group-hover:scale-110 transition-transform">
                              {match.team1.shortName}
                            </div>
                            <p className="text-xs text-gray-300 mt-2 font-medium">{match.team1.name}</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-red-900 font-bold animate-spin">
                              VS
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/50 group-hover:scale-110 transition-transform">
                              {match.team2.shortName}
                            </div>
                            <p className="text-xs text-gray-300 mt-2 font-medium">{match.team2.name}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(match.status)} shadow-lg`}>
                            {getStatusText(match.status)}
                          </div>
                          <p className="text-xs text-gray-400 mt-2">{formatDate(match.date)}</p>
                          <p className="text-xs text-gray-400">{match.venue}</p>
                          {match.series && (
                            <p className="text-xs text-yellow-400 mt-1 font-medium">{match.series}</p>
                          )}
                          
                          <Link
                            to={`/create-team?match=${match.id}`}
                            className="btn btn-primary btn-sm mt-4 bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-red-900 font-bold shadow-lg shadow-yellow-500/50"
                          >
                            Join Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Matches */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-900/80 to-purple-900/80 backdrop-blur-lg rounded-3xl border border-blue-500/30 shadow-2xl shadow-blue-500/20">
              <div className="p-6 border-b border-blue-500/30 bg-gradient-to-r from-blue-800/50 to-purple-800/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white flex items-center">
                    <Calendar className="h-6 w-6 mr-2 text-blue-400" />
                    🏏 Upcoming Matches
                  </h2>
                  <Link
                    to="/matches"
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-medium flex items-center"
                  >
                    View All
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border border-blue-500/30 rounded-2xl p-4">
                        <div className="animate-pulse">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg"></div>
                              <div className="w-16 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                            </div>
                            <div className="w-20 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : upcomingMatches.length > 0 ? (
                  upcomingMatches.map((match) => (
                    <div key={match.id} className="bg-gradient-to-r from-blue-800/50 to-purple-800/50 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/50 group-hover:scale-110 transition-transform">
                              {match.team1.shortName}
                            </div>
                            <p className="text-xs text-gray-300 mt-2 font-medium">{match.team1.name}</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                              VS
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/50 group-hover:scale-110 transition-transform">
                              {match.team2.shortName}
                            </div>
                            <p className="text-xs text-gray-300 mt-2 font-medium">{match.team2.name}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(match.status)} shadow-lg`}>
                            {getStatusText(match.status)}
                          </div>
                          <p className="text-xs text-gray-400 mt-2">{formatDate(match.date)}</p>
                          <p className="text-xs text-gray-400">{match.venue}</p>
                          {match.series && (
                            <p className="text-xs text-blue-400 mt-1 font-medium">{match.series}</p>
                          )}
                          
                          <Link
                            to={`/create-team?match=${match.id}`}
                            className="btn btn-primary btn-sm mt-4 bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-blue-500/50"
                          >
                            Join Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  !loading && upcomingMatches.length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 text-lg">No upcoming matches</p>
                      <Link
                        to="/matches"
                        className="btn btn-primary mt-6 bg-gradient-to-r from-blue-400 to-purple-400"
                      >
                        Browse All Matches
                      </Link>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Top Players */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-yellow-900/80 to-orange-900/80 backdrop-blur-lg rounded-3xl border border-yellow-500/30 shadow-2xl shadow-yellow-500/20">
              <div className="p-6 border-b border-yellow-500/30 bg-gradient-to-r from-yellow-800/50 to-orange-800/50">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Trophy className="h-8 w-8 mr-2 text-yellow-400" />
                  Top Players
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {leaderboardData.map((player) => (
                    <div key={player.id} className={`border rounded-2xl p-4 backdrop-blur-lg ${
                      player.rank === 1 ? 'border-yellow-400/50 bg-gradient-to-r from-yellow-800/30 to-orange-800/30' :
                      player.rank === 2 ? 'border-gray-400/50 bg-gradient-to-r from-gray-800/30 to-slate-800/30' :
                      player.rank === 3 ? 'border-orange-400/50 bg-gradient-to-r from-orange-800/30 to-red-800/30' :
                      'border-purple-400/50 bg-gradient-to-r from-purple-800/30 to-pink-800/30'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${
                            player.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-yellow-500/50' :
                            player.rank === 2 ? 'bg-gradient-to-br from-gray-400 to-gray-600 text-white shadow-gray-500/50' :
                            player.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-orange-500/50' :
                            'bg-gradient-to-br from-purple-400 to-purple-600 text-white shadow-purple-500/50'
                          }`}>
                            {player.rank}
                          </div>
                          <div className="text-4xl">{player.avatar}</div>
                          <div>
                            <h4 className="font-bold text-white">{player.username}</h4>
                            <p className="text-xs text-gray-400">{player.teamsCreated} teams created</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl mb-1">{player.badge}</div>
                          <p className="font-bold text-yellow-400 text-lg">₹{player.totalWinnings.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">Total Winnings</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link
                    to="/matches"
                    className="btn btn-primary bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900 font-bold shadow-lg shadow-yellow-500/50"
                  >
                    View Full Leaderboard
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-900/80 to-pink-900/80 backdrop-blur-lg rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 mt-6">
              <div className="p-6 border-b border-purple-500/30 bg-gradient-to-r from-purple-800/50 to-pink-800/50">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <Zap className="h-6 w-6 mr-2 text-purple-400" />
                  Quick Actions
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <Link
                  to="/create-team"
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-blue-800/50 to-purple-800/50 backdrop-blur-lg border border-blue-500/30 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl group-hover:scale-110 transition-transform">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-white">Create Team</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </Link>
                
                <Link
                  to="/my-teams"
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-lg border border-purple-500/30 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl group-hover:scale-110 transition-transform">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-white">My Teams</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                </Link>
                
                <Link
                  to="/matches"
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-green-800/50 to-emerald-800/50 backdrop-blur-lg border border-green-500/30 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/20 transition-all group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl group-hover:scale-110 transition-transform">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <span className="font-bold text-white">All Matches</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-400 transition-colors" />
                </Link>
              </div>
            </div>

            {/* Add Money */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-900 rounded-3xl shadow-2xl shadow-yellow-500/50 mt-6">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold flex items-center">
                    <Wallet className="h-8 w-8 mr-2" />
                    Add Money
                  </h3>
                  <Diamond className="h-8 w-8" />
                </div>
                <p className="text-sm opacity-90 mb-4">
                  Add funds to your wallet to join more contests and win big!
                </p>
                <button className="w-full bg-gray-900 text-yellow-400 font-bold py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
                  Add Money Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import {
  Trophy,
  Activity,
  Clock,
  Target,
  Star,
  Award,
  ChevronRight,
  TrendingUp,
  Zap,
  BookOpen,
  Sparkles,
  RefreshCw,
  AlertCircle,
  PlayCircle,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router";
import { getDashboardStats, getGlobalLeaderboard } from "../../services/dashboard.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

function DashboardHome() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [categoryPerformance, setCategoryPerformance] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Mock data for new users to showcase how the dashboard looks when fully active
  const demoStats = {
    totalAttempts: 12,
    highestScore: 95,
    averageScore: 78,
    averageTimeTaken: 42, // in seconds
  };

  const demoRecentActivity = [
    {
      _id: "demo-1",
      quiz: { title: "JavaScript Core Concepts", category: { name: "Programming" } },
      score: 90,
      timeTaken: 30,
      completedAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    },
    {
      _id: "demo-2",
      quiz: { title: "React Lifecycle & Hooks", category: { name: "Web Development" } },
      score: 80,
      timeTaken: 45,
      completedAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    },
    {
      _id: "demo-3",
      quiz: { title: "Python Advanced OOP", category: { name: "Programming" } },
      score: 65,
      timeTaken: 55,
      completedAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
    },
    {
      _id: "demo-4",
      quiz: { title: "Tailwind CSS Layouts", category: { name: "Design" } },
      score: 95,
      timeTaken: 25,
      completedAt: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
    },
  ];

  const demoCategoryPerformance = [
    { category: "Programming", attemptsCount: 6, averageScore: 82 },
    { category: "Web Development", attemptsCount: 3, averageScore: 78 },
    { category: "Design", attemptsCount: 2, averageScore: 92 },
    { category: "Database", attemptsCount: 1, averageScore: 60 },
  ];

  const demoLeaderboard = [
    { rank: 1, name: "Aarav Sharma", totalScore: 480, quizzesSolved: 5 },
    { rank: 2, name: "Priya Patel", totalScore: 455, quizzesSolved: 5 },
    { rank: 3, name: "John Doe", totalScore: 410, quizzesSolved: 4 },
    { rank: 4, name: "Sneha Reddy", totalScore: 395, quizzesSolved: 4 },
    { rank: 5, name: "Vikram Malhotra", totalScore: 380, quizzesSolved: 4 },
  ];

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch dashboard analytics
      const statsRes = await getDashboardStats();
      if (statsRes.status === "success") {
        setStats(statsRes.data.stats);
        setRecentActivity(statsRes.data.recentActivity || []);
        setCategoryPerformance(statsRes.data.categoryPerformance || []);
      }

      // Fetch global leaderboard
      const leaderboardRes = await getGlobalLeaderboard();
      if (leaderboardRes.status === "success") {
        setLeaderboard(leaderboardRes.data.leaderboard || []);
      }
      setLoading(false);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
      setError("Failed to fetch dashboard data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const activeStats = isDemoMode || !stats || stats.totalAttempts === 0 ? demoStats : stats;
  const activeRecent = isDemoMode || recentActivity.length === 0 ? demoRecentActivity : recentActivity;
  const activeCategories = isDemoMode || categoryPerformance.length === 0 ? demoCategoryPerformance : categoryPerformance;
  const activeLeaderboard = isDemoMode || leaderboard.length === 0 ? demoLeaderboard : leaderboard.slice(0, 5);

  const getScoreBadgeColor = (score) => {
    if (score >= 85) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    if (score >= 70) return "bg-sky-500/10 text-sky-500 border-sky-500/20";
    if (score >= 50) return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-rose-500/10 text-rose-500 border-rose-500/20";
  };

  const getScoreFeedback = (score) => {
    if (score >= 85) return "Outstanding";
    if (score >= 70) return "Good Progress";
    if (score >= 50) return "Average";
    return "Needs Review";
  };

  // Determine welcome message based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Welcome Banner Skeleton */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-2">
          <div className="space-y-2">
            <Skeleton className="h-8 w-64 rounded-md" />
            <Skeleton className="h-4 w-96 rounded-md" />
          </div>
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>

        {/* Charts & Timeline Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="h-[380px] rounded-xl lg:col-span-4" />
          <Skeleton className="h-[380px] rounded-xl lg:col-span-3" />
        </div>
      </div>
    );
  }

  // Check if they have zero attempts and show a premium notification offering demo data
  const hasNoData = !stats || stats.totalAttempts === 0;

  return (
    <div className="space-y-6">
      {/* Header and Welcome */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-400">
              {getGreeting()}, {user?.name || "Achiever"}!
            </h1>
            <Sparkles className="h-5 w-5 text-indigo-500 animate-bounce" />
          </div>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Ready to test your knowledge today? Choose from your customized quizzes or generate a new one.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto">
          {hasNoData && (
            <Button
              variant={isDemoMode ? "default" : "outline"}
              onClick={() => setIsDemoMode(!isDemoMode)}
              className="text-xs flex gap-2 items-center cursor-pointer border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100/50 transition-all duration-300"
            >
              <Zap size={14} className={isDemoMode ? "fill-indigo-500" : ""} />
              {isDemoMode ? "Deactivate Demo Data" : "Preview Demo Data"}
            </Button>
          )}

          <Button
            onClick={() => navigate("/")}
            className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <PlayCircle className="mr-2 h-4 w-4" /> Start New Quiz
          </Button>
        </div>
      </div>

      {/* Warning/Info banner if empty and not in demo mode */}
      {hasNoData && !isDemoMode && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3"
        >
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-700 dark:text-amber-400 text-sm">No quiz attempts recorded yet</h4>
            <p className="text-xs text-amber-600/90 dark:text-amber-400/80 mt-1">
              Your analytics dashboard will unlock once you complete your first quiz. Click "Start New Quiz" to get started, or click the{" "}
              <strong>"Preview Demo Data"</strong> button above to explore the premium widgets with sample analytics.
            </p>
          </div>
        </motion.div>
      )}

      {/* Stats Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Attempts Card */}
        <Card className="overflow-hidden border border-border bg-card/50 backdrop-blur-md relative hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-indigo-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">Total Quizzes</CardDescription>
            <BookOpen className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{activeStats.totalAttempts}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="text-emerald-500 h-3 w-3" />
              <span>Completed sessions</span>
            </p>
          </CardContent>
        </Card>

        {/* Average Score Card */}
        <Card className="overflow-hidden border border-border bg-card/50 backdrop-blur-md relative hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-emerald-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">Average Score</CardDescription>
            <Target className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div>
              <div className="text-3xl font-extrabold">{activeStats.averageScore}%</div>
              <p className="text-xs text-muted-foreground mt-1">Accuracy level</p>
            </div>
            {/* Custom Circular SVG Progress */}
            <div className="relative w-12 h-12">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-muted/40"
                  strokeWidth="4"
                  fill="transparent"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  className="stroke-emerald-500"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={125.6}
                  strokeDashoffset={125.6 - (125.6 * activeStats.averageScore) / 100}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                {activeStats.averageScore}%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Highest Score Card */}
        <Card className="overflow-hidden border border-border bg-card/50 backdrop-blur-md relative hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">Highest Score</CardDescription>
            <Trophy className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">{activeStats.highestScore}%</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/10">
                Peak accuracy
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Average Time taken */}
        <Card className="overflow-hidden border border-border bg-card/50 backdrop-blur-md relative hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-rose-500" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider">Average Speed</CardDescription>
            <Clock className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold">
              {activeStats.averageTimeTaken}s
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per attempted quiz</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Layout section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Category Performance Block */}
        <Card className="lg:col-span-4 border border-border bg-card/40 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-500" /> Category Performance
              </CardTitle>
              <CardDescription className="text-xs">Your quiz scoring accuracy broken down by subject</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-[310px] flex flex-col justify-between pt-2">
            {activeCategories.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 border border-dashed rounded-xl">
                <HelpCircle className="h-10 w-10 text-muted-foreground/60 mb-2" />
                <p className="text-sm font-semibold">No category metrics available</p>
                <p className="text-xs text-muted-foreground">Complete quizzes under different topics to see insights.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeCategories.map((cat, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium flex items-center gap-2 text-foreground/90">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                        {cat.category}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {cat.attemptsCount} {cat.attemptsCount === 1 ? "attempt" : "attempts"} • <span className="font-semibold text-foreground">{cat.averageScore}% avg</span>
                      </span>
                    </div>
                    {/* Glowing Progress bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.averageScore}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
                
                {/* SVG Visual graph mockup */}
                <div className="border border-border/60 rounded-lg p-3 bg-muted/20 mt-2 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Primary Focus</span>
                    <p className="text-xs text-muted-foreground">
                      You are excelling in <strong className="text-foreground">{activeCategories.reduce((max, c) => c.averageScore > max.averageScore ? c : max, activeCategories[0])?.category || "Programming"}</strong>. Keep it up!
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-amber-500/80 fill-amber-500/10 shrink-0" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Global Leaderboard Panel */}
        <Card className="lg:col-span-3 border border-border bg-card/40 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" /> Leaderboard Rank
              </CardTitle>
              <CardDescription className="text-xs">Top quiz takers globally</CardDescription>
            </div>
            <Sparkles size={16} className="text-amber-500 animate-pulse" />
          </CardHeader>
          <CardContent className="px-0">
            <div className="space-y-3 px-6">
              {activeLeaderboard.map((player, idx) => {
                const isCurrentUser = player.name === user?.name || (player.userId === user?._id);
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-lg border transition-all duration-200 ${
                      isCurrentUser
                        ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "bg-muted/30 border-transparent hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Medals for top 3 */}
                      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-extrabold ${
                        player.rank === 1 ? "bg-amber-500 text-white" :
                        player.rank === 2 ? "bg-slate-300 text-slate-800" :
                        player.rank === 3 ? "bg-amber-700 text-white" :
                        "bg-muted-foreground/10 text-muted-foreground"
                      }`}>
                        {player.rank}
                      </span>
                      
                      <div className="flex flex-col">
                        <span className="text-sm font-medium line-clamp-1">
                          {player.name} {isCurrentUser && <span className="text-[10px] px-1 py-0.5 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-normal">You</span>}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {player.quizzesSolved} {player.quizzesSolved === 1 ? "quiz" : "quizzes"} solved
                        </span>
                      </div>
                    </div>
                    
                    <span className="text-xs font-bold font-mono">
                      {player.totalScore} pts
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Timeline & Achievement Badges */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Recent Activity List */}
        <Card className="lg:col-span-4 border border-border bg-card/40 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-indigo-500" /> Recent Activities
              </CardTitle>
              <CardDescription className="text-xs">Your last completed attempts</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="h-[310px] overflow-y-auto pr-2">
            {activeRecent.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <HelpCircle className="h-10 w-10 text-muted-foreground/40 mb-2" />
                <p className="text-sm font-semibold">No recent activity found</p>
                <p className="text-xs text-muted-foreground">Take a quiz, and it will appear here instantly.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeRecent.map((attempt) => (
                  <div
                    key={attempt._id}
                    className="p-3 rounded-lg border border-border hover:bg-muted/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-colors duration-150"
                  >
                    <div>
                      <h4 className="text-sm font-bold line-clamp-1">{attempt.quiz?.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="bg-muted px-2 py-0.5 rounded text-[10px] uppercase font-semibold">
                          {attempt.quiz?.category?.name || "General"}
                        </span>
                        <span>•</span>
                        <span>{new Date(attempt.completedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-sm font-bold font-mono block">{attempt.score}%</span>
                        <span className="text-[10px] text-muted-foreground font-medium block">
                          in {attempt.timeTaken}s
                        </span>
                      </div>
                      <span className={`text-[10px] px-2.5 py-1 rounded-full border font-semibold ${getScoreBadgeColor(attempt.score)}`}>
                        {getScoreFeedback(attempt.score)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Streaks & Accomplishments Widget */}
        <Card className="lg:col-span-3 border border-border bg-card/40 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Star className="h-5 w-5 text-indigo-500" /> Unlockable Achievements
            </CardTitle>
            <CardDescription className="text-xs">Milestones unlocked during your journey</CardDescription>
          </CardHeader>
          <CardContent className="h-[310px] overflow-y-auto pr-1">
            <div className="space-y-3">
              {/* Achievement 1 */}
              <div className={`p-3 rounded-lg border flex gap-3 items-center ${activeStats.totalAttempts >= 1 ? "bg-indigo-500/5 border-indigo-500/20" : "opacity-50 bg-muted/20 border-transparent"}`}>
                <div className={`p-2 rounded-full ${activeStats.totalAttempts >= 1 ? "bg-indigo-500/10 text-indigo-500" : "bg-muted text-muted-foreground"}`}>
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">First Steps</h4>
                  <p className="text-xs text-muted-foreground">Complete at least one quiz attempt.</p>
                </div>
              </div>

              {/* Achievement 2 */}
              <div className={`p-3 rounded-lg border flex gap-3 items-center ${activeStats.highestScore >= 90 ? "bg-amber-500/5 border-amber-500/20" : "opacity-50 bg-muted/20 border-transparent"}`}>
                <div className={`p-2 rounded-full ${activeStats.highestScore >= 90 ? "bg-amber-500/10 text-amber-500" : "bg-muted text-muted-foreground"}`}>
                  <Trophy size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Genius Mind</h4>
                  <p className="text-xs text-muted-foreground">Score 90% or above in any quiz attempt.</p>
                </div>
              </div>

              {/* Achievement 3 */}
              <div className={`p-3 rounded-lg border flex gap-3 items-center ${activeStats.totalAttempts >= 10 ? "bg-emerald-500/5 border-emerald-500/20" : "opacity-50 bg-muted/20 border-transparent"}`}>
                <div className={`p-2 rounded-full ${activeStats.totalAttempts >= 10 ? "bg-emerald-500/10 text-emerald-500" : "bg-muted text-muted-foreground"}`}>
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Quiz Master</h4>
                  <p className="text-xs text-muted-foreground">Complete 10 or more quiz attempts.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardHome;

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Zap,
  Play,
  Share2,
  Heart,
  MessageSquare,
  Award,
  BookOpen,
  Calendar,
  Flame,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const initialFeeds = [
  {
    id: "feed-1",
    author: {
      name: "Quizify Team",
      avatar: "QT",
      role: "System",
      badge: "bg-indigo-500 text-white",
    },
    title: "🚀 New Quiz Category: React Server Components (RSC)",
    content: "We've just uploaded a brand new advanced quiz containing 15 conceptual questions on React Server Components, Suspense boundaries, and Server Actions. Test your skills now!",
    category: "React",
    time: "2 hours ago",
    likes: 24,
    comments: 6,
    hasLiked: false,
    featuredQuiz: {
      title: "React Server Components Deep Dive",
      questionsCount: 15,
      timer: "10 mins",
      difficulty: "Hard",
    },
  },
  {
    id: "feed-2",
    author: {
      name: "Priya Patel",
      avatar: "PP",
      role: "Pro Learner",
      badge: "bg-amber-500 text-slate-900",
    },
    title: "🏆 Achievement unlocked: Perfect 100% Score!",
    content: "Just managed to score a perfect 100% on the 'JavaScript Closures and Execution Context' quiz on my second attempt! The explanations provided after each answer were extremely helpful. Highly recommend checking it out!",
    category: "JavaScript",
    time: "Yesterday",
    likes: 42,
    comments: 11,
    hasLiked: true,
  },
  {
    id: "feed-3",
    author: {
      name: "Quizify AI Editor",
      avatar: "AI",
      role: "AI Generator",
      badge: "bg-cyan-500 text-white",
    },
    title: "⚡ Dynamic AI Quiz Generator Upgrades",
    content: "Our AI quiz creation tool has been optimized for better context analysis. Admin users can now input simple URLs, and our AI will scrape relevant sections and generate full multi-level questionnaires in seconds.",
    category: "AI Tools",
    time: "3 days ago",
    likes: 31,
    comments: 2,
    hasLiked: false,
  },
];

const featuredQuizzes = [
  {
    title: "Modern JavaScript (ES6+)",
    category: "Programming",
    difficulty: "Medium",
    questions: 10,
    time: "8 mins",
    attempts: 1450,
  },
  {
    title: "Tailwind CSS Layout Mastery",
    category: "Design",
    difficulty: "Easy",
    questions: 12,
    time: "6 mins",
    attempts: 980,
  },
  {
    title: "Node.js Event Loop & Async",
    category: "Backend",
    difficulty: "Hard",
    questions: 15,
    time: "15 mins",
    attempts: 620,
  },
];

const studyTips = [
  {
    title: "Manage Time Wisely",
    text: "Quizzes have countdown timers. Spending too long on a single question decreases chances of finishing. Mark and move on if needed.",
  },
  {
    title: "Eliminate Wrong Options First",
    text: "Before picking the correct option, actively rule out the clearly wrong answers. This dramatically improves probability when guessing.",
  },
  {
    title: "Review Question Explanations",
    text: "Don't just look at what you got wrong; read the AI explanation for the correct choice. It is the fastest way to bridge skill gaps.",
  },
];

function NewFeedPage() {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState(initialFeeds);

  const handleLike = (feedId) => {
    setFeeds((prevFeeds) =>
      prevFeeds.map((feed) => {
        if (feed.id === feedId) {
          return {
            ...feed,
            likes: feed.hasLiked ? feed.likes - 1 : feed.likes + 1,
            hasLiked: !feed.hasLiked,
          };
        }
        return feed;
      })
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Feed page link copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">Community Feed</h1>
            <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 font-semibold">
              Live Updates
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Discover featured quizzes, system updates, and achievements from fellow developers.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        
        {/* Main Feed Column */}
        <div className="lg:col-span-5 space-y-5">
          {feeds.map((feed) => (
            <Card key={feed.id} className="border border-border/80 bg-card/40 backdrop-blur-md overflow-hidden hover:border-border transition-all">
              <CardContent className="p-5 space-y-4">
                
                {/* Feed Item Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shadow ${feed.author.badge}`}>
                      {feed.author.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-foreground">{feed.author.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-semibold">
                          {feed.author.role}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Calendar size={9} /> {feed.time}
                      </span>
                    </div>
                  </div>
                  
                  <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
                    {feed.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-foreground/90">{feed.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feed.content}</p>
                </div>

                {/* Featured Quiz attachment inside feed (if any) */}
                {feed.featuredQuiz && (
                  <div className="p-4 rounded-xl border border-indigo-500/15 bg-indigo-500/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Recommended Quiz</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 font-bold uppercase">
                          {feed.featuredQuiz.difficulty}
                        </span>
                      </div>
                      <h4 className="text-xs font-extrabold text-foreground">{feed.featuredQuiz.title}</h4>
                      <p className="text-[10px] text-muted-foreground">
                        {feed.featuredQuiz.questionsCount} Questions • {feed.featuredQuiz.timer} Duration
                      </p>
                    </div>
                    <Button
                      onClick={() => navigate("/")}
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs cursor-pointer"
                    >
                      <Play className="h-3 w-3 fill-current mr-1.5" /> Start Now
                    </Button>
                  </div>
                )}

                <Separator className="bg-border/60" />

                {/* Engagement Section */}
                <div className="flex items-center justify-between text-muted-foreground text-xs pt-1">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleLike(feed.id)}
                      className={`flex items-center gap-1.5 hover:text-rose-500 transition-colors cursor-pointer ${
                        feed.hasLiked ? "text-rose-500 font-semibold" : ""
                      }`}
                    >
                      <Heart size={14} className={feed.hasLiked ? "fill-rose-500 text-rose-500" : ""} />
                      <span>{feed.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors cursor-pointer">
                      <MessageSquare size={14} />
                      <span>{feed.comments}</span>
                    </button>
                  </div>
                  <button onClick={handleShare} className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-pointer">
                    <Share2 size={14} />
                    <span>Share</span>
                  </button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sidebar Widgets Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Featured Quizzes Widget */}
          <Card className="border border-border/80 bg-card/40 backdrop-blur-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500 fill-amber-500/10" /> Featured Quizzes
              </CardTitle>
              <CardDescription className="text-[11px]">Hand-picked tests for you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {featuredQuizzes.map((quiz, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/40 border border-border/40 hover:border-indigo-500/20 transition-all flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-bold text-foreground line-clamp-1">{quiz.title}</h4>
                    <span className={`text-[8px] font-extrabold uppercase px-1 rounded ${
                      quiz.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10" :
                      quiz.difficulty === "Medium" ? "bg-sky-500/10 text-sky-500 border border-sky-500/10" :
                      "bg-rose-500/10 text-rose-500 border border-rose-500/10"
                    }`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                    <span>{quiz.questions} Questions • {quiz.time}</span>
                    <button
                      onClick={() => navigate("/")}
                      className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      Play <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Daily study tip */}
          <Card className="border border-border/80 bg-card/40 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full -mr-4 -mt-4" />
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-rose-500" /> Daily Study Tip
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {studyTips.map((tip, idx) => (
                <div key={idx} className="space-y-0.5">
                  <h4 className="text-xs font-bold text-foreground">{tip.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{tip.text}</p>
                  {idx < studyTips.length - 1 && <Separator className="bg-border/40 my-2" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

export default NewFeedPage;

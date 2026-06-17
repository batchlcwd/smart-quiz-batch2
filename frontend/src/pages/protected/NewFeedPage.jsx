import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Book,
  PhoneMissedIcon,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { getAllQuizzes, getCategories } from "../../services/quiz.service";
import Loading from "../../components/shared/Loading";

function NewFeedPage() {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryDe, setSearchQueryDe] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [difficultyQUery, setDifficultyQuery] = useState("");

  async function loadAllQuizzes(params) {
    try {
      setIsLoading(true);
      setQuizzes([]);
      const quizData = await getAllQuizzes(params);
      console.log(quizData);
      setQuizzes(quizData.data.quizzes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadAllCategories() {
    try {
      const categories = await getCategories();
      console.log(categories.data);
      setCategories(categories.data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      setSearchQueryDe(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    loadAllQuizzes({
      difficulty: difficultyQUery,
      category: categoryQuery,
      search: searchQueryDe,
    });
  }, [difficultyQUery, categoryQuery, searchQueryDe]);

  useEffect(() => {
    loadAllCategories();
  }, []);

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
      }),
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Feed page link copied to clipboard!");
  };

  return (
    <div className="space-y-6 ">
      {/* Page Header */}
      <div className="flex   flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-5 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Quiz Community
            </h1>
            <Badge
              variant="outline"
              className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 font-semibold"
            >
              Daily New Update
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Discover featured quizzes, system updates, and achievements from
            fellow developers.
          </p>
        </div>
      </div>

      {/* filter component */}
      <div className="flex flex-wrap gap-2">
        {/* searchbar */}
        <Input
          onChange={(e) => {
            console.log(e.target.value);
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
          autoFocus
          placeholder="Search Quizzes"
          className="flex-1"
        />

        {/* select box category */}
        <Select
          onValueChange={(value) => {
            console.log(value);
            setCategoryQuery(value);
          }}
          value={categoryQuery}
          className="w-full lg:max-w-48"
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>

              {categories.map((category, index) => (
                <SelectItem key={index} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* select difficulty level */}
        <Select
          onValueChange={(value) => {
            console.log(value);
            setDifficultyQuery(value);
          }}
          value={difficultyQUery}
          className="w-full lg:max-w-48"
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Difficulty Level " />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Difficulty Level</SelectLabel>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          onClick={() => {
            setDifficultyQuery("");
            setCategoryQuery("");
            setSearchQuery("");
          }}
        >
          Clear
        </Button>
      </div>

      <Loading hide={isLoading} loaderText="Loading Quizzes..." />
      {/* print quizzes */}
      <div className="flex flex-wrap gap-2 gap-y-4">
        {/* quizzes */}

        {!isLoading && quizzes.length == 0 && (
          <div className="flex flex-col gap-2 w-full justify-center items-center">
            <PhoneMissedIcon />
            <h1>No Quizzes Found</h1>
          </div>
        )}
        {quizzes.map((quiz, index) => (
          <Card
            key={index}
            className="cursor-pointer  hover:bg-muted w-[calc(33%-10px)] flex flex-col justify-between"
          >
            <CardHeader className="flex flex-col gap-3">
              <Book size={24} />
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 font-semibold"
                >
                  {quiz.category?.name}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20 font-semibold"
                >
                  {quiz.difficulty}
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Start Quiz</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default NewFeedPage;

"use client";

import React, { useState } from "react";
import IntroLoader from "@/components/IntroLoader";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import TableHome from "@/components/TableHome";
import BookLayout from "@/components/BookLayout";
import ThemeToggle from "@/components/ui/ThemeToggle";
import AmbientAudio from "@/components/AmbientAudio";

// 13 Story Pages
import Page1Cover from "@/components/pages/Page1Cover";
import Page2WishesIntro from "@/components/pages/Page2WishesIntro";
import Page3AboutYou from "@/components/pages/Page3AboutYou";
import Page4Timeline from "@/components/pages/Page4Timeline";
import Page5Gallery from "@/components/pages/Page5Gallery";
import Page6StarWishes from "@/components/pages/Page6StarWishes";
import Page7HiddenHearts from "@/components/pages/Page7HiddenHearts";
import Page8Puzzle from "@/components/pages/Page8Puzzle";
import Page9SunsetMemory from "@/components/pages/Page9SunsetMemory";
import Page10MagicWriting from "@/components/pages/Page10MagicWriting";
import Page11LoveLetter from "@/components/pages/Page11LoveLetter";
import Page12EmotionalScene from "@/components/pages/Page12EmotionalScene";
import Page13Confession from "@/components/pages/Page13Confession";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 13;

  const handleOpenBook = () => {
    setIsBookOpen(true);
  };

  const handleReturnToTable = () => {
    setIsBookOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 1:
        return <Page1Cover onOpenStory={() => setCurrentPage(2)} />;
      case 2:
        return <Page2WishesIntro />;
      case 3:
        return <Page3AboutYou />;
      case 4:
        return <Page4Timeline />;
      case 5:
        return <Page5Gallery />;
      case 6:
        return <Page6StarWishes />;
      case 7:
        return <Page7HiddenHearts onUnlockNext={() => setCurrentPage(8)} />;
      case 8:
        return <Page8Puzzle onUnlockNext={() => setCurrentPage(9)} />;
      case 9:
        return <Page9SunsetMemory />;
      case 10:
        return <Page10MagicWriting />;
      case 11:
        return <Page11LoveLetter />;
      case 12:
        return (
          <Page12EmotionalScene
            onProceedToConfession={() => setCurrentPage(13)}
          />
        );
      case 13:
        return <Page13Confession />;
      default:
        return <Page1Cover onOpenStory={() => setCurrentPage(2)} />;
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0710] selection:bg-[#FFD6E8] selection:text-[#3D2B33]">
      {/* Intro Golden Loader Screen */}
      {isLoading ? (
        <IntroLoader onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          {/* Animated Night Sky Canvas (Stars, Aurora, Fireflies, Petals) */}
          <BackgroundCanvas />

          {/* Table Home Scene vs Interactive Book System */}
          {!isBookOpen ? (
            <TableHome onOpenBook={handleOpenBook} />
          ) : (
            <BookLayout
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onReturnToHome={handleReturnToTable}
            >
              {renderPageContent()}
            </BookLayout>
          )}

          {/* Ambient Controls */}
          <ThemeToggle />
          <AmbientAudio />
        </>
      )}
    </main>
  );
}

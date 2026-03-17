'use client';

import React, { useState } from 'react';
import { type Language } from '@/lib/translations';
import { PrivacyScreen } from './screens/privacy-screen';
import { HomeScreen } from './screens/home-screen';
import { BeverageScreen } from './screens/beverage-screen';
import { RecipeScreen } from './screens/recipe-screen';
import { HistoryScreen } from './screens/history-screen';
import { ProfileScreen } from './screens/profile-screen';
import { Header } from './layout/header';
import { BottomNav } from './layout/bottom-nav';

type TabType = 'overview' | 'scanner' | 'voice' | 'history' | 'profile';
type ScreenType = 'home' | 'beverage' | 'recipe' | 'voice';

interface AppState {
  acceptedPrivacy: boolean;
  currentTab: TabType;
  currentScreen: ScreenType;
  selectedCategory?: string;
}

export function AppContainer() {
  const [language, setLanguage] = useState<Language>('en');
  const [state, setState] = useState<AppState>({
    acceptedPrivacy: false,
    currentTab: 'overview',
    currentScreen: 'home',
  });

  if (!state.acceptedPrivacy) {
    return (
      <PrivacyScreen
        language={language}
        onAccept={() => {
          setState((prev) => ({ ...prev, acceptedPrivacy: true }));
        }}
      />
    );
  }

  const handleNavigateToHome = () => {
    setState((prev) => ({ ...prev, currentTab: 'overview', currentScreen: 'home' }));
  };

  const handleNavigateToBeverage = () => {
    setState((prev) => ({ ...prev, currentTab: 'scanner', currentScreen: 'beverage' }));
  };

  const handleNavigateToRecipe = (category: string) => {
    setState((prev) => ({
      ...prev,
      currentScreen: 'recipe',
      selectedCategory: category,
    }));
  };

  const handleSelectBeverageCategory = (category: string) => {
    handleNavigateToRecipe(category);
  };

  const handleTabChange = (tab: TabType) => {
    setState((prev) => ({
      ...prev,
      currentTab: tab,
      currentScreen: tab === 'overview' ? 'home' : tab === 'scanner' ? 'beverage' : 'home',
    }));
  };

  return (
    <div className="w-full h-screen bg-background overflow-hidden flex flex-col">
      {/* Header */}
      <Header language={language} onLanguageChange={setLanguage} />

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Home Screen */}
        {state.currentScreen === 'home' && (
          <HomeScreen
            language={language}
            onFeatureClick={(feature) => {
              if (feature === 'beverage' || feature === 'recipe') {
                handleNavigateToBeverage();
              }
            }}
          />
        )}

        {/* Beverage Screen */}
        {state.currentScreen === 'beverage' && (
          <BeverageScreen
            language={language}
            onSelectCategory={handleSelectBeverageCategory}
          />
        )}

        {/* Recipe Screen */}
        {state.currentScreen === 'recipe' && (
          <RecipeScreen language={language} category={state.selectedCategory} />
        )}

        {/* History Screen */}
        {state.currentTab === 'history' && (
          <HistoryScreen language={language} />
        )}

        {/* Profile Screen */}
        {state.currentTab === 'profile' && (
          <ProfileScreen language={language} />
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={state.currentTab}
        language={language}
        onTabChange={handleTabChange}
      />
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InputSection from '@/components/InputSection';
import ExampleCards from '@/components/ExampleCards';
import PreviewSection from '@/components/PreviewSection';
import { useCardConfig } from '@/hooks/useCardConfig';

export default function Home() {
  const [discordId, setDiscordId] = useState('');
  const [cardUrl, setCardUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [showCustomization, setShowCustomization] = useState(false);
  
  // Config
  const cardConfig = useCardConfig();
  const { setHiddenIds, hiddenIds } = cardConfig;

  // Generate query params string to use as dependency
  const queryString = cardConfig.genQueryParams().toString();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (discordId.length >= 1) {
        setCardUrl(`${window.location.origin}/api/status/${discordId}${queryString ? `?${queryString}` : ''}`);
      } else {
        setCardUrl('');
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [discordId, queryString]);

  const copyToClipboard = () => {
    if (!cardUrl) return;
    const markdown = `[![Discord Activity Card](${cardUrl})](https://discord.com/users/${discordId})`;
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDiscordIdChange = (id: string) => {
    if (id === '' || (discordId === '' && id !== '')) {
      setHiddenIds([]);
    } 
    setDiscordId(id);
    if (id.length >= 1) {
      setLoading(true);
    }
  };

  // Load Wrapper
  const withLoad = <T,>(setter: (val: T) => void) => (val: T) => {
    setLoading(true);
    setter(val);
  };

  // Void Load Wrapper
  const withLoadVoid = (action: () => void) => () => {
    setLoading(true);
    action();
  };

  // Wrapped Config
  const wrappedConfig = {
    ...cardConfig,
    setShowProfile: withLoad(cardConfig.setShowProfile),
    setShowDecoration: withLoad(cardConfig.setShowDecoration),
    setShowSmallImage: withLoad(cardConfig.setShowSmallImage),
    setUseDisplayName: withLoad(cardConfig.setUseDisplayName),
    setBgColor: withLoad(cardConfig.setBgColor),
    setBorderColor: withLoad(cardConfig.setBorderColor),
    setTitleColor: withLoad(cardConfig.setTitleColor),
    setNameColor: withLoad(cardConfig.setNameColor),
    setTextColor: withLoad(cardConfig.setTextColor),
    setTimeColor: withLoad(cardConfig.setTimeColor),
    setBarBgColor: withLoad(cardConfig.setBarBgColor),
    setBarFgColor: withLoad(cardConfig.setBarFgColor),
    setHiddenIds: withLoad(cardConfig.setHiddenIds),
    applyTheme: withLoad(cardConfig.applyTheme),
    resetColors: withLoadVoid(cardConfig.resetColors),
  };

  return (
    <main className="min-h-screen flex flex-col items-center py-8 px-6 font-sans transition-colors duration-500 bg-background text-foreground">
      
      <Header />

      <div className="max-w-xl w-full space-y-6">
        
        <InputSection 
          discordId={discordId}
          setDiscordId={handleDiscordIdChange}
        />

        {loading && !cardUrl && (
          <div className="space-y-6 py-12 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {!cardUrl && !loading && (
          <ExampleCards hiddenIds={hiddenIds} setHiddenIds={setHiddenIds} />
        )}

        {cardUrl && (
          <PreviewSection 
            cardUrl={cardUrl}
            discordId={discordId}
            loading={loading}
            setLoading={setLoading}
            showCustomization={showCustomization}
            setShowCustomization={setShowCustomization}
            copied={copied}
            copyToClipboard={copyToClipboard}
            {...wrappedConfig}
          />
        )}

        <Footer />
      </div>
    </main>
  );
}
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, Music, Repeat, Shuffle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

const SpotifyIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
        <title>Spotify</title>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.925 17.542c-.2.3-.583.4-1.083.2-4.042-2.5-9.125-2.958-13.083-1.625-.417.083-.667-.25-.583-.667C.833 13.042 3.708 9.75 8.625 9.75c4.5 0 7.125 2.167 7.333 5.458.083.417-.167.75-.583.75v-.417zm1.25-3.084c-.25.375-.75.5-1.167.25-3.833-2.333-9.75-3.042-13.667-1.667-.5.167-.916-.167-.75-.667.25-3.916 3.667-6.833 9.083-6.833 5.084 0 8.042 2.5 8.25 6 .083.5-.25.917-.75.917h-.083v.083zm.083-3.25C6.5 8.542 0 10.333 0 10.333s.25-5.583 10.333-5.583C20.417 4.75 24 8.5 24 12.125c0 3.375-3.416 5.583-8.791 5.583-5.167 0-9.25-2.25-9.25-2.25s1.25 4.5 7.916 4.5c4.75 0 8.75-2.5 8.75-6.5C23.083 9.458 20.417 8.542 19.258 8.125c-.25.5-.75.75-1.25.5z"/>
    </svg>
);

const AppleMusicIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current">
        <title>Apple Music</title>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.23 15.353c-.22.382-.78.503-1.162.282-3.833-2.147-7.014-.925-8.232-.382-.44.18-.88-.12-.98-.56s.12-.88.56-.98c1.513-.622 5.055-1.928 9.354.642.38.22.502.78.282 1.16zm.73-2.61c-.26.46-.9.62-1.36.36-3.953-2.28-8.155-.7-9.538-.12-.52.22-1.08-.14-1.2-.66-.12-.52.24-1.08.76-1.2 1.714-.72 6.376-2.502 11.018.24.46.26.62.9.36 1.36zm.13-2.88c-.32.54-1.06.72-1.6.42-4.59-2.62-10.052-.3-11.412.2-.6.22-1.26-.18-1.48-.76-.22-.6.18-1.26.78-1.48C8.752 5.613 15.032 3.653 20.4 6.813c.54.32.72 1.06.42 1.6z"/>
    </svg>
);


export default function MusicPlayer() {
  return (
    <Card className="fixed bottom-20 left-0 right-0 z-20 md:bottom-auto md:relative md:z-auto md:left-auto md:right-auto md:bottom-auto border-t-0 md:border-t rounded-none md:rounded-lg shadow-none md:shadow-sm">
      <CardContent className="flex items-center gap-4 p-3">
        <Image
          src="https://picsum.photos/seed/album-art/100/100"
          alt="Album Art"
          data-ai-hint="album art"
          width={56}
          height={56}
          className="rounded-md h-14 w-14"
        />
        <div className="flex-grow space-y-1">
            <div className='hidden md:block'>
              <h3 className="font-semibold text-sm truncate">Vibrant Echoes</h3>
              <p className="text-xs text-muted-foreground truncate">Starlight Bloom</p>
            </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button variant="default" size="icon" className="h-10 w-10">
              <Play className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-muted-foreground">1:23</span>
            <Slider defaultValue={[33]} max={100} step={1} className="flex-grow" />
            <span className="text-xs text-muted-foreground">3:45</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon">
                <SpotifyIcon />
            </Button>
            <Button variant="ghost" size="icon">
                <AppleMusicIcon />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

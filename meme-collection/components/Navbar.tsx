'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MagnifyingGlass, Plus, User } from '@phosphor-icons/react';

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : '/');
  }

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        <Link href="/" className="font-semibold text-lg shrink-0">
          MemeVault
        </Link>

        <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск..."
              className="pl-9"
            />
          </div>
          <Button type="submit" size="sm">Найти</Button>
        </form>

        <div className="flex items-center gap-2 shrink-0">
          <Link href="/upload">
            <Button size="icon" variant="ghost">
              <Plus size={20} />
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="icon" variant="ghost">
              <User size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

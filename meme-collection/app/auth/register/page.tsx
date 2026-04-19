'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      setStatus('success');
    } else {
      const data = await res.json();
      setErrorMsg(data.error ?? 'Registration error');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="mx-auto max-w-sm px-4 py-10 text-center">
        <p className="text-lg font-medium">Registration successful!</p>
        <Link href="/" className="text-sm text-muted-foreground underline mt-2 block">
          To main page
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Registration</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input
                placeholder="Mykola"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input
                type="email"
                placeholder="ivan@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600">{errorMsg}</p>
            )}

            <Button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Creating account...' : 'Register'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

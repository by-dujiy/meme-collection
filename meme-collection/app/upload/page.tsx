'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MediaDropzone from '@/components/MediaDropzone';

type MediaType = 'image' | 'video' | 'gif';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function handleFileAccepted(f: File, type: MediaType) {
    setFile(f);
    setMediaType(type);
    setStatus('idle');
  }

  function handleFileRemoved() {
    setFile(null);
    setMediaType(null);
    setStatus('idle');
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!file || !mediaType) return;

    setStatus('loading');

    // TODO: Upload file to Cloudinary, get the URL
    // TODO: POST /api/media with { title, tags, type, url, cloudinaryId }
    await new Promise((r) => setTimeout(r, 800));

    setStatus('success');
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add media</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <MediaDropzone
              onFileAccepted={handleFileAccepted}
              onFileRemoved={handleFileRemoved}
            />

            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Input
                placeholder="Title or description"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Tags</label>
              <Input
                placeholder="cat, work, monday"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">Comma-separated</p>
            </div>

            {status === 'success' && (
              <p className="text-sm text-green-600">Uploaded successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-600">Error occurred while uploading</p>
            )}

            <Button type="submit" disabled={!file || status === 'loading'}>
              {status === 'loading' ? 'Uploading...' : 'Upload'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

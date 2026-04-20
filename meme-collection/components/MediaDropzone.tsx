/* eslint-disable @next/next/no-img-element */
'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadSimpleIcon, FileVideoIcon, CheckCircleIcon, WarningCircleIcon, XIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const ACCEPTED_TYPES: Record<string, string[]> = {
  'image/*': [],
  'video/*': [],
  'image/gif': [],
};

const MAX_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getMediaType(file: File): 'image' | 'video' | 'gif' | null {
  if (file.type === 'image/gif') return 'gif';
  if (file.type.startsWith('image/')) return 'image';
  if (file.type.startsWith('video/')) return 'video';
  return null;
}

type Props = {
  onFileAccepted: (file: File, type: 'image' | 'video' | 'gif') => void;
  onFileRemoved: () => void;
};

export default function MediaDropzone({ onFileAccepted, onFileRemoved }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[], rejected: import('react-dropzone').FileRejection[]) => {
    setError(null);

    if (rejected.length > 0) {
      const code = rejected[0].errors[0].code;
      if (code === 'file-too-large') setError(`File is too large. Maximum size is ${formatBytes(MAX_SIZE_BYTES)}.`);
      else if (code === 'file-invalid-type') setError('Unsupported file type.');
      else setError('Failed to upload the file.');
      return;
    }

    if (accepted.length === 0) return;

    const picked = accepted[0];
    const mediaType = getMediaType(picked);

    if (!mediaType) {
      setError('Unsupported file type.');
      return;
    }

    setFile(picked);
    onFileAccepted(picked, mediaType);

    if (mediaType === 'image' || mediaType === 'gif') {
      setPreview(URL.createObjectURL(picked));
    } else {
      setPreview(null);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE_BYTES,
    multiple: false,
  });

  function remove() {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    setError(null);
    onFileRemoved();
  }

  if (file) {
    const mediaType = getMediaType(file);
    return (
      <div className="flex flex-col gap-2">
        <div className="relative rounded-lg border overflow-hidden bg-muted">
          {preview ? (
            <img src={preview} alt={file.name} className="w-full max-h-64 object-contain" />
          ) : (
            <div className="flex items-center justify-center h-32 text-muted-foreground">
              <FileVideoIcon size={48} />
            </div>
          )}
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 h-7 w-7"
            onClick={remove}
          >
            <XIcon size={14} />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CheckCircleIcon size={16} className="text-green-500 shrink-0" />
          <span className="truncate">{file.name}</span>
          <Badge variant="secondary" className="shrink-0">{mediaType}</Badge>
          <span className="shrink-0">{formatBytes(file.size)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        {...getRootProps()}
        className={cn(
          'flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-10 text-center cursor-pointer transition-colors',
          isDragActive && !isDragReject && 'border-primary bg-primary/5',
          isDragReject && 'border-destructive bg-destructive/5',
          !isDragActive && 'border-muted-foreground/30 hover:border-muted-foreground/60 hover:bg-muted/50',
        )}
      >
        <input {...getInputProps()} />
        <UploadSimpleIcon
          size={40}
          className={cn('text-muted-foreground', isDragReject && 'text-destructive')}
        />
        <div>
          <p className="font-medium text-sm">
            {isDragActive ? 'Drop the file here...' : 'Drag & drop a file or click to browse'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Images, GIFs, videos · up to {formatBytes(MAX_SIZE_BYTES)}
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <WarningCircleIcon size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

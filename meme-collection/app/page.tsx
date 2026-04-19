import MediaCard from '@/components/MediaCard';

const MOCK_FEED = [
  {
    _id: '1',
    title: 'Monday as it is',
    tags: ['monday', 'work'],
    type: 'image' as const,
    url: 'https://placecats.com/600/400',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Cat GIF',
    tags: ['cat', 'gif'],
    type: 'gif' as const,
    url: 'https://placecats.com/600/500',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Friday finally',
    tags: ['friday'],
    type: 'image' as const,
    url: 'https://placecats.com/600/450',
    createdAt: new Date().toISOString(),
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 flex flex-col gap-4">
      {MOCK_FEED.map((item) => (
        <MediaCard key={item._id} item={item} />
      ))}
    </div>
  );
}

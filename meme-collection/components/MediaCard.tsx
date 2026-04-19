import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type MediaItem = {
  _id: string;
  title: string;
  tags: string[];
  type: 'image' | 'video' | 'gif';
  url: string;
  createdAt: string;
};

export default function MediaCard({ item }: { item: MediaItem }) {
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        {item.type === 'video' ? (
          <video src={item.url} controls className="w-full max-h-[600px] object-contain bg-black" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.url} alt={item.title} className="w-full max-h-[600px] object-contain bg-black" />
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        {item.title && <p className="text-sm font-medium">{item.title}</p>}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">#{tag}</Badge>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

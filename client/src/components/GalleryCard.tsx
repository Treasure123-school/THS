import { Expand } from "lucide-react";
import type { GalleryItem } from "@shared/schema";

interface GalleryCardProps {
  item: GalleryItem;
  onClick?: () => void;
}

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  return (
    <div 
      className="gallery-item cursor-pointer" 
      onClick={onClick}
      data-testid={`gallery-item-${item.id}`}
    >
      <img 
        src={item.fileUrl} 
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        data-testid="gallery-image"
      />
      <div className="gallery-overlay">
        <Expand className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Optional overlay with title */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h4 className="font-semibold text-sm" data-testid="gallery-title">{item.title}</h4>
        {item.description && (
          <p className="text-xs text-gray-200 mt-1" data-testid="gallery-description">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

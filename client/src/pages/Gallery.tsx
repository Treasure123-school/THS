import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import GalleryCard from "@/components/GalleryCard";
import EmptyState from "@/components/EmptyState";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Camera } from "lucide-react";
import type { GalleryItem } from "@shared/schema";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const { data: galleryItems = [], isLoading } = useQuery({
    queryKey: ["/api/gallery"],
  });

  const closeModal = () => setSelectedImage(null);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-bg py-20" data-testid="gallery-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              School Gallery
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore the vibrant life at Treasure-Home School through our collection of 
              memorable moments, modern facilities, and student achievements.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white" data-testid="gallery-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-200 aspect-square rounded-xl"></div>
              ))}
            </div>
          ) : galleryItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryItems.map((item: GalleryItem) => (
                <GalleryCard 
                  key={item.id} 
                  item={item} 
                  onClick={() => setSelectedImage(item)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Camera className="h-12 w-12 text-gray-400" />}
              title="No Images Available"
              description="Our gallery is being updated with new photos. Please check back soon!"
            />
          )}
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl w-full h-auto p-0 bg-transparent border-none">
          {selectedImage && (
            <div className="relative bg-white rounded-lg overflow-hidden" data-testid="image-modal">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 text-white hover:bg-black/70"
                onClick={closeModal}
                data-testid="close-modal-button"
              >
                <X className="h-4 w-4" />
              </Button>
              
              <img
                src={selectedImage.fileUrl}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain"
                data-testid="modal-image"
              />
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2" data-testid="modal-title">
                  {selectedImage.title}
                </h3>
                {selectedImage.description && (
                  <p className="text-gray-600" data-testid="modal-description">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50" data-testid="gallery-categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery Categories</h2>
            <p className="text-gray-600">Browse our photos by category to find what interests you most.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Activities</h3>
              <p className="text-sm text-gray-600">Classroom sessions, laboratory work, and academic events</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sports & Recreation</h3>
              <p className="text-sm text-gray-600">Sports competitions, physical education, and recreational activities</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Events & Ceremonies</h3>
              <p className="text-sm text-gray-600">Graduations, award ceremonies, and special school events</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">School Facilities</h3>
              <p className="text-sm text-gray-600">Campus buildings, laboratories, library, and infrastructure</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Text,
} from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '../constants/Colors';

const { width } = Dimensions.get('window');

interface ImageGalleryProps {
  images: string[];
  title?: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImage = () => {
    setSelectedImageIndex(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    let newIndex;
    if (direction === 'prev') {
      newIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
    } else {
      newIndex = selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
    }
    setSelectedImageIndex(newIndex);
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.galleryTitle}>{title}</Text>}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gallery}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageContainer}
              onPress={() => openImage(index)}
            >
              <Image source={{ uri: image }} style={styles.thumbnail} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal visible={selectedImageIndex !== null} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <Pressable style={styles.closeButton} onPress={closeImage}>
            <X color={Colors.white} size={24} />
          </Pressable>
          
          {selectedImageIndex !== null && (
            <View style={styles.modalContent}>
              <Image
                source={{ uri: images[selectedImageIndex] }}
                style={styles.modalImage}
                resizeMode="contain"
              />
              
              <View style={styles.navigationButtons}>
                <TouchableOpacity 
                  style={styles.navButton} 
                  onPress={() => navigateImage('prev')}
                >
                  <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.navButton} 
                  onPress={() => navigateImage('next')}
                >
                  <Text style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  galleryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray[800],
    marginBottom: 16,
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  gallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  imageContainer: {
    width: (width - 80) / 2,
    height: (width - 80) / 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
  },
  modalImage: {
    width: width,
    height: width,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 40,
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  navButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
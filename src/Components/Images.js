import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './imagestyle.css';

function Images() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentApi, setCurrentApi] = useState('https://picsum.photos/v2/list');

  const imagesPerPage = 5; // Number of images to load per batch

  useEffect(() => {
    // Fetching images when the component mounts or when the page changes
    fetchImages();
  }, [page]);

  const fetchImages = () => {
    if (loading) return;

    setLoading(true);

    // Fetching images from the current API 
    axios
      .get(`${currentApi}?page=${page}&limit=${imagesPerPage}`)
      .then((response) => {
        const newImages = response.data;

        // Appending new images to the existing ones
        setImages((prevImages) => [...prevImages, ...newImages]);

        if (newImages.length === 0) {
          // No more images left to load from the current API
          // Switching to the new API
          setCurrentApi('https://picsum.photos/v2/list?page=2&limit=100');
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    setPage(page + 1); // Incrementing the page to load more images
  };

  return (
    <div className="image-gallery">
      <div className="image-container">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.download_url} alt={image.author} className="image" />
          </div>
        ))}
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="load-more">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default Images;

import React, { useState } from "react";
import "./Home.css";

const images = [
  {
    url: "../anh1.jpg",
    title: "Ảnh ni đẹp nhít",
    description: "iuu"
  },
  {
    url: "../anh2.jpg",
    title: "Ảnh ni cụng xinh", 
    description: "Nỏ bằng ảnh đầu"
  },
  {
    url: "../anh3.jpg",
    title: "Ảnh ni xinh quáa",
    description: "Mà nỏ bằng ảnh đầu"
  },
  {
    url: "../anh4.jpg",
    title: "Ảnh ni đẹp",
    description: "Không bằng ảnh đầu"
  }
];

const PhotoAlbum = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const totalPages = images.length + 2; // +2 for cover pages

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsFlipping(false);
      }, 300);
    }
  };

  const goToPage = (pageIndex) => {
    if (pageIndex !== currentPage) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(pageIndex);
        setIsFlipping(false);
      }, 300);
    }
  };

  const renderCoverPage = () => (
    <div className="page cover-page">
      <div className="cover-content">
        <svg className="camera-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
        </svg>
        <h1 className="cover-title">Ảnh của Mỹ Châm</h1>
        <p className="cover-subtitle">Yêu Mỹ Châm</p>
      </div>
    </div>
  );

  const renderEndPage = () => (
    <div className="page end-page">
      <div className="end-content">
        <svg className="heart-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,20.408c-0.218,0-0.439-0.062-0.634-0.187l-9.762-6.208C1.583,12.842,0,10.612,0,8.101 C0,4.244,3.178,1.01,7,1.01c1.748,0,3.375,0.65,4.583,1.834C12.791,1.66,14.418,1.01,16.166,1.01 C19.988,1.01,23.166,4.244,23.166,8.101c0,2.511-1.584,4.741-3.604,5.912L14.634,20.221 C14.439,20.346,14.218,20.408,14,20.408z"/>
        </svg>
        <h2 className="end-title">Yêu em nhiều lắm</h2>
        <p className="end-subtitle">Hehe</p>
      </div>
    </div>
  );

  const renderImagePage = (imageIndex) => {
    const image = images[imageIndex];
    return (
      <div className="page image-page">
        <div className="image-card">
          <div className="image-container">
            <img src={image.url} alt={image.title} />
            <div className="image-overlay"></div>
          </div>
          <div className="image-info">
            <h3 className="image-title">{image.title}</h3>
            <p className="image-description">{image.description}</p>
          </div>
          
        </div>
      </div>
    );
  };

  const renderCurrentPage = () => {
    if (currentPage === 0) {
      return renderCoverPage();
    } else if (currentPage === totalPages - 1) {
      return renderEndPage();
    } else {
      return renderImagePage(currentPage - 1);
    }
  };

  return (
    <div className="album-container">
      <div className={`album-book ${isFlipping ? 'flipping' : ''}`}>
        {renderCurrentPage()}
        
        {isFlipping && <div className="flip-overlay"></div>}
      </div>

      {/* Navigation Buttons */}
      <button
        className="nav-button prev"
        onClick={handlePrevPage}
        disabled={currentPage === 0}
      >
        <svg className="nav-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>

      <button
        className="nav-button next"
        onClick={handleNextPage}
        disabled={currentPage === totalPages - 1}
      >
        <svg className="nav-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
        </svg>
      </button>

      {/* Page Indicators */}
      <div className="page-indicators">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentPage ? 'active' : ''}`}
            onClick={() => goToPage(index)}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="decoration top-left"></div>
      <div className="decoration bottom-right"></div>
    </div>
  );
};

export default PhotoAlbum;
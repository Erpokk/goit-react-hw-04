import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

function App() {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchPhotos() {
      if (query === '') return;
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query, per_page: 12, page },
          headers: {
            Authorization: `Client-ID ${apiKey}`
          }
        });
        setPhotos(prevPhotos => [...prevPhotos, ...response.data.results]);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    }

    fetchPhotos();
  }, [query, page]);

   const handleSearchSubmit = (searchValue) => {
    setQuery(searchValue);
    setPhotos([]); 
    setPage(1);
  };
  return (
    <div>
      <SearchBar value={search} onSearchChange={setSearch} onSearchSubmit={handleSearchSubmit} />
      <ImageGallery data={photos} />
      {photos.length > 0 ? <LoadMoreBtn onLoad={setPage}>Load more</LoadMoreBtn> : null }
      
    </div>
  );
}

export default App;
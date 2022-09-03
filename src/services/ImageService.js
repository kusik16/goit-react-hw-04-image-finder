import { useHttp } from '../hooks/http.hook';

const useImageService = () => {
  const { request, clearError, process, setProcess } = useHttp();

  const _apiKey = '29633570-ed278bc3600c586f3f6eb946e';
  const _page = 1;

  const searchImage = async (page = _page, searchText) => {
    const res = await request(
      `https://pixabay.com/api/?q=${searchText}&page=${page}&key=${_apiKey}&image_type=photo&orientation=horizontal&per_page=12`
    );
    console.log(res);
    return res.hits.map(_transformImage);
  };

  const _transformImage = image => {
    return {
      id: image.id,
      webformatURL: image.webformatURL,
      largeImageURL: image.largeImageURL,
    };
  };

  return {
    clearError,
    process,
    setProcess,
    searchImage,
  };
};

export default useImageService;

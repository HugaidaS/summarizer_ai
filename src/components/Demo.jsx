import React from 'react';
import {useState, useEffect} from 'react';
import {copy, linkIcon, loader, tick} from '../assets';
import {useLazyGetSummaryQuery} from '../services/article.js';

export const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState('');
  const [getSummary, {isError, isFetching, error}] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesLocalStorage = JSON.parse(localStorage.getItem('articles'));
    if (articlesLocalStorage) {
      setAllArticles(articlesLocalStorage);
    }
  }, [article]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await getSummary(article.url);

    if (data?.summary) {
      const newArticle = {...article, summary: data.summary};
      const updatedArticles = [...allArticles, newArticle];
      localStorage.setItem('articles', JSON.stringify(updatedArticles));
      setArticle(newArticle);
    }
  };

  const handleCopy = async (url) => {
    setCopied(url);
    await navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(''), 3000);
  };

  return <section className="mt-16 w-full max-w-xl">
    {/* Search*/}
    <div className="flex flex-col w-full gap-2">
      <form
        className="relative flex justify-center items-center"
        onSubmit={handleSubmit}>
        <img
          src={linkIcon}
          alt="link_icon"
          className="absolute left-0 my-2 ml-3 w-5"
        />
        <input
          type="url"
          placeholder="Enter URL"
          onChange={(e)=>setArticle({...article, url: e.target.value})}
          required={true}
          className="url_input peer"
        />
        <button
          type='submit'
          className='submit_btn
          peer-focus:border-gray-700
          peer-focus:text-gray-700'
        >
          <p>↵</p>
        </button>
      </form>

      {/* Browse URL history*/}
      <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
        {allArticles.map((article, index) => {
          return <div
            key={`link-${index}`}
            className="link_card"
            onClick={() => setArticle(article)}
          >
            <div className="copy_btn" onClick={()=>handleCopy(article.url)}>
              <img
                src={copied === article.url ? tick : copy}
                alt="copy_icon"
                className="w-[40%] h-[40%] object-contain"
              />
            </div>
            <p className="
            font-medium font-satoshi font-medium
            text-blue-700 text-sm
            flex-1 truncate">
              {article.url}
            </p>
          </div>;
        } )}
      </div>

      {/* Display results*/}
      {/* We have fetching state or (error or summary) as the result*/}
      <div className="my-10 max-w-full flex justify-center">
        {isFetching ?
            (
                <img
                  src={loader}
                  alt="loader"
                  className="w-12 h-12 object-contain" />
            ) :
            isError ?
                (
                    <p className="font-inter font-bold text-black text-center">
                      Well, something went wrong...
                      <br/>
                      <span className="font-satoshi font-normal text-gray-700">
                        {error?.data?.error}
                      </span>
                    </p>
                ) :
                (
                    article.summary &&
                    (
                      <div className="flex flex-col gap-3">
                        <h2 className="font-satoshi font-bold
                        text-gray-600 text-xl">
                          Article <span className="blue_gradient">summary</span>
                        </h2>
                        <div className="summary_box">
                          <p className="font-inter font-medium
                          text-sm text-gray-700">
                            {article.summary}
                          </p>
                        </div>
                      </div>
                    )
                )
        }
      </div>
    </div>
  </section>;
};


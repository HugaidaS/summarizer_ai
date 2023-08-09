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


  const [getSummary, {isError, isFetching}] = useLazyGetSummaryQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await getSummary(article.url);

    if (data?.summary) {
      const newArticle = {...article, summary: data.summary};
      const updatedArticles = [...allArticles, newArticle];
      setAllArticles(updatedArticles);
      setArticle(newArticle);
    }
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


      {/* Display results*/}
    </div>
  </section>;
};


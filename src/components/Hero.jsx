import React from 'react';
import {logo} from '../assets';

export const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <a href="/">
          <img src={logo} alt="logo" className="w-28 object-contain"/>
        </a>
        <a href="https://github.com/HugaidaS/summarizer_ai" target="_blank" rel="noreferrer">
          <button type="button" className="black_btn">Github</button>
        </a>
      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden"/>
        <span className="orange_gradient"> OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
          Save your time by summarizing articles with an open-source
          article summarizer that transforms long articles into short summaries
      </h2>
    </header>
  );
};



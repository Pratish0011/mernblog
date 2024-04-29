import React from "react";

//
import Articles from "../components/Articles";
import articles from "./article-content";


const ArticlesList = () => {
  
  return (
    <div>
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        Hello! Welcome to my Article list page
      </h1>
      <div className="container py-4 mx-auto">
        <div className="flex flex-wrap m-4">
             <Articles articles={articles} />
        </div>
      </div>
    </div>
  );
};

export default ArticlesList;

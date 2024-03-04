import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./Components/NewsCards/NewsCards.js";
import alanai from "./Components/image/searchimage.jpg";
import wordsTonumber from "words-to-numbers";
const alanKey =
  "ecc705bfc0c27cb9f26b571aff795c712e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  const [newsarticles, setNewsarticles] = useState([]);
  const [activearticles, setActivearticles] = useState(-1);
  //made readable ai
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadLines") {
          setNewsarticles(articles);
          setActivearticles(-1);
        } else if (command === "highlight") {
          setActivearticles((prev) => prev + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2 ? wordsTonumber(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            console.log("error");
          } else {
            window.open(article.url, "_blank");
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div
        style={{
          maxWidth: "300px",
          margin: "auto",
          padding: "20px 20px",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
          src={alanai}
          alt=" alan-ai logo"
        />
      </div>
      <div>
        <NewsCards articles={newsarticles} activearticles={activearticles} />
      </div>
    </div>
  );
};

export default App;

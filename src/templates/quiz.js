import React from "react";
import Layout from "../components/layout";
import Quiz from "../components/Quiz";

export default ({ pageContext }) => {
  const { title, description, questions, allChallenges } = pageContext;

  return (
    <Layout className="quiz">
      <section>
        <h1>{title}</h1>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </section>
      <section>
        <Quiz questions={questions} allChallenges={allChallenges} />
      </section>
    </Layout>
  );
};

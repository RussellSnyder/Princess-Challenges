import React from "react";
import Layout from "../components/layout";
import { Col, Row } from "react-bootstrap";
import { Link } from "gatsby";
import Card from "react-bootstrap/Card";

export default ({ pageContext: { allQuizzes } }) => {
  console.log(allQuizzes);
  return (
    <Layout>
      <section className="quiz">
        <h2>Quiz stuff {allQuizzes.length}</h2>
        <Row>
          {allQuizzes.map(quiz => {
            return (
              <Col>
                <Card>
                  <Card.Header>
                    <Card.Title>{quiz.title}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Link to={`quiz/${quiz.slug}`} className="btn btn-primary">
                      to Quiz
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </section>
    </Layout>
  );
};

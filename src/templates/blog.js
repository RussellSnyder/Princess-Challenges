import React from "react";
import Layout from "../components/layout";
import Header from "../components/header";
import PostPreview from "../components/post-preview";
import { Col, Row } from "react-bootstrap";

export default ({ pageContext: { allBlogPosts } }) => {
  return (
    <Layout>
      <Header />
      <section className="blog">
        <Row>
          {allBlogPosts.map(challenge => (
            <Col xs={12} sm={6} md={4} key={challenge.slug}>
              <PostPreview {...challenge} />
            </Col>
          ))}
        </Row>
      </section>
    </Layout>
  );
};

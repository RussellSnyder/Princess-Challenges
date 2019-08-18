import React from "react";
import { Link } from "gatsby";
import { Badge, Card } from "react-bootstrap";

export default ({ slug, short, title, tags }) => {
  return (
    <Card className="blog-post-preview card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div className="tags">
          {tags.map(tag => (
            <Badge variant="secondary mr-2">{tag}</Badge>
          ))}
        </div>

        <Card.Text>{short}</Card.Text>
        <Link to={`blog/${slug}`} className={"btn btn-primary"}>
          To Post
        </Link>
      </Card.Body>
    </Card>
  );
};

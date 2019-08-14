import React from "react"
import {Link} from "gatsby";
import {Card} from "react-bootstrap";

export default ({ slug, title, featuredImage }) => {
    return (<Card className="challenge-preview card">
        <Card.Img variant="top" src={featuredImage.url} fluid="true"/>
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Link to={`challenge/${slug}`} className={"btn btn-primary"}>To Challenge</Link>
        </Card.Body>
    </Card>)
}

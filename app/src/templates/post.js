import React from "react"
import Layout from "../components/layout"
import {Badge, Col, Image, Row} from "react-bootstrap";
import { Link } from "gatsby"

export default class Post extends React.Component {
    componentDidMount() {
    }

    render() {
        const props = this.props.pageContext
        console.log(props)

        return (<Layout className="blog-post">
            <section>
                <h1>{props.title}</h1>
                <div className="tags">
                    {props.tags.map(tag => <Badge variant="secondary">{tag}</Badge>)}
                </div>
            </section>
            <section className="description" dangerouslySetInnerHTML={{__html: props.long}}/>
        </Layout>)
    }
}

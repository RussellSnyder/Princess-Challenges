import React from "react";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { orderBy } from "lodash";
import ProgressBar from "react-bootstrap/ProgressBar";
import {Link} from "@reach/router";

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      isEnded: false,
      resultsCalculated: false,
      results: {},
      activeKey: "question-0",
      questionsAnswered: 0
    };

    this.questions = this.props.questions;
  }

  componentDidMount() {
    this.setState(state => {
      return {
        ...state,
        ...this.resetQuestionState()
      };
    });
  }

  resetQuestionState() {
    const questions = {};
    this.questions.forEach((q, i) => (questions[`question-${i}`] = undefined));
    return questions;

    // todo further questions
  }

  Answer(questionStateKey, rawAnswer, i) {
    const { textAnswer, photoAnswer, challenges } = rawAnswer;

    let answer;
    if (photoAnswer) {
      const { url, title } = photoAnswer;
      answer = <Image src={url} alt={title} fluid />;
    } else {
      answer = textAnswer;
    }

    // todo set value based on challenge weights

    return (
      <Form.Check
        // inline={!!photoAnswer}
        className={`answer ${photoAnswer ? "photo-answer" : "text-answer"}`}
        type={"radio"}
        name={questionStateKey}
        id={`${questionStateKey}-answer-${i}`}
        label={answer}
        value={JSON.stringify(challenges)}
      />
    );
  }

  updateQuizData(e) {
    const { name, id, value } = e.target;

    this.setState(
      state => {
        const questionAnswerIncrementAmount = this.state[name] ? 0 : 1;

        return {
          ...state,
          [name]: value,
          questionsAnswered:
            state.questionsAnswered + questionAnswerIncrementAmount
        };
      },
      () => console.log(this.state)
    );
  }

  goToQuestion(eventKey) {
    this.setState({
      activeKey: eventKey
    });
  }

  calculateResults() {
    this.setState(
      state => {
        return {
          ...state,
          isEnded: true,
          resultsCalculated: false,
          results: {}
        };
      },
      () => {
        this.setState(state => {
          let finalResult = [];

          const questionArray = this.questions.map(
            (q, i) => state[`question-${i}`]
          );

          const values = questionArray.map(value => JSON.parse(value));

          values.forEach(results => {
            results.forEach(result => {
              let { id, points } = result;

              points = parseInt(points);

              const indexInFinalArray = finalResult.findIndex(a => a.id === id);

              if (indexInFinalArray === -1) {
                finalResult.push({
                  id,
                  points
                });
              } else {
                finalResult[indexInFinalArray].points += points;
              }
            });
          });

          finalResult = finalResult.sort((a, b) => b.points - a.points);

          const highestPoints = finalResult[0].points;
          const enrichResults = finalResult.map(result => {
            const { id, points } = result;

            return {
              challenge: this.props.allChallenges.find(challenge => challenge.id === id),
              percentage: Math.round(100 * (points / highestPoints))
            };
          });

          return {
            ...state,
              resultsCalculated: true,
              results: enrichResults
          };
        });
      }
    );
  }

  AdjacentNavigation(i) {
    return (
      <Row className="adjacent-nav mt-3">
        {i > 0 && (
          <Col>
            <Button
              variant={"outline-primary"}
              className="d-block margin-auto"
              onClick={() => this.goToQuestion(`question-${i - 1}`)}
            >
              <i className="ml-2 fa fa-arrow-left" /> Previous
            </Button>
          </Col>
        )}
        {i < this.questions.length - 1 && (
          <Col className={`${i === 0 ? "offset-sm-8" : ""} text-right`}>
            <Button
              variant={"outline-primary"}
              onClick={() => this.goToQuestion(`question-${i + 1}`)}
            >
              Next <i className="ml-2 fa fa-arrow-right" />
            </Button>
          </Col>
        )}
      </Row>
    );
  }

  QuestionContent(questionObject, i) {
    const key = `question-${i}`;

    const { id, question, answers } = questionObject;

    const isActive = this.state.activeKey === key;

    return (
      <Tab.Pane eventKey={key} active={isActive} key={key}>
        <h5 className="pb-3">{question}</h5>
        <Form onChange={e => this.updateQuizData(e)}>
          {answers.map((answer, i) => this.Answer(key, answer, i))}
        </Form>
        {this.AdjacentNavigation(i)}
      </Tab.Pane>
    );
  }

  QuestionNav(questionObject, i) {
    const key = `question-${i}`;

    const isActive = this.state.activeKey === key;
    const isSet = !!this.state[key];

    return (
      <Nav.Item>
        <Nav.Link
          active={isActive}
          // onClick={() => this.goToQuestion(i)}
          key={key}
          eventKey={key}
        >
          Q{i + 1} {isSet && <i className="ml-1 fas fa-check" />}
        </Nav.Link>
      </Nav.Item>
    );
  }

  QuizResults() {
      const { resultsCalculated, results } = this.state

      if (!resultsCalculated) return

    return <div className="results">

        <h3 className="mb-3">These Challenges will match your health goals the best: </h3>

        {results.map(result => {
            const { percentage, challenge } = result;
            const { title, slug, short } = challenge

            return <div className="result mb-4">
                <h4>{title} - {percentage}%</h4>
                <ProgressBar now={percentage} className="mb-2" />
                <div className="short">{short}</div>
                <Link to={`/challenge/${slug}`} className="btn btn-success float-right">
                    To Challenge <i className="ml-2 fas fa-external-link-alt"/>
                </Link>
            </div>
        })}
    </div>;
  }

  render() {
    const { questions } = this.props;

    const { isEnded, started, activeKey } = this.state;

    return (
      <div className="quiz">
        {!isEnded && (
          <Tab.Container
            className={"my-4"}
            activeKey={`question-${activeKey}`}
            onSelect={eventKey => this.goToQuestion(eventKey)}
          >
            <Row>
              <Col sm={3} className="question-nav">
                <Nav variant="pills" className="flex-column">
                  {questions &&
                    questions.map((question, i) =>
                      this.QuestionNav(question, i)
                    )}
                </Nav>
              </Col>
              <Col sm={9} className="question-content">
                <Tab.Content>
                  {questions &&
                    questions.map((question, i) =>
                      this.QuestionContent(question, i)
                    )}
                </Tab.Content>
              </Col>
            </Row>
            <Button
              variant="success"
              className={`mt-5 w-100`}
              disabled={
                !(this.state.questionsAnswered === this.questions.length)
              }
              onClick={() => this.calculateResults()}
            >
              Finish Quiz <i className="far fa-thumbs-up" />
            </Button>
          </Tab.Container>
        )}
        {isEnded && this.QuizResults()}
      </div>
    );
  }
}

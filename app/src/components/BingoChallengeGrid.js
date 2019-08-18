import {Col, Row} from "react-bootstrap";
import React from "react";
import _ from "lodash";
import header from "./header";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const CENTER_INDEX = 12;
const BINGO_SPACE_COUNT = 25;

export default class BingoChallengeGrid extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            arrangedBingoSpaces: [],
            freestyleTask: '',
            isEditingFreestyleTask: false,
            pinnedBingoSpaceIndexes: [],
            bannedBingoSpaces: [],
            maxBingoSpacesBanned: false
        }

        this.taskCollection = props.challengeBingo.taskCollection
        this.bingoChallengeGridTemplate = props.challengeBingo.bingoChallengeGridTemplate
    }

    componentDidMount() {
        const freestyleSpace = _.find(this.taskCollection, space => space.category === "Freestyle")

        this.setState({freestyleTask: freestyleSpace.task}, () => {
            this.arrangeBingoSpaces()
        })

    }

    createTaskBoxes(numBoxes) {
        let boxes = [];
        for (let i = 1; i <= Number(numBoxes); i++) {
            boxes.push(<span key={i} className="repetition-box"/>)
        }
        return boxes
    }

    arrangeBingoSpaces() {
        const {bannedBingoSpaces} = this.state;

        let newlyArrangedBingoSpaces = [];

        let cleanBingoSpaces = _.cloneDeep(this.taskCollection);

        // remove banned bingo spaces
        if (bannedBingoSpaces.length > 0) {
            bannedBingoSpaces.forEach(bannedSpace => {
                const indexOfBannedInClean = cleanBingoSpaces.findIndex(space => space.task === bannedSpace.task)
                cleanBingoSpaces.splice(indexOfBannedInClean, 1)
            })
        }

        let shuffledBingoSpaceOptions = _.shuffle(cleanBingoSpaces)


        // Fill what matches in the grid template
        this.bingoChallengeGridTemplate.categories.forEach((category, i) => {

            // keep pinned ones where they are pinned
            if (this.state.pinnedBingoSpaceIndexes.includes(i)) {
                newlyArrangedBingoSpaces.push(this.state.arrangedBingoSpaces[i])
                return
            }

            const matchedSpaceIndex = _.findIndex(shuffledBingoSpaceOptions, space => {
                return space.category === category.name
            });

            if (matchedSpaceIndex > -1) {
                newlyArrangedBingoSpaces[i] = shuffledBingoSpaceOptions[matchedSpaceIndex];
                // center logic
                if (i === CENTER_INDEX) {
                    newlyArrangedBingoSpaces[i].isCenter = true;
                }
                shuffledBingoSpaceOptions.splice(matchedSpaceIndex, 1)
            } else {
                newlyArrangedBingoSpaces[i] = undefined;
            }
        })

        // Add freestyle default values to state to be editable but persisted through shuffles

        // Fill in undefined with random space
        newlyArrangedBingoSpaces = newlyArrangedBingoSpaces.map((space, i) => {
            if (space) {
                return space
            } else {
                return shuffledBingoSpaceOptions.pop()
            }
        })

        // let newlyArrangedBingoSpaces = _.sampleSize(this.taskCollection, BINGO_CARD_SIZE)

        this.setState({
            arrangedBingoSpaces: newlyArrangedBingoSpaces,
            spacesInitialized: true
        })

    }

    onSpaceEditableChange(e) {
        e.persist()

        this.setState({freestyleTask: e.target.value})
    }

    toggleEditable() {
        this.setState(state => {
            return ({isEditingFreestyleTask: !state.isEditingFreestyleTask})
        })
    }

    pinBingoSpace(i) {
        this.setState(state => {
            let {pinnedBingoSpaceIndexes} = state;

            pinnedBingoSpaceIndexes.push(i)

            return {
                ...state,
                pinnedBingoSpaceIndexes
            }
        })
    }

    unpinBingoSpace(i) {
        this.setState(state => {
            let {pinnedBingoSpaceIndexes} = state;

            pinnedBingoSpaceIndexes = pinnedBingoSpaceIndexes.filter(index => index !== i)

            return {
                ...state,
                pinnedBingoSpaceIndexes
            }
        })
    }

    banBingoSpace(bannedBingoSpace, i) {
        this.setState(state => {
            let {bannedBingoSpaces, arrangedBingoSpaces} = state;
            let {category} = bannedBingoSpace;

            let cleanBingoSpaces = _.cloneDeep(this.taskCollection);

            let bingoSpacesWithoutBannedSpaces = cleanBingoSpaces.filter((cleanSpace) => {
                // remove current space
                if (cleanSpace.id === bannedBingoSpace.id) {
                    return false
                }
                return !bannedBingoSpaces.find(bannedSpace => bannedSpace.id === cleanSpace.id)
            })

            // try to find a space with the same category and is not currently on the board
            let newBingoSpace = bingoSpacesWithoutBannedSpaces.find(space => {
                return space.category === category
                        && bingoSpacesWithoutBannedSpaces.find(currentlyPlacedSpace => currentlyPlacedSpace.id !== space.id)
            })

            // if no space with the same category, get a random one
            if (!newBingoSpace) {
                newBingoSpace = bingoSpacesWithoutBannedSpaces[_.random(0, bingoSpacesWithoutBannedSpaces - 1)]
            }

            arrangedBingoSpaces[i] = newBingoSpace
            bannedBingoSpaces.push(bannedBingoSpace);

            return {
                ...state,
                arrangedBingoSpaces,
                bannedBingoSpaces,
                maxBingoSpacesBanned: bingoSpacesWithoutBannedSpaces.length < BINGO_SPACE_COUNT + 1
            }
        })
    }

    unbanSpace(i) {
        this.setState(state => {
            let {bannedBingoSpaces} = state;

            bannedBingoSpaces.splice(i, 1)

            return {
                ...state,
                bannedBingoSpaces,
                maxBingoSpacesBanned: bannedBingoSpaces.length > BINGO_SPACE_COUNT + 1
            }
        })

    }

    clearBannedSpaces() {
        this.setState(state => {
            return {
                ...state,
                bannedBingoSpaces: [],
                maxBingoSpacesBanned: false
            }
        })
    }

    EditTask() {
        return <div className="form-group">
            <textarea
                    className="form-control"
                    defaultValue={this.state.freestyleTask}
                    onChange={(e) => this.onSpaceEditableChange(e)}
            />
        </div>
    }

    Pin(i) {
        const {pinnedBingoSpaceIndexes} = this.state

        const isPinned = pinnedBingoSpaceIndexes.includes(i);

        return <span className={`fa-stack ${!isPinned ? 'text-muted' : ''}`}
                     style={{verticalAlign: 'top'}}
                     onClick={() => isPinned ? this.unpinBingoSpace(i) : this.pinBingoSpace(i)}>
                    <i className={`${isPinned ? 'fas' : 'far' } fa-circle fa-stack-2x`}/>
                    <i className={`fas fa-thumbtack fa-stack-1x ${isPinned ? 'fa-inverse' : '' }`}/>
        </span>
    }

    Ban(space, i) {
        const {maxBingoSpacesBanned} = this.state;

        if (maxBingoSpacesBanned) return;

        return <span className="fas fa-ban text-danger" onClick={() => this.banBingoSpace(space, i)}/>
    }

    CenterSpaceHeader() {
        const {isEditingFreestyleTask} = this.state;

        return <header className="label no-print" onClick={() => this.toggleEditable()}>
            <button type="button"
                    className={`far fa-${isEditingFreestyleTask ? 'save' : 'edit'} btn btn-${isEditingFreestyleTask ? 'success' : 'warning'} btn-sm`}/>
        </header>
    }

    CenterSpaceContent(space) {
        const {isEditingFreestyleTask} = this.state;

        return isEditingFreestyleTask ? this.EditTask() : space.task
    }

    SpaceHeader(space, i) {
        return <header className={"pin-and-ban d-print-none"}>
            <span className="pin">
                {this.Pin(i)}
            </span>
            <span className="ban">
                {this.Ban(space, i)}
            </span>
        </header>
    }


    Space(space, i) {
        return <div
                key={space.category + i}
                className={`text-center space ${space.category} ${space.isCenter && 'editable'}`}
        >
            {space.isCenter ? this.CenterSpaceHeader() : this.SpaceHeader(space, i)}
            <div className="content">
                {space.isCenter ? this.CenterSpaceContent(space) : space.task}
                <div className="repetition">
                    {this.createTaskBoxes(space.repetitions)}
                </div>
            </div>
        </div>
    }

    CreateTaskList() {
        const {arrangedBingoSpaces} = this.state;

        return <ListGroup className={"challenge-list"}>
            {arrangedBingoSpaces.map((space, i) => <ListGroup.Item>
                        <div className="pin">
                            {this.Pin(i)}
                        </div>
                        <div className="task">
                            {space.task}
                        </div>
                        <div className="ban">
                            {this.Ban(space, i)}
                        </div>
                    </ListGroup.Item>
            )}
        </ListGroup>
    }

    BannedSpaces() {
        const {bannedBingoSpaces} = this.state

        if (bannedBingoSpaces.length < 1) {
            return
        }

        return <div className="banned-spaces">
            <h3 className="banned-spaces__title mb-3">Banned Spaces
                <span className="ml-2 fas fa-ban text-danger"/>
                <button className="btn btn-success float-right" onClick={() => this.clearBannedSpaces()}>Add All Back
                    In
                </button>
            </h3>

            <Row className="justify-content-md-center">
                {bannedBingoSpaces.map((space, i) =>
                        <Col sm={6} md={4} lg={3} className="banned-space text-center mb-3">
                            <Card>
                                <Card.Body>
                                    {space.task}
                                    <button className="mt-2 btn btn-success w-100"
                                            onClick={() => this.unbanSpace(i)}
                                    >
                                        <i className="mr-1 fas fa-plus-circle "/> Add Back In Board
                                    </button>
                                </Card.Body>
                            </Card>
                        </Col>
                )}
            </Row>
        </div>
    }

    CreateTaskBoard() {
        const {arrangedBingoSpaces} = this.state;

        return <div className="board">
            {arrangedBingoSpaces.map((space, i) => this.Space(space, i))}
        </div>
    }

    render() {
        return <>
            <Row className="no-print">
                <Col>
                    <button className="btn btn-primary" onClick={() => this.arrangeBingoSpaces()}>Shuffle</button>
                </Col>
                <Col className="text-right">
                    <button className="btn btn-success" onClick={() => window.print()}>Print</button>
                </Col>
            </Row>
            <hr className="d-print-none"/>
            <div className="board-container d-none d-md-block mb-4">
                {this.CreateTaskBoard()}
            </div>
            <div className="list mb-4 d-md-none">
                {this.CreateTaskList()}
            </div>
            <div className="d-print-none">
                {this.BannedSpaces()}
            </div>
        </>
    }
}

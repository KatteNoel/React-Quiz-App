import React from 'react';

import { createContext } from 'react';

import { Question } from './question';
import { Answer } from './answer';
import { Result } from './result';

export const QuestionContext = createContext();
export const AnswerContext = createContext();

export default class Quiz extends React.Component {
    constructor() {
        super();
        this.questions = ["Which environment would you most like to live in?",
                        "What would be your favorite type of prey?",
                        "What would be your special ability?",
                        "What kind of leader would you be?",
                        "What is your favorite Clan?"];
        this.answers = [["A lush forest", "A pine forest", "A grassy moor", "An island surrounded by rivers"],
                        ["Squirrels", "Frogs", "Rabbits", "Fish"],
                        ["Climbing", "Sneaking", "Running", "Swimming"],
                        ["One who makes peace instead of war", "One who defends my territory at all costs", "One who follows the wisdom of StarClan", "One who goes with the flow"],
                        ["ThunderClan", "ShadowClan", "WindClan", "RiverClan"]];
        this.index = 0;
        this.selectedAnswers = [];
        this.clan = null;
        this.description = null;

        this.handleClick = this.handleClick.bind(this);
        this.determineResult = this.determineResult.bind(this);
        this.findHighScore = this.findHighScore.bind(this);
        this.selectRandom = this.selectRandom.bind(this);

        this.state = {
            currentQuestion: this.questions[0],
            currentAnswers: this.answers[0],
            quizInProgress : true
        }
    }

    handleClick(answerIndex) {
        this.selectedAnswers.push(answerIndex);

        if (this.index + 1 < this.questions.length) {
            this.index++;
            this.setState({currentQuestion: this.questions[this.index], currentAnswers: this.answers[this.index]});
        }
        else
        {
            this.determineResult();
            this.setState({quizInProgress: false});
        }
    }

    determineResult() {
        let data = [{name: "ThunderClan", count: 0},
                    {name: "ShadowClan", count: 0},
                    {name: "WindClan", count: 0},
                    {name: "RiverClan", count: 0}]

        for (let selectedAnswer of this.selectedAnswers) {
            switch (selectedAnswer) {
                case 0:
                    data[0].count++;
                    break;
                case 1:
                    data[1].count++;
                    break;
                case 2:
                    data[2].count++;
                    break;
                case 3:
                    data[3].count++;
                    break;
                default:
                    break;
            }
        }

        let result = this.findHighScore(data);
        if (result.length > 1) {
            this.clan = this.selectRandom(result, result.length).name;
        } else {
            this.clan = result[0].name;
        }

        switch (this.clan) {
            case "ThunderClan":
                this.description = "ThunderClan is heavily featured in the books, being the Clan of origin for many of the protagonists of the main arcs. ThunderClan cats are known for their skill at stalking prey through forest and thick undergrowth. ThunderClan cats live in a dense forest with thick undergrowth."
                break;
            case "ShadowClan":
                this.description = "ShadowClan, the source of many of the darker cats seen in the series, is sometimes referred to as the dark heart of the forest. ShadowClan cats are known for their ability to walk quietly and avoid detection. They are also known for their willingness to eat frogs, toads, lizards, rats—foods most Clan cats turn their noses up at. ShadowClan cats live in a pine forest."
                break;
            case "WindClan":
                this.description = "WindClan lives on the open moorlands and sleep underneath the stars. It is said that WindClan cats believe they're the closest to StarClan because of that. WindClan Cats are known for their swift paws, which lend ease to catching prey such as rabbits on the open moors of their territory. They're also proficient tunnelers, carving tunnels underneath their territory to catch prey and sneak on their enemies."
                break;
            case "RiverClan":
                this.description = "RiverClan is known for their skill at swimming. While other Clan cats feared the water, RiverClan cats instead are at home swimming in its depths and hunting fish from the river. RiverClan cats make their camp near the river."
                break;
            default:
                break;
        }
    }

    selectRandom(data, max) {
        return data[Math.floor(Math.random() * max)];
    }

    findHighScore(data) {
        let highScoreSoFar = 0;
        let result = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].count > highScoreSoFar) {
                result = [data[i]];
                highScoreSoFar = data[i].count;
            } else if (data[i].count === highScoreSoFar) {
                result.push(data[i]);
            }
        }
        return result;
    }

    render() {
        return (
            <>
            {this.state.quizInProgress  ? <div>
                <QuestionContext.Provider value={this.state.currentQuestion}>
                    <Question />
                </QuestionContext.Provider>
                <AnswerContext.Provider value={this.state.currentAnswers}>
                    <div className="centerBox">
                        <ul>
                            <li><Answer handleClick={this.handleClick} index={0}/></li>
                            <li><Answer handleClick={this.handleClick} index={1}/></li>
                            <li><Answer handleClick={this.handleClick} index={2}/></li>
                            <li><Answer handleClick={this.handleClick} index={3}/></li>
                        </ul>
                    </div>
                </AnswerContext.Provider>
            </div> 
            : <div>
                <Result clan={this.clan} description={this.description}/>
            </div>}
            </>
        );
    }
}
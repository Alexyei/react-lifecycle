import React from "react";
import ClassComponent from "./classComponent";
interface IProps{

}

interface IState{
    countMounted:boolean
    ignoreProp:number,
    seed: number,
    showErrorComponent: boolean
}


export default class ClassComponentExample extends React.Component<IProps, IState>{
    constructor(props:IProps) {
        super(props);

        this.state = {
            countMounted: true,
            ignoreProp: 0,
            seed: 40,
            showErrorComponent: false
        }
        this.toggleCountMounted = this.toggleCountMounted.bind(this)
    }

    changeIgnoreProp = ()=> this.setState({ignoreProp:Math.random()})

    toggleCountMounted(){
        this.setState(prev=>({countMounted:!prev.countMounted}))
    }

    generateSeed = ()=>this.setState({seed:Math.floor(Math.random()*100)})
    toggleErrorComponent = ()=>this.setState(prev=>({showErrorComponent:!prev.showErrorComponent}))

    render() {
        return (
            <>
                <button onClick={this.toggleCountMounted}>{this.state.countMounted ? 'Unmount counter':'Mount counter'}</button>
                <button onClick={this.changeIgnoreProp}>ChangeIgnoreProp</button>
                <button onClick={this.generateSeed}>Generate seed</button>
                <button onClick={this.toggleErrorComponent}>Toggle error component</button>
                {this.state.countMounted && <ClassComponent showErrorComponent={this.state.showErrorComponent} ignoreProp={this.state.ignoreProp} seed={this.state.seed}/>}

            </>
        )
    }


}
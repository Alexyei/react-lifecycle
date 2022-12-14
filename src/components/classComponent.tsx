import React, {FC} from "react";

interface IProps{
    ignoreProp:number
    seed?:number
    showErrorComponent: boolean
}

interface IState{
    counter:number,
    seed: number,
    error?: Error,
    errorInfo?: React.ErrorInfo,

}

export default class ClassComponent extends React.Component<IProps, IState>{
    constructor(props:IProps) {
        console.log("constructor")
        super(props);

        this.state = {
            counter: 0,
seed:0,

        }
    }
    increment = () => this.setState(prev=>({counter: prev.counter + 1}))
    decrement = () => this.setState(prev=>({counter: prev.counter - 1}))

    static getDerivedStateFromProps(props:IProps, state:IState):IState | null{
        console.log('getDerivedStateFromProps')
        console.log(props)
        console.log(state)
        if (props.seed && state.seed !== props.seed){
            console.log('getDerivedStateFromProps - STATE')
            return {
                ...state,
                seed: props.seed,
                counter: props.seed
            }
        }
        console.log('getDerivedStateFromProps - NULL')
        return null
    }



    componentDidMount() {
        console.log('Component Did Mount')
        console.log('-------------------')
    }

    componentWillUnmount() {
        console.log('Component Will Unmount')
        console.log('-------------------')
    }

    render() {
        console.log('Render')

        if (this.state.counter === 41) {
            // ошибки в самой границы ошибок не отлавливаются
            throw new Error('I crashed!');
        }

        if (this.state.error && this.props.showErrorComponent){
            return (
                <>
                    <div>We have error: {this.state.error.message}</div>

                </>
            )
        }

        return (
            <div>
                <div className="counter">
                    <button onClick={this.increment}>Increment</button>
                    <button onClick={this.decrement}>Decrement</button>
                    Counter: {this.state.counter}
                    {this.props.showErrorComponent ? <ErrorComponent/> : null }
                    {/*<ErrorComponent/>*/}
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
        console.log('Should component update')
        // console.log(nextProps)
        // console.log(nextState)
        // console.log(nextContext)
        if (nextProps.ignoreProp !== this.props.ignoreProp) {
            console.log('Should component update - DO NO RENDER')
            return false;
        }
        console.log('Should component update - RENDER')
        return true;
    }

    getSnapshotBeforeUpdate(prevProps:IProps, prevState:IState) {
        console.log('getSnapshotBeforeUpdate')
        if (prevState.counter > 40) {
            console.log('getSnapshotBeforeUpdate - SNAPSHOOT!')
            return 'SNAPSHOOT!'
        }
        console.log('getSnapshotBeforeUpdate - NULL!')
        return null;
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any) {
        console.log('Component Did Update')
        console.log('--------------------')
        console.log(snapshot)
    }
    static getDerivedStateFromError(error:any) {
        console.log("getDerivedStateFromError")
        console.log('--------------------')
        // Update state so the next render will show the fallback UI.
        return { error: error };
        // return {}
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log("Component Did Catch")
        console.log('--------------------')
        // this.setState({error:new Error('dfg'),errorInfo})
        //логирование ошибки
        console.log(errorInfo)
    }
}

export const ErrorComponent:FC<any> = (props)=>{

    throw new Error('abdc')
    return (<>{[1,2,3].map(el=><div>{props.id}</div>)}</>)
}
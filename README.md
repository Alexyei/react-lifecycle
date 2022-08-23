# Методы жизненного цикла в React

## Монтирование
1. constructor()
2. static getDerivedStateFromProps(props:IProps, state:IState):IState | null
3. render()
4. componentDidMount()

## Обновление
//Можно обновить сотсояние на основе новых пропропсов
1. static getDerivedStateFromProps(props:IProps, state:IState):IState | null
2. //Может прервать цпочку методов обновления
3. shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean
4. render()
//Возвращает "снапшот" или null
5. getSnapshotBeforeUpdate(prevProps:IProps, prevState:IState):any|null
//shapshot приходит из метода выше
6. componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any)

## Размонтирование
1. componentWillUnmount()

## Обработка ошибок
1. static getDerivedStateFromError(error:any):IState | null
2. componentDidCatch(error: Error, errorInfo: React.ErrorInfo)

Метод getDerivedStateFromError также экономит цикл рендеринга при возникновении ошибки (потому что он выполняется до рендирга, а DidCatch после)
В методе getDerivedStateFromError рекомендуется активировать аварийный интерфейс
В методе componentDidCatch логировать ошибку

Если компонент реализует методы getDerivedStateFromError и/или componentDidCatch, то он является границей ошибок.
Возможно реализация границ ошибок (компонентов которое показывают аварийный интерфейс) один из немногих случаев, когда следует использовать классовый компонент вместо функционального.


В функциональных компонентах методов жизненного цикла нет.
Аналогом render является всё тело функционального компонента.
useEffect заменяет componentDidMount, componentDidUpdate, componentWillUnmount
useMemo и useCallback заменяют shouldComponentUpdate
Для обработки ошибок есть границы ошибок.

useEffectLayout может заменить getSnapshotBeforeUpdate и getDerivedStateFromProps (прямого аналога в FC нет)
getDerivedStateFromProps является избыточным, но может сохранить цикл рендеринга, заранее изменив state, нет аналогов в FC
getSnapshotBeforeUpdate запускается до обновления, componentDidUpdate после
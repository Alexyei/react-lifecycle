import ClassComponentExample from "../components/ClassComponentExample";

export const publicRoutes= [
    {path: '/',element:(<ClassComponentExample/>),linkName:'class'},
    {path: '/FC', element: (<br/>), linkName: 'function'},
    {path: '*',element:(<div>404 NOT FOUND</div>)}
]

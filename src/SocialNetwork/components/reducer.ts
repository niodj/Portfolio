import {v1} from "uuid";
import {PostsType, PrevstateType} from "../prevState";
// export const prevState:any = {
//     users:[
//         {id: 1, name: 'Natasha', age: 35},
//         {id: 2,name: 'Olga',age: 29}
//     ],
//     messages:[],
//     posts:[
//         {id:1, message:'one post', likecount:0}
//     ]
// }

export type ACTIONTYPE = ADDPOSTTYPE|ADDLIKETYPE|UNLIKETYPE|DELPOSTTYPE

export type ADDPOSTTYPE = {
    type:'ADDPOST'
    newPost:string
}

export type ADDLIKETYPE = {
    type:'ADDLIKE'
id:string
}

export type UNLIKETYPE = {
    type:'UNLIKE'
    id:string
}
export type DELPOSTTYPE = {
    type:'DELPOST'
    id:string
}

export const reducer = (prevState: PrevstateType, action: ACTIONTYPE) => {
    switch (action.type) {

        case'ADDPOST':
            return {...prevState, posts: [...prevState.posts, {id: v1(), post: action.newPost, likecount: 0}]};

        case'ADDLIKE':
            return {...prevState,
                posts: [...prevState.posts.map((item: PostsType) => item.id === action.id ? {
                    ...item,
                    likecount: item.likecount + 1
                } : item)]
            }

        case'UNLIKE':
            return {...prevState,
                posts: [...prevState.posts.map((item: PostsType) => item.id === action.id ? {
                    ...item,
                    likecount: item.likecount - 1
                } : item)]
            }

        case'DELPOST':
            return {...prevState,
                posts: [...prevState.posts.filter((item:PostsType) => item.id !== action.id)]
            }

        default:
            return prevState;
    }
}
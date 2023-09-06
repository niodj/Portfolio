import {v1} from "uuid";
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

export const reducer = (prevState: any, action: any) => {
    switch (action.type) {

        case'ADDPOST':
            return {...prevState, posts: [...prevState.posts, {id: v1(), message: action.newPost, likecount: 0}]};

        case'ADDLIKE':
            return {...prevState,
                posts: [...prevState.posts.map((item: any) => item.id === action.id ? {
                    ...item,
                    likecount: item.likecount + 1
                } : item)]
            }

        case'UNLIKE':
            return {...prevState,
                posts: [...prevState.posts.map((item: any) => item.id === action.id ? {
                    ...item,
                    likecount: item.likecount - 1
                } : item)]
            }

        case'DELPOST':
            return {...prevState,
                posts: [...prevState.posts.filter((item: any) => item.id !== action.id)]
            }

        default:
            return prevState;
    }
}
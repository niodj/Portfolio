export type UsersType = {
    id: string
    name: string
    age: number
}

export type MessagesType = {}

export type PostsType = {
    id: string
    post: string
    likecount: number

}

export type PrevstateType={
    users:UsersType[]
    messages:MessagesType[]
    posts:PostsType[]
}

export const prevState: PrevstateType = {
    users: [
        {id: '1', name: 'Natasha', age: 35},
        {id: '2', name: 'Olga', age: 29}
    ],
    messages: [],
    posts: [
        {id: '1', post: 'one post', likecount: 0}

    ]
}
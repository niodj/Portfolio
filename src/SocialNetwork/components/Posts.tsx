import styled from "styled-components";
import {Outlet} from "react-router-dom";
import React, {useState} from "react";
import {Post} from "./Post";
import {ADDLIKETYPE, DELPOSTTYPE, UNLIKETYPE} from "./reducer";
import {PostsType} from "../prevState";

type PropsType={
    action:(action:UNLIKETYPE|ADDLIKETYPE|DELPOSTTYPE)=>void
    posts:PostsType[]
    addPost:(postInput:string)=>void
}
export const Posts = (props: PropsType) => {
    const [postIntut, setPostInput] = useState('')
    return (
        <Wrapper>Posts
            <div>new Post</div>
            <input value={postIntut} onChange={(e) => (setPostInput(e.target.value))}/>
            <button onClick={() => {
                props.addPost(postIntut)
            }}>add post
            </button>
            {props.posts.map((item: PostsType) => (
                <div key={item.id}>
                        <Post key={item.id} post={item.post} action={props.action} likecount={item.likecount} id={item.id}/>
                    </div>

            ))}
            <div><Outlet/></div>
        </Wrapper>
    )
}

const Wrapper = styled.div`



`

import styled from "styled-components";
import {Outlet} from "react-router-dom";
import React, {useState} from "react";
import {Post} from "./Post";

export const Posts = (props: any) => {
    const [postIntut, setPostInput] = useState('')
    return (
        <Wrapper>Posts
            <div>new Post</div>
            <input value={postIntut} onChange={(e) => (setPostInput(e.target.value))}/>
            <button onClick={() => {
                props.addPost(postIntut)
            }}>add post
            </button>
            {props.posts.map((item: any) => (
                <div key={item.id}>
                        <Post key={item.id} message={item.message} action={props.action} likecount={item.likecount} id={item.id}/>
                    </div>

            ))}
            <div><Outlet/></div>
        </Wrapper>
    )
}

const Wrapper = styled.div`



`

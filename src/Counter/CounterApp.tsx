import styled from "styled-components";
import {Setting} from "./Setting";
import React, {ChangeEvent, useEffect} from "react";
import {Counter} from "./Counter";
import {Buttons} from "./Buttons";
import {useDispatch, useSelector} from "react-redux";
import {svgIconClasses} from "@mui/material";


const LOCAL_STORAGE_KEY = "counterAppData";
export const CounterApp = () => {
    const state = useSelector((state: any) => state.count);
   const dispatch = useDispatch()
    useEffect(() => {
        const dataFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (dataFromLocalStorage) {
            const savedData = JSON.parse(dataFromLocalStorage);
            dispatch({type:'SETCOUNT',count:savedData.count});
            dispatch({type:'SETMIN', newmin:savedData.min});
            dispatch({type:'SETMAX', newmax:savedData.max});
        }
    }, []);

    useEffect(() => {
        const dataToSave = {
            count: state.count,
            min: state.min,
            max: state.max,
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
    }, [state.count, state.min, state.max]);


    const setMinHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newmin = event.target.value.replace(/[^0-9]/g, '');
        dispatch({type:'SETMIN', newmin:newmin});
        dispatch({type:'COUNTSTATE', countstate:true})
        if (+state.max > +newmin || !newmin ) {
            dispatch({type:'SETBUTTON', buttonStatus:true})
        } else {
            dispatch({type:'SETBUTTON', buttonStatus:false})
        }
    };

    const setMaxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newmax = event.target.value.replace(/[^0-9]/g, '');
        dispatch({type:'SETMAX', newmax:newmax})
        dispatch({type:'COUNTSTATE', countstate:true})
        if ( +newmax > +state.min || !newmax) {
            dispatch({type:'SETBUTTON', buttonStatus:true})
            dispatch({type:'SETMESSAGE',message:'Set values'});
        } else {
            dispatch({type:'SETBUTTON', buttonStatus:false})
            dispatch({type:'SETMESSAGE',message:'incorect input'});
        }
    };

    const addCount = () => {
        if (state.count >= +state.min && state.count <= +state.max - 1)
            dispatch({type:'INC'})
    }


    const resetCount = () => {
        dispatch({type:'RESET'})
    }
    const setCounterHandler = () => {
        dispatch({type:'SET'})


    }

    let ifActiveIncButton = state.count >= +state.min && state.count <= +state.max - 1 && +state.min>-1 && +state.max>0 && !state.buttonSetState
    let ifActiveResetButton = state.count>0
    let ifRedCount = state.count === +state.max && state.count !== +state.min



    return<>
        <Title>
            <div>This component increases the number by one within the specified limits</div>

        </Title>
        <Wrapper>
            <SettingFrame>
                <Setting setMinHandler={setMinHandler}
                         setMaxHandler={setMaxHandler}
                         min={state.min}
                         max={state.max}
                         setCounterHandler={setCounterHandler}
                         buttonSetState={state.buttonStatus}
                         message={state.message}/>
            </SettingFrame>
            <CounterFrame>
                <Countframe>
                     <Counter ifRedCount={ifRedCount} count={state.count}/>
                </Countframe>
                <ButtonsFrame>
                    <Buttons addCount={addCount} ifActiveResetButton={ifActiveResetButton} ifActiveIncButton={ifActiveIncButton}
                             resetCount={resetCount}/>
                </ButtonsFrame>
            </CounterFrame>
        </Wrapper>
    </>
}

const Wrapper = styled.div`

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
text-align: center;
  justify-content: center;
`

const SettingFrame = styled.div`
  width: 300px;
  height: 200px;
  border: solid;
  margin-right: 20px;
  margin-top: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

`

const CounterFrame = styled.div`
  display: flex;
  flex-direction: column;
  border: solid;
  width: 300px;
  height: 200px;
  margin-right: 20px;
  margin-top: 10px;

`
const Countframe = styled.div`
  margin: 12px;
  border: solid lightblue;
  text-align: center;
  width: 86%;
  height: 50%;

`
const ButtonsFrame = styled.div`
  display: flex;
  flex-direction: row;

  margin: 12px;
  border: solid lightblue;
  width: 86%;
  height: 50%;
`



const Title = styled.div`
font-weight: bold ;
  text-align: center;
`

import React, {useEffect, useState} from "react";
import {v1} from "uuid";
import {GuestTable} from "./GuestTable";
import styled from "styled-components";
import {GuestMonitor} from "./GuestMonitor";
import {WorkSpace} from "./WorkSpace";

export const QueueApp = () => {
    const [inputDepartment, setInputDepartment] = useState('Passport')
    const [inputWindow, setInputWindow] = useState('Workplace 1')
    const [queueWindow, setWindow] = useState<any>([])
    const [waiting, setWaiting] = useState<any>([])

//button add windows
    const addWindow = () => {
        if (!inputDepartment.trim()) {
            alert('empty department name')
        } else if (!inputWindow.trim()) {
            alert('empty window name')
        } else if (queueWindow.find((item: any) => item.windowName === inputWindow && item.department === inputDepartment)) {
            alert('already exist')
        } else {
            setWindow([...queueWindow, {
                id: v1(),
                department: inputDepartment.trim(),
                windowName: inputWindow.trim(),
                status: true
            }])
        }
    }
//button add waiting
    const addToWatting = (addToWatting: any) => {
        const numberInQ = waiting[waiting.length - 1]?.numberInQ + 1 || 1
        setWaiting([...waiting, {id: v1(), department: addToWatting, numberInQ, windowNow: null}]
        )
        alert('Your service is ' + addToWatting + ' and your number in Q is ' + numberInQ + ' Please take a picture and press ok. When come your line, you will see your window on monitor')


    }

    const inputDepartmentHandler = (event: any) => {
        setInputDepartment(event.currentTarget.value)
    }

    const inputWindowHandler = (event: any) => {
        setInputWindow(event.currentTarget.value)
    }
//ButtonQ take guest
    const takeGuest = (department: any, windowName: any) => {

        const updatedWaiting = [...waiting];
        for (let i = 0; i < updatedWaiting.length; i++) {
            if (updatedWaiting[i].windowNow === null && updatedWaiting[i].department === department && queueWindow.find((item: any) => item.windowName === windowName && item.department === department).status) {
                updatedWaiting[i].windowNow = windowName;
                setWaiting(updatedWaiting)
                setWindow(queueWindow.map((item: any) => (item.windowName === windowName && item.department === department) ? {
                    ...item,
                    status: false
                } : item))
                // Say the phrase using speech synthesis
                const speechText = `Client number ${updatedWaiting[i].numberInQ}, please proceed to window ${windowName}`;
                speakText(speechText);
                break
            }
        }
    }

//ButtonQ finish guest
    const finishGuest = (department: any, windowName: any) => {

        const updatedWaiting = [...waiting];
        for (let i = 0; i < updatedWaiting.length; i++) {
            if (updatedWaiting[i].windowNow === windowName && updatedWaiting[i].department === department) {
                updatedWaiting.splice(i, 1)
                setWaiting(updatedWaiting)
                setWindow(queueWindow.map((item: any) => (item.windowName === windowName && item.department === department) ? {
                    ...item,
                    status: true
                } : item))
                break
            }


        }
    }
//Save to localstorage
    const saveDataToLocalStorage = () => {
        localStorage.setItem("queueAppState", JSON.stringify({queueWindow, waiting}));
    };

    const loadDataFromLocalStorage = () => {
        const savedState = localStorage.getItem("queueAppState");
        if (savedState) {
            const {queueWindow: savedQueueWindow, waiting: savedWaiting} = JSON.parse(savedState);
            setWindow(savedQueueWindow);
            setWaiting(savedWaiting);
        }
    };


    useEffect(() => {
        loadDataFromLocalStorage();
    }, []);

    useEffect(() => {
        saveDataToLocalStorage();
    }, [queueWindow, waiting]);


    ///////////////////// Function to speak the given text///////////////////
    const speakText = (text: string) => {
        const speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.volume = 1; // 0 to 1
        speech.rate = 1; // 0.1 to 10
        speech.pitch = 1; // 0 to 2
        speech.lang = "en-US"; // or any other supported language code

        window.speechSynthesis.speak(speech);
    };


////////////////////////////
    return (


        <Wrapper>

            <h3>Here is component with el Queue</h3>
            <img src={'https://www.smartmatrixuae.com/wp-content/uploads/2017/03/b2.jpg'}/>
            <div>This is a first page where you can enter names of services and names of workplace. This component
                available only for Administrator.
            </div>

            <FrameSetup>

                <Form>
                    <div>Enter name service or of department</div>
                    <input onChange={inputDepartmentHandler} value={inputDepartment}/>
                    <div>enter name workplace. </div>
                        <div>You can add multiple workplace to one service </div>

                    <input onChange={inputWindowHandler} value={inputWindow} placeholder={'workplace №1'}/>


                    <SetupButtons>
                        <button onClick={addWindow}>Add window</button>
                        <div>Reset ALL!</div>
                        <button onClick={() => {

                            setWaiting([])
                            setWindow([])


                        }}>reset all Q
                        </button>

                        <DelService>
                            <div>Here you can remove workplace. If you delete ANY window, information about all guests
                                WILL BE LOST!!!

                            </div>

                            <div>Remove window</div>

                            {queueWindow.map((b: any, idx: number) => <button key={idx} onClick={() => {
                                setWindow(queueWindow.filter((item: any, idx: number) => item.windowName !== b.windowName && item.department === b.department))
                                setWaiting([])
                            }
                            }>Delete Service "{b.department}" windows "{b.windowName}"</button>)
                            }

                        </DelService>

                    </SetupButtons>

                </Form>
            </FrameSetup>

            <Line></Line>
            <GuestTable queueWindow={queueWindow} addToWating={addToWatting}/>
            <Line></Line>
            <GuestMonitor waiting={waiting}/>
            <Line></Line>
            <WorkSpace queueWindow={queueWindow} waiting={waiting} takeGuest={takeGuest}
                       finishGuest={finishGuest}/>
        </Wrapper>


    );
};
const SetupButtons = styled.div`
  text-align: center;
`
const Line = styled.div`

  height: 1px;
  background-color: green;
  margin: 10px;
`

const Wrapper = styled.div`
  text-align: center;
  img{width: 50%;
    height: 50%}
`

const FrameSetup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px;

`
const Form = styled.div`
  text-align: center;
  justify-content: center;
  
`


const DelService = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  border: solid 1px;
`
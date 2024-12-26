import { createContext, useState, useEffect, useMemo } from "react"
import run from "../Config";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase/firebase";

export const Context=createContext()

export const ContextProvider = (props) =>{

    const [input,setInput]=useState("")
    const [prompt,setPrompt]=useState("")
    const [prevPrompt,setPrevPrompt]=useState([])
    const [result,setResult]=useState([])
    const [loading,setLoading]=useState(false)
    const [showResult,setShowResult]=useState(false)
    const [currentUser,setCurrentUser] = useState()
    const [recent,setRecent] = useState([])
    const [id,setId] = useState(0)


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,initializeUser)
        return unsubscribe
    },[])

    
      
    

    const initializeUser = (user)=>{
        if(user){
            setCurrentUser({...user})
            console.log(user)
            console.log("Logged in sucessfully",localStorage.getItem(user.email))
            const updateChat = JSON.parse(localStorage.getItem(user.email)) || [];
            setRecent(updateChat)
            const length = updateChat.length
            setId(length)
            console.log(id)
        }
        else{
            setCurrentUser(null)
            console.log("Something went Wrong")
        }
    }


    
    
    const onSent = async (prompt) => {
        setLoading(true)
        setPrompt(input)
        const response=await run(input)
        let newResponse=response.split("**")
        const formattedResponse = newResponse
                .map((item, index) => (index % 2 === 1 ? `<b>${item}</b>` : item))
                .join("")
                .split("*")
                .join("<br>");
        setLoading(false)
        setInput("")
        setResult((prev)=>[...prev,formattedResponse])
        setPrevPrompt((prev)=>[...prev,input])
        setShowResult(true)
        
    }
    

    const newChat = () => {
      setShowResult(false);
  
      const newChatEntry = { prompt: prevPrompt, result: result };
      console.log(newChatEntry);
  
      // Use functional update to ensure correct state
      setRecent((prevRecent) => {
          const updatedRecent = [...prevRecent, newChatEntry];
  
          // Save to localStorage after updating state
          localStorage.setItem(currentUser.email, JSON.stringify(updatedRecent));
  
          return updatedRecent; // Update the state
      });
  
      // Reset other states
      setResult([]);
      setPrevPrompt([]);
      setInput("");
      setId(recent.length + 1); // Update id after the recent array length is updated
      console.log(id);
  };
  

    const UpdateChat = (id) => {
        setShowResult(false)
        setId(id)
        setRecent((prev) =>
          prev.map((item, index) =>
            index === id
              ? {  prompt: prevPrompt, result: result }
              : item
          )
        );
        setResult([])
        setPrevPrompt([])
        setInput("")
      };

    const showrecent=(id)=>{
        if(id>=0 && id<recent.length){
        setId(id)
        setShowResult(true)
        setId(id)
        setPrevPrompt(recent[id].prompt)
        setResult(recent[id].result)
        }
        else{
            console.log(`Invalid id: ${id}`)
        }
    }

    const deletChat = (id) => {
        const updatedChat = recent.filter((item, index) => index !== id);
        localStorage.setItem(currentUser.email,JSON.stringify(updatedChat))
        setRecent(updatedChat)
    }

    const contextValues = useMemo(
        () => ({
          currentUser,
          UpdateChat,
          recent,
          showrecent,
          newChat,
          onSent,
          input,
          setInput,
          prevPrompt,
          setPrevPrompt,
          result,
          setResult,
          showResult,
          setShowResult,
          loading,
          setLoading,
          prompt,
          setPrompt,
          deletChat,
        }),
        [
          currentUser,
          recent,
          input,
          prevPrompt,
          result,
          showResult,
          loading,
          prompt,
        ]
      );
      

    return(
        <Context.Provider value={contextValues} >
            {props.children}
        </Context.Provider>
    )
}